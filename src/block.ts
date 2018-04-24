/// <reference path="libs/phaser/phaser.d.ts" />

import ConstantEnemy from "./constants/enemy";

export default class Block {
  public sprite: Phaser.Sprite
  private state: any = {}
  constructor(sprite: Phaser.Sprite) {
    this.sprite = sprite
    this.sprite.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
    this.sprite.anchor.set(0.5)
    // 固定する
    this.sprite.body.immovable = true
    // マップ外への動作
    this.sprite.body.collideWorldBounds = true
    // bounce設定
    this.sprite.body.bounce.setTo(0, 0)

    this.state = {
      health: <number> ConstantEnemy.health,
      alive: <boolean> true
    }
  }

  damage() {
    this.state.health -= 1

    if (this.state.health > 0)
    {
      return false
    }

    this.state.alive = false
    this.sprite.kill()
    console.log('kill!!')

    return true
  }
}
