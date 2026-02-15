import bombImg from "../../assets/chipandBomb/bomb.png"
import chipsImg from "../../assets/chipandBomb/chips.png"
import bombSound from "../../assets/chipandBomb/bombSound.mp3"
import chipsSound from "../../assets/chipandBomb/chipSound.mp3"
import tossSound from "../../assets/chipandBomb/tossSound.mp3"
import coin from "../../assets/chipandBomb/coin.png"
import selectSound from "../../assets/chipandBomb/select.mp3"
import { motion } from "framer-motion";

import axios, { type AxiosResponse, AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import config from "../../config";

const socket = io("https://game-backend-dr99.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});



interface CsrfTokenResponse {
    csrfToken: string;
}
interface ApiErrorResponse {
    message?: string;
    error?: string;
}
interface Tile {
    opened: boolean;
    tile: "chips" | "bomb" | null;
}
interface SaveGameData {
    gameId: string;
}


function ChipsAndBomb() {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [bomb, setBomb] = useState<Tile[]>(Array.from({ length: 9 }, () => ({ opened: false, tile: null })));
    const [myTiles, setMyTiles] = useState<Tile[]>(Array.from({ length: 9 }, () => ({ opened: false, tile: null })));
    const [oponentTiles, setOponentTiles] = useState<Tile[]>(Array.from({ length: 9 }, () => ({ opened: false, tile: null })));

    const [stake, setStake] = useState<number>();
    const [wallet, setWallet] = useState<number>(0);
    const [winning, setWinning] = useState<number>(0);

    const [waitingRoom, setWaitingRoom] = useState<boolean>(false);
    const [searchPlayer, setSearchPlayer] = useState<boolean>(false);
    const [gameStart, setGameStart] = useState<boolean>(false);

    const [csrfToken, setCsrfToken] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");
    const [oponentBombTile, setOponentBombTile] = useState<number[]>([]);

    const [userName, setUserName] = useState<string>("");
    const [tosswon, setTosswon] = useState<string>('');
    const [showCoin, setShowCoin] = useState<boolean>(false);

    const [selectBomb, setSelectBomb] = useState<number[]>([]);
    const [turn, setTurn] = useState<string>("");
    const [currentTurn, setCurrentTurn] = useState<string>("");
    const isMyTurn = currentTurn === userId;
    // console.log("isMyTurn", isMyTurn);

    const [life, setLife] = useState<number>(3);
    const [gameStatus, setGameStatus] = useState<string>("");
    const [gameActive, setGameActive] = useState<boolean>(false);
    const [isResetting, setIsResetting] = useState<boolean>(false);


    const [error, setError] = useState<string>("");
    const [winOrLoose, setWinOrLoose] = useState<string>("");
    const showPlayAgain = gameActive || winOrLoose !== "";

    const matchFound = !!roomId;  // First ! → converts to boolean + flips Second ! → flips back
    const chipsAudio = useRef<HTMLAudioElement | null>(null);
    const bombAudio = useRef<HTMLAudioElement | null>(null);
    const tossAudio = useRef<HTMLAudioElement | null>(null);
    const clickAudio = useRef<HTMLAudioElement | null>(null);

    // fetch user csrf token
    useEffect(() => {
        const fetchCsrfToken = async (): Promise<void> => {
            try {
                const res: AxiosResponse<CsrfTokenResponse> = await axios.get(
                    `${config.apiUrl}/csrf-token`,
                    {
                        withCredentials: true
                    }
                );
                const token = res.data.csrfToken;
                setCsrfToken(token);
                // console.log("csrfTokensss = ", token);
            } catch (error) {
                const err = error as AxiosError<ApiErrorResponse>;
                console.error("Failed to fetch CSRF token:", err.message);
                setError("Failed to initialize security. Please refresh the page.");
            }
        };

        fetchCsrfToken();
    }, []);

    // just for mounting components
    useEffect(() => {
        if (selectBomb.length !== 3) return;
        // console.log("select");

        socket.emit("Send-Tiles", roomId, selectBomb);
    }, [selectBomb, oponentTiles]);


    // LOAD USER
    useEffect(() => {
        const userdata = () => {
            const stored = localStorage.getItem("userData");
            if (!stored) return;
            const res = JSON.parse(stored);
            setUserId(res.id);
            setUserName(res.username);
        };

        userdata();
        chipsAudio.current = new Audio(chipsSound);
        bombAudio.current = new Audio(bombSound);
        tossAudio.current = new Audio(tossSound);
        clickAudio.current = new Audio(selectSound);

        // Cleanup
        return () => {
            chipsAudio.current = null;
            bombAudio.current = null;
        };
    }, []);

    // GET GAME FROM REDIS
    useEffect(() => {
        const getGameDataFrom_redis = async () => {
            try {
                const res = await axios.get(`${config.apiUrl}/chips-bomb/get-gamedata`, {
                    withCredentials: true
                })
                // console.log("get game data:", res);

                if (res.data.gameData) {
                    setRoomId(res.data.gameData.gameId);
                    setMyTiles(res.data.gameData.myTiles);
                    setOponentTiles(res.data.gameData.oponentTiles);
                    setCurrentTurn(res.data.gameData.currentTurn);
                    setStake(res.data.gameData.stake);
                    setSelectBomb(res.data.gameData.selectBomb);

                    if (res.data.gameData) {
                        setWaitingRoom(true);
                        setGameStart(true);
                    }
                }
            }
            catch (error) {
                const err = error as AxiosError<{ message?: string }>
                console.error("failed to fetch gamedata", err);
            }
        };

        getGameDataFrom_redis()
    }, [userId]);

    // SOCKET LISTENERS (ONLY ONCE)
    useEffect(() => {
        socket.on("RoomId", (roomid: string) => {
            // console.log("roomid:", roomid);
            setRoomId(roomid);
        });

        // socket.on("player-joined", (userId) => {
        //     // console.log("player joined:", userId);
        // });

        socket.on("Get-Tiles", (bombTiles) => {
            setOponentBombTile(bombTiles);
        });

        socket.on("live-data-receive", (data) => {
            // console.log("data =", data);
            setOponentTiles(data);
        });

        socket.on("turn-update", (turnUserId: string) => {
            setCurrentTurn(turnUserId);
        });

        socket.on("invalid-move", msg => {
            console.warn(msg);
        });
        
        socket.on("game-status", (winOrLoose) => {
            setWinOrLoose(winOrLoose);
            setGameActive(true);
            // console.log("winorloose", winOrLoose);

        });

        return () => {
            socket.off("RoomId");
            socket.off("player-joined");
            socket.off("Get-Tiles");
            socket.off("live-data-receive");
            socket.off("turn-update");
            socket.off("invalid-move");
        };
    }, []);

useEffect(() => {
  if (!roomId || !userId || !currentTurn) return; 
  socket.emit("player-move", {
    roomId,
    userId,
    currentTurn,
  });
}, [roomId, userId, currentTurn]);

    useEffect(() => {
        socket.on("toss-result", (firstPlayer) => {
            if (firstPlayer === userId) {
                // console.log("you play first: ", firstPlayer);
                setTurn(firstPlayer);
                setCurrentTurn(firstPlayer);
            } else {
                // console.log("oponent play first: ", firstPlayer);
                setTurn(firstPlayer);
            }
        })
        return () => {
            socket.off("toss-result");
        };
    }, [userId])

    // JOIN GAME WHEN ROOM ID EXISTS
    useEffect(() => {
        socket.emit("player-move", {
            roomId,
            userId,
            currentTurn: currentTurn
        });
        if (!roomId) return;
        setSearchPlayer(false);
        socket.emit("join-game", { userId, roomId });
        const timer = setTimeout(() => {
            setWaitingRoom(true);
        }, 0);

        return () => {
            clearTimeout(timer);
            socket.off("game-status");
        };
    }, [roomId]);

    // SEND LIVE DATA WHEN MY BOMB CHANGES
    useEffect(() => {
        if (!roomId) return;
        socket.emit("live-data-send", { roomId, myTiles, userId });
    }, [myTiles]);

    const select_Bomb_For_Oponent = (bomb: number) => {
        if (selectBomb.length === 3) return;
        if (selectBomb.includes(bomb)) {
            // console.log("already bomb present", bomb);
            return;
        }
        setSelectBomb([...selectBomb, bomb]);  //  Use setState
        if (clickAudio.current) {
            clickAudio.current.currentTime = 0;
            clickAudio.current.play().catch(e => console.error("Audio play failed:", e));
        }
        // ✅ FIX: mark bomb tile as opened
        setBomb(prev =>
            prev.map((tile, i) =>
                i === bomb
                    ? { opened: true, tile: "bomb" }
                    : tile
            )
        );
        // console.log("bomb: ", bomb);
    };

    // GET USER ACCOUNT DETAILS (WALLET)
    const getUserAccount = async () => {
        try {
            const res = await axios.get(`${config.apiUrl}/chips-bomb/get-userAccount`, {
                withCredentials: true
            })
            // console.log("res = ", res);
            setWallet(res.data.wallet);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.error("failed to get user wallet data", err);
            setError("failed to get user wallet data");
        }
    }

    useEffect(() => {
        getUserAccount();
    }, [])

    const send_bomb_Tiles_To_Oponent = () => {
        setGameActive(false);
        if (selectBomb.length < 3) return;
        // console.log("click", selectBomb);
        socket.emit("Send-Tiles", roomId, selectBomb);
        setStake(100);
        setWallet(wallet - 100);
        setGameStart(true);
        if (tossAudio.current) {
            tossAudio.current.currentTime = 0;
            tossAudio.current.play().catch(e => console.error("Audio play failed:", e));
        }
    };

    useEffect(() => {
        setWinning(stake! * 1.9);
    }, [stake]);

    const handlemyTiles = (idx: number) => {
        if (!isMyTurn) return;
        if (chipsAudio.current) {
            chipsAudio.current.currentTime = 0;
            chipsAudio.current.play().catch(e => console.error("Audio play failed:", e));
        }
        const isBomb = oponentBombTile.includes(idx);
        setMyTiles(prev =>
            prev.map((tile, index) =>
                index === idx
                    ? { opened: true, tile: isBomb ? "bomb" : "chips" }
                    : tile
            )
        );
        if (isBomb) {
            if (bombAudio.current) {
                bombAudio.current.currentTime = 0;
                bombAudio.current.play().catch(e => console.error("Audio play failed:", e));
            }
            setLife(pre => pre - 1);
        }

        socket.emit("player-move", {
            roomId,
            userId,
            currentTurn: currentTurn
        });
    };

    const handleReady = () => {
         if (!userId) return;
        setSearchPlayer(true);
        socket.emit("Ready", userId);
        return socket.off("Ready");
    };
    //finalaccount
    const saveGameDataTo_Redis = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const res: AxiosResponse<SaveGameData> = await axios.post(`${config.apiUrl}/chips-bomb/post-gamedata`,
                {
                    myTiles, selectBomb: selectBomb, roomId, currentTurn, stake, status: gameStatus, finalAmount: winning
                },
                {
                    headers: {
                        "x-csrf-token": csrfToken,
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                },
            )
            // console.log("res: ", res);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            console.error("failsed to save gamedata", err);
        }
    }
    useEffect(() => {
        if (!isMyTurn) return;
        if (isResetting) return;
        saveGameDataTo_Redis();
    }, [myTiles]);

    useEffect(() => {
        if (!waitingRoom) return;

        setShowCoin(true);

        const timer = setTimeout(() => {
            setShowCoin(false);

            if (turn === userId) {
                setTosswon("You won the toss 🪙you play first");
                setTimeout(() => {
                    setTosswon("");
                }, 2000);
            } else {
                setTosswon("You lost the toss 😞oponent plays first");
                setTimeout(() => {
                    setTosswon("");
                }, 2000);
            }
        }, 4000); // after coin animation

        return () => clearTimeout(timer);
    }, [waitingRoom, turn, userId]);

    useEffect(() => {
        if (life <= 0) {
            setGameActive(true);
            setGameStatus("LOST");
            setWinOrLoose("");
        }
    }, [life]);

    const handlePlayAgn = () => {
        setIsResetting(true);

        const emptyGrid = () => Array.from({ length: 9 }, () => ({ opened: false, tile: null }));
        setBomb(prev => prev.map((tile, i) =>
            i ? { opened: false, tile: null } : tile));

        setMyTiles(emptyGrid());
        setOponentTiles(emptyGrid());
        setOponentBombTile([]);
        setSelectBomb([]);

        setLife(3);
        setError("");
        setGameStart(false);
        setGameActive(false);
        setWinOrLoose("");
        getUserAccount();
        setWinning(0);
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-950 to-gray-900 flex flex-col items-center p-4">
            <nav className="w-full bg-linear-to-r from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg mb-6">
                <div className="flex sm:flex-row justify-between items-center gap-4">
                    <div className="text-center sm:text-left">
                        <h2 className="text-lg font-semibold text-gray-300">Wallet Balance</h2>
                        <p className="text-3xl font-bold text-white">${Number(wallet).toFixed(2)}</p>
                    </div>
                    <div className="text-center sm:text-right">
                        <h2 className="text-lg font-semibold text-gray-300">Potential Win</h2>
                        <p className="text-3xl font-bold text-green-400">${Number(winning).toFixed(2)}</p>
                    </div>
                </div>
            </nav>

            {waitingRoom ? (
                gameStart ? (
                    <div>
                        <p className="text-white text-lg text-center mb-2">
                            {!winOrLoose ? (isMyTurn ? "🟢 Your turn" : "⏳ Opponent's turn plz wait...!") : ""}
                        </p>
                        <p className="text-red-500 text-2xl font-bold flex items-center justify-center">{error}</p>
                        <p className="text-green-500 text-2xl font-bold flex items-center justify-center">{winOrLoose === "you win" ? `${userName}: ${winOrLoose}` : ""}</p>
                        <p className="text-red-500 text-2xl font-bold flex items-center justify-center">{winOrLoose === "you lose" ? `${userName}: ${winOrLoose}` : ""}</p>
                        <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gray-900/50 rounded-2xl">
                            {oponentTiles && oponentTiles.length > 0 ? (
                                oponentTiles.map((val, idx) => (
                                    <button key={idx}
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 
                                            ${val.opened
                                                ? val.tile === "bomb"
                                                    ? "bg-red-500/20 border-2 border-red-500"
                                                    : "bg-green-500/20 border-2 border-green-500"
                                                : "bg-gray-800 border-2 border-gray-700 hover:border-blue-400"
                                            }`}
                                    >
                                        {val.opened ? (
                                            <img
                                                src={val.tile === "bomb" ? bombImg : chipsImg}
                                                className="w-full h-full rounded-lg object-cover"
                                                alt={val.tile === "bomb" ? "bomb" : "chips"}
                                            />
                                        ) : (
                                            <span className="text-gray-400 text-lg font-bold">?</span>
                                        )}
                                    </button>
                                ))

                            ) :
                                <div className="col-span-3 flex flex-col items-center justify-center py-12">
                                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <div className="text-gray-400 text-sm">Loading opponent tiles...</div>
                                </div>
                            }

                        </div>
                        <div className="flex items-center justify-center">
                            {showCoin && (
                                <motion.img
                                    src={coin}
                                    className="w-50"
                                    initial={{ rotateY: 0, y: 0 }}
                                    animate={{ rotateY: 1080, y: -120 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            )}

                            <div className="h-12 flex items-center justify-center">
                                <p
                                    className={` text-amber-500 text-xl font-bold transition-all duration-700 ease-in-out
                                  ${!showCoin && tosswon
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-2 pointer-events-none"}`}
                                >
                                    {tosswon}
                                </p>
                            </div>


                        </div>
                        {/* my tiles */}
                        <p className="text-white flex items-center justify-center">VS</p>
                        <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gray-900/50 rounded-2xl">
                            {myTiles.map((val, idx) => (
                                <button key={idx} disabled={!isMyTurn || val.opened || gameActive} onClick={() => handlemyTiles(idx)}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105
                             ${val.opened
                                            ? val.tile === "bomb"
                                                ? "bg-red-500/20 border-2 border-red-500"
                                                : "bg-green-500/20 border-2 border-green-500"
                                            : "bg-gray-800 border-2 border-gray-700 hover:border-blue-400"
                                        }`}
                                >
                                    {val.opened ? (
                                        <img
                                            src={val.tile === "bomb" ? bombImg : chipsImg}
                                            className="w-full h-full rounded-lg object-cover"
                                            alt={val.tile === "bomb" ? "bomb" : "chips"}
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-lg font-bold">?</span>
                                    )}
                                </button>
                            ))}

                        </div>
                        <div>
                            {"❤️".repeat(life)}
                        </div>
                    </div>

                ) : (
                    <div>
                        {/* select bomb for oponent */}
                        <p className="text-gray-500 font-bold text-xl mb-5">select 3 bombs for the oponent</p>
                        <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gray-900/50 rounded-2xl">
                            {bomb.map((val, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => select_Bomb_For_Oponent(idx)}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105
                                        ${val.opened
                                            ? "bg-red-500/20 border-2 border-red-500"
                                            : "bg-gray-800 border-2 border-gray-700 hover:border-blue-400"
                                        }`}
                                >
                                    {val.opened && (
                                        <img
                                            src={bombImg}
                                            className="w-full h-full rounded-lg object-cover"
                                            alt="bomb"
                                        />
                                    )}
                                </button>
                            ))}

                        </div>
                        <div className="flex items-center justify-center ">
                            <button onClick={() => send_bomb_Tiles_To_Oponent()} className="mt-8 px-12 py-4 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-lg transform transition hover:scale-105 active:scale-95">Next</button>
                        </div>
                    </div>
                )

            ) : (
                <div className="flex flex-col items-center justify-center min-h-100 w-full max-w-md mx-auto p-6">
                    {/* Player cards */}
                    <div className="flex justify-between w-full mb-8">
                        {/* You */}
                        <div className={`w-32 h-32 rounded-2xl bg-linear-to-br from-cyan-400 to-cyan-900 shadow-lg flex items-center justify-center ${searchPlayer ? 'animate-bounce' : ''}`}>
                            {searchPlayer ? (
                                <div className="text-center">
                                    <div className="text-3xl mb-1">🔍</div>
                                    <p className="text-white text-sm font-medium">Searching...</p>
                                </div>
                            ) : (
                                <span className="text-3xl">👤</span>
                            )}
                        </div>

                        {/* VS */}
                        <div className="flex items-center">
                            {matchFound ? (
                                <span className="text-2xl font-bold text-green-400 animate-bounce">✓</span>
                            ) : (
                                <span className="text-3xl font-black text-gray-400">VS</span>
                            )}
                        </div>

                        {/* Opponent */}
                        <div className="w-32 h-32 rounded-2xl bg-linear-to-br from-gray-600 to-gray-800 shadow-lg flex items-center justify-center">
                            <span className="text-3xl">👤</span>
                        </div>
                    </div>

                    {/* Ready button */}
                    <button
                        onClick={handleReady}
                        className="mt-8 px-12 py-4 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-lg transform transition hover:scale-105 active:scale-95"
                    >
                        READY
                    </button>
                </div>
            )}
            <div>
                {showPlayAgain && (
                    <button className="mt-8 px-12 py-4 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-lg transform transition hover:scale-105 active:scale-95"
                        onClick={() => handlePlayAgn()}>playagain</button>

                )}
            </div>
        </div>
    );
}

export default ChipsAndBomb;
