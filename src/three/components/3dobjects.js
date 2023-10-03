import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { setupModel } from "../setupModel";
import {
  AluminiumMaterial,
  GlassMaterial,
  TableMaterial,
  PlasticMaterial,
} from "./materials";

let allModels = [];
async function loadModels(model) {
  const loader = new GLTFLoader();
  const path = "../models/";
  const models = await Promise.all([
    loader.loadAsync(path + "bruce.glb"),
    loader.loadAsync(path + "cap1.glb"),
    loader.loadAsync(path + "cap2.glb"),
    loader.loadAsync(path + "dalia.glb"),
    loader.loadAsync(path + "june.glb"),
    loader.loadAsync(path + "klee.glb"),
    loader.loadAsync(path + "max.glb"),
    loader.loadAsync(path + "mesa.glb"),
    loader.loadAsync(path + "orris.glb"),
    loader.loadAsync(path + "drone.glb"),
    loader.loadAsync(path + "orange.glb"),
    loader.loadAsync(path + "spray.glb"),
    loader.loadAsync(path + "tokyo.glb"),
    loader.loadAsync(path + "warsaw.glb"),
  ]);

  models.forEach((model) => {
    allModels.push(setupModel(model));
  });
}
async function retrieveModel(modelName) {
  let requested_model = await allModels.find(
    (objectData) => modelName == objectData.name
  );
  if (modelName == "mesa") {
    // let texture = await new TextureLoader().loadAsync("../textures/wood.jpg");
    // texture.wrapS = RepeatWrapping;
    // texture.wrapT = RepeatWrapping;
    // texture.repeat.set(4, 4);
    // var cbmaterial = new MeshPhongMaterial({ map: texture });

    // table.scale.set(0.023, 0.023, 0.023);
    requested_model.position.set(0, -0.5, 0),
      // table.rotateY(1.5)
      // table.name = 'table';

      (requested_model.material = TableMaterial);

    // requested_model = setupModel(table);
  } else if (modelName.includes("spray")) {
    requested_model.material = AluminiumMaterial;

    requested_model.children.forEach(
      (elem) => (elem.material = AluminiumMaterial)
    );
  } else if (modelName.includes("cap")) {
    requested_model.material = PlasticMaterial;
  } else {
    requested_model.material = GlassMaterial;
  }

  return requested_model;
}

export { loadModels, retrieveModel };
