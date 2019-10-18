const axios = require('axios')

const baseURL = 'http://localhost:3000'//'https://api.appyay.com'
var axiosOptions = {
  baseURL: baseURL,
  params: {}
}

import spaceApi from './space/space-api';
import environmentApi from './environment/environment.api';
import contentTypeApi from './content-type/content-type.api';
import itemApi from './item/item.api';

/**
 * AppyayClientAPI
 * @param {Object} config - Config object
 * @example
 * const appyay = require('appyay')
 * const client = appyay.createClient({
  *  accessToken: '<access_token>', // for write access
  *  apikey: '<api_key>', // for read access
 *  environmentId: '<environment_id>'
 * })
 */
export default function api (config) {
  if (!config.accessToken) {
    throw new Error('Access token is missing')
}

  // axiosOptions.params.apikey = config.apikey

  var http = axios.create(axiosOptions)
 
  http.interceptors.request.use(function (axiosConfig) {
    axiosConfig.headers.Authorization =  `Bearer ${config.accessToken}`;
    return axiosConfig;
  });

  config.http = http

  /**
   * Get Space
   */
  function getSpace () {
    return spaceApi.getSpace(config)
  }

  /**
   * Get Content Types
   */
  function getContentTypes () {
    return environmentApi.getContentTypes(config)
  }

  /**
   * Get Content Type
   */
  function getContentType (contentTypeId) {
    return contentTypeApi.getContentType(config, contentTypeId)
  }

  /**
   * Get Items of a Content Type
   */
  function getItems (contentTypeId, query = {}) {
    return contentTypeApi.getItems(config, contentTypeId, query)
  }

  /**
   * Get Items of an Environment
   */
  function getEnvironmentItems (query = {}) {
    return environmentApi.getItems(config, query)
  }

  /**
   * Get Item
   */
  function getItem (itemId) {
    return itemApi.getItem(config, itemId)
  }

  
  /**
   * Get Item by slug
   */
  function getItemBySlug (itemSlug, query = {}) {
    return new Promise(async function(resolve, reject){
      query.slug = itemSlug;
      query.limit = 1;
      let response = await getEnvironmentItems(query);
      if(response.items.length){
        resolve({item: response.items[0]});
      }
      resolve(null);
    });
  }

  /**
   * Create Item
   */
  function createItem (contentTypeId, data) {
    return itemApi.createItem(config, contentTypeId, data)
  }

  /**
   * Update Item
   */
  function updateItem (itemId, data) {
    return itemApi.updateItem(config, itemId, data)
  }

   /**
   * Update multiple Items
   */
  function updateItems (contentTypeId, data, query = {}) {
    return itemApi.updateItems(config, contentTypeId, data, query)
  }

  /**
   * Delete Item
   */
  function deleteItem (itemId) {
    return itemApi.deleteItem(config, itemId)
  }

  /**
   * Delete multiple Items
   */
  function deleteItems (contentTypeId, query = {}) {
    console.log('delete items')
    return itemApi.deleteItems(config, contentTypeId, query)
  }

  return {
    getSpace: getSpace,
    getContentTypes: getContentTypes,
    getContentType: getContentType,
    getItems: getItems,
    getEnvironmentItems: getEnvironmentItems,
    getItem: getItem,
    getItemBySlug: getItemBySlug,
    createItem: createItem,
    updateItem: updateItem,
    updateItems: updateItems,
    deleteItem: deleteItem,
    deleteItems: deleteItems
  }
}
