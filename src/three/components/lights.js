const { AmbientLight, DirectionalLight } = require('three');


function createLights() {
  var direct_light = new DirectionalLight(0xefffff);
  direct_light.position.set(0, 100, 100);
  direct_light.intensity = 1.9;
  const ambient_light = new AmbientLight(0xFFFFFF, 1);

  ambient_light.position.set(1, 100, 10);

  return { ambient_light, direct_light };
}

export { createLights };