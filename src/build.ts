/// <reference path="libs/phaser/phaser.d.ts" />

import Constant from "./constant"
import Block from "./block"

export default class Build extends Phaser.State {
  preload() {
  }
  create() {
    this.world.setBounds(0, 0, 600, 500)

    const totalEnemies = Constant.NUM_ENEMIES

    const enemies = []
    for (var i = 0; i < totalEnemies; i++) {
      enemies.push(new Block(this.game, this.world.randomX, this.world.randomY));
    }
  }
}
