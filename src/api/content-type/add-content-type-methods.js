import contentTypeApi from './content-type.api';
import itemApi from '../item/item.api';

export default function addContentTypeMethods (contentType, config) {

  contentType.getItems = function(query={}){
    console.log('ct config', config)
    return contentTypeApi.getItems(config, contentType.id, query);
  }

  contentType.addItem = function(data){
    return itemApi.createItem(config, contentType.id, data);
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
