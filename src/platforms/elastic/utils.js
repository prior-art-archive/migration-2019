import logger from '../../utils/logger'
import { CONFIG_FILES, ELASTIC_MESSAGES } from './constants'

export const isValidEndpoint = endpoint => CONFIG_FILES.includes(endpoint)

export const getEndpoints = params => (params.includes('--all') ? CONFIG_FILES : params)

export const groupEndpointsByValidity = endpoints => endpoints.reduce((group, endpoint) => {
  group[isValidEndpoint(endpoint) ? 'valid' : 'invalid'].push(endpoint)
  return group
}, {
  valid: [],
  invalid: [],
})

export const logEndpointsSummary = (endpoints) => {
  const invalidLength = endpoints.invalid.length
  const validLength = endpoints.valid.length

  if (invalidLength > 0) logger.warn(`Skipping ${invalidLength} invalid config file${invalidLength === 1 ? '' : 's'}...`)
  if (validLength > 0) logger.info(`Uploading ${validLength} valid config file${validLength === 1 ? '' : 's'}...`)
  else logger.warn(ELASTIC_MESSAGES.INVALID_ARGUMENT)
}
