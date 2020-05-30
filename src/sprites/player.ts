import { Base } from "./base";

export class Player extends Base {
  constructor(args) {
    super(args);

    this.createPhysics();
    this.createAnimations();
  }

  private createPhysics() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
  }

  private createAnimations() {
    this.scene.anims.create({
      key: "idle",
      frames: this.scene.anims.generateFrameNumbers("char:virtual-guy-idle", { start: 0, end: 32 }),
      repeat: -1,
      frameRate: 16,
    });

    this.scene.anims.create({
      key: "run",
      frames: this.scene.anims.generateFrameNumbers("char:virtual-guy-run", { start: 0, end: 32 }),
      repeat: -1,
      frameRate: 16,
    });

    this.scene.anims.create({
      key: "jump",
      frames: this.scene.anims.generateFrameNumbers("char:virtual-guy-jump", { start: 0, end: 32 }),
      repeat: -1,
      frameRate: 16,
    });

    this.scene.anims.create({
      key: "double-jump",
      frames: this.scene.anims.generateFrameNumbers("char:virtual-guy-double-jump", { start: 0, end: 32 }),
      repeat: -1,
      frameRate: 16,
    });

    this.jump();
  }

  idle() {
    this.anims.play("idle", true);
  }

  run() {
    this.anims.play("run", true);
  }

  jump() {
    this.anims.play("jump", true);
  }

  doubleJump() {
    this.anims.play("double-jump", true);
  }
}
