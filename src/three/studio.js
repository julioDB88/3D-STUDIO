"use strict";
import {
  loadModels,
  retrieveModel
} from "./components/3dobjects";
import {
  createCamera
} from "./components/camera.js";
import {
  createCube
} from "./components/cube.js";
import {
  createScene
} from "./components/scene.js";
import {
  createLights
} from './components/lights.js';
import {
  createRenderer
} from "./systems/renderer.js";
import {
  Resizer
} from "./systems/Resizer.js";
import {
  createControls
} from './systems/controls.js';
import {
  MeshStandardMaterial,
  Vector3
} from "three";
import {
  Aluminium,
  glass
} from "./components/materials";
import {
  spray1
} from "./components/locations";


class Studio3d {

  constructor(container) {

    this.currentGlass = null;
    this.currentCap = null;
    this.currentCollar = null;
    this.camera = createCamera();
    this.container = container
    this.renderer = createRenderer();
    this.scene = createScene();
    container.append(this.renderer.domElement);
    this.controls = createControls(this.camera, this.renderer.domElement);
    this.controls.update()

    const {
      direct_light,
      ambient_light
    } = createLights();
    direct_light.intensity = 1.9;
    this.scene.add(direct_light, ambient_light)

    this.renderer.setSize(container.offsetWidth, container.offsetHeight);


  }

  onWindowResize() {

    let w = window.innerWidth/1.22;
    let h = window.innerHeight/1.001;
    this.renderer.setSize(w, h);
    this.render()

  }

  async changeGlass(newGlass) {
    let oldGlass = this.scene.getObjectByName(this.currentGlass.name)

    this.scene.remove(oldGlass)

    const model = await retrieveModel(newGlass)

    this.currentGlass = model;

    model.material = glass;
    // model.material.needsUpdate=true;
    // model.updateMatrix();
    this.scene.add(model)
    this.render()

  }

  //cambiar el spray con collar
  async changeSpray(newCollar) {

    if (this.currentCollar) {
      let oldCollar = this.scene.getObjectByName(this.currentCollar.name)
      this.scene.remove(oldCollar)
    }

    const model = await retrieveModel(newCollar)

    let location = spray1.find(elem => elem.name == this.currentGlass.name).data.location
    let dimensions = spray1.find(elem => elem.name == this.currentGlass.name).data.dimensions
    model.position.set(location.x, location.y, location.z);
    console.log(model.position, location);
    model.material = Aluminium;
    this.currentCollar = model;
    this.currentCollar
    this.scene.add(model)

    this.render()

  }

  //cambiar el tapon
  async changeCap(newCap) {
    let oldCap = this.scene.getObjectByName(this.currentCap.name)
    this.scene.remove(oldCap)
    const model = await retrieveModel(newCap)
    this.currentCap = model;
    this.scene.add(model)
    this.render()
  }

  async init() {
    await loadModels();
    const model = await retrieveModel('bruce')
    model.name = 'bruce'
    this.currentGlass = model;
    this.currentGlass.material = glass;


    this.scene.add(this.currentGlass);

  }


  render() {

    this.renderer.render(this.scene, this.camera);
  }
}
export {
  Studio3d
};