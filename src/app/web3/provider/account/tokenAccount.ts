import { Provider } from "@project-serum/anchor";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import { TokenInstructions } from "@project-serum/serum";
import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";

async function createTokenAccountInstructions(
  provider: Provider,
  newAccountPubkey: PublicKey,
  mint: PublicKey,
  owner: PublicKey,
  lamports?: number
) {
  if (lamports === undefined) {
    lamports = await provider.connection.getMinimumBalanceForRentExemption(165);
  }

  return [
    SystemProgram.createAccount({
      fromPubkey: owner,
      newAccountPubkey,
      space: 165,
      lamports,
      programId: TokenInstructions.TOKEN_PROGRAM_ID,
    }),
    TokenInstructions.initializeAccount({
      account: newAccountPubkey,
      mint,
      owner,
    }),
  ];
}

/*
 const tokenAcc = await createTokenAccount(provider, mintPublicKey);
 console.log(tokenAcc.toString());
*/
export async function createTokenAccount(
  provider: Provider,
  mintPubkey: PublicKey
) {
  const transaction = new Transaction();
  const newAccountPubkey = Keypair.generate();
  transaction.add(
    ...(await createTokenAccountInstructions(
      provider,
      newAccountPubkey.publicKey,
      mintPubkey,
      provider.wallet.publicKey
    ))
  );
  console.log("Creating token account");
  await provider.send(transaction, [newAccountPubkey]);
  console.log("Token account complete");

  return newAccountPubkey.publicKey;
}

/*
  const tokenAcc = await getTokenAccount(
    provider,
    mintPublicKey,
    tokenAccountPublicKey
  );
  console.log(tokenAcc.amount.toNumber());
*/
export async function getTokenAccount(
  provider: Provider,
  mintPubkey: PublicKey,
  tokenAccountPubKey: PublicKey // Store this in state
) {
  const mint = new Token(
    provider.connection,
    mintPubkey,
    TOKEN_PROGRAM_ID,
    Keypair.generate() // payer is not relevant in this context
  );

  return mint.getAccountInfo(tokenAccountPubKey);

  // Can also be fetched from this and filtered by owners
  // return provider.connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
  //   filters: [{ memcmp: { offset: 0, bytes: mintPubkey.toString() } }],
  // });
}

/* 
 await mintToTokenAccount(provider, tokenAcc.address)
*/
export async function mintToTokenAccount(
  provider: Provider,
  mint: PublicKey,
  mintAuthority: Keypair,
  tokenAccount: PublicKey,
  amount: number
) {
  const tx = new Transaction();
  tx.feePayer = provider.wallet!.publicKey!;
  let hash = await provider.connection.getRecentBlockhash();
  tx.recentBlockhash = hash.blockhash;
  tx.add(
    TokenInstructions.mintTo({
      mint,
      destination: tokenAccount,
      amount,
      mintAuthority: mintAuthority.publicKey,
    })
  );

  await provider.send(tx, [mintAuthority]);
}
