function setupModel(data) {
 
  if(!data.scene){
    
  return data
  }else{
    return data.scene.children[0];
  }

  }

  export { setupModel };