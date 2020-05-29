import Pasher from "phaser";

class Scene extends Phaser.Scene {
  private context: { [key: string]: any } = {};

  preload() {
    this.load.spritesheet("char:virtual-guy-idle", "assets/main-characters/virtual-guy/idle-32x32.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("terrain", "assets/terrain/terrain-16x16.png");
    this.load.image("background:gray", "assets/background/gray.png");
    this.load.tilemapTiledJSON("level-1", "assets/maps/1/tilemap.json");
  }

  createMap() {
    this.context.map = this.make.tilemap({ key: "level-1", tileWidth: 16, tileHeight: 16 });
    this.context.background = this.add.tileSprite(0, 0, 1600, 800, "background:gray");
    this.context.tileset = this.context.map.addTilesetImage("terrain");
    this.context.layer = this.context.map.createStaticLayer(0, this.context.tileset, 0, 0);
    this.context.layer.setCollisionByProperty({ collides: true });
  }

  createPlayer() {
    const { x, y } = this.context.map.findObject("Objects", (obj) => obj.name === "Spawn");

    this.context.player = this.physics.add.sprite(x, y, "char:virtual-guy-idle");
    this.context.player.setBounce(0.2);
    this.context.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("char:virtual-guy-idle", {
        start: 0,
        end: 32,
      }),
      frameRate: 16,
      repeat: -1,
    });
    this.anims.play("idle", this.context.player);

    this.physics.add.collider(this.context.player, this.context.layer);
  }

  create() {
    this.createMap();
    this.createPlayer();
  }

  updateMap() {
    this.context.background.tilePositionY -= 0.25;
  }

  updatePlayer(time: number, delta: number) {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.context.player.body.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      this.context.player.body.setVelocityX(200);
    }
    if (cursors.up.isDown && this.context.player.body.onFloor()) {
      this.context.player.body.setVelocityY(-500);
    }
  }

  update(time: number, delta: number) {
    this.updateMap();
    this.updatePlayer(time, delta);
  }
}

const game = new Pasher.Game({
  type: Pasher.AUTO,
  width: 800,
  height: 400,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  scene: Scene,
});
