import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import { useApp } from "../../web3/provider";

export const Topbar = () => {
  const {tokenBalance} = useApp()
  return (
    <Toolbar style={{ display: "flex" }}>
      <Typography
        component="h1"
        variant="h6"
        style={{ flexGrow: 1, color: '#fff' }}
      >Token balance: {tokenBalance}</Typography>
    </Toolbar>
  );
};
