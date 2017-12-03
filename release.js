#!/usr/bin/env node
'use strict'

const {version} = require('./manifest.json')
const { execSync } = require('child_process')

const fileName = `releases/linda-${version}.tar.gz`
// execSync throws in case of exit code other than 0
const out = execSync(`mkdir -p releases && tar czf ${fileName} app manifest.json`)
console.log(`${fileName} created successfully`, out.toString())
