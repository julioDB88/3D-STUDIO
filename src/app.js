import {
    Studio3d
} from './three/studio'
import * as $ from 'jquery';
import {WEBGL } from './three/webgl';
let canvas = document.getElementById('3dstudio');
const studio = new Studio3d(canvas);

function startStudio() {
    studio.init().then(() => studio.render())
}

$('.change-glass').on('click',function(){
    let model =$(this).attr('id');
    studio.changeGlass(model)
})
$('.change-cap').on('click',function(){
    let model =$(this).attr('id');
        if($('.remove-cap').hasClass('d-none')){
            $('.capping').toggleClass('d-none')
        }

    studio.changeCap(model)
})
$('.change-spray').on('click',function(){

    let model =$(this).attr('id');

    studio.changeSpray(model)
})
$('.painting').on('click',function(){
    if($(this).hasClass('set-opaque')){
        studio.setOpaqueGlass()
    }else{
        studio.setTranslucidGlass() 
    }
$('.painting').toggleClass('d-none')
 
})

$('.capping').on('click',function(){
    if($(this).hasClass('set-cap')){
        studio.setCap()
    }else{
        studio.removeCap() 
    }
$('.capping').toggleClass('d-none')
 
})

window.addEventListener('resize',function(){
  
    studio.onWindowResize();
}) 

if (WEBGL.isWebGLAvailable()){
    startStudio();
}else{
    const warning = WEBGL.getWebGLErrorMessage();
    document.getElementById( '3dstudio' ).appendChild( warning );
}

