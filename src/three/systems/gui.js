import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

function createGui (){
     const gui = new GUI();
     return gui;
}
function updateGlassColor (e,model) {
    
     model.material.color.setStyle(e);
   }

export{createGui,updateGlassColor };