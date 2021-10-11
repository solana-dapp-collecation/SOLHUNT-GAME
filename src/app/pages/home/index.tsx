import React, { useState } from "react";

import Logo from "../../../assets/logo.png";
import { useWallet } from "@solana/wallet-adapter-react";
import { Game } from "../game";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { Topbar } from "./topbar";
interface IntroProps {
  onStart: () => Promise<void>;
}

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="intro">
      <img src={Logo} alt="De dungeon crawlers" />
      <div className="starters">
        <h3 onClick={onStart}>Continue</h3>
        <h3 onClick={onStart}>New Game</h3>
      </div>
    </div>
  );
};

export const Home = () => {
  const wallet = useWallet();
  const [startGame, setStartGame] = useState(false);

  const initialize = async () => {
    setStartGame(true);
  }

  return (
    <SnackbarProvider maxSnack={5} autoHideDuration={8000}>
      <div className="main">
        <Topbar />
        {startGame ? (
          <Game
            wallet={wallet}
          />
        ) : (
          <Intro onStart={initialize} />
        )}
      </div>
    </SnackbarProvider>
  );
};



