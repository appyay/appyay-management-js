import itemApi from './item.api';

export default function addItemMethods (item, config) {

    item.update = function(){
        return itemApi.updateItem(config, item.id, {
            fields: item.fields
        });
    }
    
    item.delete = function(itemId){
        return itemApi.deleteItem(config, itemId);
    }

    item.publish = function(){
        return itemApi.updateContentType(config, contentTypeId, {
            status: 'published'
        });
    }

    item.revertToDraft = function(){
        return itemApi.updateContentType(config, contentTypeId, {
            status: 'draft'
        });
    }

    item.isDraft = function(){
        return item.status === 'draft';
    }

    item.isPublished = function(){
        return item.status === 'published';
    }

    return item
  }