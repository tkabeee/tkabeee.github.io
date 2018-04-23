/// <reference path="libs/phaser/phaser.d.ts" />

import ConstantEnemy from "./constants/enemy"
import Player from "./player"
import Block from "./block"

export default class Build extends Phaser.State {
  private unit: Player
  private cursors: Phaser.CursorKeys

  preload() {
  }
  create() {
    this.world.setBounds(0, 0, 600, 600)

    // Create Player
    const spriteUnit = this.game.add.sprite(0, 0, 'unit')
    this.unit = new Player(spriteUnit)

    // Create Enemies
    const enemies = []
    let enemyCount = ConstantEnemy.numTotal
    while (enemyCount > 0) {
      const spriteBlock = this.game.add.sprite(this.world.randomX, this.world.randomY, 'block')
      let block = new Block(spriteBlock)
      enemies.push(block)
      enemyCount--
    }

    // TODO: 衝突の判定

    // The Keyboard Input manager.
    // Creates and returns an object containing 4 hotkeys for Up, Down, Left and Right.
    this.cursors = this.game.input.keyboard.createCursorKeys()
    const fireKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }

  update() {
    // 左旋回
    if (this.cursors.left.isDown) {
      this.unit.rotateLeft()
    }

    // 左旋回
    if (this.cursors.right.isDown) {
      this.unit.rotateRight()
    }

    // 前進
    if (this.cursors.up.isDown) {
      this.unit.goFront()
    }

    // 後進
    if (this.cursors.down.isDown) {
      this.unit.goBack()
    }
  }
}
