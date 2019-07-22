/**
 * This script, called as `yarn elastic:configure`, expects a single parameter.
 * This can either be a path corresponding to an ElasticSearch REST API endpoint,
 * e.g. `_template/test`, or the keyword `--all`, which will upload the entire
 * `UPLOAD_MANIFEST` below.
 *
 * It will throw an error if the path provided doesn't exist on the filesystem.
 */
import rp from 'request-promise-native'

import config from '../../../config'
import { getFileContents } from '../../../utils'
import logger from '../../../utils/logger'
import { validateEndpoint } from '../utils'

/**
 * The `UPLOAD_MANIFEST` values are overloaded. They represent two things:
 *
 * - Local paths to the JSON config files relative to the `/src/platforms/elastic/configFiles` root
 * - Remote REST API paths used for GET and PUT operations on that config file, rooted at the
 *   `ELASTICSEARCH_URL`
 *
 * In other words, the local path of the config files on our filesystem should match their path on
 * remote REST API. That's superficially a rigid constraint, but I like that it self-documents the
 * REST API structure.
 */
const UPLOAD_MANIFEST = [
  '_ingest/pipeline/fscrawler_pipeline',
  '_ingest/pipeline/reindex_pipeline',
  '_template/fscrawler_template',
  '_template/fscrawler_reindex_template',
  '_template/uspto-audit-template',
]

/**
 * Uploads the provided ElasticSearch configuration file to its corresponding REST API endpoint.
 *
 * @param  {String} path Path to the config file relative to `/src/platforms/elastic/configFiles`
 * @return {Promise}     Promise for the request to upload the file
 */
const uploadConfigFile = path => new Promise((resolve, reject) => {
  const absolutePath = `${__dirname}/../configFiles/${path}.json`
  try {
    const fileContents = getFileContents(absolutePath)
    return (fileContents.length > 0)
      ? rp.put({
        url: `${config.ELASTICSEARCH_URL}/${path}`,
        body: fileContents,
      })
        .then(() => resolve(`Uploaded ${path}`))
        .catch(error => reject(error))
      : reject(new Error(`No config data found for '${path}'.`))
  } catch {
    return reject(new Error(`Could not read the config file '${path}'.`))
  }
})

const shouldUploadAll = () => process.argv.includes('--all')

const uploadAll = () => {
  Promise.all(UPLOAD_MANIFEST.map(uploadConfigFile))
    .then((messages) => {
      messages.map(logger.info)
      logger.info('All config files uploaded successfully.')
    })
    .catch((error) => {
      logger.error(error.message)
    })
}

const uploadEndpointFromArgs = () => {
  const endpoint = process.argv.pop()
  try {
    validateEndpoint(endpoint)
  } catch (error) {
    logger.error(error.message)
    return
  }
  uploadConfigFile(endpoint)
    .then(message => logger.info(message))
    .catch(error => logger.error(error.message))
}

if (shouldUploadAll()) uploadAll()
else uploadEndpointFromArgs()
