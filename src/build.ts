/// <reference path="libs/phaser/phaser.d.ts" />

import ConstantEnemy from "./constants/enemy"
import Player from "./player"
import Block from "./block"

export default class Build extends Phaser.State {
  private unit: Player
  private enemies: any = []
  private bullets: Phaser.Group
  private inputKeys: any = {}

  preload() {
  }

  create() {
    this.world.setBounds(0, 0, this.game.width, this.game.height)

    // Create Player
    const spriteUnit = this.game.add.sprite(0, 0, 'unit')
    this.unit = new Player(spriteUnit)

    // Create Enemies
    let enemyCount = ConstantEnemy.numTotal
    while (enemyCount > 0) {
      const spriteBlock = this.game.add.sprite(this.world.randomX, this.world.randomY, 'undefined')
      const block = new Block(spriteBlock)
      this.enemies.push(block.sprite)
      enemyCount--
    }

    // Create Bullets
    this.bullets = this.game.add.group()
    this.bullets.enableBody = true
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE
    this.bullets.createMultiple(3, 'bullet', 0, false)
    this.bullets.setAll('anchor.x', 0.5)
    this.bullets.setAll('anchor.y', 0.5)
    this.bullets.setAll('outOfBoundsKill', true)
    this.bullets.setAll('checkWorldBounds', true)

    // TODO: 衝突の判定

    // The Keyboard Input manager.
    // Creates and returns an object containing 4 hotkeys for Up, Down, Left and Right.
    this.inputKeys.cursors = this.game.input.keyboard.createCursorKeys()
    this.inputKeys.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    //  Stop the following keys from propagating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR])
  }

  update() {
    // 左旋回
    if (this.inputKeys.cursors.left.isDown) {
      this.unit.rotateLeft()
    }

    // 左旋回
    if (this.inputKeys.cursors.right.isDown) {
      this.unit.rotateRight()
    }

    // 前進
    if (this.inputKeys.cursors.up.isDown) {
      this.unit.goFront()
    }

    // 後進
    if (this.inputKeys.cursors.down.isDown) {
      this.unit.goBack()
    }

    // Shoot
    if (this.inputKeys.spacebar.isDown) {
      this.unit.fire(this.bullets)
    }
  }
}
