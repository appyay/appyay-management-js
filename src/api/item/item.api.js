import addItemMethods from './add-item-methods'
import getParams from '../get-params'

class ItemAPI{

  /**
   * Get Item
   * @memberof ItemAPI
   * @param  {string} itemId
   * @param  {Object} config - Config object
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  accessToken: '<access_token>', // for write access
   *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.getItem()
   * .then((response) => console.log(response.item))
   * .catch(console.error)
   */
  getItem (config, itemId) {
    if (!itemId) {
      throw new Error('Item ID is missing')
    }
    return config.http
      .get(`/cd/v1/items/${itemId}`, getParams(
        'cd',
        config
        ))
      .then(response => {
        return addItemMethods(response.data.item, config)
      })
      .catch(function (error) {
        return error
      })
  }

  /**
   * Create Item
   * @memberof ItemAPI
   * @param  {string} contentTypeId
   * @param  {Object} data - Data object
   * @param  {Object} config - Config object
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  accessToken: '<access_token>', // for write access
   *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.createItem('<content_type_id', {
   *   fields: {
   *     title: 'New item'
   *   },
   *   status: 'published'
   * })
   * .then((response) => console.log(response.item))
   * .catch(console.error)
   */
  createItem(config, contentTypeId, data){
    if (!contentTypeId) {
      throw new Error('Content Type ID is missing')
    }
    if (!data) {
      throw new Error('Data is missing')
    }
    return config.http
      .post(`/cm/v1/content-types/${contentTypeId}/items`, {item: data}, getParams(
        'cm',
        config
        ))
      .then(response => {
        return addItemMethods(response.data.item, config)
      })
      .catch(function (error) {
        return error
      })
  }

  /**
   * Update Item
   * @memberof ItemAPI
   * @param  {string} itemId
   * @param  {Object} data - Data object
   * @param  {Object} config - Config object
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  accessToken: '<access_token>', // for write access
   *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.updateItem('<item_id>', {
   *   fields: {
   *     title: 'Updated item'
   *   }
   * })
   * .then((response) => console.log(response.item))
   * .catch(console.error)
   */
  updateItem(config, itemId, data){
    if (!itemId) {
      throw new Error('Item ID is missing')
    }
    if (!data) {
      throw new Error('Data is missing')
    }
    return config.http
      .put(`/cm/v1/items/${itemId}`, {item: data}, getParams(
        'cm',
        config
        ))
      .then(response => {
        return addItemMethods(response.data.item, config)
      })
      .catch(function (error) {
        return error
      })
  }

  /**
   * Update multiple Items
   * @memberof ItemAPI
   * @param  {Object} config - Config object
   * @param  {Object} data - Data object
   * @param  {Object=} query - Object with search parameters
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  accessToken: '<access_token>', // for write access
   *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.updateItems('<content_type_id>', {
   *   fields: {
   *     title: 'Updated item'
   *   }
   * })
   * .then(() => console.log('Items updated'))
   * .catch(console.error)
   */
  updateItems(config, contentTypeId, data, query = {}){
    if (!contentTypeId) {
      throw new Error('Content Type ID is missing')
    }
    if (!data) {
      throw new Error('Data is missing')
    }
    return config.http
      .put(`/cm/v1/content-types/${contentTypeId}/items`, {item: data}, getParams(
        'cm',
        config,
        query
        ))
      .catch(function (error) {
        return error
      })
  }

  /**
   * Delete Item
   * @memberof ItemAPI
   * @param  {string} itemId
   * @param  {Object} config - Config object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
    *  accessToken: '<access_token>', // for write access
    *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.deleteItem('<item_id>')
   * .catch(console.error)
   */
  deleteItem (config, itemId) {
    if (!itemId) {
      throw new Error('Item ID is missing')
    }
    return config.http
      .delete(`/cm/v1/items/${itemId}`)
      .catch(function (error) {
        return error
      })
  }

  /**
   * Delete multiple Items
   * @memberof ItemAPI
   * @param  {Object} config - Config object
   * @param  {Object} data - Data object
   * @param  {Object=} query - Object with search parameters
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  accessToken: '<access_token>', // for write access
   *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.deleteItems('<content_type_id>')
   * .then(() => console.log('Items deleted'))
   * .catch(console.error)
   */
  deleteItems(config, contentTypeId, query = {}){
    if (!contentTypeId) {
      throw new Error('Content Type ID is missing')
    }
    return config.http
      .delete(`/cm/v1/content-types/${contentTypeId}/items`, getParams(
        'cm',
        config,
        query
        ))
      .catch(function (error) {
        return error
      })
  }
}

export default new ItemAPI;