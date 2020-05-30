import { Base, ConstructorParams as BaseConstructorParams } from "./base";

export class Player extends Base {
  private char: string;
  private jumps = 2;
  private jumping = false;
  private previousY: number;

  constructor({ char, ...args }: BaseConstructorParams) {
    super({ ...args, texture: `char:${char}-idle` });

    this.char = char;
    this.previousY = args.y;

    this.createPhysics();
    this.createAnimations();
  }

  private createPhysics() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
  }

  private createAnimations() {
    this.scene.anims.create({
      key: "idle",
      frames: this.scene.anims.generateFrameNumbers(`char:${this.char}-idle`, { start: 0, end: 32 }),
      repeat: -1,
      frameRate: 16,
    });

    this.scene.anims.create({
      key: "run",
      frames: this.scene.anims.generateFrameNumbers(`char:${this.char}-run`, { start: 0, end: 32 }),
      repeat: -1,
      frameRate: 16,
    });

    this.scene.anims.create({
      key: "jump",
      frames: this.scene.anims.generateFrameNumbers(`char:${this.char}-jump`, { start: 0, end: 32 }),
      repeat: -1,
      frameRate: 16,
    });

    this.scene.anims.create({
      key: "double-jump",
      frames: this.scene.anims.generateFrameNumbers(`char:${this.char}-double-jump`, { start: 0, end: 32 }),
      repeat: -1,
      frameRate: 16,
    });

    this.scene.anims.create({
      key: "fall",
      frames: this.scene.anims.generateFrameNumbers(`char:${this.char}-fall`, { start: 0, end: 32 }),
      repeat: -1,
      frameRate: 16,
    });
  }

  update() {
    const cursors = this.scene.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.setFlipX(true);
      this.setVelocityX(-200);
      this.body.blocked.down && this.anims.play("run", true);
    } else if (cursors.right.isDown) {
      this.setFlipX(false);
      this.setVelocityX(200);
      this.body.blocked.down && this.anims.play("run", true);
    } else {
      this.setVelocityX(0);
      this.body.blocked.down && this.anims.play("idle", true);
    }

    if (this.body.blocked.down) {
      this.jumps = 2;
      this.jumping = false;
    }

    if (this.previousY < this.y) {
      this.anims.play("fall", true);
    }

    if (cursors.up.isUp) {
      this.jumping = false;
    } else if (cursors.up.isDown && this.jumps > 0 && !this.jumping) {
      this.jumping = true;

      if (this.body.blocked.down) {
        this.anims.play("jump", true);
        this.jumps -= 1;
      } else {
        this.anims.play("double-jump", true);
        this.jumps -= 1;
      }

      this.setVelocityY(-200);
    }

    this.previousY = this.y;
  }
}
