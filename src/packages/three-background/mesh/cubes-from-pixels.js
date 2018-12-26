import THREE from 'three'
import PixelCube from './cube-from-pixel'

export default class PixelCubesMesh {
  constructor(xSize, ySize, zSize) {
    this.xSize = xSize
    this.ySize = ySize
    this.zSize = zSize
    this.colors = {}
    this.materials = []
    this.geometry = new THREE.Geometry()
    this.material = new THREE.MeshFaceMaterial(this.materials)
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.pixelGeometry = PixelCube.prototype.getGeometry(
      this.xSize,
      this.ySize,
      this.zSize
    )
    this.spacing = 4
    this.width = this.height = this.depth = 0
  }

  addPixel(r, g, b, x, y, z) {
    if (r == null) {
      r = 0
    }
    if (g == null) {
      g = 0
    }
    if (b == null) {
      b = 0
    }
    if (x == null) {
      x = 0
    }
    if (y == null) {
      y = 0
    }
    if (z == null) {
      z = 0
    }
    const materialIndex = this.addColorMaterial(r, g, b)
    const geometry = this.pixelGeometry.clone()
    const matrix = new THREE.Matrix4()
    matrix.makeTranslation(x * this.spacing, y * this.spacing, z * this.spacing)
    geometry.applyMatrix(matrix)

    for (let i = 0; i < geometry.faces.length; i++) {
      const face = geometry.faces[i]
      face.materialIndex = materialIndex
    }

    this.setSize(x, y, z)
    return this.geometry.merge(geometry)
  }

  addColorMaterial(R, G, B) {
    const color = new THREE.Color(R / 255, G / 255, B / 255)
    const hex = PixelCube.prototype.getMaterialId(R, G, B)
    if (this.colors[hex]) {
      return this.colors[hex]
    }

    const idx = this.materials.length
    this.colors[hex] = idx
    if (this.materials[idx] == null) {
      this.materials[idx] = PixelCube.prototype.getMaterial(R, G, B)
    }

    return idx
  }

  setSize(x, y, z) {
    let _size = x * this.spacing + this.pixelGeometry.widthSegments
    if (_size > this.width) {
      this.width = _size
    }

    _size = y * this.spacing + this.pixelGeometry.heightSegments
    if (_size > this.height) {
      this.height = _size
    }

    _size = z * this.spacing + this.pixelGeometry.depthSegments
    if (_size > this.depth) {
      return (this.depth = _size)
    }
  }

  centerGeometry() {
    const matrix = new THREE.Matrix4()
    matrix.makeTranslation(-(this.width / 2), -this.height / 2, -this.depth / 2)
    return this.geometry.applyMatrix(matrix)
  }

  getMesh() {
    return this.mesh
  }
}
