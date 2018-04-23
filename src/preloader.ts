/// <reference path="libs/phaser/phaser.d.ts" />

export default class Preloader extends Phaser.State {
  preload() {
    this.load.image('unit', 'assets/phaser/unit.png')
    // this.load.image('block', 'assets/phaser/block.png')
    this.load.image('bullet', 'assets/phaser/bullet.png')
    this.load.spritesheet('kaboom', 'assets/phaser/explosion.png', 64, 64, 23)
  }
  create() {
    this.game.state.start('Build', true, false)
  }
}