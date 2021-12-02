import {  CubeTextureLoader, Scene } from 'three';


async function createScene() {
  const scene = new Scene();
  const loader = new CubeTextureLoader();
    const texture = await loader.loadAsync([
      'textures/px (3).png',
      'textures/nx (2).png',
      'textures/py (2).png',
      'textures/ny (2).png',
      'textures/pz (2).png',
      'textures/nz1.png',
    ]);
  scene.background = texture;
  

  return scene;
}



export { createScene};