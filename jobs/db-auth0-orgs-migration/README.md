# Organizations data migration to auth0

This job is intended to fill in the auth0 users' app_metadata with organization-related information.

This is a migration-like one-time-run job.

Accepts DB users and organizations data in JSON format files.

## How to run

1. Set auth0 env vars.
2. Prepare JSON data described above.
3. Run `node index.js path-to-users.json path-to-orgs.json`
