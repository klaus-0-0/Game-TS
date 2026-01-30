import express from "express";
import { createGame, clickTile, cashOut, userdata } from "../games/stakeDiamondGame/diamondGameLogic.js";
import { authMiddleware } from "../middleware/userAuthMiddleware.js";
import { doubleCsrfProtection } from "../middleware/csrf.js";
const router = express.Router();
router.get('/userdata', authMiddleware, doubleCsrfProtection, userdata);
router.post('/create', authMiddleware, doubleCsrfProtection, createGame);
router.post('/click', authMiddleware, doubleCsrfProtection, clickTile);
router.post('/cashout', authMiddleware, doubleCsrfProtection, cashOut);
export default router;
//# sourceMappingURL=diamondGameRoute.js.map