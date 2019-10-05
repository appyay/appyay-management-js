/**
 * Appyay Delivery API SDK. Allows you to create instances of a client
 * with access to the Appyay Content Delivery API.
 * @namespace appyay
 */

 import api from './api/index'

/**
 * Create a client instance
 * @func
 * @name createClient
 * @memberof appyay
 * @param {Object} params - Client initialization parameters
 * @prop {string} params.apikey - Appyay API key
 * @prop {string} params.environment - Appyay Environment ID
 * @prop {string} params.space - Appyay Space ID
 * @returns {AppyayClientAPI.ClientAPI}
 * @example
 * const appyay = require('appyay')
 * const client = appyay.createClient({
 *  apikey: '<api_key>',
 *  environmentId: '<environment_id>',
 *  spaceId: '<space_id>' //optional
 * })
 */

export function createClient (params) {
   return api(params);
}