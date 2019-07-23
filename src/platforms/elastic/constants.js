/**
 * The `CONFIG_FILES` values are overloaded. They represent two things:
 *
 * - Local paths to the JSON config files relative to the `/src/platforms/elastic/configFiles` root
 * - Remote REST API paths used for GET and PUT operations on that config file, rooted at the
 *   `ELASTICSEARCH_URL`
 *
 * In other words, the local path of the config files on our filesystem should match their path on
 * remote REST API. That's superficially a rigid constraint, but I like that it self-documents the
 * REST API structure.
 */
export const CONFIG_FILES = [
  '_ingest/pipeline/fscrawler_pipeline',
  '_ingest/pipeline/reindex_pipeline',
  '_template/fscrawler_template',
  '_template/fscrawler_reindex_template',
  '_template/uspto-audit-template',
]

export const ELASTIC_MESSAGES = {
  UPLOAD_SUCCESS: 'Successfully uploaded config',
  INVALID_ENDPOINT: 'You need to provide a valid endpoint argument',
  UNREADABLE_CONFIG: 'Could not read the config file from the filesystem',
  EMPTY_CONFIG: 'Empty config file',
}
