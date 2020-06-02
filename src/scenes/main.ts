import Phaser from "phaser";

import { CHARS } from "../constants";
import { Player } from "../sprites/player";

export const KEY = "MAIN";

export class Scene extends Phaser.Scene {
  private context: { [key: string]: any } = {};

  constructor() {
    super({ key: KEY });
  }

  renderLevel(key: string) {
    this.context.map = this.make.tilemap({ key: `level:${key}`, tileWidth: 16, tileHeight: 16 });

    const background = this.context.map.properties.find(({ name }) => name === "background");
    this.context.background = this.add.tileSprite(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.context.map.widthInPixels,
      this.context.map.heightInPixels,
      `background:${background.value}`
    );

    this.context.tileset = this.context.map.addTilesetImage("tileset");
    this.context.tiles = this.context.map.createStaticLayer("terrain", this.context.tileset, 0, 0);
    this.context.tiles.setCollisionByProperty({ collides: true });
    this.context.tiles.forEachTile((tile) => {
      if (tile.properties["jump-through"] === true) {
        tile.collideDown = false;
        tile.collideLeft = false;
        tile.collideRight = false;
      }
    });

    const { x, y } = this.context.map.findObject("objects", ({ name }) => name === "player-spawn");
    this.context.player = new Player({ scene: this, x, y, char: CHARS[Math.floor(Math.random() * CHARS.length)] });

    this.physics.add.collider(this.context.player, this.context.tiles);

    this.cameras.main.startFollow(this.context.player);
  }

  create() {
    this.renderLevel("1");
  }

  update() {
    this.context.background.tilePositionY -= 0.5;

    this.context.player.update();
  }
}
