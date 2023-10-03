

import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {
  setupModel
} from '../setupModel';
import { AluminiumMaterial, GlassMaterial, TableMaterial ,PlasticMaterial} from './materials';



let allModels = [];
async function loadModels(model) {
  const loader = new GLTFLoader();
  const models = await Promise.all([
   loader.loadAsync("../models/bruce.glb"),
   loader.loadAsync("../models/cap1.glb"),
   loader.loadAsync("../models/cap2.glb"),
   loader.loadAsync("../models/dalia.glb"),
   loader.loadAsync("../models/june.glb"),
   loader.loadAsync("../models/klee.glb"),
   loader.loadAsync("../models/max.glb"),
   loader.loadAsync("../models/mesa.glb"),
   loader.loadAsync("../models/orris.glb"),
   loader.loadAsync("../models/drone.glb"),
   loader.loadAsync("../models/orange.glb"),
   loader.loadAsync("../models/spray.glb"),
   loader.loadAsync("../models/tokyo.glb"),
   loader.loadAsync("../models/warsaw.glb"),

  ]);

  models.forEach(model => {
    allModels.push(setupModel(model))
  })
  
console.log(allModels);

}
async function retrieveModel(modelName) {

  let requested_model = await allModels.find(objectData => modelName == objectData.name)
  if (modelName == 'mesa') {
    // let texture = await new TextureLoader().loadAsync("../textures/wood.jpg");
    // texture.wrapS = RepeatWrapping;
    // texture.wrapT = RepeatWrapping;
    // texture.repeat.set(4, 4);
    // var cbmaterial = new MeshPhongMaterial({ map: texture });
 
    // table.scale.set(0.023, 0.023, 0.023);
    requested_model.position.set(0, -0.5, 0),
    // table.rotateY(1.5)
    // table.name = 'table';
  
    requested_model.material = TableMaterial;
   
    // requested_model = setupModel(table);

  } else if (modelName.includes('spray')) {
  
    requested_model.material =  AluminiumMaterial;
    
    requested_model.children.forEach( elem => elem.material =  AluminiumMaterial);
  } else if (modelName.includes('cap')) {

    requested_model.material = PlasticMaterial;
  } else {

    requested_model.material = GlassMaterial;
  }

  return requested_model

}




export { loadModels, retrieveModel }