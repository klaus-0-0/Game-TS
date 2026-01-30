import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
// Routes
import RegisterRoutes from "./controller/auth.js";
import diamondRoutes from "./controller/diamondGameRoute.js";
// Socket setup
// import { createSocketServer } from "./src/socket/socketServer";
// import { setup17CardGameSocket } from "./src/games/17CardGame/cardGameSocket";
const app = express();
const port = 3000;
// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
// Routes
app.use("/api", RegisterRoutes);
app.use("/api/diamond", diamondRoutes);
// Create HTTP server
const server = http.createServer(app);
// Socket.io setup (optional)
// const io = createSocketServer(server);
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