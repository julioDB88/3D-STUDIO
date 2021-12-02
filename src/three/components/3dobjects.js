

import { MeshPhongMaterial, RepeatWrapping, TextureLoader, Vector3 } from 'three';
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {
  OBJLoader
} from 'three/examples/jsm/loaders/OBJLoader.js';
import {
  setupModel
} from '../setupModel';
import { AluminiumMaterial, GlassMaterial, TableMaterial } from './materials';



let allModels = [];
async function loadModels(model) {
  const loader = new GLTFLoader();
  const models = await Promise.all([
    loader.loadAsync('../models/mesa.gltf'),
    loader.loadAsync('../models/bruce.glb'),
    loader.loadAsync('../models/dalia.glb'),
    loader.loadAsync('../models/june.glb'),
    loader.loadAsync('../models/max.glb'),
    loader.loadAsync('../models/orris.glb'),
    loader.loadAsync('../models/klee.glb'),
    loader.loadAsync('../models/spray1.glb'),
    loader.loadAsync('../models/cap1.glb'),

    // loader.loadAsync('../models/cap1.glb'),
    // loader.loadAsync('../models/cap2.glb'),
    // loader.loadAsync('../models/cap3.glb'),
  ]);
  models.forEach(model => {
    allModels.push(setupModel(model))
  })


}
async function retrieveModel(modelName) {

  let requested_model = await allModels.find(objectData => modelName == objectData.name)
  if (modelName == 'table') {
    // let texture = await new TextureLoader().loadAsync("../textures/wood.jpg");
    // texture.wrapS = RepeatWrapping;
    // texture.wrapT = RepeatWrapping;
    // texture.repeat.set(4, 4);
    // var cbmaterial = new MeshPhongMaterial({ map: texture });
    let loader = new OBJLoader();
    let table = await loader.loadAsync('../models/table.obj')
    table.scale.set(0.023, 0.023, 0.023);
    table.position.set(0.1, -.81, 1.5)
    table.rotateY(1.5)
    table.name = 'table';
    table.children.forEach(elem => elem.material = TableMaterial);
    console.log(table);
    requested_model = setupModel(table);

  } else if (modelName.includes('spray')) {

    requested_model.material = await AluminiumMaterial;
  } else if (modelName.includes('cap')) {

    requested_model.material = await AluminiumMaterial;
  } else {
    requested_model.material = GlassMaterial;
  }

  return requested_model

}




export { loadModels, retrieveModel }