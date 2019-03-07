# OS Explorer

[![Gitter](https://img.shields.io/gitter/room/openspending/chat.svg)](https://gitter.im/openspending/chat)
[![Build Status](https://travis-ci.org/openspending/os-explorer.svg?branch=master)](https://travis-ci.org/openspending/os-explorer)
[![Issues](https://img.shields.io/badge/issue-tracker-orange.svg)](https://github.com/openspending/openspending/issues)
[![Docs](https://img.shields.io/badge/docs-latest-blue.svg)](http://docs.openspending.org/en/latest/developers/explorer/)

The homepage and search frontend for Openspending, working in conjuction with [os-conductor](https://github.com/openspending/os-conductor).

- [AngularJS](https://angularjs.org/)
- [ExpressJS](https://expressjs.com/)

## Quick start

- get the code
`git clone https://github.com/openspending/os-explorer.git`

- install dependencies
`npm install`

- build the frontend assets
`npm run build`

- configure .env

For local development, add an `.env` file with the following settings:
```ini
# Required settings
# e.g. https://openspending.org or http://localhost
OS_BASE_URL=

# Optional settings
# Google Analytics code
OS_SNIPPETS_GA=
# Sentry public DSN url
OS_SNIPPETS_RAVEN=

# Each service will use OS_BASE_URL unless overridden by these:
OS_CONDUCTOR_URL=
OS_VIEWER_URL=
OS_EXPLORER_URL=
OS_PACKAGER_URL=

# Url for Cosmopolitan API service, defaults to https://cosmopolitan.openspending.org/?format=json
OS_COSMOPOLITAN_URL=
```

- run the tests
`npm test`

- run the application...
`npm start`

- ... or just open index.html in your favorite browser

See the [docs](http://docs.openspending.org/en/latest/developers/explorer/) for more information.
