export default function addSpaceMethods (space, config) {
    space.delete = function(){
          console.log('delete space!')
      }
      return space
  }