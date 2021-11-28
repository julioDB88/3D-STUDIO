"use strict";
import {
  loadModels,retrieveModel
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


class Studio3d {

  constructor(container) {
  
    this.currentGlass=null;
    this.currentCap=null;
    this.currentCollar=null;
    this.camera = createCamera();
   
    this.renderer = createRenderer();
    this.scene = createScene();
    container.append(this.renderer.domElement);
    this.controls = createControls(this.camera, this.renderer.domElement);
    this.controls.update()

    const light = createLights();
    light.intensity=1.7;
    this.scene.add(light)
    this.renderer.setSize(container.offsetWidth,container.offsetHeight);



    // const resizer = new Resizer(container, this.camera, this.renderer);
    // resizer.onResize = () => {
    //   this.render();
    // };
    
  }

  async changeGlass(newGlass){
    let oldGlass= this.scene.getObjectByName(this.currentGlass.name)
    console.log(oldGlass)
    this.scene.remove(oldGlass)
    const model =await retrieveModel(newGlass)
    this.currentGlass= model;
    this.scene.add(model)
    this.render()

  }
  async changeSpray(newCollar){

    if(this.currentCollar){
      let oldCollar= this.scene.getObjectByName(this.currentCollar.name)
      console.log(oldCollar)
      this.scene.remove(oldCollar)
    }
 
    const model =await retrieveModel(newCollar)
    this.currentCollar= model;
    this.scene.add(model)
    this.render()
    
  }
 async changeCap(newCap){
    let oldCap= this.scene.getObjectByName(this.currentCap.name)
    console.log(oldCap)
    this.scene.remove(oldCap)
    const model =await retrieveModel(newCap)
    this.currentCap= model;
    this.scene.add(model)
    this.render()
  }


  async init() {
    await loadModels();
  const model =await retrieveModel('bruce')
  this.currentGlass= model;
  this.scene.add(this.currentGlass);

  }


  render() {

    this.renderer.render(this.scene, this.camera);
  }
}
export {
  Studio3d
};