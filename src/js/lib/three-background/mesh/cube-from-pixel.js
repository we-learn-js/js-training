import THREE from 'three'

export default class PixelCubeMesh {
  constructor(pixel) {
    this.pixel = pixel
    this.spacing = 4
    this.geometry = this.getGeometry()
    this.material = this.getMaterial(
      this.pixel.red,
      this.pixel.green,
      this.pixel.blue
    )
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.x = this.pixel.x * this.spacing
    this.mesh.position.y = this.pixel.y * this.spacing
  }

  getGeometry(xSize, ySize, zSize) {
    if (xSize == null) {
      xSize = 3
    }
    if (ySize == null) {
      ySize = xSize
    }
    if (zSize == null) {
      zSize = xSize
    }
    return new THREE.BoxGeometry(xSize, ySize, zSize)
  }

  getMaterialId(R, G, B) {
    const color = new THREE.Color(R / 255, G / 255, B / 255)
    return color.getHexString()
  }

  getMaterial(R, G, B) {
    const color = new THREE.Color(R / 255, G / 255, B / 255)
    return new THREE.MeshLambertMaterial({ color })
  }
}
