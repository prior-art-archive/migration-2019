This directory contains the config files for the ElasticSearch deployment provided by Cisco.

The directory structure matches the REST API endpoint structure for each file. E.g., `_ingest/pipeline/fscrawler_pipeline.json` is the data that will be PUT to the `/_ingest/pipeline/fscrawler_pipeline` endpoint.

We have scripts to upload these files to the endpoint, but you can also do so through the API Console after logging in to cloud.elastic.co.