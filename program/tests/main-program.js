const anchor = require("@project-serum/anchor");
const { TOKEN_PROGRAM_ID, Token } = require("@solana/spl-token");
const assert = require("assert");

describe("dungeon", () => {
  // const provider = anchor.Provider.local();

  // anchor.setProvider(provider);

  // const program = anchor.workspace.MainProgram;

  // let mint = null;
  // let pda = null;
  // let adminTokenAccount = null;
  // let gameUserTokenAccount = null;
  // let gameUser2TokenAccount = null;
  // const totalAdminAmount = 2000;

  // const escrowAccount = anchor.web3.Keypair.generate();
  // const payer = anchor.web3.Keypair.generate();
  // const mintAuthority = anchor.web3.Keypair.generate();

  // const gameUser = provider.wallet;

  // it("Initialise state", async () => {
  //   await provider.connection.confirmTransaction(
  //     await provider.connection.requestAirdrop(payer.publicKey, 10000000000),
  //     "confirmed"
  //   );

  //   mint = await Token.createMint(
  //     provider.connection,
  //     payer,
  //     mintAuthority.publicKey,
  //     null,
  //     0,
  //     TOKEN_PROGRAM_ID
  //   );

  //   adminTokenAccount = await mint.createAccount(provider.wallet.publicKey);

  //   gameUserTokenAccount = await mint.createAccount(gameUser.publicKey);
  //   gameUser2TokenAccount = await mint.createAccount(gameUser.publicKey);

  //   await mint.mintTo(
  //     adminTokenAccount,
  //     mintAuthority.publicKey,
  //     [mintAuthority],
  //     totalAdminAmount
  //   );

  //   await mint.mintTo(
  //     gameUserTokenAccount,
  //     mintAuthority.publicKey,
  //     [mintAuthority],
  //     0
  //   );

  //   await mint.mintTo(
  //     gameUser2TokenAccount,
  //     mintAuthority.publicKey,
  //     [mintAuthority],
  //     0
  //   );

  //   let _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);

  //   assert.ok(_adminTokenAccount.amount.toNumber() == totalAdminAmount);
  // });

  // it("Intialize admin account pda", async () => {
  //   await program.rpc.initializeAdminAccount(new anchor.BN(totalAdminAmount), {
  //     accounts: {
  //       admin: provider.wallet.publicKey,
  //       adminDepositTokenAccount: adminTokenAccount,
  //       escrowAccount: escrowAccount.publicKey,
  //       tokenProgram: TOKEN_PROGRAM_ID,
  //       rent: anchor.web3.SYSVAR_RENT_PUBKEY,
  //     },
  //     instructions: [
  //       await program.account.escrowAccount.createInstruction(escrowAccount),
  //     ],
  //     signers: [escrowAccount],
  //   });

  //   const [_pda, _nonce] = await anchor.web3.PublicKey.findProgramAddress(
  //     [Buffer.from(anchor.utils.bytes.utf8.encode("dungeon"))],
  //     program.programId
  //   );

  //   pda = _pda;

  //   let _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);
  //   let _escrowAccount = await program.account.escrowAccount.fetch(
  //     escrowAccount.publicKey
  //   );

  //   assert.ok(_adminTokenAccount.owner.equals(pda));
  //   assert.ok(_escrowAccount.adminKey.equals(provider.wallet.publicKey));

  //   assert.ok(_escrowAccount.totalAmount.toNumber() == totalAdminAmount);
  //   assert.ok(
  //     _escrowAccount.adminDepositTokenAccount.equals(adminTokenAccount)
  //   );
  // });

  // it("Exchange escrow", async () => {
  //   let _gameUserTokenAccount = await mint.getAccountInfo(gameUserTokenAccount);
  //   let _gameUser2TokenAccount = await mint.getAccountInfo(
  //     gameUser2TokenAccount
  //   );
  //   let _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);
  //   assert.ok(_gameUserTokenAccount.amount.toNumber() == 0);
  //   assert.ok(_gameUser2TokenAccount.amount.toNumber() == 0);
  //   assert.ok(_adminTokenAccount.amount.toNumber() == totalAdminAmount);

  //   await program.rpc.exchange(new anchor.BN(150), {
  //     accounts: {
  //       gameUser: provider.wallet.publicKey,
  //       gameUserReceiveTokenAccount: gameUserTokenAccount,
  //       adminMainAccount: provider.wallet.publicKey,
  //       pdaAccount: pda,
  //       pdaDepositTokenAccount: adminTokenAccount,
  //       tokenProgram: TOKEN_PROGRAM_ID,
  //       escrowAccount: escrowAccount.publicKey,
  //     },
  //   });

  //   _gameUserTokenAccount = await mint.getAccountInfo(gameUserTokenAccount);
  //   _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);

  //   assert.ok(_gameUserTokenAccount.amount.toNumber() == 150);
  //   assert.ok(_adminTokenAccount.amount.toNumber() == 1850);

  //   const [_pda, _nonce] = await anchor.web3.PublicKey.findProgramAddress(
  //     [Buffer.from(anchor.utils.bytes.utf8.encode("dungeon"))],
  //     program.programId
  //   );

  //   await program.rpc.exchange(new anchor.BN(100), {
  //     accounts: {
  //       gameUser: provider.wallet.publicKey,
  //       gameUserReceiveTokenAccount: gameUser2TokenAccount,
  //       adminMainAccount: provider.wallet.publicKey,
  //       pdaAccount: pda,
  //       pdaDepositTokenAccount: adminTokenAccount,
  //       tokenProgram: TOKEN_PROGRAM_ID,
  //       escrowAccount: escrowAccount.publicKey,
  //     },
  //   });

  //   _gameUser2TokenAccount = await mint.getAccountInfo(gameUser2TokenAccount);
  //   _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);

  //   assert.ok(_gameUser2TokenAccount.amount.toNumber() == 100);
  //   assert.ok(_adminTokenAccount.amount.toNumber() == 1750);
  // });
});
