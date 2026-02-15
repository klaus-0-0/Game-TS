import { createClient, RedisClientType } from "redis";
import type { Request, Response } from "express";
import { getUserWallet } from "../../models/diamondGameDB.js";
import { updateUserWallet } from "../../models/diamondGameDB.js";
import { updateUserGameHistory } from "../../models/diamondGameDB.js"
import { AuthRequest } from "../../middleware/userAuthMiddleware.js";

/* ---------------- REDIS CLIENT ---------------- */

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
    playerid: string;
    gameId: string,
    myTiles: []; 
    oponentTiles: [];
    selectBomb: []; 
    currentTurn: string;
    stake: number;
    status: "active" | "LOST" | "WON" | "CASHED_OUT";
    balance: number;
    finalAmount: number
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

const getUserAccount = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(404).json({ message: "userid not found" });
        }

        const wallet = await getUserWallet(userId);

        return res.status(201).json({ message: "success", wallet });
    } catch (error: any) {
        return res.status(500).json({ messgae: "serevr error", erroe: error.message })
    }
}

const userGameData = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
        const userId = req.user?.id;
        const { myTiles, oponentTiles, selectBomb, roomId, currentTurn, stake, status, finalAmount } = req.body;
        if (!userId) {
            return res.status(404).json({ message: "userid not found" });
        }
        if (!myTiles && !oponentTiles && !roomId) {
            return res.status(404).json({ message: "user game data not found" });
        }
        const wallet = await getUserWallet(userId);
        const gamedata: GameData = {
            playerid: userId,
            gameId: roomId,
            myTiles: myTiles,
            selectBomb: selectBomb,
            currentTurn: currentTurn,
            oponentTiles: oponentTiles,
            stake: stake,
            status: status,
            balance: wallet,
            finalAmount: finalAmount
        }
        await saveGameToRedis(userId, gamedata);

        return res.status(201).json({ message: "success" });
    } catch (error: any) {
        return res.status(500).json({ messgae: "serevr error", erroe: error.message })
    }
}

const fetchGameData = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(404).json({ message: "userid not found" });
        }
        const gameData = await getGameFromRedis(userId);
        console.log("gamedata", gameData);

        return res.status(201).json({ message: "success", gameData });
    } catch (error: any) {
        return res.status(500).json({ messgae: "serevr error", erroe: error.message })
    }
}


export { getUserAccount, userGameData, fetchGameData, saveGameToRedis, getGameFromRedis, deleteGameFromRedis };