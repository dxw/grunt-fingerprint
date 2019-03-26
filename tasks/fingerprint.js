/*
 * grunt-fingerprint
 * https://github.com/dxw/grunt-fingerprint
 *
 * Copyright (c) 2019 Mallory Adams
 * Licensed under the MIT license.
 */

'use strict'

const util = require('util')
const fs = require('fs')
const crypto = require('crypto')

// async versions of stdlib functions
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const rename = util.promisify(fs.rename)

// Our functions
const rewrite = (fileName, hash) => fileName.replace(/\./, '-'+hash+'.')
const hashFile = async function (fileName) {
  const fileContents = await readFile(fileName)
  return crypto.createHash('sha1').update(fileContents).digest('hex')
}

module.exports = function(grunt) {
  grunt.task.registerMultiTask('fingerprint', 'Fingerprint assets', async function () {
    const done = this.async()

    const rewrittenFiles = {}

    for (const input of this.filesSrc) {
      const hash = await hashFile(input)
      const output = rewrite(input, hash)

      // Store for later
      rewrittenFiles[input] = output

      // Move the file
      await rename(input, output)

      // Log
      grunt.log.writeln('Moved '+input+' to '+output)
    }

    // Read the existing data
    let data = {
      rewrittenFiles: {},
    }
    try {
      const fileContents = await readFile(this.data.options.json)
      data = JSON.parse(fileContents)
    } catch (e) {
      // Do nothing
    }

    // Merge existing data with new data
    data.rewrittenFiles = Object.assign(data.rewrittenFiles, rewrittenFiles)

    // Write to the JSON file
    await writeFile(this.data.options.json, JSON.stringify(data)+'\n')

    // Log
    grunt.log.writeln('Wrote JSON file to '+this.data.options.json)

    done()
  })
}
