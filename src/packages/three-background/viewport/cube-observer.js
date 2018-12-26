import THREE from 'three'
import ViewportAbstract from './abstract'

export default class CubeObserverViewport extends ViewportAbstract {
  constructor(fov = 30, distance = 1000) {
    super(fov, distance)
    this.fov = fov
    this.distance = distance
    this._width = 0.5
    this._height = 0.5
    this._bottom = 0
    this._left = 0

    this.camera = new THREE.PerspectiveCamera(this.fov, 1, 1, 10000)
  }

  lookAt(targetX, targetY, targetZ) {
    this.targetX = targetX
    this.targetY = targetY
    this.targetZ = targetZ
  }

  setTargetMesh(mesh) {
    return (this.mesh = mesh)
  }

  updateCamera() {
    if (!this.mesh) {
      return
    }
    const xRatio = this.mesh.position.x / this.targetX
    const yRatio = this.mesh.position.y / this.targetY

    this.camera.position.x = this.mesh.position.x * xRatio
    this.camera.position.y = this.mesh.position.y * yRatio
    this.camera.position.z = this.mesh.position.z + 20
    return this.camera.lookAt({
      x: this.targetX,
      y: this.targetY,
      z: this.targetZ
    })
  }
}
