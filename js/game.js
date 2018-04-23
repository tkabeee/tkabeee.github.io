!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);class i extends Phaser.State{preload(){}create(){this.game.state.start("Preloader",!0,!1)}render(){}}class r extends Phaser.State{preload(){this.load.image("unit","assets/phaser/unit.png"),this.load.image("bullet","assets/phaser/bullet.png"),this.load.spritesheet("kaboom","assets/phaser/explosion.png",64,64,23)}create(){this.game.state.start("Build",!0,!1)}}class a{}a.numTotal=8,a.health=3;class o{}o.angle=-90,o.faceForward=!0,o.point=new Phaser.Point,o.minVelocity=-200,o.maxVelocity=400,o.currentSpeed=0,o.acceleration=6,o.deceleration=4,o.rotationAngle=4;class n{constructor(t){this.state={},this.sprite=t,this.sprite.game.physics.enable(this.sprite,Phaser.Physics.ARCADE),this.sprite.anchor.setTo(.5,.5),this.sprite.x=250,this.sprite.y=400;const e=new Phaser.Rectangle(0,32,32,32);this.sprite.crop(e,!1),this.sprite.body.drag.set(.2),this.sprite.body.maxVelocity.setTo(400,400),this.sprite.body.collideWorldBounds=!0,this.sprite.bringToTop(),this.sprite.angle=o.angle,this.state={faceForward:o.faceForward,point:new Phaser.Point,currentSpeed:o.currentSpeed}}goReady(){0==this.state.currentSpeed&&(this.state.faceForward=!this.state.faceForward)}decelerate(){this.state.currentSpeed<=0?this.state.currentSpeed=0:o.maxVelocity%2<this.state.currentSpeed?this.state.currentSpeed-=2*o.deceleration:this.state.currentSpeed-=o.deceleration}goFront(){this.state.faceForward?this.state.currentSpeed<o.maxVelocity?this.state.currentSpeed+=o.acceleration:this.state.currentSpeed=o.maxVelocity:(this.decelerate(),this.goReady()),this.sprite.game.physics.arcade.velocityFromAngle(this.sprite.angle,this.state.currentSpeed,this.sprite.body.velocity)}goBack(){this.state.faceForward?(this.decelerate(),this.goReady()):o.minVelocity<this.state.currentSpeed?this.state.currentSpeed-=o.deceleration:this.state.currentSpeed=o.minVelocity,this.sprite.game.physics.arcade.velocityFromAngle(this.sprite.angle,this.state.currentSpeed,this.sprite.body.velocity)}rotate(t){if(!(this.state.currentSpeed<=0)){switch(!0){case"left"==t:this.sprite.angle-=o.rotationAngle;break;case"right"==t:this.sprite.angle+=o.rotationAngle}this.sprite.game.physics.arcade.velocityFromAngle(this.sprite.angle,this.state.currentSpeed,this.sprite.body.velocity)}}rotateRight(){this.rotate("right")}rotateLeft(){this.rotate("left")}fire(){}}class h{constructor(t){this.state={},this.sprite=t,this.sprite.game.physics.enable(this.sprite,Phaser.Physics.ARCADE),this.sprite.anchor.set(.5),this.sprite.body.immovable=!0,this.sprite.body.collideWorldBounds=!0,this.sprite.body.bounce.setTo(0,0),this.state={health:a.health,alive:!0}}damage(){return this.state.health-=1,!(this.state.health>0)&&(this.state.alive=!1,this.sprite.kill(),console.log("kill!!"),!0)}}class c extends Phaser.State{preload(){}create(){this.world.setBounds(0,0,this.game.width,this.game.height);const t=this.game.add.sprite(0,0,"unit");this.unit=new n(t);const e=[];let s=a.numTotal;for(;s>0;){const t=this.game.add.sprite(this.world.randomX,this.world.randomY,"undefined");let i=new h(t);e.push(i),s--}this.cursors=this.game.input.keyboard.createCursorKeys();this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)}update(){this.cursors.left.isDown&&this.unit.rotateLeft(),this.cursors.right.isDown&&this.unit.rotateRight(),this.cursors.up.isDown&&this.unit.goFront(),this.cursors.down.isDown&&this.unit.goBack()}}window.onload=(()=>{new class extends Phaser.Game{constructor(t,e){super(t,e,Phaser.AUTO,"field",null),this.size={},this.state.add("Boot",i,!1),this.state.add("Preloader",r,!1),this.state.add("Build",c,!1),this.state.start("Boot")}}(window.innerWidth,window.innerHeight)})}]);