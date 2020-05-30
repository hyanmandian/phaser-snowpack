import Phaser from "phaser";

import { Player } from "../sprites/player";

export const KEY = "MAIN";

export class Scene extends Phaser.Scene {
  private context: { [key: string]: any } = {};

  constructor() {
    super({ key: KEY });
  }

  createMap() {
    this.context.map = this.make.tilemap({ key: "level:1", tileWidth: 16, tileHeight: 16 });
    this.context.background = this.add.tileSprite(0, 0, 1600, 800, "background:gray");
    this.context.tileset = this.context.map.addTilesetImage("terrain");
    this.context.layer = this.context.map.createStaticLayer(0, this.context.tileset, 0, 0);
    this.context.layer.setCollisionByProperty({ collides: true });
  }

  createPlayer() {
    const { x, y } = this.context.map.findObject("Objects", ({ name }) => name === "Player Spawn");
    this.context.player = new Player({ scene: this, x, y, texture: "char:pink-man-idle" });
    this.physics.add.collider(this.context.player, this.context.layer);
  }

  create() {
    this.createMap();
    this.createPlayer();
  }

  updateMap() {
    this.context.background.tilePositionY -= 0.25;
  }

  updatePlayer() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.context.player.flipX = true;

      this.context.player.body.setVelocityX(-200);
      this.context.player.body.onFloor() && this.context.player.run();
    } else if (cursors.right.isDown) {
      this.context.player.flipX = false;

      this.context.player.body.setVelocityX(200);
      this.context.player.body.onFloor() && this.context.player.run();
    } else {
      this.context.player.body.setVelocityX(0);
      this.context.player.body.onFloor() && this.context.player.idle();
    }

    if (this.context.player.body.onFloor()) {
      this.context.jumps = 2;
      this.context.jumping = false;
    }

    if (cursors.up.isUp) {
      this.context.jumping = false;
    } else if (cursors.up.isDown && this.context.jumps > 0 && !this.context.jumping) {
      this.context.jumping = true;

      if (this.context.player.body.onFloor()) {
        this.context.player.jump();
        this.context.jumps -= 1;
      } else {
        this.context.player.doubleJump();
        this.context.jumps -= 1;
      }

      this.context.player.body.setVelocityY(-200);
    }
  }

  update() {
    this.updateMap();
    this.updatePlayer();
  }
}
