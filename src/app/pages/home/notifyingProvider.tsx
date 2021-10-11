import {
  ConfirmOptions,
  Signer,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import "./index.css";

import { Connection } from "@solana/web3.js";


export class NotifyingProvider extends anchor.Provider {
    // Function to call whenever the provider sends a transaction;
    private onTransaction: (
      tx: TransactionSignature | undefined,
      err?: Error
    ) => void;
  
    constructor(
      connection: Connection,
      wallet: anchor.Wallet,
      opts: ConfirmOptions,
      onTransaction: (tx: TransactionSignature | undefined, err?: Error) => void
    ) {
      const newWallet = wallet as AnchorWallet;
      super(connection, newWallet, opts);
      this.onTransaction = onTransaction;
    }
  
    async send(
      tx: Transaction,
      signers?: Array<Signer | undefined>,
      opts?: ConfirmOptions
    ): Promise<TransactionSignature> {
      try {
        const txSig = await super.send(tx, signers, opts);
        this.onTransaction(txSig);
        return txSig;
      } catch (err) {
        if (err instanceof Error || err === undefined) {
          this.onTransaction(undefined, err);
        }
        return "";
      }
    }
  
    async sendAll(
      txs: Array<{ tx: Transaction; signers: Array<Signer | undefined> }>,
      opts?: ConfirmOptions
    ): Promise<Array<TransactionSignature>> {
      try {
        const txSigs = await super.sendAll(txs, opts);
        txSigs.forEach((sig) => {
          this.onTransaction(sig);
        });
        return txSigs;
      } catch (err) {
        if (err instanceof Error || err === undefined) {
          this.onTransaction(undefined, err);
        }
        return [];
      }
    }
  }
  