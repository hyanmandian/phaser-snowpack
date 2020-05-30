import Phaser from "phaser";

export abstract class Base extends Phaser.Physics.Arcade.Sprite {
  constructor({ scene, x, y, texture }) {
    super(scene, x, y, texture, 0);
  }
}
