import { useState, useEffect, useRef } from "react";
import type { FC, ChangeEvent } from "react"
import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";
import config from "../../config";
import r_D from "../../assets/diamond/r-d2.png";
import g_D from "../../assets/diamond/gd.jpg";
import clickSound from "../../assets/diamond/sound/pop.mp3";
import looseSound from "../../assets/diamond/sound/sword.mp3";
import winSound from "../../assets/diamond/sound/cash3.mp3";

// TypeScript Interfaces
interface CsrfTokenResponse {
  csrfToken: string;
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

interface Tile {
  opened: boolean;
  diamond: "red" | "green" | null;
}

interface UserDataResponse {
  gameId: string;
  wallet: number;
  totalTiles: number;
}

interface CreateGameRequest {
  mines: number;
  stake: number;
  gameId: string;
}

// interface CreateGameResponse {
//   gameId: string;
//   message?: string;
// }

interface ClickTileRequest {
  clickedTile: number;
  gameId: string;
}

interface ClickTileResponse {
  mineArray: number[];
  isMine: boolean;
  gameStatus: string;
  potentialWin: number;
  clicked_All_Safe_Tiles: boolean;
  wallet?: number;
  message?: string;
}

interface CashoutRequest {
  gameId: string;
}

interface CashoutResponse {
  wallet: number;
  message?: string;
  mines: number[];
}

const Diamond: FC = () => {
  // Audio Refs
  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const looseAudio = useRef<HTMLAudioElement | null>(null);
  const winAudio = useRef<HTMLAudioElement | null>(null);

  // components rendering permissions
  const showResetButton = useRef<boolean>(true);
  const showInputMoney = useRef<boolean>(false);
  const showIsGameActive = useRef<boolean>(false);

  // Game State
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [totalTiles, setTotalTiles] = useState<number>(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [mines, setMines] = useState<number>(1);
  const [stake, setStake] = useState<number>(0);
  const [wallet, setWallet] = useState<number>(0);
  const [gameId, setGameId] = useState<string>("");
  const [winning, setWinning] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize audio
  clickAudio.current = new Audio(clickSound);
  looseAudio.current = new Audio(looseSound);
  winAudio.current = new Audio(winSound);

  // fetch user data
  useEffect(() => {
    const fetchCsrfToken = async (): Promise<void> => {
      try {
        const res: AxiosResponse<CsrfTokenResponse> = await axios.get(
          `${config.apiUrl}/csrf-token`
        );
        const token = res.data.csrfToken;
        setCsrfToken(token);
        console.log("csrfTokensss = ", token);
      } catch (error) {
        const err = error as AxiosError<ApiErrorResponse>;
        console.error("Failed to fetch CSRF token:", err.message);
        setError("Failed to initialize security. Please refresh the page.");
      }
    };

    fetchCsrfToken();
  }, []);

  // Fetch user data when CSRF token is available
  useEffect(() => {
    if (csrfToken) {
      fetchUserData();
    }
  }, [csrfToken]);

  // Initialize tiles when totalTiles changes
  useEffect(() => {
    setTiles(
      Array.from({ length: totalTiles }, () => ({
        opened: false,
        diamond: null,
      }))
    );
  }, [totalTiles]);

  // Fetch user data from API
  const fetchUserData = async (): Promise<void> => {
    try {
      if (!csrfToken) {
        setError("Security token not loaded. Please refresh the page.");
        return;
      }

      setIsLoading(true);
      const res: AxiosResponse<UserDataResponse> = await axios.get(
        `${config.apiUrl}/diamond/userdata`,
        {
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json"
          },
          withCredentials: true
        },
      );
      // console.log("fetch userdata ", res.data);
      setGameId(res.data.gameId);
      setWallet(res.data.wallet);
      setTotalTiles(res.data.totalTiles);
      setError("");
    } catch (error) {
      const err = error as AxiosError;
      console.error("Failed to fetch user data:", err.message);
      setError("Failed to load user data. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle bet placement
  const handleBet = async (): Promise<void> => {
    if (stake < 100) {
      setError("Minimum bet is $100");
      return;
    }

    if (stake > wallet) {
      setError("Insufficient funds in wallet");
      return;
    }

    try {
      showInputMoney.current = true;
      setIsLoading(true);
      setError("");

      const requestData: CreateGameRequest = {
        mines,
        stake,
        gameId,
      };

      // const response: AxiosResponse<CreateGameResponse> = 
      await axios.post(`${config.apiUrl}/diamond/create`,
        requestData,
        {
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json"
          },
          withCredentials: true
        },
      );
      // console.log("Game created:", response.data);
      showIsGameActive.current = true;
      setWallet(wallet - stake);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Error creating game:", err);
      setError(err.response?.data?.message || "Failed to create game. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle tile click
  const handleClickTiles = async (id: number): Promise<void> => {
    if (!showIsGameActive.current) return;
    try {
      const requestData: ClickTileRequest = {
        clickedTile: id,
        gameId,
      };

      const res: AxiosResponse<ClickTileResponse> = await axios.post(`${config.apiUrl}/diamond/click`,
        requestData,
        {
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json"
          },
          withCredentials: true
        },
      );

      // console.log("resClick = ", res.data);

      const { mineArray, isMine, potentialWin, clicked_All_Safe_Tiles } = res.data;
      setWinning(potentialWin);
      // console.log("mineArray =", mineArray, clicked_All_Safe_Tiles);

      // WIN CASE - All safe tiles clicked
      if (clicked_All_Safe_Tiles) {
        const newWallet = wallet + winning;
        setWallet(newWallet);
        // console.log("Wallet after win:", newWallet);

        showIsGameActive.current = false;

        // Show all tiles with mines in red
        setTiles((prev) =>
          prev.map((_, idx) => ({
            opened: true,
            diamond: mineArray.includes(idx) ? "red" : "green",
          }))
        );

        if (winAudio.current) {
          winAudio.current.currentTime = 0;
          winAudio.current.play().catch(e => console.error("Audio play failed:", e));
        }
        return;
      }

      setTiles((prev) =>
        prev.map((val, idx) => {
          if (idx !== id || val.opened) return val;

          // LOSS CASE
          if (isMine) {
            showIsGameActive.current = false;
            showResetButton.current = false;
            setStake(0);
            setWinning(0);

            if (res.data.wallet !== undefined) {
              setWallet(res.data.wallet);
            }

            // Reveal all tiles
            setTiles((prev) =>
              prev.map((_, idx) => ({
                opened: true,
                diamond: mineArray.includes(idx) ? "red" : "green",
              }))
            );

            if (looseAudio.current) {
              looseAudio.current.currentTime = 0;
              looseAudio.current.play().catch(e => console.error("Audio play failed:", e));
            }

            return {
              opened: true,
              diamond: "red",
            };
          }

          // SAFE CLICK
          if (clickAudio.current) {
            clickAudio.current.currentTime = 0;
            clickAudio.current.play().catch(e => console.error("Audio play failed:", e));
          }

          return {
            opened: true,
            diamond: "green",
          };
        })
      );
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Tile click error:", err);
      setError(err.response?.data?.message || "Game error. Please refresh.");
    }
  };
  // Handle game reset
  const handleResetGame = (): void => {
    if (showResetButton.current) return;

    // console.log("Resetting game...");
    showResetButton.current = true;
    showInputMoney.current = false;
    showIsGameActive.current = false;
    setWinning(0);
    setStake(0);
    setError("");

    setTiles(
      Array(totalTiles)
        .fill(null)
        .map(() => ({
          opened: false,
          diamond: null,
        }))
    );
    fetchUserData();
  };
  // Handle cash out
  const handleCashOut = async (): Promise<void> => {
    if (winning === 0 || !showIsGameActive.current) return;
    try {
      setIsLoading(true);
      showResetButton.current = false;
      const requestData: CashoutRequest = { gameId };

      const res: AxiosResponse<CashoutResponse> = await axios.post(
        `${config.apiUrl}/diamond/cashout`,
        requestData,
        {
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json"
          },
          withCredentials: true
        },
      );

      console.log("Cashout successful:", res.data);
      setWallet(res.data.wallet);
      setStake(0);
      showIsGameActive.current = false;

      // Show all tiles with mines in red
      setTiles((prev) =>
        prev.map((_, idx) => ({
          opened: true,
          diamond: res.data.mines.includes(idx) ? "red" : "green",
        }))
      );
      if (winAudio.current) {
        winAudio.current.currentTime = 0;
        winAudio.current.play().catch(e => console.error("Audio play failed:", e));
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Cashout error:", err);
      setError(err.response?.data?.message || "Cashout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle bet amount change
  const handleBetChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 0) return;
    setStake(Math.min(value, wallet));
  };

  // Quick bet buttons
  const handleQuickBet = (amount: number): void => {
    if (showIsGameActive.current || amount > wallet) return;
    setStake(amount);
    setError("");
  };

  // Handle mines change
  const handleMinesChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setMines(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 to-gray-900 flex flex-col items-center p-4">
      <nav className="w-full bg-linear-to-r from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg mb-6">
        <div className="flex sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold text-gray-300">Wallet Balance</h2>
            <p className="text-3xl font-bold text-white">${wallet}</p>
          </div>
          <div className="text-center sm:text-right">
            <h2 className="text-lg font-semibold text-gray-300">Potential Win</h2>
            <p className="text-3xl font-bold text-green-400">${Number(winning).toFixed(2)}</p>
          </div>
        </div>
      </nav>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
          <p className="text-center font-bold text-lg text-red-500">{error}</p>
        </div>
      )}

      {/* GAME GRID */}
      <div className="grid grid-cols-5 gap-3 mb-6 p-4 bg-gray-900/50 rounded-2xl">
        {tiles.map((val, idx) => (
          <button
            disabled={!showIsGameActive.current || val.opened}
            key={idx}
            className={`
              w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center 
              transition-all duration-200 transform hover:scale-105
              ${val.opened ? "cursor-default" : "cursor-pointer"}
              ${val.opened
                ? val.diamond === "red"
                  ? "bg-red-500/20 border-2 border-red-500"
                  : "bg-green-500/20 border-2 border-green-500"
                : "bg-gray-800 border-2 border-gray-700 hover:border-blue-400"
              }
              ${!showIsGameActive.current ? "opacity-70" : ""}
            `}
            onClick={() => handleClickTiles(idx)}
            aria-label={`Tile ${idx + 1}, ${val.opened ? (val.diamond === "red" ? "Mine" : "Safe") : "Unknown"}`}
          >
            {val.opened ? (
              <img
                src={val.diamond === "red" ? r_D : g_D}
                className="w-full h-full rounded-lg object-cover"
                alt={val.diamond === "red" ? "Red Diamond (Mine)" : "Green Diamond (Safe)"}
              />
            ) : (
              <span className="text-gray-400 text-lg font-bold">?</span>
            )}
          </button>
        ))}
      </div>

      {/* BET CONTROLS */}
      <div className="w-full max-w-md bg-gray-900/80 p-5 rounded-2xl shadow-lg space-y-4">
        {/* Bet Amount */}
        <div>
          <label className="block text-gray-300 mb-2 font-medium">
            Bet Amount (Min: 100)
          </label>
          <input
            type="number"
            disabled={showInputMoney.current}
            placeholder="Enter your bet..."
            onChange={handleBetChange}
            value={stake || ""}
            min={100}
            max={wallet}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white
                     placeholder-gray-400 border border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Quick Bet Buttons */}
        <div className="flex gap-2">
          {[100, 500, 1000].map((amount) => (
            <button
              key={amount}
              className={`flex-1 py-2 rounded-lg transition-colors
                       ${stake === amount ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}
                       ${(showInputMoney.current || isLoading || amount > wallet) ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleQuickBet(amount)}
              disabled={showInputMoney.current}
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Mines Selection */}
        <div>
          <label className="block text-gray-300 mb-2 font-medium">
            Select Mines
          </label>
          <select
            value={mines}
            onChange={handleMinesChange}
            disabled={showIsGameActive.current || isLoading}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white
                     border border-gray-700 cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {[1, 2, 3].map((num) => (
              <option key={num} value={num}>
                {num} Mine{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Place Bet Button */}
        <button
          disabled={showIsGameActive.current || isLoading || stake < 100 || stake > wallet}
          onClick={handleBet}
          className={`
            w-full py-3 rounded-lg font-bold transition-all duration-300
            ${stake < 100 || stake > wallet || isLoading || showIsGameActive.current
              ? "bg-gray-700 cursor-not-allowed opacity-50"
              : "bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-105"
            }
          `}
        >
          {isLoading ? "Processing..." : stake < 100 ? "Min Bet: $100" : stake > wallet ? "Insufficient Funds" : "Place Bet"}
        </button>

        {/* Cash Out Button */}
        <button
          disabled={!showIsGameActive.current || winning === 0 || isLoading}
          onClick={handleCashOut}
          className={`
            w-full py-3 rounded-lg font-bold text-lg transition-all duration-200
            ${!showIsGameActive.current || winning === 0 || isLoading
              ? "bg-gray-700 cursor-not-allowed opacity-50"
              : "bg-linear-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 hover:scale-105"
            }
          `}
        >
          {isLoading ? "Processing..." : `Cash Out: $${Number(winning).toFixed(2)}`}
        </button>

        {/* Reset Button */}
        <button
          disabled={showResetButton.current}
          onClick={handleResetGame}
          className={`
            w-full py-3 rounded-lg font-bold transition-all duration-300
            ${showResetButton.current || isLoading
              ? "bg-gray-700 cursor-not-allowed opacity-50"
              : "bg-linear-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 hover:scale-105 text-gray-300 cursor-pointer"
            }
          `}
        >
          Play Again
        </button>

        {/* Game Info */}
        <div className="text-center text-sm text-gray-400 pt-2">
          <p>Total Tiles: {totalTiles} | Mines: {mines}</p>
          <p className="mt-1">Game Status: {showIsGameActive.current ? "Active" : "Inactive"}</p>
        </div>
      </div>
    </div>
  );
};

export default Diamond; 