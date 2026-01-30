export declare const getUserWallet: (userId: string) => Promise<number>;
export declare const updateUserWallet: (userId: string, newBalance: number) => Promise<void>;
export declare const updateUserGameHistory: (userId: string, gameData: any) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    gameId: string;
    mines: number[];
    minesCount: number;
    stake: number;
    clickedTiles: number[];
    status: import("../generated/prisma/enums.js").GameStatus;
    balance: number;
    potentialWin: number;
    winAmount: number;
}>;
//# sourceMappingURL=diamondGameDB.d.ts.map