#!/usr/bin/env sh

# Bump version in app/manifest.json after "npm version" has been run.
# Amend-commit the change.

if [[ $# -ne 1 ]]; then
  echo "No version given. Aborting!"
  exit 1
fi

npm_package_version=$1

sed -i "" "s/\"version\":.*,/\"version\": \"$npm_package_version\",/" app/manifest.json && \
git commit -a --amend --no-edit > /dev/null && \
printf "Version bumped to $npm_package_version!\n\nRemember to push tags:\n    git push --tags\n\n"
