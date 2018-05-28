# Linda
Linda loves media tracking, especially MMS, and wants everyone to share the passion.

## Details
Linda is a Chrome devtools extension. When installed, it creates its own panel. It accesses network requests, classifies the media tracking and prints it on the panel.

## Features
- Hold `shift` and click on a checkbox to select only it.
- `Filter` supports regex.
- Check `Prune` to only show rows that match the `Filter` string.
  This also expands all hits.

## Install
Download the latest release from https://github.com/ExpressenAB/linda/releases, unzip it and add it via
chrome://extensions/

### Alternative installation
`git clone` the repo and run:
```
$ npm install
$ npm run build
```


## Release (for developers - to create own version)
Update the version in `manifest.json` and run `./release.js`. It will create a tar.gz file. 
Then draft a new release here (https://github.com/ExpressenAB/linda/releases) and attach the created tar.gz file. 
