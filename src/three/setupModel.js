function setupModel(data) {
  if(data.scene.children.length==7){
    let object={};   
    object.value=  data.scene
    object.name='room'
  return object
  }else{
    return data.scene.children[0];
  }

  }

  export { setupModel };