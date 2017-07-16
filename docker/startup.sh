#!/bin/sh
set -e

echo "{\"baseUrl\":\"\", \"searchUrl\": \"//$OS_EXPLORER_SEARCH_HOST/search/package\", \"snippets\": {\"ga\": \"$OS_SNIPPETS_GA\"}}" > config.json
cat public/index.html | sed s:next.openspending.org/user/lib:$OS_EXPLORER_AUTH_HOST/user/lib: > index.html.tmp
mv -f index.html.tmp public/index.html

node server.js
