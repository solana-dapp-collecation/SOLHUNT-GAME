import Phaser, { Scenes } from "phaser";
import fullHeart from "./assets/ui_heart_full.png";
import damagedHeart from "./assets/ui_heart_empty.png";
//import {livesReamaing} from './index'
import sceneEvents from "./events/eventsCenter";

let coin = 0;
let hearts;
let key = 0;
let chainlink = 0;

export default class Coin extends Phaser.Scene {
  constructor() {
    super({ key: "coins" });
  }

  preload() {
    //this.load.image('heart-full', fullHeart)
  }

  create() {
    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    });

    this.coinCount = this.add.text(23, 23, coin);
    this.keyCount = this.add.text(23, 38, key);
    this.chainlink_count = this.add.text(24, 59, chainlink);

    console.log("hert", coin);

    this.hearts.createMultiple({
      key: "coin",
      setXY: {
        x: 10,
        y: 30,
        stepX: 25,
      },
      quantity: 1,
    });

    this.hearts.createMultiple({
      key: "key",
      setXY: {
        x: 10,
        y: 43,
        stepX: 25,
      },
      quantity: 1,
    });

    this.hearts.createMultiple({
      key: "chainlink",
      setXY: {
        x: 10,
        y: 65,
        stepX: 25,
      },
      quantity: 1,
    });

    //}

    sceneEvents.on("player-coin-mint", this.handlePlayerCoinMint, this);
    sceneEvents.on("player-key-mint", this.handleplayerkeyMint, this);
    sceneEvents.on(
      "player-chainlink-mint",
      this.handleplayerchainlinkMint,
      this
    );

    // this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    //     sceneEvents.off('player-healt-changed', this.handlePlayerHealthChange, this)
    // })
  }

  handlePlayerCoinMint(coin) {
    this.coinCount.setText(coin);
  }

  handleplayerkeyMint(key) {
    this.keyCount.setText(key);
  }

  handleplayerchainlinkMint(chainlink) {
    this.chainlink_count.setText(chainlink);
  }
}
