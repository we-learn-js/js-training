import THREE from 'three'

export default class MainLight {
  constructor() {
    this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
    this.light.color.setHSL(0.6, 0.5, 0.9)
    this.light.position.y = 500
  }
}
