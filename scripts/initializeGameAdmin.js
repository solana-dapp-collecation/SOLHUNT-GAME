const { Connection } = require("@solana/web3.js");
const anchor = require("@project-serum/anchor");
const { TOKEN_PROGRAM_ID, Token } = require("@solana/spl-token");
const TOKEN_SUPPLY = 100000;
const programIdl = require("./main_program_final.json");
const fs = require("fs");

// const adata = anchor.web3.Keypair.generate();
// console.log(adata.secretKey.toString());
// console.log(adata.secretKey);
// console.log(Buffer.from(adata.secretKey).toString("base64"));

const gameAdmin = anchor.web3.Keypair.fromSecretKey(
  new Uint8Array([
    216, 177, 200, 103, 17, 130, 47, 113, 219, 79, 190, 82, 51, 94, 163, 44, 92,
    55, 52, 105, 242, 118, 122, 159, 95, 59, 129, 133, 127, 106, 76, 163, 65,
    179, 232, 105, 127, 40, 194, 115, 78, 221, 59, 41, 90, 245, 99, 77, 112,
    227, 221, 109, 96, 154, 84, 1, 76, 5, 227, 80, 178, 37, 127, 32,
  ])
);

const provider = new anchor.Provider(
  new Connection("https://api.devnet.solana.com"),
  new anchor.Wallet(gameAdmin),
  {}
);

anchor.setProvider(provider);

const initializeTokenEscrowAccount = async (adminTokenAccount) => {
  const program = loadProgram(provider);

  const escrowAccount = anchor.web3.Keypair.generate();
  console.log(
    "Escow Account",
    escrowAccount.secretKey,
    escrowAccount.publicKey.toString()
  );

  console.log("Program", program.rpc);

  await program.rpc.initializeAdminAccount(new anchor.BN(TOKEN_SUPPLY), {
    accounts: {
      admin: provider.wallet.publicKey,
      adminDepositTokenAccount: adminTokenAccount,
      escrowAccount: escrowAccount.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    },
    instructions: [
      await program.account.escrowAccount.createInstruction(escrowAccount),
    ],
    signers: [escrowAccount],
  });

  const [pda, nonce] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(anchor.utils.bytes.utf8.encode("dungeon"))],
    program.programId
  );
  console.log("PDA & Nounce ", pda, nonce);

  let escrowAccountDetails = await program.account.escrowAccount.fetch(
    escrowAccount.publicKey
  );
  console.log(
    "Escrow account balance: ",
    escrowAccountDetails.totalAmount.toNumber()
  );

  return {
    escrowAccount: escrowAccount.publicKey.toString(),
  };
};

const requestAirdrop = async (account) => {
  const REQUIRED_LAMPORTS = 5 * 10000000000;
  console.log(
    `Requesting ${REQUIRED_LAMPORTS} lamports airdrop to payer ${account.publicKey}`
  );
  return provider.connection.confirmTransaction(
    await provider.connection.requestAirdrop(
      account.publicKey,
      REQUIRED_LAMPORTS
    ),
    "confirmed"
  );
};

const createMintAuthority = () => {
  const keypair = anchor.web3.Keypair.generate();

  console.log("Created new mint authority");
  console.log(Array.from(keypair.secretKey));
  return keypair;
};

const loadProgram = (provider) => {
  return new anchor.Program(programIdl, programIdl.metadata.address, provider);
};

const main = async (admin) => {
  requestAirdrop(admin);
  const mintAuthority = createMintAuthority();
  const mint = await Token.createMint(
    provider.connection,
    admin,
    mintAuthority.publicKey,
    null,
    0,
    TOKEN_PROGRAM_ID
  );
  console.log("Token Mint: ", mint.publicKey.toString());

  console.log("Creating token account with mint.");
  const adminTokenAccount = await mint.createAccount(admin.publicKey);
  console.log(`Minting ${TOKEN_SUPPLY} to ${adminTokenAccount.toString()}`);
  await mint.mintTo(
    adminTokenAccount,
    mintAuthority.publicKey,
    [mintAuthority],
    TOKEN_SUPPLY
  );
  console.log(
    "Game Admin: ",
    admin.secretKey.toString(),
    admin.publicKey.toString()
  );

  let _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);
  console.log(
    `Admin Token Account balance: ${_adminTokenAccount.amount.toNumber()}`
  );

  const { escrowAccount } = await initializeTokenEscrowAccount(
    adminTokenAccount
  );

  fs.writeFile(
    "./src/app/web3/account.json",
    JSON.stringify({
      escrowAccount,
      mint: mint.publicKey.toString(),
    }),
    (err) => {
      if (err) {
        return console.log("Error occured", err);
      }
    }
  );
};

main(gameAdmin);
