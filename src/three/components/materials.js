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
const hdr = new RGBELoader().load("../textures/royal_esplanade_1k.hdr", () => {
  hdr.mapping = EquirectangularReflectionMapping;
});
const GlassMaterial = new MeshPhysicalMaterial({
  transmission: 1,
  thickness: 1.5,
  roughness: 0.07,
  envMap: hdrEquirect,
});

const AluminiumMaterial = new MeshStandardMaterial({
  metalness: 1,
  roughness: 0.2,
  color: "rgb(103,112,94)",
  envMap: hdr,
});

const TableMaterial = new MeshStandardMaterial({
  color: "rgb(158,126,126)",
  metalness: 1,
  roughness: 0.2,
  emissive: 0.2,
  envMap: hdr,
});
const PlasticMaterial = new MeshStandardMaterial({
  color: "black",
});

module.exports = {
  GlassMaterial,
  AluminiumMaterial,
  TableMaterial,
  PlasticMaterial,
};
