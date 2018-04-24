/// <reference path="libs/phaser/phaser.d.ts" />

import ConstantPlayer from "./constants/player"

export default class Player {
  public sprite: Phaser.Sprite
  private state: any = {}

  constructor(sprite: Phaser.Sprite) {
    this.sprite = sprite
    this.sprite.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
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
      faceForward: <boolean> ConstantPlayer.faceForward,
      point: <Phaser.Point> new Phaser.Point(),
      currentSpeed: <number> ConstantPlayer.currentSpeed,
      bulletTime: <number> 0
    }
  }

  private goReady() : void {
    if (this.state.currentSpeed == 0)
    {
      // 進行方向を変更
      this.state.faceForward = !this.state.faceForward
    }
  }

  private decelerate() : void {
    if (this.state.currentSpeed <= 0)
    {
      this.state.currentSpeed = 0
      return
    }

    if ((ConstantPlayer.maxVelocity % 2) < this.state.currentSpeed)
    {
      this.state.currentSpeed -= (ConstantPlayer.deceleration * 2)
      return
    }

    this.state.currentSpeed -= ConstantPlayer.deceleration
  }

  public goFront() : void {
    if (!this.state.faceForward)
    {
      this.decelerate()
      this.goReady()
    }
    else
    {
      if (this.state.currentSpeed < ConstantPlayer.maxVelocity)
      {
        this.state.currentSpeed += ConstantPlayer.acceleration
      }
      else
      {
        this.state.currentSpeed = ConstantPlayer.maxVelocity
      }
    }

    this.sprite.game.physics.arcade.velocityFromAngle(this.sprite.angle, this.state.currentSpeed, this.sprite.body.velocity)
  }

  public goBack() : void {
    // 減速前進中
    if (this.state.faceForward)
    {
      this.decelerate()
      this.goReady()
    }
    else
    {
      if (ConstantPlayer.minVelocity < this.state.currentSpeed)
      {
        this.state.currentSpeed -= ConstantPlayer.deceleration
      }
      else
      {
        this.state.currentSpeed = ConstantPlayer.minVelocity
      }
    }

    this.sprite.game.physics.arcade.velocityFromAngle(this.sprite.angle, this.state.currentSpeed, this.sprite.body.velocity)
  }

  private rotate(direction: string) : void {
    if (this.state.currentSpeed <= 0)
    {
      return
    }

    switch (true) {
      case direction == 'left':
        this.sprite.angle -= ConstantPlayer.rotationAngle
        break
      case direction == 'right':
        this.sprite.angle += ConstantPlayer.rotationAngle
        break
    }

    this.sprite.game.physics.arcade.velocityFromAngle(this.sprite.angle, this.state.currentSpeed, this.sprite.body.velocity)
  }

  public rotateRight() : void {
    this.rotate('right')
  }

  public rotateLeft() : void {
    this.rotate('left')
  }

  public fire(bullets: Phaser.Group) : void {
    const now = this.sprite.game.time.now
    if (now < this.state.bulletTime) return
    this.state.bulletTime = now + ConstantPlayer.fireRate
    const bullet = bullets.getFirstExists(false)
    if (!bullet) return
    bullet.reset(this.sprite.x, this.sprite.y)
    bullet.body.velocity.rotate(0, 0, this.sprite.angle, ConstantPlayer.fireAsDegrees, ConstantPlayer.fireVelocity)
  }
}