const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;
let _myAccount;

function bit_test(num, bit) {
  return (num & (1 << bit)) !== 0;
}

describe("gamedata", () => {
  // Configure the client to use the local cluster.
  // Use a local provider.
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  it("Creates and initializes an account in a single atomic transaction (simplified)", async () => {
    const program = anchor.workspace.Gamedata;
    const myAccount = anchor.web3.Keypair.generate();
    await program.rpc.initialize(new anchor.BN(0), {
      accounts: {
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [myAccount],
    });
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    assert.ok(account.data.eq(new anchor.BN(0)));

    _myAccount = myAccount;
  });

  it("Bit test returns true for user collected treasure with id 1", async () => {
    const treasureId = 1;
    const myAccount = _myAccount;
    const program = anchor.workspace.Gamedata;
    await program.rpc.update(new anchor.BN(treasureId), {
      accounts: {
        myAccount: myAccount.publicKey,
      },
    });

    // Fetch the newly updated account.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was mutated.
    assert.ok(bit_test(account.data.toNumber(), 1));
  });

  it("Bit test teturns true for user collected treasures and false for uncollected treasures", async () => {
    const myAccount = _myAccount;
    const program = anchor.workspace.Gamedata;
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
});
