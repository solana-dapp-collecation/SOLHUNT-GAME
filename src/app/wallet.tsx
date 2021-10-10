import { useMemo } from "react";
import React from "react";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { SolanaNetworks } from "./game/game";

const network = "mainnet-beta";

const rpcHost = SolanaNetworks.LOCAL;
const connection = new anchor.web3.Connection(rpcHost);

const WalletWrapper = ({ children }: any) => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [getPhantomWallet(), getSolletWallet(), getSolflareWallet()],
    []
  );

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      console.log("here", connection);
      // @ts-expect-error
      return React.cloneElement(child, { connection });
    }
    return child;
  });

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>{childrenWithProps}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletWrapper;
