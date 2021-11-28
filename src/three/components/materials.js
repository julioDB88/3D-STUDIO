const {BackSide,MeshStandardMaterial,MeshPhysicalMaterial} = require('three');

const glassSettings={
    metalness: .9,
    roughness: .5,
    envMapIntensity: 0.9,
    clearcoat: 1,
    transparent: true,
    // transmission: .95,
    opacity: .5,
    reflectivity: 0.2,
    refractionRatio: 0.985,
    ior: 0.9,
    side: BackSide,
    };

const Basic =   new MeshStandardMaterial()
const glass= new MeshPhysicalMaterial(glassSettings);
const Aluminium =  new MeshPhysicalMaterial({
    metalness: 1,
    clearcoat: 1.0,
});

module.exports={glass,Basic,Aluminium};