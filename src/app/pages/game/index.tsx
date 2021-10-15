import React, { useState } from "react";
import Phaser from "phaser";
import Heart from "../../game/heart";
import Coin from "../../game/coins";
import MyGame, { config } from "../../game/game";
import "./index.css";

export const getCharacter = () => {
  const data = localStorage.getItem('character')
  if(data) {
    return data;
  }
  return 'faune'
}

export const Game = ({ collectTreasures, collectedTreasures, tokenBalance, enqueueSnackbar, rewardNFT, closeSnackbar }: any) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [gameCreated, setGameCreated] = useState(false);
  const gameRef = React.useRef<Phaser.Game>();
  const createGame = () => {
    const game = new Phaser.Game({
      ...config,
      // @ts-expect-error
      parent: ref.current,
    });
    game.scene.add("game", MyGame, true, { collectTreasures, collectedTreasures, tokenBalance, enqueueSnackbar, rewardNFT, closeSnackbar, character: getCharacter() });
    game.scene.add("heart", Heart, true);
    game.scene.add("coin", Coin, true, { tokenBalance });
    // @ts-expect-error
    game.scene.start(MyGame);
    gameRef.current = game;
    setGameCreated(true);
  };
  React.useEffect(() => {
    if (!gameCreated) {
      createGame();
    }
  }, [gameCreated]);

  React.useEffect(() => {
    return () => {
      if(gameRef.current) {
        gameRef.current.destroy(true);
      }
    }
  }, [])
  return <div className="game" ref={ref} />;
};
