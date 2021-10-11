import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import DisconnectIcon from "@material-ui/icons/LinkOff";
import { useApp } from "../../web3/provider";

export const Topbar = () => {
  const wallet = useWallet();
  const {tokenBalance} = useApp()
  return (
    <Toolbar style={{ display: "flex" }}>
      <Typography
        component="h1"
        variant="h6"
        style={{ flexGrow: 1, color: '#fff' }}
      >Token balance: {tokenBalance}</Typography>
      <WalletMultiButton />
      {wallet.connected && (
        <WalletDisconnectButton
          startIcon={<DisconnectIcon />}
          style={{ marginLeft: 8 }}
        />
      )}
    </Toolbar>
  );
};
