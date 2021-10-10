import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Toolbar, Typography } from "@material-ui/core";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import DisconnectIcon from "@material-ui/icons/LinkOff";
import { SolanaNetworks } from "../../game/game";
import * as anchor from "@project-serum/anchor";
import { GameDataModel } from "../../web3/provider/state/model";
import { Game } from "../game";

const rpcHost = SolanaNetworks.LOCAL;
const connection = new anchor.web3.Connection(rpcHost);

export const Home = () => {
  // const history = useHistory();
  const wallet = useWallet();
  const [balance, setBalance] = React.useState<number>();
  const [startGame, setStartGame] = React.useState<boolean>(false)
  const gameModelRef = React.useRef<GameDataModel>();

  React.useEffect(() => {
    (async () => {
      if (wallet?.publicKey && connection) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, connection]);

  async function initialize() {
    if (wallet?.publicKey && connection) {
      const provider = new anchor.Provider(
        connection,
        // @ts-expect-error
        wallet,
        {}
      );
      const gameModel = new GameDataModel(provider);
      await gameModel.initialize();
      gameModelRef.current = gameModel;
      setStartGame(true)
    }
  }

  return (
    <div className="main">
      <button type="button" onClick={() => initialize()}>
        Start Game
      </button>
      <Toolbar style={{ display: "flex" }}>
        {wallet.connected && (
          <div>BALANCE: {(balance || 0).toLocaleString()} SOL</div>
        )}
        <Typography
          component="h1"
          variant="h6"
          style={{ flexGrow: 1 }}
        ></Typography>
        <WalletMultiButton />
        {wallet.connected && (
          <WalletDisconnectButton
            startIcon={<DisconnectIcon />}
            style={{ marginLeft: 8 }}
          />
        )}
      </Toolbar>
      {startGame && <Game connection={connection} wallet={wallet} gameModel={gameModelRef.current}  />}
    </div>
  );
};
