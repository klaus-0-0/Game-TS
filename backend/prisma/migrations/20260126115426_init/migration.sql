-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('ACTIVE', 'LOST', 'WON', 'CASHED_OUT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "wallet" DOUBLE PRECISION NOT NULL DEFAULT 1000.00,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game_Diamond_History" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "mines" INTEGER[],
    "minesCount" INTEGER NOT NULL,
    "stake" DOUBLE PRECISION NOT NULL,
    "clickedTiles" INTEGER[],
    "status" "GameStatus" NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "potentialWin" DOUBLE PRECISION NOT NULL,
    "winAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_Diamond_History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Game_Diamond_History_gameId_key" ON "Game_Diamond_History"("gameId");

-- CreateIndex
CREATE INDEX "Game_Diamond_History_userId_idx" ON "Game_Diamond_History"("userId");

-- CreateIndex
CREATE INDEX "Game_Diamond_History_createdAt_idx" ON "Game_Diamond_History"("createdAt");

-- CreateIndex
CREATE INDEX "Game_Diamond_History_status_idx" ON "Game_Diamond_History"("status");

-- AddForeignKey
ALTER TABLE "Game_Diamond_History" ADD CONSTRAINT "Game_Diamond_History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
