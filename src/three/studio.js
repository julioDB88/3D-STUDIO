"use strict";
import {
  loadModels,
  retrieveModel
} from "./components/3dobjects";
import {
  createCamera
} from "./components/camera.js";
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
  createGui,
  guiColorControls
} from "./systems/gui";
import {
  createControls
} from './systems/controls.js';

import {
BasicMaterial,
  AluminiumMaterial,
  GlassMaterial
} from "./components/materials";
import {
  locations
} from "./components/locations";
import { MeshStandardMaterial } from "three";



class Studio3d {

  constructor(container) {

    this.currentGlass = null;
    this.currentCap = null;
    this.currentSpray = null;

    this.camera = createCamera();
    this.container = container
    this.renderer = createRenderer();
    this.scene = createScene();
    container.appendChild(this.renderer.domElement);
    this.controls = createControls(this.camera, this.renderer.domElement);

    this.gui = createGui()

    const {
      direct_light,
      ambient_light
    } = createLights();
    direct_light.intensity = 1.9;
    this.scene.add(direct_light, ambient_light)

    this.renderer.setSize(container.offsetWidth, container.offsetHeight);


  }

  /**
   * UPDATES ON CHANGES
   */
  onWindowResize() {

    let w = window.innerWidth / 1.22;
    let h = window.innerHeight / 1.001;
    this.renderer.setSize(w, h);
    this.render()

  }
  updateSprayCoords = async () => {
    let model_locations = locations.find(elem => this.currentSpray.name == elem.name).values
    let coords = model_locations.find(e => e.name === this.currentGlass.name).data.location
    this.currentSpray.position.set(coords.x, coords.y, coords.z);
  }
  updateCapCoords = async () => {
    let model_locations = locations.find(elem => this.currentCap.name == elem.name).values
    let coords = model_locations.find(e => e.name === this.currentGlass.name).data.location
    this.currentCap.position.set(coords.x, coords.y, coords.z);
  }

  /**
   * 
   * CHANGE MODELS-> GLASS, CAPS OR SPRAYS
   */

  async changeGlass(model) {
    let oldModel = this.scene.getObjectByName(this.currentGlass.name)
    let newModel = await retrieveModel(model)


    this.scene.remove(oldModel)
    this.currentGlass = newModel;
    newModel.material = GlassMaterial;
    this.scene.add(newModel)
    await this.updateSprayCoords();
    // await this.updateCapCoords();
    this.render()

  }

  //cambiar el spray 
  async changeSpray(model) {

    const newModel = await retrieveModel(model)

    if (this.currentSpray) {
      let oldModel = this.scene.getObjectByName(this.currentSpray.name)
      this.scene.remove(oldModel)
    }

    newModel.material = AluminiumMaterial;
    this.currentSpray = newModel;
    await this.updateSprayCoords()
    
    this.scene.add(newModel)
    this.render()

  }

  async changeCap(model) {
    const newModel = await retrieveModel(model)

    if (this.currentCap) {
      let oldModel = this.scene.getObjectByName(this.currentCap.name)
      this.scene.remove(oldModel)
    }

    newModel.material = AluminiumMaterial;
    this.currentCap = newModel;
    await this.updateCapCoords()
    
    this.scene.add(newModel)
    this.render()
  }

  
  /**
   * //SETEAR LA INTERFAZ DE THREE
   * @param THREE.MESH glass 
   * @param THREE.MESH spray 
   * @param THREE.MESH cap 
   */

  setGui() {
    // let guiControls = guiColorControls(glass, spray, cap)
    // let colorsFolder = this.gui.addFolder('Colores')
    // colorsFolder.addColor(guiControls, "bottle")
    //   .listen()
    //   .onChange(function (e) {
    //     this.currentGlass.material.color.setStyle(e);
    //   });

    // colorsFolder.addColor(guiControls, "spray")
    //   .listen()
    //   .onChange(function (e) {
    //    this.currentSpray.material.color.setStyle(e);
    //   });

    // colorsFolder.addColor(guiControls, "cap")
    //   .listen()
    //   .onChange(function (e) {
    //   this.currentCap.material.color.setStyle(e);

    //   });
  }

  // SETEAR LOS MODELOS/MESH Y APLICAR MATERIALES
  async setModels() {
    const glass = await retrieveModel('bruce')
    glass.name = 'bruce'
    glass.material = GlassMaterial;
    this.currentGlass = glass;
    const spray = await retrieveModel('spray2')
    spray.material = AluminiumMaterial
    this.currentSpray = spray;
    const cap = await retrieveModel('spray1')
    cap.material = AluminiumMaterial
    this.currentCap = cap;
    this.updateCapCoords();
    this.updateSprayCoords();
  }

  /**
   * INICAR STUDIO 3D
   */
  async init() {

    await loadModels();
    await this.setModels();
    let mesa= await retrieveModel('table')
    mesa.material= new MeshStandardMaterial({color:'white'})
    this.controls.addEventListener( 'change', ()=>{this.renderer.render(this.scene, this.camera)} );
    this.setGui()
    this.scene.add(this.currentGlass, this.currentCap, this.currentSpray,mesa);

  }

  /**
   * RENDERIZAR EN PANTALLA
   */
  render() {
   
    this.controls.update()
    this.renderer.render(this.scene, this.camera);

  }
}


export {
  Studio3d
};