import React, { useEffect, useState } from "react";

import Logo from "../../../assets/logo.png";
import { Game } from "../game";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { Topbar } from "./topbar";
import { useApp } from "../../web3/provider";
interface IntroProps {
  onStart: () => Promise<void>;
  collectedTreasures: number;
}

const Intro: React.FC<IntroProps> = ({ onStart, collectedTreasures }) => {
  return (
    <div className="intro">
      <img src={Logo} alt="De dungeon crawlers" />
      <div className="starters">
        <h3 onClick={onStart}>
          {collectedTreasures ? "Continue" : "New Game"}
        </h3>
      </div>
    </div>
  );
};

export const Home = () => {
  const {
    loadWallet,
    initilizeStateAccount,
    collectTreasures,
    tokenAccount,
    collectedTreasures,
    tokenBalance,
  } = useApp();
  const [startGame, setStartGame] = useState(false);
  const [initialized, setInitialized] = useState(false);

  console.log(tokenAccount);

  const initialize = async () => {
    setStartGame(true);
  };

  useEffect(() => {
    loadWallet();
  }, []);

  useEffect(() => {
    (async () => {
      if (tokenAccount && !initialized) {
        await initilizeStateAccount();
        setInitialized(true);
      }
    })();
  }, [tokenAccount, initialized]);

  return (
    <SnackbarProvider maxSnack={5} autoHideDuration={8000}>
      <div className="main">
        <Topbar />
        {startGame ? (
          <Game
            collectTreasures={collectTreasures}
            collectedTreasures={collectedTreasures}
            tokenBalance={tokenBalance}
          />
        ) : (
          <Intro onStart={initialize} collectedTreasures={collectedTreasures} />
        )}
      </div>
    </SnackbarProvider>
  );
};
