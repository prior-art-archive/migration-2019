# Prior Art Archive Migration 2019

We need to: setup our v2 infrastructure the way we want; migrate all v1 data to the v2 infrastructure (first in dev, then in prod); and spin down v1 services. This repo contains scripts that help achieve those goals. Jump down to [Task Details](#task-details) for futher reading.

## Development

Requires Node and yarn. Install with:

```
yarn install
```

## Task Details

The specific steps (which may be spread across a different number of individual scripts) will be:

1. Setup fresh v2-dev and v2-prod ElasticSearch 5.6.16 deployments
2. Ensure v2-dev and v2-prod are using the same version/configuration of Postgres
3. Empty v2-dev Postgres database and S3 bucket
4. Copy v2-prod Postgres **schema** to v2-dev
5. Copy v2-prod Postgres Organization and Signup table **data** to v2-dev
6. Generate mapping of v1-prod organization IDs to v2-prod organization IDs
7. Copy v2-prod S3 objects to v2-dev
8. Copy v1-prod S3 objects to v2-dev using ID mappings generated above and without duplicating existing files

From what we learn above, we will write the subsequent following scripts:

1. One-time script to copy all v1-prod S3 objects to v2-prod, mapping IDs and skipping duplicates.
2. Script to periodically clone v2-prod data to v2-dev. (Code and schema will be kept in sync through migrations and other normal deployment methods; this is about getting production data into development for us to safely tinker with it.)
