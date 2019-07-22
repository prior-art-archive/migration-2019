/**
 * This script, called as `yarn elastic:get`, expects a single parameter corresponding to an
 * ElasticSearch REST API endpoint, e.g. `yarn elastic:get _template/test`.
 */

import rp from 'request-promise-native'

import config from '../../../config'
import logger from '../../../utils/logger'
import { validateEndpoint } from '../utils'

const endpoint = process.argv.pop()

try {
  validateEndpoint(endpoint)
} catch (error) {
  logger.error(error.message)
  process.exit()
}

rp(`${config.ELASTICSEARCH_URL}/${endpoint}`)
  .then(response => logger.info(response))
  .catch(error => logger.error(error.message))
