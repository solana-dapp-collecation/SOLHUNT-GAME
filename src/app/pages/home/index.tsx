import React, { useEffect, useState } from "react";

import Logo from "../../../assets/logo.png";
import { Game } from "../game";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { Topbar } from "./topbar";
import { useApp } from "../../web3/provider";
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
  const { loadWallet, initilizeStateAccount, collectTreasures, tokenAccount } = useApp();
  const [startGame, setStartGame] = useState(false);

  console.log(tokenAccount);

  const initialize = async () => {
    await initilizeStateAccount();
    setStartGame(true);
  }

  useEffect(() => {
    loadWallet();
  }, [])

  return (
    <SnackbarProvider maxSnack={5} autoHideDuration={8000}>
      <div className="main">
        <Topbar />
        {startGame ? (
          <Game
            collectTreasures={collectTreasures}
          />
        ) : (
          <Intro onStart={initialize} />
        )}
      </div>
    </SnackbarProvider>
  );
};



