const {AmbientLight} = require('three');


function createLights() {
  const light = new AmbientLight(0xFFFFFF, 1);

  light.position.set(10, 10, 10);

  return light;
}

export { createLights };