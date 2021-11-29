import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

function createGui (){
     const gui = new GUI();
     return gui;
}
const  guiColorControls = (bottle,spray,cap)=>{return {
     bottle : bottle.material.color.getStyle(),
     spray : spray.material.color.getStyle(),
     cap : cap.material.color.getStyle()
   };}
export{createGui,guiColorControls};