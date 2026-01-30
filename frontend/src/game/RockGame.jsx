import { useEffect, useState } from "react";
import rock from '../assets/rock.jpg'
import paper from '../assets/paper.svg'
import Scissor from '../assets/Scissors.png'

const RockGame = () => {
    const [GameData, setGameData] = useState("");
    const [GameData2, setGameData2] = useState("");
    const [winner, setWinner] = useState("");
    const [image, setImage] = useState();
    const [image1, setImage1] = useState();

    console.log("GameData", GameData);
    console.log("GameData2", GameData2);

    const result = () => {
        if (GameData === GameData2) {
            return setWinner("its a tie");
        }
        else if (GameData === "Rock" && GameData2 === "Scissor" ||
            GameData === "Paper" && GameData2 === "Rock" ||
            GameData === "Scissor" && GameData2 === "Paper") {
            return setWinner("Blue wins");
        }
        else {
            return setWinner("Red wins");
        }
    }
    
    const Pictures = (data) => {
        setImage(data);
    }
    const Pictures1 = (data) => {
        setImage1(data);
    }
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900">
            {/* Images */}
            <div className="flex justify-between w-full max-w-4xl px-4">
                <img src={image} alt="Player Choice" className="w-1/4 max-w-xs h-auto" />
                <img src={image1} alt="Opponent Choice" className="w-1/4 max-w-xs h-auto" />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-8 mt-6 w-full max-w-lg">
                {/* Player Buttons */}
                <div className="flex flex-col space-y-2">
                    <button className="btn bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-600" onClick={() => { setGameData("Rock"); Pictures(rock); }}>Rock</button>
                    <button className="btn bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-600" onClick={() => { setGameData("Paper"); Pictures(paper); }}>Paper</button>
                    <button className="btn bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-600" onClick={() => { setGameData("Scissor"); Pictures(Scissor); }}>Scissors</button>
                </div>

                {/* Opponent Buttons */}
                <div className="flex flex-col space-y-2">
                    <button className="btn bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600" onClick={() => { setGameData2("Rock"); Pictures1(rock); }}>Rock</button>
                    <button className="btn bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600" onClick={() => { setGameData2("Paper"); Pictures1(paper); }}>Paper</button>
                    <button className="btn bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600" onClick={() => { setGameData2("Scissor"); Pictures1(Scissor); }}>Scissors</button>
                </div>
            </div>

            {/* Play Button & Result */}
            <button className="mt-6 btn bg-green-500 px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600" onClick={result}>Play</button>
            <h1 className="text-white mt-4">{winner} - Blue: {GameData} | Red: {GameData2}</h1>
        </div>
    );
}

export default RockGame;