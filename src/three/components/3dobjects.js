import { Mesh } from 'three';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {
    setupModel
} from '../setupModel';
import { Aluminium, glass, glassMaterial } from './materials';

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
        console.log(model);
        allModels.push(setupModel(model))
    })
   

}
async function retrieveModel(modelName) {
  
  let requested_model = await allModels.find(objectData=>modelName==objectData.name)
    return requested_model;

}




export {loadModels,retrieveModel}