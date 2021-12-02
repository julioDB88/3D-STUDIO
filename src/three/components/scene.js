import {  CubeTextureLoader, Scene } from 'three';


async function createScene() {
  const scene = new Scene();
  const loader = new CubeTextureLoader();
    const texture = await loader.loadAsync([
      'textures/px.png',
      'textures/nx.png',
      'textures/py.png',
      'textures/ny.png',
      'textures/pz.png',
      'textures/nz.png',
    ]);
  scene.background = texture;
  

  return scene;
}



export { createScene};