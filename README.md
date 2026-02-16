🎮 casino – Multiplayer Turn-Based Games more games will be includeed later for now 2 finished 2 unser progress had 
worked more in backed as have to make it safe so more focus was on security
as it works with demo cash people can stake money and how it will be precess safily.

A real-time multiplayer turn-based game built with React, Socket.IO, Node.js, and Redis.
Players join a room, a coin toss decides who goes first, and each turn can change the fate of the game 💣💎

Game_ON
LIVE-Link = https://stake-swlk.onrender.com

✨ Features
🧑‍🤝‍🧑 Real-time Multiplayer
🎲 Fair Coin Toss to decide first turn
🔁 Turn-based Gameplay
💣 Bomb vs Chips Logic
❤️ Life System
🔄 Live State Sync (Socket.IO)
💾 Game State Persistence (Redis)
🔐 JWT Authentication + Secure Cookies
🎨 Smooth UI with Tailwind CSS

🛠 Tech Stack

Frontend
⚛️ React + TypeScript 
🎨 Tailwind CSS + Framer-motion
🔌 Socket.IO Client

Backend
🟢 Node.js + TypeScript
🚀 Express
🔌 Socket.IO
🧠 Redis (game state storage)
🔐 JWT Authentication
🛡 CSRF protection

🎯 How the Game Works
Player clicks Ready
Server pairs two players into a room
🎲 Random toss decides who plays first
Players take turns opening tiles

💣 Bomb → Lose a life
💎 Chips → Safe move
❤️ When life reaches 0 → Game Over

Result is synced instantly to both players

🔁 Turn System (Simple Logic)
Only the player whose userId === currentTurn can make a move
Server switches turns after every valid move
UI updates instantly for both players

🔐 Security
🔑 JWT stored in httpOnly cookies
🛡 CSRF protection
🍪 Secure cookies with proper expiration
🧼 Server-side validation for moves & turns

📦 Installation
# Clone the repo
git clone https://github.com/klaus-0-0/Game-TS.git

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev

# Database
PostgresSql

⚙️ Environment Variables
Backend .env
PORT=3000
REDIS_URL=redis://localhost:6379
TOKEN=your_jwt_secret
DATABASE_URL=Your PostgressSQL DB

🧠 Architecture Overview
Socket.IO → real-time game events
Redis → store ongoing matches
React State → UI rendering & animations
Server Authority → prevents cheating

🚀 Game Features
Planned improvements & ideas 👇
🏆 Match History
💰 Betting / Stake System
🔄 Reconnect & Resume Game
🎵 Sound Effects
📱 Mobile Optimization
🌍 Global Matchmaking

🚀 Future Updates & Scalability Plans
🧠 Infrastructure & Performance
⚖️ Load Balancer (NGINX / HAProxy / Cloud LB) Distribute Socket.IO traffic across multiple backend instances.
🧩 Horizontal Scaling Run multiple Node.js servers with shared Redis adapter.
🔌 Socket.IO Redis Adapter Sync rooms & events across instances.

