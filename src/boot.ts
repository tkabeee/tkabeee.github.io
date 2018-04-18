module SpaceShip {
  export class Boot extends Phaser.State {
    preload() {
    }

    create() {
      this.game.state.start('Preloader', true, false);
    }
  }
}