const {
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  EquirectangularReflectionMapping,
} = require("three");
const { RGBELoader } = require("three/examples/jsm/loaders/RGBELoader");




const hdrEquirect = new RGBELoader().load(
  "../textures/empty_warehouse_01_4k.hdr",
  () => {
    hdrEquirect.mapping = EquirectangularReflectionMapping;
  }
);
const hdr =  new RGBELoader().load('../textures/royal_esplanade_1k.hdr',
() => {
  hdr.mapping = EquirectangularReflectionMapping;
}
);
const GlassMaterial = new MeshPhysicalMaterial({
    transmission: 1,
    thickness: 1.5,
    roughness: 0.07,
     envMap: hdrEquirect

})

const AluminiumMaterial =  new MeshStandardMaterial( {
  metalness: 1,
  roughness: .2,
  envMap: hdr
} );
const RoomMaterial = new MeshPhysicalMaterial({
  metalness: 1,
  clearcoat: 1.0,
  color:'blue'
});



module.exports = { GlassMaterial,  AluminiumMaterial,RoomMaterial };
