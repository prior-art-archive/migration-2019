# Prior Art Archive Migration 2019

We need to: setup our v2 infrastructure the way we want; migrate all v1 data to the v2 infrastructure (first in dev, then in prod); and spin down v1 services. This repo contains scripts that help achieve those goals. Jump down to [Task Details](#task-details) for futher reading.

## Development

Requires Node and yarn. Install with:

```
yarn install
```

## Task Details

The specific steps (which may be spread across a different number of individual scripts) will be:

### For v2-dev…

1. Setup/configure dev ElasticSearch 5.6.16 deployments
2. Empty dev Postgres database and S3 bucket
3. Copy v2-prod's Postgres **schema** to dev
4. Copy v2-prod's Postgres `Organization` and `Signup` table **data** to v2-dev
5. Upload files to `v2-dev` and debug search until it's no longer throwing parsing errors
6. Copy v2-prod's FTP uploads from S3 (`priorart-sftp-prod`) to v2-dev
7. Copy v1-prod's FTP uploads from S3 (`prior-art-archive-sftp`) to v2-dev (`priorart-sftp-prod`) using slug mappings
8. Test searching on this larger data set to expected ensure results are returned
9. Once all the above is working on dev, setup/configure an ElasticSearch 5.6.16 deployment for prod, point v2-prod to it, and import 

### For v2-prod…

Once we've got things working in dev, we can move on to prod.

1. Setup/configure prod ElasticSearch 5.6.16 deployments
2. Re-index existing v2-prod data (unsure how; at worst, download/reupload all `priorart-sftp-prod` contents and relevant drag-and-drop uploads)
3. Migrate v1-prod's data from S3 (`prior-art-archive-sftp` → `priorart-sftp-prod`)

## ID Mappings

When we ported v1-prod's Postgres data to v2-prod, we didn't preserve primary keys. Thus, the organization IDs (known as company IDs in v1-prod) all changed. (Happily, the slugs remained the same.) It's important to know these because various places, such as the `s3://assets.priorartarchive.org/uploads` directory, are keyed by this ID, and we need to be able to know what company/organization this ID corresponds to. This mapping has been completed in [#8](https://github.com/prior-art-archive/migration-2019/issues/8).
