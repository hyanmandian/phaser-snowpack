import Phaser from "phaser";

import { Scene as PreloaderScene } from "./scenes/preload";
import { Scene as MainScene } from "./scenes/main";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [PreloaderScene, MainScene],
};

window.addEventListener("load", () => new Phaser.Game(config));
