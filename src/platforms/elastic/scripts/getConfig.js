/**
 * This script expects a single parameter corresponding to an ElasticSearch REST API endpoint,
 * e.g. `_template/test`.
 */

import logger from '../../../utils/logger'
import { getConfig } from '..'

const endpoint = process.argv.pop()

getConfig(endpoint)
  .then(response => logger.info(response))
  .catch(error => logger.error(error.message))
  .then(() => process.exit())
