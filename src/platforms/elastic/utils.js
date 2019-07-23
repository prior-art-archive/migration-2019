// Disabled because we expect to have more exports.
/* eslint-disable import/prefer-default-export */

export const isValidEndpoint = endpoint => endpoint
  && endpoint.length > 0
  && endpoint.startsWith('_')
