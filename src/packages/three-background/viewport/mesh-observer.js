import THREE from 'three'
import ViewportAbstract from './abstract'
import MousePosition from '../mouse/position'

export default class MeshObserverViewport extends ViewportAbstract {
  constructor(fov = 30, distance = 1000) {
    super(fov, distance)
    this.fov = fov
    this.distance = distance
    this._width = 1
    this._height = 1
    this._bottom = 0
    this._left = 0

    this.camera = new THREE.PerspectiveCamera(this.fov, 1, 1, 10000)
    this.mouse = new MousePosition()
  }

  setTargetMesh(mesh) {
    return (this.target = mesh.position)
  }

  updateCamera() {
    const targetX = this.mouse.x - this.width / 2
    const targetY = this.mouse.y - this.height
    this.camera.position.x += (targetX - this.camera.position.x) * 0.03
    this.camera.position.y += (-targetY - this.camera.position.y) * 0.03
    this.camera.position.z = this.target.z + this.distance

    if (!!this.target) {
      return this.camera.lookAt({
        x: this.target.x,
        y: this.target.y - 50,
        z: this.target.z
      })
    }
  }
}
