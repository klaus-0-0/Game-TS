// socket.server.js
import { Server } from "socket.io";

function createSocketServer(httpServer: any) {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
            credentials: true,
        },
    });

    return io;
}

export { createSocketServer };