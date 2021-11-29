const {BackSide,MeshStandardMaterial,MeshPhysicalMaterial, MixOperation, RGBFormat, LinearMipmapLinearFilter, WebGLCubeRenderTarget, MeshPhongMaterial} = require('three');

const glassSettings={
  metalness: 0,
  roughness: 1,
  envMapIntensity: 0.9,
  clearcoat: 1,
  transparent: true,
  transmission: .95,
  opacity: 1,
  reflectivity: 0.2,
    side: BackSide,
    };
    const glass2=
    {
    
        fog: true,
        blending: 1,
        side: 2,
        vertexColors: false,
        opacity: 1,
        format: 1022,
        transparent: false,
        blendSrc: 204,
        blendDst: 205,
        blendEquation: 100,
        blendSrcAlpha: null,
        blendDstAlpha: null,
        blendEquationAlpha: null,
        depthFunc: 3,
        depthTest: true,
        depthWrite: true,
        stencilWriteMask: 255,
        stencilFunc: 519,
        stencilRef: 0,
        stencilFuncMask: 255,
        stencilFail: 7680,
        stencilZFail: 7680,
        stencilZPass: 7680,
        stencilWrite: false,
        clippingPlanes: null,
        clipIntersection: false,
        clipShadows: false,
        shadowSide: null,
        colorWrite: true,
        precision: null,
        polygonOffset: false,
        polygonOffsetFactor: 0,
        polygonOffsetUnits: 0,
        dithering: false,
        alphaToCoverage: false,
        premultipliedAlpha: false,
        visible: true,
        toneMapped: true,
        userData: {},
        version: 0,
    
        color: {
          r: 0.800000011920929,
          g: 0.800000011920929,
          b: 0.800000011920929
        },
        roughness: 0.19230769574642181,
        metalness: 0,
        map: null,
        lightMap: null,
        lightMapIntensity: 1,
        aoMap: null,
        aoMapIntensity: 1,
        emissive: {
          r: 0,
          g: 0,
          b: 0
        },
        emissiveIntensity: 1,
        emissiveMap: null,
        bumpMap: null,
        bumpScale: 1,
        normalMap: null,
        normalMapType: 0,
        normalScale: {
          x: 1,
          y: -1
        },
        displacementMap: null,
        displacementScale: 1,
        displacementBias: 0,
        roughnessMap: null,
        metalnessMap: null,
        alphaMap: null,
        envMap: null,
        envMapIntensity: 1,
        refractionRatio: 0.98,
        wireframe: false,
        wireframeLinewidth: 1,
        wireframeLinecap: "round",
        wireframeLinejoin: "round",
        flatShading: false,
        
      }

const BasicMaterial =   new MeshStandardMaterial()
let crt= new WebGLCubeRenderTarget(
  1024,
  {
    format: RGBFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter
  }
)
const GlassMaterial= new MeshPhongMaterial({
  shininess: 100,
  color: 0xffffff,
  specular: 0xffffff,
  envMap: crt.texture,
  reflectivity:0.45,
  refractionRatio: 0.5,
  transparent: true,
  side: BackSide,
  combine: MixOperation
});

const AluminiumMaterial =  new MeshPhysicalMaterial({
    metalness: 1,
    clearcoat: 1.0,
});

module.exports={GlassMaterial,BasicMaterial,AluminiumMaterial};