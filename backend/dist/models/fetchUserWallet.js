import { prisma } from "../lib/db.js";
export const getUserWallet = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                wallet: true,
                email: true,
                // other fields you need
            }
        });
        console.log("userwallet = ", user);
        return user?.wallet || 0;
    }
    catch (error) {
        console.error("Error fetching wallet:", error);
        return 0;
    }
};
export const updateUserWallet = async (userId, newBalance) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        return console.log("user not found!");
    const userwalletUpdate = await prisma.user.update({
        where: { id: userId },
        data: { wallet: newBalance }
    });
    console.log("updated wallet", userwalletUpdate);
};
export const updateUserGameHistory = async (userId, gameData) => {
    try {
        const userGameHistory = await prisma.game_Diamond_History.create({
            data: {
                userId: userId,
                gameId: gameData.gameId,
                mines: gameData.mines,
                minesCount: gameData.minesCount,
                stake: gameData.stake,
                clickedTiles: gameData.clickedTiles || [],
                status: gameData.status,
                balance: gameData.balance,
                potentialWin: gameData.potentialWin || 0,
                winAmount: gameData.winAmount || 0,
            }
        });
        console.log("userGameHistory created:", userGameHistory);
        return userGameHistory;
    }
    catch (error) {
        console.error("Error creating game history:", error);
        throw error;
    }
};
//# sourceMappingURL=fetchUserWallet.js.map