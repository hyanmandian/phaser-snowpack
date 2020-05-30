import Phaser from "phaser";

import { CHARS } from "../constants";

import { KEY as MAIN_SCENE_KEY } from "./main";

const IMAGE = {
  tileset: "assets/terrain/terrain-16x16.png",
  ...["blue", "brown", "gray", "green", "pink", "purple", "yellow"].reduce(
    (acc, color) => ({
      ...acc,
      [`background:${color}`]: `assets/background/${color}.png`,
    }),
    {}
  ),
};

const SPRITE = {
  ...["idle", "run", "double-jump", "fall", "hit", "wall-jump", "jump"].reduce(
    (acc, state) =>
      CHARS.reduce(
        (acc, char) => ({
          ...acc,
          [`char:${char}-${state}`]: {
            file: `assets/main-characters/${char}/${state}-32x32.png`,
            width: 32,
            height: 32,
          },
        }),
        acc
      ),
    {}
  ),
};

const TILEMAP = [1].reduce((acc, level) => ({ ...acc, [`level:${level}`]: `assets/maps/${level}/tilemap.json` }), {});

export const KEY = "PRELOAD";

export class Scene extends Phaser.Scene {
  constructor() {
    super({ key: KEY });
  }

  preload() {
    Object.entries(IMAGE).forEach(([key, value]) => this.load.image(key, value));
    Object.entries(SPRITE).forEach(([key, { file, width, height }]) =>
      this.load.spritesheet(key, file, { frameWidth: width, frameHeight: height })
    );
    Object.entries(TILEMAP).forEach(([key, value]) => this.load.tilemapTiledJSON(key, value));
  }

  create() {
    this.scene.start(MAIN_SCENE_KEY);
  }
}
