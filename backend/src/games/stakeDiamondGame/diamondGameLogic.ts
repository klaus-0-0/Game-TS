import { createClient, RedisClientType } from "redis";
import type { Request, Response } from "express";
import { getUserWallet } from "../../models/diamondGameDB.js";
import { updateUserWallet } from "../../models/diamondGameDB.js";
import { updateUserGameHistory } from "../../models/diamondGameDB.js"
import { AuthRequest } from "../../middleware/userAuthMiddleware.js";

/* ---------------- REDIS CLIENT ---------------- */

// 99% of local dev uses this:
// const client = redis.createClient(); 
// // or
// const client = redis.createClient({
//   url: 'redis://localhost:6379'
// });

// Create client instance (not function)
const client: RedisClientType = createClient({
    username: "default",
    password: "8wjgzKpDCs3sTetcDcBa365OIDzBvh9z",
    socket: {
        host: "redis-10867.crce276.ap-south-1-3.ec2.cloud.redislabs.com",
        port: 10867,
    },
});

// Connect on module
client.connect().catch(console.error);
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("✅ Redis Connected!"));

/* ---------------- TYPES ---------------- */

interface GameData {
    gameId: string,
    mines: number[];
    minesCount: number;
    stake: number;
    clicks: number;
    clickedTile: number[];
    status: "active" | "LOST" | "WON" | "CASHED_OUT";
    balance: number;
    potentialWin: number;
    winAmount: number
}

/* ---------------- REDIS HELPERS ---------------- */

const saveGameToRedis = async (gameId: string, gameData: GameData): Promise<void> => {
    await client.setEx(`game:${gameId}`, 1800, JSON.stringify(gameData)); // set for set game data to redis setEx set-expiary in between expiary time
    // Check TTL (Time To Live)
    const ttl = await client.ttl(`game:${gameId}`);
    console.log(`Game expires in ${ttl} seconds`);
};

const getGameFromRedis = async (gameId: string): Promise<GameData | null> => {
    try {
        const data = await client.get(`game:${gameId}`);
        return data ? (JSON.parse(data) as GameData) : null;
    } catch (error: any) {
        console.error("Redis get error:", error.message);
        return null;
    }
};

const deleteGameFromRedis = async (gameId: string): Promise<void> => {
    await client.del(`game:${gameId}`);
};

/* ---------------- GAME CONSTANTS ---------------- */

// const original_Wallet = {
//     wallet: 5000,
// };

const House_edge = 0.97;
const totalTiles = 25;

/* ---------------- CONTROLLERS ---------------- */

const userdata = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
        // Assuming you have userId in request (from auth middleware)
        const userId = req.user?.id; // ✅ correct
        console.log("userid", userId);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        console.log("userid", userId);

        // Fetch wallet 
        const wallet = await getUserWallet(userId);

        const gameId = "game_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

        console.log("fetch", gameId);

        return res.status(200).json({
            message: "userdata",
            gameId,
            wallet,
            totalTiles: 25
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const createGame = async (req: AuthRequest, res: Response): Promise<Response | void> => {
    try {
        const userId = req.user?.id;
        console.log("userid", userId);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // fetch user wallet
        const wallet = await getUserWallet(userId);
        const { mines, stake, gameId }: { mines: number; stake: number; gameId: string } = req.body;
        if (mines <= 0) return res.status(404).json({ message: "no mines detected" });
        const mineSet = new Set<number>();

        if (stake > wallet && stake < 100 && !gameId) {
            return res
                .status(404)
                .json({ message: "insufficient balance", balance: wallet });
        }
        while (mineSet.size < mines) {
            mineSet.add(Math.floor(Math.random() * totalTiles));
        }
        const mineArray = Array.from(mineSet);

        const gameData: GameData = {
            gameId: gameId,
            mines: mineArray,
            minesCount: mines,
            stake,
            clicks: 0,
            clickedTile: [],
            status: "active",
            balance: wallet - stake,
            potentialWin: 0,
            winAmount: 0
        };

        // save ONLY this game
        await saveGameToRedis(gameId, gameData);
        return res.status(201).json({
            message: "success",
            balance: wallet - stake,
        });
    } catch (error: any) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const clickTile = async (req: AuthRequest, res: Response): Promise<Response | void> => {
    try {
        const userId = req.user?.id;
        console.log("userid", userId);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // fetch user wallet
        const wallet = await getUserWallet(userId);
        const { clickedTile, gameId }: { clickedTile: number; gameId: string } = req.body;

        // LOAD GAME FROM REDIS 
        const game = await getGameFromRedis(gameId);
        if (!game) {
            console.log("❌ Game not found, sending 404...");
            return res
                .status(404)
                .json({ message: "Game not found. Please refresh..." });
        }
        // simple include O(n)
        if (game.clickedTile.includes(clickedTile)) {
            return res.json({ error: "Double click!", tile: clickedTile });
        }
        // update game expiry on every click
        await client.expire(`game:${gameId}`, 1800);
        console.log("clicked tile - ", clickedTile);
        game.clickedTile.push(clickedTile);
        console.log("clickedArray = ", game.clickedTile);

        const isMine = game.mines.includes(clickedTile);
        if (isMine) {
            game.potentialWin = 0;
            // game.balance = game.balance - game.potentialWin;
            console.log("wallet", game.balance);
            game.status = "LOST";
            game.winAmount = - game.stake;
            try {  
                const updateInDB = await updateUserWallet(userId, game.balance);
                await updateUserGameHistory(userId, game);
                await saveGameToRedis(gameId, game);

                return res.json({
                    isMine: true, 
                    gameStatus: "lost",
                    wallet: updateInDB, // Use updated wallet
                    mineArray: game.mines,
                });
            } catch (error) {
                return res.status(500).json({ message: "Failed to update wallet" });
            }
        }

        game.clicks += 1; 
        const currentClick = game.clicks;
        const safeTiles = totalTiles - currentClick - game.mines.length;

        if (safeTiles !== 0) {
            const potentialWin = (totalTiles / safeTiles) * House_edge * game.stake;
            game.potentialWin = Number(potentialWin.toFixed(2));
            console.log({ currentClick, safeTiles, game });
        }

        // 🔁 UPDATE REDIS
        await saveGameToRedis(gameId, game);
        if (safeTiles <= 0) {
            game.status = "WON";
            game.winAmount = game.potentialWin - game.stake;
            try {
                game.balance = Number((game.potentialWin + game.balance).toFixed(2));
                await updateUserWallet(userId, game.balance);
                await updateUserGameHistory(userId, game)
                await saveGameToRedis(gameId, game);
                console.log("gane WON = ", game);

                return res.json({
                    gameStatus: "WON",
                    message: "You win!",
                    clicked_All_Safe_Tiles: true,
                    mineArray: game.mines,
                });
            } catch (error) {
                return res.status(500).json({ message: "Failed to update wallet" });
            }
        }

        return res.json({
            isMine: false,
            gameStatus: "active",
            clicks: currentClick,
            safeTiles,
            potentialWin: game.potentialWin,
        });
    } catch (error: any) {
        console.error(error.message);
        return res.status(500).json({ message: "server issue" });
    }
};

const cashOut = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
        const userId = req.user?.id;
        console.log("userid", userId);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // fetch user wallet
        const wallet = await getUserWallet(userId);
        // Handle cash out, update wallet
        const { gameId }: { gameId: string } = req.body;
        let mines = [];
        const game = await getGameFromRedis(gameId);
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        game.status = "CASHED_OUT";
        game.winAmount = game.potentialWin - game.stake;
        game.balance = Number((game.potentialWin + game.balance).toFixed(2));
        await updateUserWallet(userId, game.balance);
        await updateUserGameHistory(userId, game);

        mines = [...game.mines];
        console.log("mines = ", mines);

        await saveGameToRedis(gameId, game);
        console.log("game =", game, "wallet", wallet, "game.balance", game.balance);

        // 🧹 CLEANUP GAME FROM REDIS
        await deleteGameFromRedis(gameId);
        return res.json({ message: "Cash out successful", wallet: game.balance, mines });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "server error" })
    }
};
 
export { createGame, clickTile, cashOut, userdata };
