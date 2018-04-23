/// <reference path="libs/phaser/phaser.d.ts" />

import Boot from "./boot"
import Preloader from "./preloader"
import Build from "./build"

export default class Game extends Phaser.Game {
  private size: any = {}
  constructor(width: number, height: number) {
    super(width, height, Phaser.AUTO, 'field', null)

    this.state.add('Boot', Boot, false)
    this.state.add('Preloader', Preloader, false)
    this.state.add('Build', Build, false)

    this.state.start('Boot')
  }
}