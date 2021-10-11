const anchor = require("@project-serum/anchor");
const { TOKEN_PROGRAM_ID, Token } = require("@solana/spl-token");
const assert = require("assert");

function bit_test(num, bit) {
  return (num & (1 << bit)) !== 0;
}

describe("dungeon", () => {
  const provider = anchor.Provider.local();

  anchor.setProvider(provider);

  const program = anchor.workspace.MainProgramFinal;

  let mint = null;
  let pda = null;
  let adminTokenAccount = null;
  let gameUserTokenAccount = null;
  let gameUser2TokenAccount = null;
  const totalAdminAmount = 2000;

  const escrowAccount = anchor.web3.Keypair.generate();
  const payer = anchor.web3.Keypair.generate();
  const mintAuthority = anchor.web3.Keypair.generate();

  const gameUser = provider.wallet;

  let _myAccount;

  it("Initialize dungeon account", async () => {
    const myAccount = anchor.web3.Keypair.generate();
    await program.rpc.initialize({
      accounts: {
        myAccount: myAccount.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [myAccount],
      instructions: [
        await program.account.myAccount.createInstruction(myAccount),
      ],
    });

    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    assert.ok(account.data.eq(new anchor.BN(0)));
    _myAccount = myAccount;
  });

  it("Bit test teturns true for user collected treasures and false for uncollected treasures", async () => {
    const myAccount = _myAccount;
    await program.rpc.update(new anchor.BN(2), {
      accounts: {
        myAccount: myAccount.publicKey,
      },
    });

    await program.rpc.update(new anchor.BN(3), {
      accounts: {
        myAccount: myAccount.publicKey,
      },
    });
    await program.rpc.update(new anchor.BN(7), {
      accounts: {
        myAccount: myAccount.publicKey,
      },
    });

    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    const result = account.data.toNumber();

    assert.ok(bit_test(result, 7));
    assert.ok(bit_test(result, 2));
    assert.ok(bit_test(result, 3));
    assert.ok(bit_test(result, 4) === false);
    assert.ok(bit_test(result, 10) === false);
  });

  it("Testing multiple accounts", async () => {
    const myAccount2 = anchor.web3.Keypair.generate();
    await program.rpc.initialize({
      accounts: {
        myAccount: myAccount2.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [myAccount2],
      instructions: [
        await program.account.myAccount.createInstruction(myAccount2),
      ],
    });

    let account = await program.account.myAccount.fetch(myAccount2.publicKey);
    assert.ok(account.data.eq(new anchor.BN(0)));

    await program.rpc.update(new anchor.BN(2), {
      accounts: {
        myAccount: myAccount2.publicKey,
      },
    });

    account = await program.account.myAccount.fetch(myAccount2.publicKey);
    const account2 = await program.account.myAccount.fetch(
      _myAccount.publicKey
    );
    assert.ok(bit_test(account.data.toNumber(), 2));
    assert.ok(bit_test(account.data.toNumber(), 7) === false);
    assert.ok(bit_test(account2.data.toNumber(), 7));
  });

  it("Initialise state", async () => {
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(payer.publicKey, 10000000000),
      "confirmed"
    );

    mint = await Token.createMint(
      provider.connection,
      payer,
      mintAuthority.publicKey,
      null,
      0,
      TOKEN_PROGRAM_ID
    );

    adminTokenAccount = await mint.createAccount(provider.wallet.publicKey);

    gameUserTokenAccount = await mint.createAccount(gameUser.publicKey);
    gameUser2TokenAccount = await mint.createAccount(gameUser.publicKey);

    await mint.mintTo(
      adminTokenAccount,
      mintAuthority.publicKey,
      [mintAuthority],
      totalAdminAmount
    );

    await mint.mintTo(
      gameUserTokenAccount,
      mintAuthority.publicKey,
      [mintAuthority],
      0
    );

    await mint.mintTo(
      gameUser2TokenAccount,
      mintAuthority.publicKey,
      [mintAuthority],
      0
    );

    let _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);

    assert.ok(_adminTokenAccount.amount.toNumber() == totalAdminAmount);
  });

  it("Intialize admin account pda", async () => {
    await program.rpc.initializeAdminAccount(new anchor.BN(totalAdminAmount), {
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

    const [_pda, _nonce] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode("dungeon"))],
      program.programId
    );

    pda = _pda;

    let _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);
    let _escrowAccount = await program.account.escrowAccount.fetch(
      escrowAccount.publicKey
    );

    assert.ok(_adminTokenAccount.owner.equals(pda));
    assert.ok(_escrowAccount.adminKey.equals(provider.wallet.publicKey));

    assert.ok(_escrowAccount.totalAmount.toNumber() == totalAdminAmount);
    assert.ok(
      _escrowAccount.adminDepositTokenAccount.equals(adminTokenAccount)
    );
  });

  it("Exchange escrow", async () => {
    let _gameUserTokenAccount = await mint.getAccountInfo(gameUserTokenAccount);
    let _gameUser2TokenAccount = await mint.getAccountInfo(
      gameUser2TokenAccount
    );
    let _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);
    assert.ok(_gameUserTokenAccount.amount.toNumber() == 0);
    assert.ok(_gameUser2TokenAccount.amount.toNumber() == 0);
    assert.ok(_adminTokenAccount.amount.toNumber() == totalAdminAmount);

    await program.rpc.exchange(new anchor.BN(150), {
      accounts: {
        gameUser: provider.wallet.publicKey,
        gameUserReceiveTokenAccount: gameUserTokenAccount,
        adminMainAccount: provider.wallet.publicKey,
        pdaAccount: pda,
        pdaDepositTokenAccount: adminTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        escrowAccount: escrowAccount.publicKey,
      },
    });

    _gameUserTokenAccount = await mint.getAccountInfo(gameUserTokenAccount);
    _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);

    assert.ok(_gameUserTokenAccount.amount.toNumber() == 150);
    assert.ok(_adminTokenAccount.amount.toNumber() == 1850);

    const [_pda, _nonce] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode("dungeon"))],
      program.programId
    );

    await program.rpc.exchange(new anchor.BN(100), {
      accounts: {
        gameUser: provider.wallet.publicKey,
        gameUserReceiveTokenAccount: gameUser2TokenAccount,
        adminMainAccount: provider.wallet.publicKey,
        pdaAccount: pda,
        pdaDepositTokenAccount: adminTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        escrowAccount: escrowAccount.publicKey,
      },
    });

    _gameUser2TokenAccount = await mint.getAccountInfo(gameUser2TokenAccount);
    _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);

    assert.ok(_gameUser2TokenAccount.amount.toNumber() == 100);
    assert.ok(_adminTokenAccount.amount.toNumber() == 1750);
  });

  it("Opening treasure to get tokens", async () => {
    const gameUserAccount = _myAccount;

    const gameUserReceiveTokenAccount = await mint.createAccount(
      gameUserAccount.publicKey
    );

    await program.rpc.openTreasure(new anchor.BN(1), {
      accounts: {
        myAccount: gameUserAccount.publicKey,
        gameUser: provider.wallet.publicKey,
        gameUserReceiveTokenAccount: gameUserReceiveTokenAccount,
        adminMainAccount: provider.wallet.publicKey,
        pdaAccount: pda,
        pdaDepositTokenAccount: adminTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        escrowAccount: escrowAccount.publicKey,
      },
    });

    const account = await program.account.myAccount.fetch(
      gameUserAccount.publicKey
    );
    const result = account.data.toNumber();

    assert.ok(bit_test(result, 1));

    const _gameUserReceiveTokenAccount = await mint.getAccountInfo(gameUserReceiveTokenAccount);
    const _adminTokenAccount = await mint.getAccountInfo(adminTokenAccount);

    assert.ok(_gameUserReceiveTokenAccount.amount.toNumber() == 20);
    assert.ok(_adminTokenAccount.amount.toNumber() == 1730);
  });
});
