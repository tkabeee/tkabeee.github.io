export default class ConstantPlayer {
  // 角度
  public static angle = -90  // 正面
  // 方向
  public static direction = true // 前:true 後ろ:false
  // Point object
  public static point = new Phaser.Point()
  // 基本速度
  public static maxVelocity = 200
  // 現在の速度
  public static currentSpeed = 0
  // 減速値
  public static deceleration = 4
}
