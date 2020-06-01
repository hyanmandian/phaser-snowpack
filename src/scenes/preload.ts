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

  renderLoading() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const box = this.add.graphics();
    const boxWidth = 320;
    const boxHeight = 50;
    const boxCenterX = centerX - boxWidth / 2;
    const boxCenterY = centerY - boxHeight / 2;
    box.fillStyle(0xffffff);
    box.fillRect(boxCenterX, boxCenterY, boxWidth, boxHeight);

    const bar = this.add.graphics();
    const barMargin = 10;
    const barWidth = boxWidth - barMargin;
    const barHeight = 40;
    const barCenterX = boxCenterX + barMargin / 2;
    const barCenterY = boxCenterY + barMargin / 2;

    const loadingText = this.make
      .text({
        x: centerX,
        y: centerY - 50,
        text: "Loading",
        style: { fill: "#ffffff" },
      })
      .setOrigin(0.5, 0.5);

    const percentText = this.make
      .text({
        x: centerX,
        y: centerY + boxHeight,
        text: "0%",
        style: { fill: "#ffffff" },
      })
      .setOrigin(0.5, 0.5);

    function handleProgress(value: string) {
      const numericValue = parseFloat(parseFloat(value).toFixed(2));

      percentText.setText(`${numericValue * 100}%`);

      bar.fillStyle(0x000000, 1).fillRect(barCenterX, barCenterY, barWidth * numericValue, barHeight);
    }

    this.load.on("progress", handleProgress);

    this.load.once("complete", () => {
      box.destroy();
      bar.destroy();
      loadingText.destroy();
      percentText.destroy();
      this.load.off("progress", handleProgress);
    });
  }

  loadAssets() {
    Object.entries(IMAGE).forEach(([key, value]) => this.load.image(key, value));
    Object.entries(SPRITE).forEach(([key, { file, width, height }]) =>
      this.load.spritesheet(key, file, { frameWidth: width, frameHeight: height })
    );
    Object.entries(TILEMAP).forEach(([key, value]) => this.load.tilemapTiledJSON(key, value));
  }

  preload() {
    this.renderLoading();
    this.loadAssets();
  }

  create() {
    this.scene.start(MAIN_SCENE_KEY);
  }
}
