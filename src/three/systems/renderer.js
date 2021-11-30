import { sRGBEncoding, WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({ 
    antialias: true,
    alpha: true
});
renderer.outputEncoding =sRGBEncoding;
  
  // turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };