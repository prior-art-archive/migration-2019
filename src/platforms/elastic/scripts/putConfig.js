/**
 * This script expects one or more parameters corresponding to ElasticSearch REST API endpoints
 * (e.g. `_template/test`), which endpoint must be listed in the `CONFIG_FILES` array, or the
 * keyword `--all`, which will upload all files listed in that array.
 *
 * Any param not present in the `CONFIG_FILES` array will be skipped.
 */

import { flatten } from '../../../utils'
import logger from '../../../utils/logger'
import { getEndpoints, groupEndpointsByValidity, logEndpointsSummary } from '../utils'
import { putConfig } from '..'

// The first two arguments are node boilerplate
const processArgs = process.argv.slice(2)

const endpoints = groupEndpointsByValidity(getEndpoints(processArgs))

logEndpointsSummary(endpoints)

Promise.all(endpoints.valid.map(putConfig))
  .then(response => flatten([response]).map(logger.info))
  .catch(error => logger.error(error.message))
  .then(() => process.exit())
