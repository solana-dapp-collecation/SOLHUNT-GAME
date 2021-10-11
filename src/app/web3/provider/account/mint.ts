import { web3 } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import mintAccountJson from "./mint-account.json";
import account from "../../account.json";

export const mintPublicKey = new PublicKey(account.mint);
export const escrowAccount = new PublicKey(account.escrowAccount);

export const getMintAuthority = () => {
  const mintAuthority = web3.Keypair.fromSecretKey(
    new Uint8Array(mintAccountJson)
  );
  return mintAuthority;
};
