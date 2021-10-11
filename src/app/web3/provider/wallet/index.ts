import { PhantomWalletAdapter } from "./phantom";
import { SolanaWallet } from "./types";

export const connectWallet = (): Promise<SolanaWallet> => {
  // Only supporting phantom wallet for now
  return new Promise((resolve) => {
    const wallet = new PhantomWalletAdapter();
    wallet.on("connect", () => {
      resolve(wallet);
    });

    wallet.connect();
  });
};

export const disconnectWallet = (wallet: SolanaWallet) => {
  if (wallet) {
    wallet.disconnect();
  }
};