import React, { useEffect } from "react";
import { useApp } from "../web3/provider";

export const Middleware = ({ children }: any) => {
  const { loadWallet } = useApp();
  useEffect(() => {
    loadWallet();
  }, []);

  return children;
};
