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
  .command(
    'ext-to <glob...>',
    'change files extensions',
    (yargs) =>
      yargs
        .options('f', {
          alias: 'ext',
          type: 'string',
          desc: 'replace to extension, default: ts',
        })
        .options('n', {
          alias: 'injectNoCheck',
          type: 'boolean',
          desc: 'inject // @ts-nocheck to file header',
        })
        .options('d', {
          alias: 'injectESLintDisable',
          type: 'boolean',
          desc: 'inject /* eslint-disable */ to file header',
        })
        .options('e', {
          alias: 'encoding',
          type: 'string',
          desc: 'file encoding type, like: utf-8',
        }),
    (argv) => {
      return require('../lib/index').extTo(argv.glob, argv.ext, argv);
    },
  )
  .alias('v', 'version')
  .alias('h', 'help')
  .help().argv;
