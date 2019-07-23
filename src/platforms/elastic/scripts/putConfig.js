/**
 * This script expects a single parameter corresponding to an ElasticSearch REST API endpoint,
 * e.g. `_template/test`, or the keyword `--all`, which will upload all config files listed in the
 * `CONFIG_FILES` constant.
 */

import { flatten } from '../../../utils'
import logger from '../../../utils/logger'
import { putConfig, putAllConfigs } from '..'

const shouldUploadAll = process.argv.includes('--all')
const endpoint = process.argv.pop()

// This may be too clever by half, but to DRY up the Promise response handling, we assign the
// appropriate upload function (all or single) to `configFn` and call it, then handle the response
// identically for both cases. (The response is a string for the single and an array for the all,
// thus the flattening.)
const configFn = shouldUploadAll ? putAllConfigs : putConfig.bind(null, endpoint)
configFn.call()
  .then(response => flatten([response]).map(logger.info))
  .catch(error => logger.error(error.message))
  .then(() => process.exit())
