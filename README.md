# Linda
Linda loves media tracking and wants everyone to share the passion.

## Details
Linda is a Chrome devtools extension. When installed, it creates its own panel. It accesses network requests, classifies the media tracking and prints it on the panel.

## Features
- Hold `shift` and click on a checkbox to select only it.
- `Filter` supports regex.
- Check `Prune` to only show rows that match the `Filter` string.  
  This also expands all hits. With no search pattern, everything is revealed.

## Install

1. Get the extension
   * Either download the pre-built release from https://github.com/BonnierNews/linda/releases and unzip it
   * Or, to make getting updates easier, clone the repo and build it using `npm ci && npm run build`
2. Add it to Chrome
   1. Go to `chrome://extensions/`
   2. Make sure "Developer mode" is enabled
   3. Click "Load unpacked" and pick the `app` folder inside the folder that you unzipped/cloned

---

## Contributing

Code away, and make a pull-request.
Do not bump any versions – it is done when releasing a new version.

## Release
Merge relevant pull-requests. In the _master_ branch, bump the version by running:

```bash
npm version <major|minor|patch>
```

Then run the release script:

```bash
./release.js
```

This creates a ZIP-file in the `releases` directory.

Draft a [new release](https://github.com/BonnierNews/linda/releases/new) and attach the created ZIP-file, choose the tag that was created when running `npm version`. Publish
