import { Server as IOServer, Socket } from "socket.io";
import { saveGameToRedis, getGameFromRedis, deleteGameFromRedis } from "./chipsAndBombGameLogic.js"
import { updateUserWallet } from "../../models/diamondGameDB.js";

// !!!!! fix global objects should be cleaned after gaame or remove it  fix clean up
const usersReady: string[] = [];
const playerSocketIds: Record<string, string> = {};
const userIdArray: string[] = [];

//  PROBLEM: TurnUserID causes empty string issues - REMOVED, use roomPlayers instead
const roomPlayers: Record<string, string[]> = {};
const roomTurns: Record<string, string> = {};
const userBombCounts: Record<string, number> = {};

function rockPaperScissorSoketSetup(io: IOServer) {
    io.on("connection", (socket: Socket) => {
        console.log("connected:", socket.id);

        socket.on("Ready", (userId: string) => {
            //  FIX: Ignore empty userId
            if (!userId || userId.trim() === "") {
                console.log(" Received Ready with empty userId, ignoring");
                return;
            }

            console.log("userid: ", userId);
            playerSocketIds[userId] = socket.id;

            if (!usersReady.includes(userId)) {
                usersReady.push(userId);
            }
            else {
                return console.log("Ready users:", usersReady);
            }
            if (usersReady.length === 2) {
                //  FIX: Don't mutate original array
                const generateRoomId = [...usersReady].sort().join('_');
                console.log("roomid: ", generateRoomId);
                usersReady.forEach((userId) => {
                    const playerSocketId = playerSocketIds[userId];
                    if (playerSocketId) {
                        io.to(playerSocketId).emit("RoomId", generateRoomId);
                    }
                    else {
                        return console.log(`no socket found for userId ${userId}`);
                    }
                });
                //  FIX: Clear ready users after room created
                usersReady.length = 0;
            }
        });

        socket.on("join-game", ({ userId, roomId }) => {
            socket.join(roomId);

            console.log(`User ${userId} joined game ${roomId}`);
            socket.to(roomId).emit("player-joined", userId);

            // Store players in room
            if (!roomPlayers[roomId]) {
                roomPlayers[roomId] = [];
            }
            if (!roomPlayers[roomId].includes(userId)) {
                roomPlayers[roomId].push(userId);
            }

            if (!userIdArray.includes(userId)) {
                userIdArray.push(userId);
                console.log("userIdArray", userIdArray);
            }

            //  FIX: When both players join, set first turn
            if (userIdArray.length === 2) {
                const toss = Math.floor(Math.random() * 2);
                const firstPlayer = userIdArray[toss];
                
                //  FIX: Store first turn in roomTurns
                roomTurns[roomId] = firstPlayer!;
                console.log("Toss winner:", firstPlayer);
                console.log("First turn set:", roomTurns[roomId]);

                io.to(roomId).emit('toss-result', firstPlayer);

                //  FIX: Clear userIdArray for next game
                userIdArray.length = 0;
            }
        });

        socket.on('Send-Tiles', (roomId, selectBombData: []) => {
            socket.to(roomId).emit('Get-Tiles', selectBombData);
        });

        socket.on("live-data-send", ({ roomId, myTiles, userId }) => {
            socket.to(roomId).emit("live-data-receive", myTiles);

            if (!userBombCounts[userId]) {
                userBombCounts[userId] = 0;
            }

            const bombCount = myTiles.filter((tile: { tile: "chips" | "bomb" | null }) => tile.tile === "bomb").length;
            userBombCounts[userId] = bombCount;

            if (bombCount !== undefined && bombCount >= 3) {
                const loserId = userId;
                const winnerId = roomPlayers[roomId]?.find(id => id !== loserId);
                console.log("lose win id", loserId, winnerId);

                // GET STAKE FROM REDIS FIRST
                const updateUser_Loser_Wallet_To_Db = async () => {
                    const gameData = await getGameFromRedis(loserId);

                    if (gameData?.balance !== undefined && gameData?.stake !== undefined) {
                        const stake = gameData.stake;
                        const balance = gameData.balance;
                        const finalAmount = balance - stake;
                        console.log("updatin wallet");

                        await updateUserWallet(loserId, finalAmount);
                        await deleteGameFromRedis(loserId);
                    } else {
                        console.log("Game data incomplete");
                        // Handle error - maybe use default values or cancel
                    }
                };
                updateUser_Loser_Wallet_To_Db();

                const LooserSocket = playerSocketIds[loserId];
                if (LooserSocket) {
                    io.to(LooserSocket).emit("game-status", "you lose");
                }
                // UPDATE WINNER'S WALLET (ADD WINNINGS)
                if (winnerId) {
                    const updateUser_Winner_Wallet_To_Db = async () => {
                        const gameData = await getGameFromRedis(winnerId);

                        if (gameData?.balance !== undefined && gameData?.stake !== undefined) {
                            const stake = gameData.stake;
                            const balance = gameData.balance;
                            const finalAmount = balance + stake * 0.9;
                            console.log("updatin wallet");
                            await updateUserWallet(winnerId, finalAmount);
                            await deleteGameFromRedis(winnerId);
                        } else {
                            console.log("Game data incomplete");
                            // Handle error - maybe use default values or cancel
                        }
                    };
                    updateUser_Winner_Wallet_To_Db();

                    const winnerSocket = playerSocketIds[winnerId];
                     if (winnerSocket) {
                    io.to(winnerSocket).emit("game-status", "you win");
                }
                };

                // UPDATE GAME HISTORY IN REDIS
                // const updatedGameData = {
                //     ...gameData,
                //     status: 'COMPLETED',
                //     winner: winnerId,
                //     loser: loserId,
                //     finalAmount: finalAmount
                // };
                // saveGameToRedis(roomId, updatedGameData);

                //  CLEAN UP
                userBombCounts[loserId] = 0;
                if (winnerId) userBombCounts[winnerId] = 0;

                // Optional: Delete game from redis after 5 min
                setTimeout(() => deleteGameFromRedis(roomId), 300000);

            }
        });

        // ================= TURN-BASED MOVE - FIXED =================
        socket.on("player-move", ({ roomId, userId, currentTurn }) => {
            console.log("playermove", userId, roomId);

            //  FIX: Use roomTurns from server, not client-sent currentTurn
            const currentTurnUserID = roomTurns[roomId];
            console.log("current turn from server:", currentTurnUserID);

            //  FIX: Block if not this player's turn
            if (currentTurnUserID !== userId) {
                socket.emit("invalid-move", "Not your turn");
                return;
            }

            //  FIX: Get next player from roomPlayers
            const playersInRoom = roomPlayers[roomId] || [];
            const nextTurn = playersInRoom.find(id => id !== userId);

            console.log("nextturn:", nextTurn);
            if (!nextTurn) return;

            //  FIX: Update turn in roomTurns
            roomTurns[roomId] = nextTurn;
            io.to(roomId).emit("turn-update", nextTurn);
        });

        socket.on("disconnect", () => {
            console.log("disconnected:", socket.id);

            let disconnectedUserId = null;
            for (const userId in playerSocketIds) {
                if (playerSocketIds[userId] === socket.id) {
                    disconnectedUserId = userId;
                    delete playerSocketIds[userId];
                    break;
                }
            }

            if (disconnectedUserId) {
                const readyIndex = usersReady.indexOf(disconnectedUserId);
                if (readyIndex !== -1) usersReady.splice(readyIndex, 1);

                const userIdIndex = userIdArray.indexOf(disconnectedUserId);
                if (userIdIndex !== -1) userIdArray.splice(userIdIndex, 1);

                // Remove from roomPlayers
                for (const roomId in roomPlayers) {
                    roomPlayers[roomId] = roomPlayers[roomId]!.filter(id => id !== disconnectedUserId);
                    if (roomPlayers[roomId].length === 0) {
                        delete roomPlayers[roomId];
                        delete roomTurns[roomId];
                    }
                }
            }

            console.log(" Cleaned up state for disconnected user");
        });

    });
}

export { rockPaperScissorSoketSetup };