import addContentTypeMethods from '../content-type/add-content-type-methods'
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
 }
export default new EnvironmentAPI;