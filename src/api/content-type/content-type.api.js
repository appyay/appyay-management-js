import addContentTypeMethods from './add-content-type-methods'
import addItemMethods from '../item/add-item-methods'
import getParams from '../get-params'

class ContentTypeAPI{
  

  /**
   * Get Content Type
   * @memberof ContentTypeAPI
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
    *  accessToken: '<access_token>', // for write access
    *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.getContentType()
   * .then((response) => console.log(response.contentType))
   * .catch(console.error)
   */
  getContentType (config, contentTypeId) {
    if (!contentTypeId) {
      throw new Error('Content Type ID is missing')
    }
    return config.http
      .get(`/cd/v1/content-types/${contentTypeId}`, getParams(
        'cd',
        config
        ))
      .then(response => {
        return addContentTypeMethods(response.data.contentType, config)
      })
      .catch(function (error) {
        return error
      })
  }

  /**
   * Get items
   * @memberof ContentTypeAPI
   * @param  {Object} config - Config object
   * @param  {string} contentTypeId
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
    *  accessToken: '<access_token>', // for write access
    *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.getItems('<content_type_id>')
   * .catch(console.error)
   */
  getItems (config, contentTypeId, query = {}) {
    if (!contentTypeId) {
      throw new Error('Content Type ID is missing')
    }
    return config.http
      .get(`/cd/v1/content-types/${contentTypeId}/items`, getParams(
        'cd',
        config,
        query
        ))
      .then(response => {
        response.data.items = response.data.items.map((item) => addItemMethods(item, config))
        return response.data
      })
      .catch(function (error) {
        return error
      })
  }

  /**
   * Update Content Type
   * @memberof ContentTypeAPI
   * @param  {Object} config - Config object
   * @param  {string} contentTypeId
   * @param  {Object} data - Data object
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
    *  accessToken: '<access_token>', // for write access
    *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.updateContentType('<content_type_id>', {
   *   fields: {
   *     title: 'Updated content type'
   *   }
   * })
   * .then((response) => console.log(response.item))
   * .catch(console.error)
   */
  //TODO
  // updateContentType(config, contentTypeId, data){
  //   if (!contentTypeId) {
  //     throw new Error('Content Type ID is missing')
  //   }
  //   if (!data) {
  //     throw new Error('Data is missing')
  //   }
  //   return config.http
  //     .put(`/cm/v1/content-types/${contentTypeId}`, {contentType: data}, getParams(
  //       'cm',
  //       config
  //       ))
  //     .then(response => {
  //       return addContentTypeMethods(response.data.contentType, config.http)
  //     })
  //     .catch(function (error) {
  //       return error
  //     })
  // }


  /**
   * Delete Content Type
   * @memberof ContentTypeAPI
   * @param  {Object} config - Config object
   * @param  {string} contentTypeId
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
    *  accessToken: '<access_token>', // for write access
    *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.deleteItem('<content_type_id>')
   * .catch(console.error)
   */
  deleteContentType (config, contentTypeId) {
    if (!contentTypeId) {
      throw new Error('Content Type ID is missing')
    }
    return config.http
      .delete(`/cm/v1/content-types/${contentTypeId}`)
      .catch(function (error) {
        return error
      })
  }
}

export default new ContentTypeAPI;