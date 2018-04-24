export default class ConstantPlayer {
  // 角度
  public static angle = -90  // 正面
  // 方向
  public static faceForward = true // 前:true 後ろ:false
  // Point object
  public static point = new Phaser.Point()
  // 基本速度
  public static minVelocity = -200
  public static maxVelocity = 320
  // 現在の速度
  public static currentSpeed = 0
  // 加速値
  public static acceleration = 6
  // 減速値
  public static deceleration = 4
  // 回転角度
  public static rotationAngle = 4

  // 砲撃の間隔
  public static fireRate = 300
  //
  public static fireAsDegrees = true
  // 弾の発射間隔
  public static fireVelocity = 600
}
