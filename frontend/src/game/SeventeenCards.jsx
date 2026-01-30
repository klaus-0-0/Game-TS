import { useEffect, useState } from "react";
import io from "socket.io-client";
import walk from "../assets/gameLogo/Walk.gif"
import dot from "../assets/gameLogo/Unconfirmed.svg"
import { useNavigate } from "react-router-dom";
// const socket = io("http://localhost:3000");

function JoinRoom() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [incomingMessage, setIncomingMessage] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [dragIndex, setDragIndex] = useState(null);
    const [sequenceConfirmed, setSequenceConfirmed] = useState(false);
    const [userId, setUserId] = useState("");
    const [userName, setUsername] = useState("");
    const [roomID, setRoomId] = useState(null);
    const [role, setRole] = useState(null);
    const [handWinner, setHandwinner] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [status, setStatus] = useState(null);
    const [rounds, setRound] = useState(null);
    const [leftButton, setLeftButton] = useState(false);
    const [isClicked, setIsclicked] = useState(false);
    const [allPlayerPositions, setAllPlayerPositions] = useState({}); // {userId: position}
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showCards, setShowCards] = useState({
        bottom: [],
        right: [],
        left: []
    });


    useEffect(() => {
        console.log("allPlayerPositions", allPlayerPositions);

    }, [allPlayerPositions])

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user-info"));
        setUserId(userData.username + userData.userId);
        setUsername(userData.username)
        // console.log(userId);

        socket.on("joinRoomId", (roomId) => {
            console.log("✅ Received roomId from server:", roomId);
            setRoomId(roomId);
            socket.emit("joinRoom", { roomId, userId });
        });

        socket.on("player-position", (data) => {
            console.log("🎯 Player position received:", data);
            // Store all players' positions
            setAllPlayerPositions(prev => ({
                ...prev,
                position: data.position
            }));
        });

        socket.on("show-cards", (data) => {
            console.log("showcards data = ", data);

            if (data && data.cards && data.userId) {
                const submittedUserId = data.userId;
                const cards = data.cards;
                const position = data.position.position;
                console.log("data ===", data);

                setShowCards({
                    bottom: [],
                    right: [],
                    left: []
                })
                // Get the position for this user
                // const position = allPlayerPositions[submittedUserId];
                console.log(`📊 Assigning ${submittedUserId}'s cards to ${position} position`);

                if (position === "bottom") {
                    setTimeout(() => {
                        setShowCards(prev => ({
                            ...prev,
                            [position]: cards // Replace cards at the correct position
                        }));
                    }, 500);
                } else if (position === "right") {
                    setTimeout(() => {
                        setShowCards(prev => ({
                            ...prev,
                            [position]: cards // Replace cards at the correct position
                        }));
                    }, 1000);

                } else if (position === "left") {
                    setTimeout(() => {
                        setShowCards(prev => ({
                            ...prev,
                            [position]: cards // Replace cards at the correct position
                        }));
                    }, 1500);
                } else {
                    console.log(`❌ No position found for user ${submittedUserId}`);
                }
            }
        });

        socket.on("message", ({ message }) => {
            setIncomingMessage(prev => [...prev, { username: message.userName, message: message.message }]);
        });

        socket.on("SixCards", ({ role, cards, round }) => {
            console.log("🎴 Received cards for role:", role, "Cards count:", cards.length);
            setRole(role);
            setPlayerCards(cards);
            setRound(round);
            setSelectedCards([]);
            setSequenceConfirmed(false);

            setShowCards({
                bottom: [],
                right: [],
                left: []
            })
        });

        socket.on("hand-winner", (data) => {
            console.log("Hand winner data:", data);
            if (data && typeof data === 'object') {
                if (data.result) {
                    setHandwinner(`Winner: ${data.result}`);
                } else {
                    setHandwinner("Round completed");
                }
            } else {
                setHandwinner(data);
            }
        });

        socket.on("game-status", (data) => {
            console.log("Game status received:", data);

            if (data && typeof data === 'object') {
                if (data.points && typeof data.points === 'object') {
                    const pointsString = Object.entries(data.points)
                        .map(([player, points]) => `Player ${player}: ${points}`)
                        .join(' | ');
                    setStatus(`Points: ${pointsString}`);
                } else {
                    setStatus("Game in progress");
                }
            }
        });

        // Listen for game over
        socket.on("game-over", (data) => {
            console.log("🎉 Game Over:", data);
            setHandwinner(`🏆 ${data.winner} WON THE GAME! New game starting in 10 seconds...`);

            setTimeout(() => {
                setSequenceConfirmed(false);
                setSelectedCards([]);
                setHandwinner("");
            }, 10000);
        });

        return () => {
            socket.off("player-position");
            socket.off("message");
            socket.off("SixCards");
            socket.off("joinRoomId");
            socket.off("game-status");
            socket.off("hand-winner");
            socket.off("show-cards");
            socket.off("game-over");
        };
    }, [userId, roomID, allPlayerPositions]);

    useEffect(() => {
        console.log("setshowcards", showCards);


    }, [showCards])

    useEffect(() => {
        socket.on("countdown", ({ timeLeft, round }) => {
            console.log("📨 COUNTDOWN EVENT:", timeLeft, round);
            setCountdown(timeLeft);

            if ((timeLeft === 25 || timeLeft === 20 || timeLeft === 15 || timeLeft === 10 || timeLeft === 5) && !sequenceConfirmed) {
                const cardsToSubmit = playerCards.slice(0, 3);
                console.log("⏰ Auto-submitting:", cardsToSubmit);

                socket.emit("submit-sequence", {
                    roomId: roomID,
                    userId,
                    cards: cardsToSubmit,
                    position: allPlayerPositions
                });
                const remainingCards = playerCards.filter(card =>
                    !cardsToSubmit.includes(card)
                );
                setPlayerCards(remainingCards);
            }
        });

        return () => {
            socket.off("countdown");
        };
    }, [sequenceConfirmed, playerCards, roomID, userId]);

    const toggleCardSelection = (index) => {
        if (sequenceConfirmed) return;

        const card = playerCards[index];
        const isSelected = selectedCards.some(selected =>
            selected.value === card.value && selected.suit === card.suit
        );

        if (isSelected) {
            setSelectedCards(selectedCards.filter(selected =>
                !(selected.value === card.value && selected.suit === card.suit)
            ));
        } else {
            if (selectedCards.length < 3) {
                setSelectedCards([...selectedCards, card]);
            }
        }
    };

    const moveSelectedToLeft = () => {
        if (selectedCards.length === 0) return;

        const selectedSet = new Set(selectedCards.map(card =>
            `${card.value}-${card.suit}`
        ));

        const nonSelectedCards = playerCards.filter(card =>
            !selectedSet.has(`${card.value}-${card.suit}`)
        );

        const newOrder = [...selectedCards, ...nonSelectedCards];
        setPlayerCards(newOrder);
        setSelectedCards([]);
    };

    const handleSubmitCards = () => {
        let cardsToSubmit;

        if (selectedCards.length === 3) {
            cardsToSubmit = selectedCards;
        } else {
            cardsToSubmit = playerCards.slice(0, 3);
        }

        socket.emit("submit-sequence", {
            roomId: roomID,
            userId,
            cards: cardsToSubmit,
        });
        console.log("📤 Submitted cards:", cardsToSubmit);
        setSequenceConfirmed(true);
    };

    const reorder = (fromIndex, toIndex) => {
        if (fromIndex === toIndex) return;
        const updated = [...playerCards];
        const [draggedCard] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, draggedCard);
        setPlayerCards(updated);
    };

    const handleDragStart = (index) => {
        if (sequenceConfirmed) return;
        setDragIndex(index);
    };

    const handleDrop = (index) => {
        if (dragIndex === null || sequenceConfirmed) return;
        reorder(dragIndex, index);
        setDragIndex(null);
    };

    const handleTouchStart = (index) => {
        if (sequenceConfirmed) return;
        setDragIndex(index);
    };

    const handleTouchEnd = (index) => {
        if (dragIndex === null || sequenceConfirmed) return;
        reorder(dragIndex, index);
        setDragIndex(null);
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleReady = () => {
        if (isClicked) return;
        if (!userId) return alert("User ID is missing signup/login again");
        console.log("📩 Sending ready event with userId:", userId);
        socket.emit("ready", { userId });
        setIsclicked(true);
    };

    const handleLeftbutton = () => {
        setLeftButton(prev => !prev)
        return
    }

    const handleMessage = () => {
        socket.emit("send-message", { roomID, message, userName });
        setMessage("");
    }

    // When game finishes or player leaves manually
    const leaveGame = () => {
        setShowConfirmation(true);
    };

    const leaveConfirmed = () => {
        localStorage.removeItem('currentRoom');
        localStorage.removeItem('roomExpiry');
        setRoomId(null);
        navigate("/Home");
    }

    const renderCard = (card, index) => {
        const isSelected = selectedCards.some(selected =>
            selected.value === card.value && selected.suit === card.suit
        );

        return (
            <div
                key={index}
                className={`relative transition-all duration-200 ${isSelected ? 'transform scale-110 -translate-y-2' : ''
                    }`}
                onClick={() => toggleCardSelection(index)}
            >
                <img
                    className={`w-12 lg:w-20 h-auto select-none transition-transform ${!sequenceConfirmed ? "cursor-pointer hover:scale-105" : "opacity-70"
                        } ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}
                    draggable={!sequenceConfirmed}
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                    onTouchStart={() => handleTouchStart(index)}
                    onTouchEnd={() => handleTouchEnd(index)}
                    src={`/src/assets/Deck/${card.value}_of_${card.suit}.svg`}
                    alt={`${card.value} of ${card.suit}`}
                    style={{
                        marginLeft: index === 0 ? '-15px' : '-15px'
                    }}
                />
                {isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full text-xs flex items-center justify-center text-black font-bold">
                        {selectedCards.findIndex(selected =>
                            selected.value === card.value && selected.suit === card.suit
                        ) + 1}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {!roomID ? (
                <div className="min-h-screen bg-gradient-to-br from-blue-800 to-pink-900">
                    {/* Nav Bar */}
                    <nav className="bg-gray-700 shadow-md p-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/Home")}
                                className="bg-gray-600 hover:bg-gray-500 p-2 rounded-lg transition-colors"
                            >
                                ← Back
                            </button>
                            <h1 className="text-2xl font-bold text-gray-100">Waiting Room</h1>
                        </div>
                        <div className="text-sm text-gray-100">
                            Room: <span className="font-semibold">Creating...</span>
                        </div>
                    </nav>

                    {/* Waiting Content */}
                    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                            {isClicked ? (
                                <div className="space-y-2 items-center justify-center">
                                    <div className="flex justify-center">
                                        <img
                                            src={walk}
                                            alt="Waiting"
                                            className="w-24 h-24 animate-pulse"
                                        />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                                        Waiting for Players
                                    </h2>
                                    <p className="text-gray-600 text-lg mb-4 text-center">
                                        Please wait while other players join...
                                    </p>
                                    <div className="flex justify-center">
                                        <img src={dot} className="w-20 h-20" alt="Loading dots" />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                        Ready to Play?
                                    </h2>
                                    <p className="text-gray-600 mb-6">
                                        Click ready to join the game and wait for other players
                                    </p>
                                    <button
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        onClick={handleReady}
                                    >
                                        🎮 Ready to Play
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (

                <div className="h-screen flex flex-col">
                    {/* Top Bar - Room Info and Status */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-yellow-400">
                            <p>Room: {roomID} | Role: {role}</p>
                        </div>
                        <div className="text-sm">
                            {status && <span>{status} | Round: {rounds}</span>}
                        </div>
                    </div>

                    {/* Chat Button & Panel */}
                    <div className="relative flex gap-3">
                        {/* Toggle Button */}
                        <button
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-md"
                            onClick={() => handleLeftbutton()}
                        >
                            Chat
                        </button>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-md"
                            onClick={() => leaveGame()}>
                            leaveGame
                        </button>

                        {/* Chat Panel */}
                        {leftButton && (
                            <div className="fixed inset-0 z-50 flex">
                                {/* Backdrop */}
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-30"
                                    onClick={() => handleLeftbutton()}
                                ></div>

                                {/* Side Panel */}
                                <div className="relative w-80 bg-white shadow-xl ml-4 mt-20 rounded-lg flex flex-col h-3/4">
                                    {/* Header */}
                                    <div className="bg-orange-500 text-white p-4 rounded-t-lg">
                                        <h3 className="font-semibold">Room Chat</h3>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 p-4 overflow-y-auto space-y-2">
                                        {incomingMessage.map((value, index) => (
                                            <div key={index} className="text-black bg-gray-100 rounded-lg p-3">
                                                <p className="text-gray-800">{value.username}: {value.message}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 border-t border-gray-200">
                                        <div className="flex gap-2">
                                            <input
                                                className="flex-1 border text-black border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                type="text"
                                                placeholder="Type a message..."
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                            <button
                                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                                                onClick={() => handleMessage()}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Game Area */}
                    <div className="flex-1 grid grid-cols-3 gap-4">
                        {/* Left Player Area */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-center mb-2">
                                <div className="text-gray-400">Player Left</div>
                                <div className="flex">
                                    {[1, 2, 3].map((_, index) => (
                                        <img
                                            key={index}
                                            className="w-10 h-auto"
                                            src={`/src/assets/Deck/cardBack.png`}
                                            alt="Card Back"
                                            style={{
                                                marginLeft: index === 0 ? '0' : '-8px'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Center Table */}
                        <div className=" flex flex-col items-center justify-center">
                            <div className="bg-green-950 p-4 md:p-8 rounded-xl text-center w-[800px] md:w-[1000px] lg:w-[1200px] relative min-h-48 md:min-h-64" style={{ width: '600px' }}>

                                {/* Hand Winner Display */}
                                {handWinner && (
                                    <div className="mt-4 text-yellow-300 font-bold text-lg">
                                        {handWinner}
                                    </div>
                                )}

                                {/* Left Player Cards - Positioned for left player sitting */}
                                <div className="absolute -left-8 md:-left-12 top-1/2 transform -translate-y-1/2">
                                    <div className="relative h-16 md:h-20 w-32 md:w-40">
                                        {showCards.left.map((card, index) => (
                                            <img
                                                key={index}
                                                className="absolute w-10 md:w-12 h-auto transition-all duration-300"
                                                src={`/src/assets/Deck/${card.value}_of_${card.suit}.svg`}
                                                alt={`${card.value} of ${card.suit}`}
                                                style={{
                                                    right: `${index * 15}px`,
                                                    zIndex: showCards.left.length - index
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {showConfirmation && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-auto">
                                            <div className="text-center mb-6">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Action</h3>
                                                <p className="text-gray-600">Are you sure you want to proceed?</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-300 hover:shadow-sm"
                                                    onClick={() => setShowConfirmation(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                                                    onClick={() => leaveConfirmed()}
                                                >
                                                    Confirm
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Center/Bottom Player Cards - Positioned for bottom player sitting */}
                                <div className="absolute bottom-2 md:bottom-4 right-6 left-1/2 transform -translate-x-1/2">
                                    <div className="relative h-16 md:h-20 w-36 md:w-48">
                                        {showCards.bottom.map((card, index) => (
                                            <img
                                                key={index}
                                                className="absolute w-10 md:w-12 h-auto transition-all duration-300"
                                                src={`/src/assets/Deck/${card.value}_of_${card.suit}.svg`}
                                                alt={`${card.value} of ${card.suit}`}
                                                style={{
                                                    right: `${index * 15}px`,
                                                    zIndex: showCards.bottom.length - index
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Right Player Cards - Positioned for right player sitting */}
                                <div className="absolute -right-8 md:right-7 top-1/2 transform -translate-y-1/2">
                                    <div className="relative h-16 md:h-20 w-32 md:w-40">
                                        {showCards.right.map((card, index) => (
                                            <img
                                                key={index}
                                                className="absolute w-10 md:w-12 h-auto transition-all duration-300"
                                                src={`/src/assets/Deck/${card.value}_of_${card.suit}.svg`}
                                                alt={`${card.value} of ${card.suit}`}
                                                style={{
                                                    right: `${index * 15}px`,
                                                    zIndex: showCards.right.length - index
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Player Position Labels */}
                            {/* <div className="absolute -left-16 md:-left-20 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                                Player Left
                            </div>
                            <div className="absolute -right-16 md:-right-20 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                                Player Right
                            </div>
                            <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-8 text-gray-400 text-sm">
                                You (Player {role})
                            </div> */}
                        </div>

                        {/* Right Player Area */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-center mb-2">
                                <div className="text-gray-400">Player Right</div>
                                <div className="flex">
                                    {[1, 2, 3].map((_, index) => (
                                        <img
                                            key={index}
                                            className="w-10 h-auto"
                                            src={`/src/assets/Deck/cardBack.png`}
                                            alt="Card Back"
                                            style={{
                                                marginLeft: index === 0 ? '0' : '-8px'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Area - Current Player */}
                    <div className="mt-4">
                        {/* Player's Cards */}
                        <div className="text-center text-yellow-400 mb-2">
                            Your Cards ({playerCards.length}) - Click to select 3 cards
                        </div>
                        <div className="flex justify-center mb-4">
                            <div className="flex">
                                {playerCards.map((card, index) => renderCard(card, index))}
                            </div>
                        </div>

                        {/* Selection Info and Actions */}
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">
                                {selectedCards.length}/3 cards selected
                                {selectedCards.length === 3 && " - Ready to submit!"}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={moveSelectedToLeft}
                                    disabled={sequenceConfirmed || selectedCards.length === 0}
                                    className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-sm"
                                >
                                    Move to Left
                                </button>

                                <button
                                    onClick={handleSubmitCards}
                                    disabled={sequenceConfirmed}
                                    className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed font-semibold text-sm"
                                >
                                    Submit Cards
                                </button>
                            </div>
                        </div>

                        {/* Auto-submit Info */}
                        <div className="text-xs text-gray-400 text-center mt-2">
                            {!sequenceConfirmed && "Will auto-submit first 3 cards if none selected"}
                        </div>

                        {sequenceConfirmed && (
                            <div className="text-center text-green-400 font-semibold mt-2">
                                ✅ Cards submitted! Waiting for other players...
                            </div>
                        )}
                    </div>

                    {/* Countdown Timer */}
                    {countdown > 0 && (
                        <div className="fixed top-10     right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-xl font-bold">
                            ⏰ {countdown}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default JoinRoom;