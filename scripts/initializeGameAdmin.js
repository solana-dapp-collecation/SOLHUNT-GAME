const { Connection } = require("@solana/web3.js");
const anchor = require("@project-serum/anchor");
const { TOKEN_PROGRAM_ID, Token } = require("@solana/spl-token");
const TOKEN_SUPPLY = 100000;
const programIdl = require("./main_program_final.json");
const fs = require("fs");

const gameAdmin = anchor.web3.Keypair.fromSecretKey(
  new Uint8Array([
    17, 234, 191, 156, 54, 200, 228, 103, 149, 55, 38, 248, 177, 190, 119, 204,
    38, 244, 252, 29, 69, 72, 122, 202, 104, 187, 64, 183, 76, 72, 56, 99, 239,
    54, 240, 203, 210, 1, 197, 55, 121, 237, 74, 132, 207, 194, 255, 44, 62,
    144, 180, 200, 68, 221, 180, 216, 254, 247, 138, 238, 10, 161, 146, 153,
  ])
);

const provider = new anchor.Provider(
  new Connection("http://localhost:8899"),
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
    "../src/app/web3/account.json",
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
