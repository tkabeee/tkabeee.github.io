/// <reference path="libs/phaser/phaser.d.ts" />

export default class Boot extends Phaser.State {
  preload() {
  }
  create() {
    this.game.state.start('Preloader', true, false)
  }
  render() {
    // this.game.debug.bodyInfo(unit, 32, 32);
    // this.game.debug.spriteInfo(unit, 32, 140);
  }
}
