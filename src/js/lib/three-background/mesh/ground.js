import THREE from 'three'

export default class GroundMesh {
  constructor(size = 10000) {
    this.size = size
    this.material = new THREE.MeshPhongMaterial({
      color: 0xdddddd,
      ambient: 0xaaaaaa,
      shininess: 300,
      specular: 0x333333
    })
    this.geometry = new THREE.PlaneBufferGeometry(this.size, this.size)
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -0.5 * Math.PI
    this.mesh.position.y = -10
    this.mesh.receiveShadow = true
  }
}
