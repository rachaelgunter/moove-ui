# Moove Unified UI

This repo contains source code for Moove Unified UI backend and frontend applications

## Contribution Guideline

Please use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages/branch naming

## Branching policy

Whenever PR is merged to a certain lifecycle branch CI/CD process is triggered which will deploy the code to a particular environment. We use the following lifecycle branches:

- `develop` - merge triggers deploy to development env.
- `staging` - merge triggers deploy to staging env.
- `master` - merge triggers deploy to production.

When working on a feature/bug/etc., please create a branch with a name following the [convention](https://www.conventionalcommits.org/en/v1.0.0/) from `develop` branch. Story's subtasks can also be split into separate branches and merged into feature branch incrementally to make code-review process easier (not a mandatory requirement though if the feature is not too large).
