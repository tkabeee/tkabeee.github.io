module SpaceShip {
  export class Preloader extends Phaser.State {
    preload() {
      this.load.image('unit', 'assets/phaser/unit.png')
    }

    create() {
    }
  }
}