import { createClient } from "redis";
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
const gameLogic = async () => {
    try {
        let hand;
        const randomNum = Math.floor(Math.random() * 3) + 1;
        if (randomNum === 1) {
            hand = "Rock";
            console.log(hand);
        }
        else if (randomNum === 2) {
            hand = "Paper";
            console.log(hand);
        }
        else {
            hand = "Scissor";
            console.log(hand);
        }
        return hand;
    }
    catch (error) {
        return console.log("server error", error.message);
    }
};
// const userData = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const userId = req.user?.id;
//         return res.status(201).json({ message: "success" });
//     } catch (error: any) {
//         return res.status(500).json({ messgae: "serevr error", erroe: error.message })
//     }
// } 
export { gameLogic };
//# sourceMappingURL=rockPaperScissor.js.map