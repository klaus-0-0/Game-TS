import type { Response } from "express";
import { AuthRequest } from "../../middleware/userAuthMiddleware.js";
declare const userdata: (req: AuthRequest, res: Response) => Promise<Response>;
declare const createGame: (req: AuthRequest, res: Response) => Promise<Response | void>;
declare const clickTile: (req: AuthRequest, res: Response) => Promise<Response | void>;
declare const cashOut: (req: AuthRequest, res: Response) => Promise<Response>;
export { createGame, clickTile, cashOut, userdata };
//# sourceMappingURL=diamondGameLogic.d.ts.map