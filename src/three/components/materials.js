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
    const glass2=
    {
        "uuid": "DBB874DB-6EE1-4985-A0D5-0E3BF13F417A",
        "name": "myglass",
        "type": "MeshStandardMaterial",
        "fog": true,
        "blending": 1,
        "side": 2,
        "vertexColors": false,
        "opacity": 1,
        "format": 1022,
        "transparent": false,
        "blendSrc": 204,
        "blendDst": 205,
        "blendEquation": 100,
        "blendSrcAlpha": null,
        "blendDstAlpha": null,
        "blendEquationAlpha": null,
        "depthFunc": 3,
        "depthTest": true,
        "depthWrite": true,
        "stencilWriteMask": 255,
        "stencilFunc": 519,
        "stencilRef": 0,
        "stencilFuncMask": 255,
        "stencilFail": 7680,
        "stencilZFail": 7680,
        "stencilZPass": 7680,
        "stencilWrite": false,
        "clippingPlanes": null,
        "clipIntersection": false,
        "clipShadows": false,
        "shadowSide": null,
        "colorWrite": true,
        "precision": null,
        "polygonOffset": false,
        "polygonOffsetFactor": 0,
        "polygonOffsetUnits": 0,
        "dithering": false,
        "alphaToCoverage": false,
        "premultipliedAlpha": false,
        "visible": true,
        "toneMapped": true,
        "userData": {},
        "version": 0,
        "_alphaTest": 0,
        "defines": {
          "STANDARD": ""
        },
        "color": {
          "r": 0.800000011920929,
          "g": 0.800000011920929,
          "b": 0.800000011920929
        },
        "roughness": 0.19230769574642181,
        "metalness": 0,
        "map": null,
        "lightMap": null,
        "lightMapIntensity": 1,
        "aoMap": null,
        "aoMapIntensity": 1,
        "emissive": {
          "r": 0,
          "g": 0,
          "b": 0
        },
        "emissiveIntensity": 1,
        "emissiveMap": null,
        "bumpMap": null,
        "bumpScale": 1,
        "normalMap": null,
        "normalMapType": 0,
        "normalScale": {
          "x": 1,
          "y": -1
        },
        "displacementMap": null,
        "displacementScale": 1,
        "displacementBias": 0,
        "roughnessMap": null,
        "metalnessMap": null,
        "alphaMap": null,
        "envMap": null,
        "envMapIntensity": 1,
        "refractionRatio": 0.98,
        "wireframe": false,
        "wireframeLinewidth": 1,
        "wireframeLinecap": "round",
        "wireframeLinejoin": "round",
        "flatShading": false,
        "_listeners": {
          "dispose": [
            null
          ]
        }
      }

const BasicMaterial =   new MeshStandardMaterial()
const glassMaterial= new MeshPhysicalMaterial(glassSettings);
const AluminiumMaterial =  new MeshPhysicalMaterial({
    metalness: 1,
    clearcoat: 1.0,
});

module.exports={glassMaterial,BasicMaterial,AluminiumMaterial};