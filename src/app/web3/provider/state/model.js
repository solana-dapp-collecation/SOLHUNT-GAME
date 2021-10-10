import { loadGameDataProgram } from "../../program";
import { BN, web3 } from "@project-serum/anchor";

function bitTest(num, bit) {
  return (num & (1 << bit)) !== 0;
}

const getBaseAccount = () => {
  const accountSecret = localStorage.getItem('baseAccountSecret');
  if(accountSecret) {
    const secret = JSON.parse(accountSecret)
    return web3.Keypair.fromSecretKey(secret);
  }
  const newBaseAccount = web3.Keypair.generate();
  console.log(newBaseAccount)
  window.localStorage.setItem('baseAccountSecret', JSON.stringify(newBaseAccount.secretKey))
  return newBaseAccount;
}


export class GameDataModel {
  constructor(provider) {
    this.provider = provider;
    this.program = loadGameDataProgram(provider);
    this.baseAccount = getBaseAccount();
  }

  async initialize() {
    console.log(this.baseAccount)
    const account = await this.program.rpc.initialize(new BN(0), {
      accounts: {
        myAccount: this.baseAccount.publicKey,
        user: this.provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [this.baseAccount]
    });
    return account;
  }

  async getCollectedTreasureInfo() {
    try {
      const account = await this.program.account.myAccount.fetch(
        this.baseAccount.publicKey
      );
      this.result = account.data.toNumber();
      return this.result;
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
