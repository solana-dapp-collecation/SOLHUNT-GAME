import Phaser, { Scenes } from "phaser";
import fullHeart from "./assets/heart_full.png";
import damagedHeart from "./assets/heart_empty.png";
//import {livesReamaing} from './index'
import sceneEvents from "./events/eventsCenter";

let health = 3;
let hearts;

export default class Heart extends Phaser.Scene {
  constructor() {
    super({ key: "game-ui" });
  }

  preload() {
    this.load.image("heart-full", fullHeart);
    this.load.image("heart-empty", damagedHeart);
  }

  create() {
    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    });

    // console.log('hert', lives)

    //if(health > 0){
    this.hearts.createMultiple({
      key: "heart-full",
      setXY: {
        x: 10,
        y: 10,
        stepX: 16,
      },
      quantity: 3,
    });
    //}

    sceneEvents.on("player-healt-changed", this.handlePlayerHealthChange, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off(
        "player-healt-changed",
        this.handlePlayerHealthChange,
        this
      );
    });
  }

  handlePlayerHealthChange(health) {
    //console.log('lizard hit', health);

    this.hearts.children.each((go, index) => {
      // console.log(index, health);
      const heart = go;
      if (index < health) {
        heart.setTexture("heart-full");
      } else {
        heart.setTexture("heart-empty");
      }
    });
  }
}
