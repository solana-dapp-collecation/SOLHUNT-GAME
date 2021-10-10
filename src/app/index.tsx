import React from "react";
import { Routes } from "./routes";
import WalletWrapper from "./wallet";


export default function App() {
  return (
    <WalletWrapper>
      <Routes />
    </WalletWrapper>
  );
}