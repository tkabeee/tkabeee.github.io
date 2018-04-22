/// <reference path="libs/phaser/phaser.d.ts" />

import ConstantEnemy from "./constants/enemy"
import Player from "./player"
import Block from "./block"

export default class Build extends Phaser.State {
  preload() {
  }
  create() {
    this.world.setBounds(0, 0, 600, 500)

    // Create Player
    const spriteUnit = this.game.add.sprite(0, 0, 'unit')
    this.game.physics.enable(spriteUnit, Phaser.Physics.ARCADE);
    const unit = new Player(spriteUnit)

    // Create Enemies
    const enemies = []
    let enemyCount = ConstantEnemy.numTotal
    while (enemyCount > 0) {
      const spriteBlock = this.game.add.sprite(this.world.randomX, this.world.randomY, 'enemy', 'block')
      this.game.physics.enable(spriteBlock, Phaser.Physics.ARCADE)
      let block = new Block(spriteBlock)
      enemies.push(block)
      enemyCount--
    }
  }
}
