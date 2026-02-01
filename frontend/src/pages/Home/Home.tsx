import { useNavigate } from "react-router-dom";
import rock from "../../assets/gameLogo/rock.png";
import seventeen from "../../assets/gameLogo/seventeen.jpg";
import diamond from "../../assets/diamond/g-d-wall.jpg"
import { useState } from "react";
import type { FC } from "react"

// Define TypeScript interfaces for props (if any i future )
// interface HomeProps {
//     title: string;
// }

const Home: FC = () => {
    const navigate = useNavigate();
    const [sideBar, setSideBar] = useState<boolean>(true);
    const [expandSidebar, setExpandSidebar] = useState<boolean>(false);

    // Define sidebar items type
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

    // Define game items type
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
            description: "Classic Hand Game",
        },
        {
            id: 2,
            image: seventeen,
            title: "17 Patti",
            route: "/SeventeenCards",
            description: "Indian Poker Game",
        },
        {
            id: 3,
            image: diamond, // No image for coming soon
            title: "stake",
            route: "/diamond",
            // disabled: true,
            // comingSoon: true,
            description: "stake diamond game",
        },
    ];

    const handleSignout = (): void => {
        localStorage.removeItem("userData");
        navigate("/login");
    };

    const handleGameNavigation = (route: string, disabled?: boolean): void => {
        if (!disabled) {
            navigate(route);
        }
    };

    const handleSidebarToggle = (): void => {
        setSideBar(prev => !prev);
    };

    const handleMouseEnter = (): void => {
        setExpandSidebar(true);
    };

    const handleMouseLeave = (): void => {
        setExpandSidebar(false);
    };

    const handleOverlayClick = (): void => {
        setSideBar(false);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 p-4 bg-gray-700 flex items-center gap-4">
                <button
                    className="bg-blue-300 p-2 w-12 rounded-lg hover:bg-blue-400 transition-colors"
                    onClick={handleSidebarToggle}
                    aria-label="Toggle sidebar"
                >
                    ☰
                </button>

                <h1 className="text-2xl font-extrabold text-white">GameOn</h1>
                <div className="flex-1 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="rounded-xl px-4 py-2 w-96 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Search games"
                    />
                </div>

                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-3xl transition-colors"
                    onClick={handleSignout}
                >
                    Signout
                </button>
            </nav>

            {/* Sidebar */}
            {sideBar && (
                <div
                    className={`fixed left-0 top-10 h-full bg-black transition-all duration-300 ease-in-out ${expandSidebar ? 'w-52' : 'w-16'} z-40`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    role="navigation"
                    aria-label="Main navigation"
                >
                    <div className="space-y-4 p-3 mt-8">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.label}
                                className={`flex items-center w-full p-3 text-white hover:bg-gray-700 rounded-lg transition-all ${expandSidebar ? 'justify-start' : 'justify-center'}`}
                                aria-label={item.label}
                            >
                                <span className="text-xl min-w-6" aria-hidden="true">
                                    {item.icon}
                                </span>
                                <span
                                    className={`ml-3 hover:scale-125 transition-all duration-300 ${expandSidebar ? 'opacity-100' : 'opacity-0 w-0'}`}
                                >
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Overlay when sidebar is open */}
            {sideBar && (
                <div
                    className="fixed inset-0 bg-transparent z-30"
                    onClick={handleOverlayClick}
                    aria-label="Close sidebar"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Escape' && handleOverlayClick()}
                />
            )}

            {/* Main Content - Game Grid */}
            <div className="flex gap-10 flex-wrap justify-center p-10">
                {gameItems.map((game) => (
                    <div key={game.id} className="flex flex-col items-center"> {/* Wrap button + title */}
                        <button
                            className={`relative h-52 w-32 border-2 group hover:scale-105 transition-all duration-300 rounded-lg shadow-md overflow-hidden cursor-pointer ${game.disabled
                                ? 'bg-gray-300 border-gray-400 hover:border-gray-600 cursor-not-allowed'
                                : 'bg-gray-800 border-gray-300 hover:border-blue-500'
                                }`}
                            onClick={() => handleGameNavigation(game.route)}
                            disabled={game.disabled}
                            aria-label={`Play ${game.title}`}
                        >
                            {game.comingSoon ? (
                                <div className="w-full h-36 bg-gray-400 flex items-center justify-center">
                                    <span className="text-gray-600 text-sm">Coming Soon</span>
                                </div>
                            ) : (
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </button>

                        {/* Title below button */}
                        <div className="p-2 text-center font-medium w-32 mt-2 text-white">
                            {game.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
