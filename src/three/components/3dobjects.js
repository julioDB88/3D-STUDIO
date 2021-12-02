
import { Group, MeshPhongMaterial, Object3D, ObjectLoader, RepeatWrapping, TextureLoader } from 'three';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  OBJLoader
} from 'three/examples/jsm/loaders/OBJLoader.js';


import {
    setupModel
} from '../setupModel';
import { AluminiumMaterial } from './materials';



let allModels=[];
async function loadModels(model) {
    const loader = new GLTFLoader();
    const models= await Promise.all([
        loader.loadAsync('../models/mesa.gltf'),
        loader.loadAsync('../models/bruce.glb'),
        loader.loadAsync('../models/dalia.glb'),
        loader.loadAsync('../models/june.glb'),
        loader.loadAsync('../models/max.glb'),
        loader.loadAsync('../models/orris.glb'),
        loader.loadAsync('../models/klee.glb'),
        loader.loadAsync('../models/spray1.glb'),
        loader.loadAsync('../models/spray2.glb'),
    
        // loader.loadAsync('../models/cap1.glb'),
        // loader.loadAsync('../models/cap2.glb'),
        // loader.loadAsync('../models/cap3.glb'),
    ]);
    models.forEach(model=>{
        allModels.push(setupModel(model))
    })
   

}
async function retrieveModel(modelName) {
   
  let requested_model = await allModels.find(objectData=>modelName==objectData.name)
  if(modelName=='table'){
    let texture = await new TextureLoader().loadAsync("../textures/wood.jpg");
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(4, 4);
    var cbmaterial = new MeshPhongMaterial({ map: texture });
   
    requested_model.material=cbmaterial;

  }
  if(modelName.includes('spray')){
   
    requested_model.material= await AluminiumMaterial;
  }
  if(modelName.includes('cap')){
   
    requested_model.material= await AluminiumMaterial;
  }
  console.log(modelName=='table');

  return requested_model
 
}




export {loadModels,retrieveModel}