import type { Response } from "express";
import { AuthRequest } from "../../middleware/userAuthMiddleware.js";
interface GameData {
    playerid: string;
    gameId: string;
    myTiles: [];
    oponentTiles: [];
    selectBomb: [];
    currentTurn: string;
    stake: number;
    status: "active" | "LOST" | "WON" | "CASHED_OUT";
    balance: number;
    finalAmount: number;
}
declare const saveGameToRedis: (gameId: string, gameData: GameData) => Promise<void>;
declare const getGameFromRedis: (gameId: string) => Promise<GameData | null>;
declare const deleteGameFromRedis: (gameId: string) => Promise<void>;
declare const getUserAccount: (req: AuthRequest, res: Response) => Promise<Response>;
declare const userGameData: (req: AuthRequest, res: Response) => Promise<Response>;
declare const fetchGameData: (req: AuthRequest, res: Response) => Promise<Response>;
export { getUserAccount, userGameData, fetchGameData, saveGameToRedis, getGameFromRedis, deleteGameFromRedis };
//# sourceMappingURL=rockPaperScissorGameLogic.d.ts.map