import express from "express";
import { userGameData } from "../games/rockPaperScissorGame/rockPaperScissorGameLogic.js";
import { authMiddleware } from "../middleware/userAuthMiddleware.js";
import { doubleCsrfProtection } from "../middleware/csrf.js";
const router = express.Router();
router.post('/userGameData', doubleCsrfProtection, authMiddleware, userGameData);
export default router;
//# sourceMappingURL=chips&BombRoute.js.map