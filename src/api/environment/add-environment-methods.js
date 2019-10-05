export default function addEnvironmentMethods (environment, http) {
    environment.delete = function(){
          console.log('delete!')
      }
      return environment
  }