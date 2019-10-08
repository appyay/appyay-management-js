import itemApi from './item.api';

export default function addItemMethods (item, config) {

    item.update = function(){
        return itemApi.updateItem(config, item.id, {
            fields: item.fields
        });
    }

    item.publish = function(){
        return itemApi.updateItem(config, item.id, {
            status: 'published'
        });
    }

    item.revertToDraft = function(){
        return itemApi.updateItem(config, item.id, {
            status: 'draft'
        });
    }

    item.delete = function(){
        return itemApi.deleteItem(config, item.id);
    }

    item.isDraft = function(){
        return item.status === 'draft';
    }

    item.isPublished = function(){
        return item.status === 'published';
    }

    return item
  }