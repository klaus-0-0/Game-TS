import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
// Routes
import RegisterRoutes from "./controller/auth.js";
import diamondRoutes from "./controller/diamondGameRoute.js";
import chipsAndBomb from "./controller/chipsAndBombRoute.js";
// Socket setup
// import { setup17CardGameSocket } from "./src/games/17CardGame/cardGameSocket";
import { createSocketServer } from "./socket/socketServer.js";
import { rockPaperScissorSoketSetup } from "./games/rockPaperScissorGame/chipsAndBombSoketSetup.js";
const app = express();
const port = 3000;
// Middleware
app.use(cors({
    origin: ["https://stake-swlk.onrender.com", "http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
// Routes
app.use("/api", RegisterRoutes);
app.use("/api/diamond", diamondRoutes);
app.use("/api/chips-bomb", chipsAndBomb);
// Create HTTP server
const server = http.createServer(app);
// Socket.io setup (optional)
const io = createSocketServer(server);
rockPaperScissorSoketSetup(io);
// setup17CardGameSocket(io); // Only 17CardGame socket logic here
// Basic route
app.post("/", (req, res) => {
    console.log("Received data:", req.body);
    res.json({ message: "Received your data!", receivedData: req.body });
});
// Start server
server.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});
//# sourceMappingURL=main.js.map