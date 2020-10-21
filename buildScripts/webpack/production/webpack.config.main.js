/**
 * Changing the webpack based parser (acorn) to support public class fields inside builds.
 * Remove this code once webpack supports them out of the box.
 * See: https://github.com/neomjs/neo/issues/1228
 */
const classFields = require('acorn-class-fields'),
      acorn       = require('acorn');

acorn.Parser = acorn.Parser.extend(classFields);

const path        = require('path'),
      buildTarget = require('./buildTarget.json'),
      processRoot = process.cwd(),
      packageJson = require(path.resolve(processRoot, 'package.json')),
      neoPath     = packageJson.name === 'neo.mjs' ? './' : './node_modules/neo.mjs/',
      config      = require(path.resolve(neoPath, 'buildScripts/webpack/json/build.json')),
      entry       = {main: path.resolve(neoPath, config.mainInput)};

module.exports = {
    mode  : 'production',
    entry,
    target: 'web',

    output: {
        chunkFilename: '[name].js', // would default to '[id].js': src/main/lib/AmCharts => 1.js

        filename: (chunkData) => {
            if (chunkData.chunk.name === 'main') {
                return config.mainOutput;
            }
        },

        path: path.resolve(processRoot, buildTarget.folder)
    }
};