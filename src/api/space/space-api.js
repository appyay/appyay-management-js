import getParams from '../get-params'


class SpaceAPI{

  /**
   * Get Space
   * @memberof AppyayClientAPI
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
   * client.getSpace()
   * .then((response) => console.log(response.space))
   * .catch(console.error)
   */
  getSpace (config) {
    if (!config.environmentId) {
      throw new Error('Environment ID is missing')
    }
    return config.http
      .get(`/cd/v1/environments/${config.environmentId}/space`, getParams(
        'cd',
        config
      ))
      .then(response => {
        return addSpaceMethods(response.data.space, config.http)
      })
      .catch(function (error) {
        return error
      })
  }
 
}
export default new SpaceAPI;