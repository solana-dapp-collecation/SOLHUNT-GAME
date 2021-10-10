import React from "react";
import Phaser from "phaser";
import Heart from "../../game/heart";
import Coin from "../../game/coins";
import { useWallet } from "@solana/wallet-adapter-react";
import MyGame, { config } from "../../game/game";

export const Game = ({ connection, gameModel }: any) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const wallet = useWallet();
  const createGame = () => {
    const game = new Phaser.Game({
      ...config,
      // @ts-expect-error
      root: ref.current,
    });
    game.scene.add("game", MyGame, true, { connection, wallet, gameModel });
    game.scene.add("heart", Heart, true);
    game.scene.add("coin", Coin, true);
    // @ts-expect-error
    game.scene.start(MyGame);
    console.log(connection);
  };
  React.useEffect(() => {
    if (wallet) {
      createGame();
    }
  }, [wallet]);
  return <div ref={ref} />;
};
