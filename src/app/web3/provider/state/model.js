import { loadGameDataProgram } from "../../program";
import { BN, web3 } from "@project-serum/anchor";

function bitTest(num, bit) {
  return (num & (1 << bit)) !== 0;
}


export class GameDataModel {
  constructor(provider) {
    this.provider = provider;
    this.program = loadGameDataProgram(provider);
    this.baseAccount = web3.Keypair.generate();
  }

  async initialize() {
    console.log(this.provider.wallet.publicKey)
    await this.program.rpc.initialize(new BN(0), {
      accounts: {
        myAccount: this.baseAccount.publicKey,
        user: this.provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [this.baseAccount]
    });
  }

  async getCollectedTreasureInfo() {
    try {
      const account = await this.program.account.myAccount.fetch(
        this.provider.wallet.publicKey
      );
      this.result = account.data.toNumber();
    } catch (err) {
      console.log("Error while fetching collected treasure info", err);
    }
  }

  async addTreasure(treasureId) {
    try {
      await this.program.rpc.update(new BN(treasureId), {
        accounts: {
          myAccount: this.provider.wallet.publicKey,
        },
      });
    } catch (err) {
      console.log("Error while adding collected treasure", err);
    }
  }

  async checkTreasureCollected(treasureId) {
    if (!this.result) {
      const result = await this.getCollectedTreasureInfo();
      return bitTest(result, treasureId);
    }
    return bitTest(this.result, treasureId);
  }
}
