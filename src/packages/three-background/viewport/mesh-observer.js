import THREE from 'three'
import ViewportAbstract from "./abstract"
import MousePosition from "../mouse/position"

export default class MeshObserverViewport extends ViewportAbstract {
  constructor(fov, distance) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) {
        super()
      }
      let thisFn = (() => {
        this
      }).toString()
      let thisName = thisFn
        .slice(thisFn.indexOf('{') + 1, thisFn.indexOf(';'))
        .trim()
      eval(`${thisName} = this;`)
    }
    if (fov == null) {
      fov = 30
    }
    this.fov = fov
    if (distance == null) {
      distance = 1000
    }
    this.distance = distance
    super(this.fov, this.distance)
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
    const targetX = (this.mouse.x - this.width / 2) * 0.5
    const targetY = (this.mouse.y - this.height) * 0.5
    this.camera.position.x += (targetX - this.camera.position.x) * 0.03
    this.camera.position.y += (-targetY - this.camera.position.y) * 0.03
    this.camera.position.z = this.target.z + this.distance

    if (!!this.target) {
      return this.camera.lookAt({
        x: this.target.x,
        y: this.target.y,
        z: this.target.z
      })
    }
  }
}
