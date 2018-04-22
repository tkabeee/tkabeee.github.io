/// <reference path="libs/phaser/phaser.d.ts" />

import ConstantPlayer from "./constants/player"

export default class Player {
  private sprite: Phaser.Sprite
  constructor(sprite: Phaser.Sprite) {
    this.sprite = sprite
    this.sprite.anchor.setTo(0.5, 0.5);
    // Move
    this.sprite.x = 250;
    this.sprite.y = 400;
    // Crop
    const cropRect = new Phaser.Rectangle(0, 32, 32, 32);
    this.sprite.crop(cropRect, false)
    this.sprite.body.drag.set(0.2);
    // The maximum velocity in pixels per second sq. that the Body can reach.
    this.sprite.body.maxVelocity.setTo(400, 400);
    // collide world bounds
    this.sprite.body.collideWorldBounds = true;

    // Brings the Sprite to the top of the display list it is a child of.
    // http://docs.phaser.io/Phaser.Sprite.html#bringToTop
    this.sprite.bringToTop();

    // 角度
    this.sprite.angle = ConstantPlayer.angle;  // 正面
    // 方向
    // this.direction = true; // 前:true 後ろ:false
    // Point object
    // this.point = new Phaser.Point();
    // 基本速度
    // this.maxVelocity = 200;
    // 現在の速度
    // this.currentSpeed = 0;
    // 減速値
    // this.deceleration = 4;
  }
}