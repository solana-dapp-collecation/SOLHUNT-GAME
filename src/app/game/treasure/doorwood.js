import Phaser from "phaser";

export default class DoorWood extends Phaser.Physics.Arcade.Sprite {
  // get Coins() {
  //     return Phaser.Math.Between(50, 200)
  // }

  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.anims.play("doorwood-closed");

    scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleTileCollision,
      this
    );
  }

  handleTileCollision(go, tile) {
    if (go !== this) {
      return;
    }

    // console.log('collided');
  }
}
