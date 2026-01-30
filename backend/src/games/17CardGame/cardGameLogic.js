// gamelogic.js
function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    const deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function dealSixCards() {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    return shuffled.slice(0, 51);
}

// ---- Global game state ----
const users = [];
const playerData = {};
const playerCard = [];
const playerPoints = {}; // Track points for each player
const gameRounds = {}; // Track rounds per game
let fullReset = false;
let isGameOver = false;

function gameLogics(cards, userId) {
    let finalResult = null;

    // Initialize player points and game rounds
    if (!playerPoints[userId]) playerPoints[userId] = 0;
    if (!gameRounds[userId]) gameRounds[userId] = 0;

    // Add user and store their cards
    if (!users.includes(userId)) users.push(userId);

    const cardRank = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
        'Jack': 11, 'Queen': 12, 'King': 13, 'Ace': 14
    };

    const values = cards.map(card => card.value);
    const color = cards.map(card => card.suit);
    const ranks = values.map(val => cardRank[val]);
    playerData[userId] = { values, color, ranks };
    console.log("playerdata", playerData);

    const isHigh = true;
    const isPair = ranks[0] === ranks[1] || ranks[1] === ranks[2] || ranks[0] === ranks[2];
    const isColor = color[0] === color[1] && color[1] === color[2];
    const isSequence = ranks[0] + 1 === ranks[1] && ranks[1] === ranks[2] - 1;
    const isPureSequence = isColor && isSequence;
    const isTrio = ranks[0] === ranks[1] && ranks[1] === ranks[2];

    const RankString = JSON.stringify(ranks);

    // Special hand cases
    switch (RankString) {
        case "[14,13,12]":
            finalResult = isColor ? "PURE_TOP" : "TOP";
            break;
        case "[13,12,11]":
            finalResult = isColor ? "PURE_KQJ" : "KQJ";
            break;
        case "[14,2,3]":
            finalResult = isColor ? "PURE_A23" : "A23";
            break;
        default:
            break;
    }

    // Push player hand into playerCard
    function playerCardPush() {
        if (isTrio) return playerCard.push({ card: "isTrio", rank: 6, userId, cardRank: ranks });
        if (isPureSequence) return playerCard.push({ card: "isPureSequence", rank: 5, userId, cardRank: ranks });
        if (isSequence) return playerCard.push({ card: "isSequence", rank: 4, userId, cardRank: ranks });
        if (isColor) return playerCard.push({ card: "isColor", rank: 3, userId, cardRank: ranks });
        if (isPair) return playerCard.push({ card: "isPair", rank: 2, userId, cardRank: ranks });
        if (isHigh) return playerCard.push({ card: "isHigh", rank: 1, userId, cardRank: ranks });
    }

    playerCardPush();

    function getStraightRank(arr) {
        const sorted = [...arr].sort((a, b) => b - a);
        if (JSON.stringify(sorted) === JSON.stringify([14, 13, 12])) return 100;
        if (sorted.includes(14) && sorted.includes(2) && sorted.includes(3)) return 99;
        return sorted[0];
    }

    function compareTwoPlayers(p1, p2) {
        const scoreA = p1.rank;
        const scoreB = p2.rank;

        console.log("p1.card", p1.cardRank);
        console.log("p2.card", p2.cardRank);

        if (scoreA > scoreB) return p1.userId;
        if (scoreB > scoreA) return p2.userId;

        // Compare pairs if needed
        if (p1.card === "isPair" && p2.card === "isPair") {
            const ranksA = playerData[p1.userId].ranks;
            const ranksB = playerData[p2.userId].ranks;

            function getPairWithKicker(ranks) {
                if (ranks[0] === ranks[1]) return { pair: ranks[0], kicker: ranks[2] };
                if (ranks[0] === ranks[2]) return { pair: ranks[0], kicker: ranks[1] };
                if (ranks[1] === ranks[2]) return { pair: ranks[1], kicker: ranks[0] };
                return null;
            }

            const a = getPairWithKicker(ranksA);
            const b = getPairWithKicker(ranksB);
            if (a.pair > b.pair) return p1.userId;
            if (b.pair > a.pair) return p2.userId;
            if (a.kicker > b.kicker) return p1.userId;
            if (b.kicker > a.kicker) return p2.userId;
            return "DRAW";
        }

        // Straight/high card logic
        const topA = [...playerData[p1.userId].ranks].sort((a, b) => b - a);
        const topB = [...playerData[p2.userId].ranks].sort((a, b) => b - a);

        if (p1.card === "isSequence" || p1.card === "isPureSequence") {
            const rank1 = getStraightRank(topA);
            const rank2 = getStraightRank(topB);
            if (rank1 > rank2) return p1.userId;
            if (rank2 > rank1) return p2.userId;
        }

        // High card compare
        for (let i = 0; i < 3; i++) {
            if (topA[i] > topB[i]) return p1.userId;
            if (topB[i] > topA[i]) return p2.userId;
        }

        return "DRAW";
    }

    function checkWinner() {
        if (playerCard.length < 3) return null;

        const [p1, p2, p3] = playerCard;

        // First round: Compare Player 1 vs Player 2
        const round1Winner = compareTwoPlayers(p1, p2);
        console.log("Round 1 Winner:", round1Winner);

        // Second round: Winner of round 1 vs Player 3
        let finalWinner;
        if (round1Winner === "DRAW") {
            // If first round was draw, compare all three
            const allPlayers = [p1, p2, p3];
            const sortedPlayers = allPlayers.sort((a, b) => {
                const result = compareTwoPlayers(a, b);
                return result === a.userId ? -1 : 1;
            });
            finalWinner = sortedPlayers[0].userId;
        } else {
            const winnerPlayer = round1Winner === p1.userId ? p1 : p2;
            finalWinner = compareTwoPlayers(winnerPlayer, p3);
            if (finalWinner === "DRAW") finalWinner = round1Winner;
        }

        console.log("Final Winner:", finalWinner);

        // Update points for the winner
        if (finalWinner && finalWinner !== "DRAW") {
            playerPoints[finalWinner]++;
            console.log("ppoint", playerPoints);

            gameRounds[finalWinner]++;
            console.log("gameRound", gameRounds);


            // Check if any player reached 15 points
            if (playerPoints[finalWinner] >= 15) {
                finalResult = `🎉 ${finalWinner} WINS THE GAME with ${playerPoints[finalWinner]} points! 🏆`
                isGameOver = true;
                // Reset game completely
                resetGameData(true);
            } else {
                finalResult = `🏆 ${finalWinner} wins this round! Points: ${playerPoints[finalWinner]}/15`;
                // Reset only round data
                resetGameData(false);
            }
        } else {
            finalResult = "🤝 This round is a DRAW!";
            resetGameData(false);
        }

        return {
            result: finalResult,
            isGameOver: isGameOver
        };
    }

    // If no special hand result yet, check winner
    if (!finalResult) finalResult = checkWinner();

    // Return current status if waiting for more players
    if (!finalResult) {
        return `Waiting for ${3 - users.length} more players... Current points: ${JSON.stringify(playerPoints)}`;
    }

    return finalResult;
}

function resetGameData(fullReset) {
    users.length = 0;
    playerCard.length = 0;
    Object.keys(playerData).forEach(k => delete playerData[k]);

    if (fullReset) {
        // Full game reset
        Object.keys(playerPoints).forEach(k => delete playerPoints[k]);
        Object.keys(gameRounds).forEach(k => delete gameRounds[k]);
        console.log("🔄 Full game reset - new game started!");
    } else {
        console.log("🔄 Round reset - ready for next round");
    }
}

// Function to get current game status
function getGameStatus() {
    return {
        points: playerPoints,
        rounds: gameRounds,
        gameWinner: isGameOver,
        waitingFor: 3 - users.length,
        totalPlayers: users.length
    };
}

module.exports = { dealSixCards, gameLogics, getGameStatus };