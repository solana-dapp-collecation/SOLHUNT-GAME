import Phaser from "phaser";

export default class Wall extends Phaser.Physics.Arcade.Sprite {
  // get Coins() {
  //     return Phaser.Math.Between(50, 200)
  // }

  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.anims.play("wall-idle");

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
