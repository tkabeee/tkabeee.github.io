/// <reference path="libs/phaser/phaser.d.ts" />

module SpaceShip {

  export class Game extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.AUTO, 'field', null)
    }
  }
}