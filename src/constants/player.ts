export default class ConstantPlayer {
  // 角度
  public static angle = -90  // 正面
  // 方向
  public static faceForward = true // 前:true 後ろ:false
  // Point object
  public static point = new Phaser.Point()
  // 基本速度
  public static maxVelocity = 200
  // 現在の速度
  public static currentSpeed = 0
  // 加速値
  public static acceleration = 4
  // 減速値
  public static deceleration = 4
  // 回転角度
  public static rotationAngle = 4
}
