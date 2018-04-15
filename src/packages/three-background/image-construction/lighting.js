import THREE from 'three'

export default class ImageUnderConstructionLighting {
  constructor(scene) {
    this.scene = scene
    this.light1 = new THREE.SpotLight(0xffffff, 2.5, 250)
    this.light1.position.set(8000, 100, 100)
    // this.light1.castShadow = true

    this.light2 = new THREE.SpotLight(0xffffff, 1.5, 1000)
    this.light2.position.set(-400, 200, 300)
    this.light2.castShadow = true

    this.light3 = new THREE.SpotLight(0xffffff, 2, 1000)
    this.light3.position.set(0, 200, 1500)
    // this.light3.castShadow = true

    this.light4 = new THREE.SpotLight(0xffffff, 3, 1000)
    this.light4.position.set(699, 200, 1500)
    // this.light4.castShadow = true

    this.scene.add(this.light1)
    this.scene.add(this.light2)
    this.scene.add(this.light3)
    this.scene.add(this.light4)
  }

  addHelpers() {
    const light1Helper = new THREE.PointLightHelper(this.light1, 5)
    const light2Helper = new THREE.PointLightHelper(this.light2, 5)
    this.scene.add(light1Helper)
    this.scene.add(light2Helper)
    this.light1.shadowCameraVisible = false
    return (this.light2.shadowCameraVisible = false)
  }
}
