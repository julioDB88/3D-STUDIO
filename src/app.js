import {
    Studio3d
} from './three/studio'

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

    studio.changeCap(model)
})
$('.change-spray').on('click',function(){

    let model =$(this).attr('id');

    studio.changeSpray(model)
})
window.addEventListener('resize',function(){
  
    studio.onWindowResize();
}) 



startStudio();