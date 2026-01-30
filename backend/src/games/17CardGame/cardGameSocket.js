// 17CardGame.socket.js
const { dealSixCards, gameLogics, getGameStatus } = require("./cardGameLogic");

// Store all 17Card game related socket handlers
function setup17CardGameSocket(io) {
    const userLength = [];
    const waitingRooms = {};
    const playersSockets = {};
    const roomIntervals = {};
    const roomSubmissions = {};

    io.on('connection', (socket) => {
        console.log("new connection", socket.id);

        // ✅ Store temporary user data until we get their userId
        let userData = { socketId: socket.id };

        socket.on("ready", (data) => {
            const userId = data.userId;
            console.log(`Player ${userId} ready (socket: ${socket.id})`);

            // ✅ Check if user already exists in userLength
            if (userLength.includes(userId)) {
                console.log(`User ${userId} already connected. Rejecting duplicate.`);
                socket.emit("error", { message: "User already connected from another device" });
                return; // Stop here, don't proceed
            }

            // ✅ STORE THE SOCKET MAPPING IMMEDIATELY
            playersSockets[userId] = socket.id;
            userData.userId = userId; // Store for cleanup 
            userLength.push(userId);

            if (userLength.length === 1) {
                socket.emit("player-position", { position: "bottom", userid: userId })
            }
            else if (userLength.length === 2) {
                socket.emit("player-position", { position: "right", userid: userId })
            }
            else if (userLength.length === 3) {
                socket.emit("player-position", { position: "left", userid: userId })
            }

            if (userLength.length < 3) {
                console.log(`Waiting for ${3 - userLength.length} more users...`);
                return;
            }

            const generatedRoomId = userLength.sort().join('_');
            console.log("generatedRoomId =", generatedRoomId);

            waitingRooms[generatedRoomId] = [...userLength];

            console.log("Available socket mappings:", playersSockets);

            // ✅ Now playersSockets should have the mappings
            userLength.forEach(userId => {
                const playerSocketId = playersSockets[userId];
                if (playerSocketId) {
                    console.log(`📨 Sending joinRoomId to ${userId} (socket: ${playerSocketId})`);
                    io.to(playerSocketId).emit("joinRoomId", generatedRoomId);
                } else {
                    console.log(`❌ No socket found for user ${userId}`);
                }
            });

            userLength.length = 0;
        });

        socket.on('joinRoom', ({ roomId, userId }) => {
            console.log(`🔗 Player ${userId} joining room ${roomId}`);

            // ✅ Update socket mapping (in case of reconnection) 
            playersSockets[userId] = socket.id;
            socket.join(roomId);

            const users = waitingRooms[roomId];
            if (!users || users.length < 3) {
                console.log(`❌ Not enough players in room ${roomId}`);
                return;
            }

            console.log(`Player ${userId} joined room ${roomId}. Total players: ${users.length}`);

            // ✅ FIX: Only start game when ALL 3 players have joined
            if (users.length === 3 && !roomIntervals[roomId]) {
                console.log(`🎮 All 3 players joined. Starting game for room ${roomId}`);

                // Check if all 3 players have socket connections
                const allPlayersConnected = users.every(uid => playersSockets[uid]);
                if (!allPlayersConnected) {
                    console.log(`❌ Not all players have socket connections:`, users);
                    return;
                }

                let roundCount = 0;

                const startRound = () => {
                    console.log(`🔄 Starting round ${roundCount + 1} for room ${roomId}`);

                    const sixCards = dealSixCards();
                    roomSubmissions[roomId] = {};

                    users.forEach((uid, idx) => {
                        const sockId = playersSockets[uid];
                        if (!sockId) return;

                        const playerCards = sixCards.slice(idx * 17, idx * 17 + 17);

                        io.to(sockId).emit("SixCards", {
                            role: ['A', 'B', 'C'][idx],
                            cards: playerCards,
                            round: roundCount + 1
                        });

                        roomSubmissions[roomId][uid] = { submitted: false, cards: playerCards };
                    });

                    console.log(`Round ${roundCount + 1} dealt for room ${roomId}`);

                    // Start 50-second countdown timer
                    let countdown = 50;
                    const timerInterval = setInterval(() => {
                        io.to(roomId).emit("countdown", {
                            timeLeft: countdown,
                            round: roundCount + 1
                        });

                        console.log(`Room ${roomId} - Countdown: ${countdown}`);

                        const currentCountdown = countdown;

                        if (currentCountdown === 5 || currentCountdown === 10 || currentCountdown === 15 || currentCountdown === 20 || currentCountdown === 25) {
                            const submissions = roomSubmissions[roomId];

                            setTimeout(() => {
                                console.log(`⏰ 5-second auto-submit at ${currentCountdown}s`);
                                console.log("getGameStatus", getGameStatus.gameWinner);

                                for (const uid of Object.keys(submissions)) {
                                    if (!submissions[uid].submitted) {
                                        console.log(`Auto-submitting for ${uid}`);
                                        const result = gameLogics(submissions[uid].cards, uid, roomId);
                                        io.to(roomId).emit("hand-winner", result);
                                        const status = getGameStatus();
                                        io.to(roomId).emit("game-status", status);
                                    }
                                }
                            }, 5000);
                        }

                        if (countdown <= 0) {
                            clearInterval(timerInterval);
                            console.log(`Round ${roundCount + 1} ended`);

                            // ✅ Schedule next round after 5 seconds
                            roundCount++;
                            setTimeout(startRound, 5000); // 5 seconds between rounds
                        }

                        countdown--;
                    }, 1000);
                };

                // ✅ Start first round immediately  
                startRound();
                roomIntervals[roomId] = true; // Mark that interval exists for this room
            } else {
                console.log(`⏳ Waiting for more players in room ${roomId}. Have: ${users.length}, Need: 3. Interval exists: ${!!roomIntervals[roomId]}`);
            }
        });

        socket.on("submit-sequence", ({ roomId, userId, cards, position }) => {
            console.log(`User ${userId} submitted sequence:`, cards);
            io.to(roomId).emit("show-cards", { userId: userId, cards: cards, position: position });

            // Mark submission  
            if (roomSubmissions[roomId]) {
                roomSubmissions[roomId][userId] = { submitted: true, cards };
            }

            const result = gameLogics(cards, userId, roomId);
            console.log("Game result:", result);

            // Send result to all players 
            io.to(roomId).emit("hand-winner", result);

            // Send updated game status
            const status = getGameStatus();
            io.to(roomId).emit("game-status", status);
        });

        socket.on("send-message", ({ roomID, message, userName }) => {
            console.log("rom", roomID, "msgf", message, "username", userName);
            io.to(roomID).emit("message", { message: { userName, message } }); // { message, sender: socket.id}
        });

        // New: Get current game status
        socket.on("get-game-status", () => {
            const status = getGameStatus();
            socket.emit("game-status", status);
        });

        // ✅ FIX: SINGLE disconnect handler (removed the duplicate)
        socket.on("disconnect", (reason) => {
            console.log(`❌ DISCONNECT: user ${socket.id} disconnected. Reason: ${reason}`);
            console.log(`User data:`, userData);
            console.log(`Current userLength:`, userLength);
            console.log("playersSockets", playersSockets);

            // ✅ Clean up playersSockets 
            if (userData.userId) {
                delete playersSockets[userData.userId];
                delete playersSockets[userData.socketId];
                console.log(`Removed socket mapping for user ${userData.userId} socketid ${userData.socketId}`);
                console.log("playersSockets", playersSockets);
            }

            // ✅ FIX: Added missing closing parenthesis
            userLength.forEach(element => {
                console.log("userLength ===", element);
            });

            // Remove from userLength 
            const userIndex = userLength.findIndex(uid => playersSockets[uid] === socket.id);


            if (userIndex !== -1) {
                userLength.splice(userIndex, 1);
            }

            // Clean up room intervals
            for (const roomId in waitingRooms) {
                waitingRooms[roomId] = waitingRooms[roomId].filter(uid => playersSockets[uid] !== socket.id);
                if (waitingRooms[roomId].length === 0) {
                    if (roomIntervals[roomId]) {
                        // No need to clear interval since we're using setTimeout now
                        delete roomIntervals[roomId];
                    }
                    delete waitingRooms[roomId];
                }
            }
        });
    });

}

module.exports = { setup17CardGameSocket };