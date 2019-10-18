import addContentTypeMethods from '../content-type/add-content-type-methods'
import addItemMethods from '../item/add-item-methods'
import getParams from '../get-params'

class EnvironmentAPI {

  /**
   * Get Content Types
   * @memberof EnvironmentAPI
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  accessToken: '<access_token>', // for write access
   *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.getSpace()
   * .then((response) => console.log(response.space))
   * .catch(console.error)
   */
  getContentTypes (config) {
    if (!config.environmentId) {
      throw new Error('Environment ID is missing')
    }
    return config.http
      .get(`/cd/v1/environments/${config.environmentId}/content-types`, getParams(
        'cd',
        config
        ))
      .then(response => {
        response.data.contentTypes = response.data.contentTypes.map((contentType) => addContentTypeMethods(contentType, config))
        return response.data
      })
      .catch(function (error) {
        return error
      })
  }

  /**
   * Get items
   * @memberof EnvironmentAPI
   * @param  {Object} config - Config object
   * @param  {string} environmentId
   * @param  {Object=} query - Object with search parameters
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
    *  accessToken: '<access_token>', // for write access
    *  apikey: '<api_key>', // for read access
   *  environmentId: '<environment_id>'
   * })
   *
   * client.getItems('<environment_id>')
   * .catch(console.error)
   */
  getItems (config, query = {}) {
    if (!config.environmentId) {
      throw new Error('Environment ID is missing')
    }
    return config.http
      .get(`/cd/v1/environments/${config.environmentId}/items`, getParams(
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
 }
export default new EnvironmentAPI;