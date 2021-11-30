import { PerspectiveCamera } from 'three';

 function createCamera() {
    // camara
   const  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
   camera.position.set(.6, .8, 3.7);

  return camera;
}

export { createCamera };