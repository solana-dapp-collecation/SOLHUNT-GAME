import React, { useState } from "react";
import Phaser from "phaser";
import Heart from "../../game/heart";
import Coin from "../../game/coins";
import { useWallet } from "@solana/wallet-adapter-react";
import MyGame, { config } from "../../game/game";
import './index.css'

export const Game = ({ connection, gameModel }: any) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [gameCreated, setGameCreated] = useState(false);
  const wallet = useWallet();
  const createGame = () => {
    const game = new Phaser.Game({
      ...config,
      // @ts-expect-error
      parent: ref.current,
    });
    game.scene.add("game", MyGame, true, { connection, wallet, gameModel });
    game.scene.add("heart", Heart, true);
    game.scene.add("coin", Coin, true);
    // @ts-expect-error
    game.scene.start(MyGame);
    setGameCreated(true)
    console.log(connection);
  };
  React.useEffect(() => {
    if (wallet && !gameCreated) {
      createGame();
    }
  }, [wallet, gameCreated]);
  return <div className="game" ref={ref} />};
