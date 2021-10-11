import React, { useState } from "react";
import { Provider } from "@project-serum/anchor";
import { AccountInfo } from "@solana/spl-token";
import {
  createTokenAccount,
  getTokenAccount,
  mintToTokenAccount,
} from "./tokenAccount";
import { getMintAuthority, mintPublicKey } from "./mint";
import { PublicKey } from "@solana/web3.js";

const TOKEN_ACCOUNT = "TOKEN_ACCOUNT";

const saveToken = (tokenAccount: string) => {
  localStorage.setItem(TOKEN_ACCOUNT, tokenAccount);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_ACCOUNT);
};

export const useTokenAccount = (
  provider: Provider,
  setLoadingText: (loadingText: string) => void
) => {
  const [tokenAccount, setTokenAccount] = useState<AccountInfo>();
  const [tokenAccountCreateLoading, setTokenAccountCreateLoading] = useState(false);

  const loadTokenAccount = async () => {
    console.log("Loading token account");
    let token = getToken();
    if (!token) {
      console.log("Account does not exist creating new one");
      setLoadingText(
        "Token account does not exist. Creating a new token account."
      );
      setTokenAccountCreateLoading(true)
      token = (await createTokenAccount(provider, mintPublicKey)).toString();
      setTokenAccountCreateLoading(false)
      saveToken(token);
    }

    setLoadingText("Loading token account");
    const _tokenAccount = await getTokenAccount(
      provider,
      mintPublicKey,
      new PublicKey(token)
    );

    setLoadingText("");
    setTokenAccount(_tokenAccount);
    console.log("token account", _tokenAccount);
    return _tokenAccount;
  };

  const mintAmountToTokenAccount = async (amount: number) => {
    if (tokenAccount) {
      setLoadingText(`Minting ${amount} tokens`);
      await mintToTokenAccount(
        provider,
        mintPublicKey,
        getMintAuthority(),
        tokenAccount.address,
        amount
      );
      await loadTokenAccount();
    }
  };

  return {
    tokenAccount,
    loadTokenAccount,
    mintAmountToTokenAccount,
    tokenAccountCreateLoading,
  };
};