import express from "express";
import { getUserAccount } from "../games/rockPaperScissorGame/chipsAndBombGameLogic.js";
import { userGameData } from "../games/rockPaperScissorGame/chipsAndBombGameLogic.js";
import { fetchGameData } from "../games/rockPaperScissorGame/chipsAndBombGameLogic.js";
import { authMiddleware } from "../middleware/userAuthMiddleware.js";
import { doubleCsrfProtection } from "../middleware/csrf.js";

const router = express.Router();

router.get('/get-userAccount', authMiddleware, getUserAccount);
router.get('/get-gamedata', authMiddleware, fetchGameData);
router.post('/post-gamedata', doubleCsrfProtection, authMiddleware, userGameData);

export default router;   