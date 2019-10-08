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
   * Get Items
   */
  function getItems (contentTypeId, query = {}) {
    return contentTypeApi.getItems(config, contentTypeId, query)
  }

  /**
   * Get Item
   */
  function getItem (itemId) {
    return itemApi.getItem(config, itemId)
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
   * Delete Item
   */
  function deleteItem (itemId) {
    return itemApi.deleteItem(config, itemId)
  }

  return {
    getSpace: getSpace,
    getContentTypes: getContentTypes,
    getContentType: getContentType,
    getItems: getItems,
    getItem: getItem,
    createItem: createItem,
    updateItem: updateItem,
    deleteItem: deleteItem
  }
}
