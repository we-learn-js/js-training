import THREE from 'three'
import ViewportAbstract from './abstract'

export default class MeshPerspectiveViewport extends ViewportAbstract {
  constructor(fov = 30, distance = 1000) {
    super(fov, distance)
    this.fov = fov
    this.distance = distance
    this._width = 0.5
    this._height = 0.5
    this._bottom = 0
    this._left = 0.5

    this.camera = new THREE.PerspectiveCamera(this.fov, 1, 1, 10000)
  }

  lookAt(targetX, targetY, targetZ) {
    this.targetX = targetX
    this.targetY = targetY
    this.targetZ = targetZ
    this.camera.position.x = this.targetX - 60
    this.camera.position.y = this.targetY + 60
    return (this.camera.position.z = 60)
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
    return this.camera.lookAt(this.mesh.position)
  }
}
