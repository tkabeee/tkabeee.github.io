/// <reference path="libs/phaser/phaser.d.ts" />

import ConstantPlayer from "./constants/player"

export default class Player {
  private sprite: Phaser.Sprite
  constructor(sprite: Phaser.Sprite) {
    this.sprite = sprite
    this.sprite.anchor.setTo(0.5, 0.5)
    // Move
    this.sprite.x = 250
    this.sprite.y = 400
    // Crop
    const cropRect = new Phaser.Rectangle(0, 32, 32, 32)
    this.sprite.crop(cropRect, false)
    this.sprite.body.drag.set(0.2)
    // The maximum velocity in pixels per second sq. that the Body can reach.
    this.sprite.body.maxVelocity.setTo(400, 400)
    // collide world bounds
    this.sprite.body.collideWorldBounds = true

    // Brings the Sprite to the top of the display list it is a child of.
    // http://docs.phaser.io/Phaser.Sprite.html#bringToTop
    this.sprite.bringToTop()

    this.sprite.angle = ConstantPlayer.angle
    this.sprite.body.direction = ConstantPlayer.direction
    this.sprite.body.point = new Phaser.Point()
    this.sprite.body.maxVelocity = ConstantPlayer.maxVelocity
    this.sprite.body.currentSpeed = ConstantPlayer.currentSpeed
    this.sprite.body.deceleration = ConstantPlayer.deceleration
  }

  goReady() {
    if (this.sprite.body.currentSpeed > 0) {
      // 停止じゃない場合
      if ((this.sprite.body.maxVelocity % 2) < this.sprite.body.currentSpeed) {
        this.sprite.body.currentSpeed -= (this.sprite.body.deceleration * 3)
      } else {
        this.sprite.body.currentSpeed -= this.sprite.body.deceleration
      }
    } else {
      // 停止する
      this.sprite.body.currentSpeed = 0

      // 進行方向を変更
      this.sprite.body.direction = !this.sprite.body.direction
    }
  }

  goFront() {
    console.log(!this.sprite.body.direction)
    if (!this.sprite.body.direction)
    {
      // 角度調整
      console.log(!this.sprite.angle)
      console.log(!this.sprite.body.angle)
      this.sprite.body.angle = this.sprite.angle - 180
      // 前進前の速度調整
      // this.goReady()
    }
    else
    {
      this.sprite.body.angle = this.sprite.angle

      if (this.sprite.body.currentSpeed < this.sprite.body.maxVelocity)
      {
        this.sprite.body.currentSpeed += this.sprite.body.deceleration
      }
      else
      {
        this.sprite.body.currentSpeed = this.sprite.body.maxVelocity
      }
    }
    this.sprite.body.point = this.sprite.body.velocity.rotate(0, 0, this.sprite.body.angle, true, this.sprite.body.currentSpeed)
  }

  goBack() {
    // 減速前進中
    if (this.sprite.body.direction) {
      // 角度調整
      this.sprite.body.angle = this.sprite.angle
      // 速度調整
      // this.goReady()
    } else {
      this.sprite.body.angle = this.sprite.angle - 180

      if (this.sprite.body.currentSpeed < this.sprite.body.maxVelocity) {
        this.sprite.body.currentSpeed += this.sprite.body.deceleration
      } else {
        this.sprite.body.currentSpeed = this.sprite.body.maxVelocity
      }
    }
    this.sprite.body.point = this.sprite.body.velocity.rotate(0, 0, this.sprite.body.angle, true, this.sprite.body.currentSpeed)
  }

  rotateRight() {
    this.sprite.body.angle += 4

    if (this.sprite.body.currentSpeed > 0)
    {
      if (!this.sprite.body.direction)
      {
        this.sprite.body.angle = this.sprite.body.angle - 180
      }

      this.sprite.body.velocity.rotate(0, 0, this.sprite.body.angle, true, this.sprite.body.currentSpeed)
    }
  }

  rotateLeft() {
    this.sprite.body.angle -= 4;

    if (this.sprite.body.currentSpeed > 0)
    {
      if (!this.sprite.body.direction)
      {
        this.sprite.body.angle = this.sprite.body.angle - 180;
      }

      this.sprite.body.body.velocity.rotate(0, 0, this.sprite.body.angle, true, this.sprite.body.currentSpeed);
    }
  }

  fire() {
  }
}