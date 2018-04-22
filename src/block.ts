/// <reference path="libs/phaser/phaser.d.ts" />

export default class Block {
  private sprite: Phaser.Sprite
  private health: number = 3
  private alive: boolean = true
  constructor(sprite: Phaser.Sprite) {
    this.sprite = sprite
    this.sprite.anchor.set(0.5)
    // 固定する
    this.sprite.body.immovable = true
    // マップ外への動作
    this.sprite.body.collideWorldBounds = true
    // bounce設定
    this.sprite.body.bounce.setTo(0, 0)
  }
  damage() {
    this.health -= 1
    if (this.health <= 0) {
      console.log('kill!!')
      this.alive = false
      this.sprite.kill()
      return true
    }
    return false
  }
}
