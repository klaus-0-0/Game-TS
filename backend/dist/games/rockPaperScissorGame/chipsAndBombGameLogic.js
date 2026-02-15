import { createClient } from "redis";
import { getUserWallet } from "../../models/diamondGameDB.js";
/* ---------------- REDIS CLIENT ---------------- */
// Create client instance (not function)
const client = createClient({
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
/* ---------------- REDIS HELPERS ---------------- */
const saveGameToRedis = async (gameId, gameData) => {
    await client.setEx(`game:${gameId}`, 1800, JSON.stringify(gameData)); // set for set game data to redis setEx set-expiary in between expiary time
    // Check TTL (Time To Live)
    const ttl = await client.ttl(`game:${gameId}`);
    console.log(`Game expires in ${ttl} seconds`);
};
const getGameFromRedis = async (gameId) => {
    try {
        const data = await client.get(`game:${gameId}`);
        return data ? JSON.parse(data) : null;
    }
    catch (error) {
        console.error("Redis get error:", error.message);
        return null;
    }
};
const deleteGameFromRedis = async (gameId) => {
    await client.del(`game:${gameId}`);
};
const getUserAccount = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(404).json({ message: "userid not found" });
        }
        const wallet = await getUserWallet(userId);
        return res.status(201).json({ message: "success", wallet });
    }
    catch (error) {
        return res.status(500).json({ messgae: "serevr error", erroe: error.message });
    }
};
const userGameData = async (req, res) => {
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
        const gamedata = {
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
        };
        await saveGameToRedis(userId, gamedata);
        return res.status(201).json({ message: "success" });
    }
    catch (error) {
        return res.status(500).json({ messgae: "serevr error", erroe: error.message });
    }
};
const fetchGameData = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(404).json({ message: "userid not found" });
        }
        const gameData = await getGameFromRedis(userId);
        console.log("gamedata", gameData);
        return res.status(201).json({ message: "success", gameData });
    }
    catch (error) {
        return res.status(500).json({ messgae: "serevr error", erroe: error.message });
    }
};
export { getUserAccount, userGameData, fetchGameData, saveGameToRedis, getGameFromRedis, deleteGameFromRedis };
//# sourceMappingURL=chipsAndBombGameLogic.js.map