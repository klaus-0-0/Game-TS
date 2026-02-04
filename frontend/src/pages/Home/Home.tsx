import { useNavigate } from "react-router-dom";
import rock from "../../assets/gameLogo/rock.png";
import seventeen from "../../assets/gameLogo/seventeen.jpg";
import diamond from "../../assets/diamond/g-d-wall.jpg";
import gameLogo from "../../assets/gameLogo/game2.png"
import { useState } from "react";
import type { FC } from "react";

const Home: FC = () => {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState<boolean>(true);
  const [expandSidebar, setExpandSidebar] = useState<boolean>(false);

  interface SidebarItem {
    icon: string;
    label: string;
  }

  const sidebarItems: SidebarItem[] = [
    { icon: "👤", label: "Profile" },
    { icon: "⚙️", label: "Settings" },
    { icon: "📊", label: "History" },
    { icon: "❓", label: "Help" },
  ];

  interface GameItem {
    id: number;
    image: string;
    title: string;
    route: string;
    disabled?: boolean;
    description?: string;
    comingSoon?: boolean;
  }

  const gameItems: GameItem[] = [
    {
      id: 1,
      image: rock,
      title: "Rock Paper Scissors",
      route: "/RockGame",
    },
    {
      id: 2,
      image: seventeen,
      title: "17 Patti",
      route: "/SeventeenCards",
    },
    {
      id: 3,
      image: diamond,
      title: "stake",
      route: "/diamond",
    },
  ];

  const handleSignout = (): void => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleGameNavigation = (route: string, disabled?: boolean): void => {
    if (!disabled) navigate(route);
  };

  const handleSidebarToggle = (): void => {
    setSideBar((prev) => !prev);
  };

  const handleMouseEnter = (): void => {
    setExpandSidebar(true);
  };

  const handleMouseLeave = (): void => {
    setExpandSidebar(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 to-gray-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 p-1 bg-gray-800 flex flex-wrap items-center gap-4">
        <button
          className="text-white text-4xl p-2 w-12 rounded-lg hover:text-gray-400 transition-colors cursor-pointer"
          onClick={handleSidebarToggle}
        >
          ☰
        </button>
        <img src={gameLogo} className="w-16 h-16"></img>

        <h1 className="text-xl sm:text-2xl font-extrabold text-white">
          GameOn
        </h1>

        <div className="flex-1 flex justify-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search games..."
            className="rounded-full px-4 py-2 w-full md:w-96 border focus:outline-none focus:ring-1 focus:ring-purple-600 text-white"
          />
        </div>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-3xl transition-colors cursor-pointer"
          onClick={handleSignout}
        >
          Signout
        </button>
      </nav>

      {/* SIDEBAR */}
      {sideBar && (
        <div
          className={`fixed left-0 top-16 h-full bg-black transition-all duration-300 ease-in-out
          ${expandSidebar ? "w-52" : "w-16"}
          hidden sm:block z-40`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="space-y-4 p-3 mt-8">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center w-full p-3 text-white hover:bg-gray-700 rounded-lg transition-all
                ${expandSidebar ? "justify-start" : "justify-center"}`}
              >
                <span className="text-xl min-w-6">{item.icon}</span>
                <span
                  className={`ml-3 transition-all duration-300
                  ${expandSidebar ? "opacity-100" : "opacity-0 w-0"}`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME GRID */}
      <div className="flex gap-6 sm:gap-8 md:gap-10 flex-wrap justify-center p-4 sm:p-6 md:p-10">
        {gameItems.map((game) => (
          <div key={game.id} className="flex flex-col items-center">
            <button
              className={`relative h-40 w-28 sm:h-48 sm:w-32 md:h-52 md:w-32
              border-2 group hover:scale-105 transition-all duration-300
              rounded-lg shadow-md overflow-hidden cursor-pointer
              ${game.disabled
                ? "bg-gray-300 border-gray-400 cursor-not-allowed"
                : "bg-gray-800 border-gray-300 hover:border-blue-500"
              }`}
              onClick={() => handleGameNavigation(game.route)}
              disabled={game.disabled}
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </button>

            <div className="p-2 text-center font-medium w-28 sm:w-32 mt-2 text-white text-sm sm:text-base">
              {game.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
