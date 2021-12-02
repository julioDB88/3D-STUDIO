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
} from "./systems/gui";
import {
  createControls
} from './systems/controls.js';

import {
  AluminiumMaterial,
  GlassMaterial
} from "./components/materials";
import {
  locations
} from "./components/locations";





class Studio3d {

  constructor(container) {

    this.currentGlass = null;
    this.currentCap = null;
    this.currentSpray = null;
    this.table= null;

    this.camera = createCamera();
    this.container = container
    this.renderer = createRenderer();
    const {direct_light,ambient_light} = createLights();
    this.direct_light = direct_light;
    this.ambient_light= ambient_light;
    
    
    this.container.appendChild(this.renderer.domElement);
    this.controls = createControls(this.camera, this.renderer.domElement);

    this.gui = createGui()
    


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
    // let dimensions = model_locations.find(e => e.name === this.currentGlass.name).data.dimensions
    this.currentSpray.position.set(coords.x, coords.y, coords.z);
    // this.currentSpray.scale.set(dimensions.x, dimensions.y, dimensions.z);
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
    await this.updateCapCoords();
    this.render()

  }

  //cambiar el spray 
  async changeSpray(model) {

    const newModel = await retrieveModel(model)

    if (this.currentSpray) {
      let oldModel = this.scene.getObjectByName(this.currentSpray.name)
      this.scene.remove(oldModel)
    }

    
    this.currentSpray = newModel;
    // this.currentSpray.material = AluminiumMaterial;
    // this.currentSpray.material.needsUpdate=true;
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
    // 
    this.render()
  }
    /**
   * 
   * QUitar/poner tapon
   */
  async removeCap(model){
    let cap= this.scene.getObjectByName(model)
    this.scene.remove(cap)
  }
  async setCap(){
    let cap= await retrieveModel('cap1')
    this.currentCap = cap;
    this.scene.add(cap)
  }

     /**
   * 
   * QUitar/poner vidrio translucido
   */

  async setOpaqueGlass(){
    this.currentGlass.material.roughness =.7;
    this.render()
  }
  async setTranslucidGlass(){
    this.currentGlass.material.roughness =.07;
    this.render()
  }


  /**
   * //SETEAR LA INTERFAZ DE THREE
   * @param THREE.MESH glass 
   * @param THREE.MESH spray 
   * @param THREE.MESH cap 
   */


  async createGui() {

    let colorsFolder = this.gui.addFolder('Colores')

    let colorControls = {
      bottle: this.currentGlass.material.color.getStyle(),
      spray: this.currentSpray.material.color.getStyle(),
      cap: this.currentCap.material.color.getStyle()
    }

    let botella = this.currentGlass;
    let spray = this.currentSpray;
    let tapon = this.currentCap;
    let that = this;
    let bottle_color = colorsFolder.addColor(colorControls, "bottle")
    bottle_color.onChange(function (e) {
      
      botella.material.color.setStyle(e);
      that.render()
    });

    let spray_color = colorsFolder.addColor(colorControls, "spray")
    spray_color.onChange(function (e) {
      spray.material.color.setStyle(e);
      that.render()

    });

    let cap_color = colorsFolder.addColor(colorControls, "cap");
    cap_color.onChange(function (e) {
      tapon.material.color.setStyle(e);
      that.render()

    });
    colorsFolder.open()


  }

  // SETEAR LOS MODELOS/MESH Y APLICAR MATERIALES
  async setModels() {
    const glass = await retrieveModel('bruce')
    glass.name = 'bruce'
    glass.material = GlassMaterial;
    this.currentGlass = glass;
    const spray = await retrieveModel('spray1')
    spray.material = AluminiumMaterial
    this.currentSpray = spray;
    const cap = await retrieveModel('spray2')
    cap.material = AluminiumMaterial
    this.currentCap = cap;
    this.table = await retrieveModel('table')
    console.log('asdsad',this.table)
    this.updateCapCoords();
    this.updateSprayCoords();
    this.createGui()
  }

  /**
   * INICAR STUDIO 3D
   */
  async init() {

    await loadModels();
    await this.setModels();
    
   
    
    this.scene = await createScene();
   
    this.controls.addEventListener('change', () => { this.renderer.render(this.scene, this.camera) });
    

    this.scene.add(this.ambient_light,this.direct_light,this.currentGlass,  this.currentSpray,this.table)
    //this.currentCap,

  }

  /**
   * RENDERIZAR EN PANTALLA
   */
  render() {


    this.renderer.render(this.scene, this.camera);

  }
}


export {
  Studio3d
};