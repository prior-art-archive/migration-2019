import rp from 'request-promise-native'

import config from '../../config'
import { getFileContents } from '../../utils'
import { ELASTIC_MESSAGES } from './constants'
import { isValidEndpoint } from './utils'

/**
 * Gets the provided ElasticSearch configuration data from its corresponding REST API endpoint.
 *
 * @param  {String} endpoint REST API endpoint
 * @return {Promise}         Promise that resolves when the request resolves
 */
export const getConfig = endpoint => new Promise((resolve, reject) => {
  if (!isValidEndpoint(endpoint)) reject(new Error(ELASTIC_MESSAGES.INVALID_ARGUMENT))

  rp.get(`${config.ELASTICSEARCH_URL}/${endpoint}`)
    .then(response => resolve(response))
    .catch(error => reject(new Error(error.message)))
})

/**
 * Uploads the provided ElasticSearch configuration file to its corresponding REST API endpoint.
 *
 * @param  {String} endpoint Endpoint for the config file, matching both the REST API endpoint
 *                           destination and the config file relative to
 *                           `/src/platforms/elastic/configFiles`
 * @return {Promise}         Promise that resolves when the file uploads, or rejects if in error
 */
export const putConfig = endpoint => new Promise((resolve, reject) => {
  if (!isValidEndpoint(endpoint)) reject(new Error(ELASTIC_MESSAGES.INVALID_ARGUMENT))

  const absolutePathToLocalConfigFile = `${__dirname}/configFiles/${endpoint}.json`
  try {
    const fileContents = getFileContents(absolutePathToLocalConfigFile)
    if (fileContents.length === 0) reject(new Error(`${ELASTIC_MESSAGES.EMPTY_CONFIG}: ${endpoint}`))
    rp.put({
      url: `${config.ELASTICSEARCH_URL}/${endpoint}`,
      body: fileContents,
    })
      .then(() => resolve(`${ELASTIC_MESSAGES.UPLOAD_SUCCESS}: ${endpoint}`))
      .catch(error => reject(new Error(error.message)))
  } catch {
    reject(new Error(`${ELASTIC_MESSAGES.UNREADABLE_CONFIG}: ${endpoint}`))
  }
})
