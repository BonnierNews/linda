# Linda
Linda loves media tracking, especially MMS. And wants everyone to share the passion.

## Details
Linda is a Chrome devtools extension. When installed, it creates its own panel. It accesses network requests, classifies the media tracking and prints it on the panel.

## Install
Download the latest release from https://github.com/doganyazar/linda/releases, unzip it and add it via
chrome://extensions/

### Alternative installation
`git clone` the repo and run:
```
$ npm install
$ npm run build
```


## Release (for developers - to create own version)
Update the version in manifest.json and run ./release.js. It will create a tar.gz file. 
Then draft a new release here (https://github.com/doganyazar/linda/releases) and attach the created tar.gz file. 
