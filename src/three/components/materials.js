const {
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  RGBFormat,
  LinearMipmapLinearFilter,
  WebGLCubeRenderTarget,
} = require("three");

const glassSettings1 = new MeshPhysicalMaterial({
  metalness: 0,
  roughness: 1,
  envMapIntensity: 0.9,
  clearcoat: 1,
  transparent: true,
  transmission: .95,
  color: 'white',
  opacity: .2,
  reflectivity: 0.2,
});


const BasicMaterial = new MeshStandardMaterial();
let crt = new WebGLCubeRenderTarget(1024, {
  format: RGBFormat,
  generateMipmaps: true,
  minFilter: LinearMipmapLinearFilter,
});
const GlassMaterial = new MeshPhysicalMaterial({
  metalness: .3,
  roughness: 0.6,
  envMapIntensity: 0.9,
  clearcoat: 1,
  envMap: crt.texture,
  transparent: true,
  transmission: .95,
  opacity: 1,
  reflectivity: 0.2,
})

const AluminiumMaterial = new MeshPhysicalMaterial({
  metalness: .6,
  transmission: .55,
  clearcoat: 1.0,
});
const RoomMaterial = new MeshPhysicalMaterial({
  metalness: 1,
  clearcoat: 1.0,
  color:'blue'
});


module.exports = { GlassMaterial, BasicMaterial, AluminiumMaterial,RoomMaterial };
