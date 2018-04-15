export default class CubePlacementAnimator {
  constructor(mesh, xRange = 0, yRange = 0, zRange = 0) {
    this.animate = this.animate.bind(this)
    this.mesh = mesh

    const x = -xRange / 2 + Math.floor(Math.random() * xRange)
    const y = -yRange / 2 + Math.floor(Math.random() * yRange)
    const z = zRange / 2 + Math.floor(Math.random() * zRange)

    this.xTarget = this.mesh.position.x
    this.yTarget = this.mesh.position.y
    this.zTarget = this.mesh.position.z
    this.mesh.position.x = x
    this.mesh.position.y = y
    this.mesh.position.z = z

    this.xVelocity = 0.01 + Math.random() * 0.04
    this.yVelocity = 0.01 + Math.random() * 0.04
    this.zVelocity = 0.01 + Math.random() * 0.0001
  }

  animate() {
    this.mesh.position.x +=
      (this.xTarget - this.mesh.position.x) * this.xVelocity
    this.mesh.position.y +=
      (this.yTarget - this.mesh.position.y) * this.yVelocity
    this.mesh.position.z +=
      (this.zTarget - this.mesh.position.z) * this.zVelocity * 1
    this.animationFrameRequestId = requestAnimationFrame(this.animate)
  }

  cancel() {
    this.animationFrameRequestId &&
      cancelAnimationFrame(this.animationFrameRequestId)
  }
}
