#!/usr/bin/env node

require('yargs')
  .command(
    'zip <destPath> [outPath]',
    'make zip file',
    (yargs) => yargs,
    (argv) => {
      return require('../lib/index').zip(argv.destPath, argv.outPath);
    },
  )
  .alias('v', 'version')
  .alias('h', 'help')
  .help().argv;
