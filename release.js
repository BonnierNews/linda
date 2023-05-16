#!/usr/bin/env node

const { version } = require("./app/manifest.json");
const { execSync } = require("child_process");

const fileName = `../releases/linda-${version}.zip`;

// execSync throws in case of exit code other than 0
const out = execSync(`npm run build && mkdir -p releases && cd app && zip -r ${fileName} * -x app -q`);

process.stdout.write(`Output:${out.toString()}\n`);
process.stdout.write(`\x1b[34m${fileName} created successfully\x1b[0m\n`);
