/// <reference path="libs/phaser/phaser.d.ts" />

import ConstantPlayer from "./constants/player"

export default class Player {
  private sprite: Phaser.Sprite
  private state: any = {}

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
    this.state = {
      angle: <number> ConstantPlayer.angle,
      direction: <boolean> ConstantPlayer.direction,
      point: <Phaser.Point> new Phaser.Point(),
      currentSpeed: <number> ConstantPlayer.currentSpeed
    }
  }

  goReady() {
    if (this.state.currentSpeed > 0)
    {
      // 停止じゃない場合
      if ((this.state.maxVelocity % 2) < this.state.currentSpeed)
      {
        this.state.currentSpeed -= (this.state.deceleration * 3)
      }
      else
      {
        this.state.currentSpeed -= ConstantPlayer.deceleration
      }
    }
    else
    {
      // 停止する
      this.state.currentSpeed = 0

      // 進行方向を変更
      this.state.direction = !this.state.direction
    }
  }

  goFront() {
    if (!this.state.direction)
    {
      // 角度調整
      this.state.angle = this.sprite.angle - 180
      // 前進前の速度調整
      this.goReady()
    }
    else
    {
      this.state.angle = this.sprite.angle

      if (this.state.currentSpeed < ConstantPlayer.maxVelocity)
      {
        this.state.currentSpeed += ConstantPlayer.deceleration
      }
      else
      {
        this.state.currentSpeed = ConstantPlayer.maxVelocity
      }
    }
    this.state.point = this.sprite.body.velocity.rotate(0, 0, this.state.angle, true, this.state.currentSpeed)

    console.log(`angle: ${this.state.angle}`)
    console.log(`sprite.angle: ${this.sprite.angle}`)
    console.log(`speed: ${this.state.currentSpeed}`)
    console.log(`point: ${this.state.point}`)
  }

  goBack() {
    // 減速前進中
    if (this.state.direction)
    {
      // 角度調整
      this.state.angle = this.sprite.angle
      // 速度調整
      this.goReady()
    }
    else
    {
      this.state.angle = this.sprite.angle - 180

      if (this.state.currentSpeed < ConstantPlayer.maxVelocity)
      {
        this.state.currentSpeed += ConstantPlayer.deceleration
      }
      else
      {
        this.state.currentSpeed = ConstantPlayer.maxVelocity
      }
    }
    this.state.point = this.sprite.body.velocity.rotate(0, 0, this.state.angle, true, this.state.currentSpeed)
  }

  rotateRight() {
    this.state.angle = this.sprite.angle += ConstantPlayer.rotationAngle

    if (this.state.currentSpeed <= 0)
    {
      return
    }

    if (!this.state.direction)
    {
      this.state.angle = this.sprite.angle - 180;
    }

    this.sprite.body.velocity.rotate(0, 0, this.state.angle, true, this.state.currentSpeed)
  }

  rotateLeft() {
    this.state.angle = this.sprite.angle -= ConstantPlayer.rotationAngle

    if (this.state.currentSpeed <= 0)
    {
      return
    }

    if (!this.state.direction)
    {
      this.state.angle = this.sprite.angle - 180;
    }

    this.sprite.body.velocity.rotate(0, 0, this.state.angle, true, this.state.currentSpeed)
  }

  fire() {
  }
}