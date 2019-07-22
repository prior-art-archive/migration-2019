// Disabled because we expect to have more exports.
/* eslint-disable import/prefer-default-export */

const isValidEndpoint = endpoint => endpoint
  && endpoint.length > 0
  && endpoint.startsWith('_')

export const validateEndpoint = (endpoint) => {
  if (!isValidEndpoint(endpoint)) throw new Error('You need to provide a valid endpoint argument.')
  return true
}
