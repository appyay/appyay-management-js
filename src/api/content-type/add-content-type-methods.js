import contentTypeApi from './content-type.api';

export default function addContentTypeMethods (contentType, config) {

  contentType.getItems = function(query={}){
    return contentTypeApi.getItems(config, contentType.id, query);
  }

  contentType.addItem = function(data){
    return contentTypeApi.createItem(config, contentType.id, data);
  }

  //TODO
  // contentType.update = function(){
  //   return contentTypeApi.updateContentType(config, contentType.id, {
  //     name: contentType.name,
  //     fields: contentType.fields
  //   });
  // }

  contentType.delete = function(contentTypeId){
    return contentTypeApi.deleteContentType(config, contentTypeId);
  }

  return contentType
}
