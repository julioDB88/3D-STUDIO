import { PerspectiveCamera } from 'three';

 function createCamera() {
    // camara
   const  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.set(0, .8, 2);

  return camera;
}

export { createCamera };