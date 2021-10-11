import React, { useEffect, useState } from "react";
import { Swap } from "@project-serum/swap-ui";
import { Provider } from "@project-serum/anchor";
import {
  TokenListContainer,
  TokenListProvider,
} from "@solana/spl-token-registry";

interface SwapButtonProps {
  provider: Provider;
}

export const SwapButton: React.FC<SwapButtonProps> = ({ provider }) => {
  const [tokenList, setTokenList] = useState<TokenListContainer | null>(null);
  useEffect(() => {
    new TokenListProvider().resolve().then(setTokenList);
  }, [setTokenList]);

  return tokenList ? <Swap provider={provider} tokenList={tokenList} /> : null
}