import React, { useEffect, useState } from "react";

import Logo from "../../../assets/logo.png";
import { Game } from "../game";
import "./index.css";
import { Topbar } from "./topbar";
import { useApp } from "../../web3/provider";
import { useSnackbar } from "notistack";
interface IntroProps {
  onStart: () => void;
  collectedTreasures: number;
  initialized: boolean;
}

const Intro: React.FC<IntroProps> = ({ onStart, collectedTreasures, initialized }) => {
  return (
    <div className="intro">
      <img src={Logo} alt="De dungeon crawlers" />
      <div className="starters">
        <h3 className={initialized ? 'initialized' : ''} onClick={onStart}>
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
    loadingText,
  } = useApp();
  const { enqueueSnackbar } = useSnackbar();
  const [startGame, setStartGame] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const initialize = () => {
    if (initialized) {
      setStartGame(true);
    }
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
    <div className="main">
      <Topbar />
      {startGame ? (
        <Game
          collectTreasures={collectTreasures}
          collectedTreasures={collectedTreasures}
          tokenBalance={tokenBalance}
          enqueueSnackbar={enqueueSnackbar}
        />
      ) : (
        <Intro initialized={initialized} onStart={initialize} collectedTreasures={collectedTreasures} />
      )}
      <div className="loading">
        {loadingText && <h3>Info: {loadingText}</h3>}
      </div>
    </div>
  );
};
