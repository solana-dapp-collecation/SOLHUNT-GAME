import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCallback } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { SolanaWallet } from "./types";
import { Provider, Provider as SolanaProvider } from "@project-serum/anchor";
// import { AppState, useAppState } from "./state";
import { AccountInfo } from "@solana/spl-token";
import { useTokenAccount } from "./account";
import { useAppState } from "./state";
import { connectWallet } from "./wallet";

enum SolanaNetworks {
  DEV = "https://api.devnet.solana.com",
  TEST = "https://api.testnet.solana.com",
  MAIN = "https://api.mainnet-beta.solana.com",
  LOCAL = "http://127.0.0.1:8899",
}

interface AppProviderContextType {
  wallet?: SolanaWallet;
  loadWallet: () => Promise<void>;
  // appState: AppState;
  tokenAccount?: AccountInfo;
  initilizeStateAccount: () => Promise<void>;
  collectTreasures: (level: number) => Promise<void>;
  loadingText: string;
  collectedTreasures: number;
  tokenBalance: number;
  tokenBalanceLoading: boolean;
  rewardNFT: () => Promise<void>
}

const AppProviderContext = createContext<AppProviderContextType>(
  {} as AppProviderContextType
);

export const useApp = () => useContext(AppProviderContext);

interface AppProviderProviderProps {
  children: React.ReactNode;
}

const AppProviderProvider: React.FC<AppProviderProviderProps> = ({
  children,
}: AppProviderProviderProps) => {
  const [wallet, setWallet] = useState<SolanaWallet>();
  const [loadingText, _setLoadingText] = useState("");
  const [provider, setProvider] = useState<SolanaProvider>();
  // const [tokenAccount, setTokenAccount] = useState<AccountInfo>();

  const setLoadingText = (loading: string) => {
    _setLoadingText(loading);
  };

  const {
    tokenAccount,
    loadTokenAccount,
    mintAmountToTokenAccount,
    tokenAccountCreateLoading,
  } = useTokenAccount(provider as Provider, setLoadingText);

  const loadWallet = useCallback(async () => {
    const _wallet = await connectWallet();
    setWallet(_wallet);
    const provider = new SolanaProvider(
      new Connection(SolanaNetworks.DEV),
      _wallet,
      {}
    );
    setProvider(provider);
    console.log("Set wallet");
  }, []);

  useEffect(() => {
    if (provider && !tokenAccount) {
      loadTokenAccount();
    }
  }, [provider]);

  const {
    initilizeStateAccount,
    collectTreasures,
    collectedTreasures,
    tokenBalance,
    tokenBalanceLoading,
    rewardNFT,
  } = useAppState(provider, tokenAccount, loadTokenAccount, setLoadingText);
  // const appState = useAppState(provider, tokenAccount, setLoadingText);

  const value = useMemo<AppProviderContextType>(
    () => ({
      wallet,
      loadWallet,
      // appState,
      tokenAccount,
      // mintAmountToTokenAccount,
      initilizeStateAccount,
      collectTreasures,
      collectedTreasures,
      tokenBalance,
      tokenBalanceLoading,
      rewardNFT,
      loadingText: tokenAccountCreateLoading
        ? "Creating token account"
        : loadingText,
    }),
    [wallet, tokenAccount, provider, collectTreasures, initilizeStateAccount]
  );

  return (
    <AppProviderContext.Provider value={value}>
      {children}
    </AppProviderContext.Provider>
  );
};

export default AppProviderProvider;
