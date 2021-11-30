import { Color, CubeTextureLoader, MeshStandardMaterial, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


function createScene() {
  const scene = new Scene();
  scene.background = new Color('skyblue');

  return scene;
}



export { createScene};