import THREE from 'three'
import ViewportAbstract from "./abstract"

export default class MeshPerspectiveViewport extends ViewportAbstract {
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
      distance = 400
    }
    this.distance = distance
    super(this.fov, this.distance)
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
    if (!!!this.mesh) {
      return
    }
    const xRatio = this.mesh.position.x / this.targetX
    const yRatio = this.mesh.position.y / this.targetY
    return this.camera.lookAt(this.mesh.position)
  }
}
