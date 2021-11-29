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
import { createGui, guiColorControls } from "./systems/gui";
import {
  createControls
} from './systems/controls.js';
import {
  MeshStandardMaterial,
  Vector3
} from "three";
import {
  Aluminium,
  AluminiumMaterial,
  glass,
  glassMaterial
} from "./components/materials";
import {
  spray1
} from "./components/locations";


class Studio3d {

  constructor(container) {

    this.currentGlass = null;
    this.currentCap = null;
    this.currentSpray = null;
    
    this.camera = createCamera();
    this.container = container
    this.renderer = createRenderer();
    this.scene = createScene();
    container.append(this.renderer.domElement);
    this.controls = createControls(this.camera, this.renderer.domElement);

    this.gui = createGui()
    // this.controls.update()

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

  async changeGlass(model) {
    let oldModel = this.scene.getObjectByName(this.currentGlass.name)
    let newModel = await retrieveModel(model)
 

    this.scene.remove(oldModel)
    this.currentGlass = newModel;
    newModel.material = glassMaterial;
    this.scene.add(newModel)
    this.render()

  }

  //cambiar el spray con collar
  async changeSpray(model) {
    let location,dimensions,oldModel
    const newModel = await retrieveModel(model)

    console.log('studio',newModel,model);
    if (this.currentSpray) {
      oldModel = this.scene.getObjectByName(this.currentSpray.name)
      this.scene.remove(oldModel)
    }

    

    // if(model=='spray1'){
       location = spray1.find(elem => elem.name == this.currentGlass.name).data.location
       dimensions = spray1.find(elem => elem.name == this.currentGlass.name).data.dimensions
    // }
  //   if(model=='spray2'){
  //     location = spray2.find(elem => elem.name == this.currentGlass.name).data.location
  //     dimensions = spray2.find(elem => elem.name == this.currentGlass.name).data.dimensions
  //  }
  
    newModel.position.set(location.x, location.y, location.z);
    newModel.material = AluminiumMaterial;
    this.currentSpray = newModel;
    this.scene.add(newModel)

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

  setGui(glass,spray,cap){
    let guiControls= guiColorControls(glass,spray,cap)
    let colorsFolder= this.gui.addFolder('Colores')
    colorsFolder.addColor(guiControls, "bottle")
    .listen()
    .onChange(function(e) {
      glass.material.color.setStyle(e);
    });

    colorsFolder.addColor(guiControls, "spray")
    .listen()
    .onChange(function(e) {
      spray.material.color.setStyle(e);
    });

    colorsFolder.addColor(guiControls, "cap")
    .listen()
    .onChange(function(e) {
      cap.material.color.setStyle(e);
    });

    this.render()
  }


   async setModels(){
    const glass = await retrieveModel('bruce')
    glass.name = 'bruce'
    glass.material=glassMaterial;
    this.currentGlass = glass;
    const spray = await retrieveModel('spray1')
    console.log(spray);

    spray.material= AluminiumMaterial
    this.currentSpray = spray;
    const cap = await retrieveModel('spray1')
    cap.material= AluminiumMaterial
    this.currentCap = cap;
  }

  async init() {
    await loadModels();
    await this.setModels();

    this.setGui(this.currentGlass,this.currentSpray,this.currentCap)
    // this.currentGlass.material = glass;

    this.scene.add(this.currentGlass,this.currentCap,this.currentSpray);

  }


  render() {
    // requestAnimationFrame(this.render);
    this.controls.update();
    this.camera.lookAt( this.scene.position );
    this.renderer.render(this.scene, this.camera);
   
  }
}
export {
  Studio3d
};