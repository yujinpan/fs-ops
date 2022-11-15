# fs-ops

Operators for node files.

## zip

### API

- `zip(destPath, outPath?): Promise<string>`

make zip file, return the zip file path.

| param      | type              | required | desc                                                                                                       |
| ---------- | ----------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `destPath` | `string/string[]` | `true`   | file/files/directory, supported [`glob`](https://github.com/isaacs/node-glob#glob-primer), like: `**/*.js` |
| `outPath`  | `string`          | `false`  | output file path or directory path, default to the `destPath`                                              |

### Commands

```shell
fs-ops.js zip <destPath...>

make zip file

Options:
  -o, --outPath  zip file output path                                   [string]
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
```

## ext

### API

- `extTo(glob, ext?, options?): void`

change files extensions.

| param                         | type                   | required | desc                                                                                                      |
| ----------------------------- | ---------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `glob`                        | `string/string[]`      | `true`   | pattern of matching files, use [`glob`](https://github.com/isaacs/node-glob#glob-primer), like: `**/*.js` |
| `ext`                         | `js/jsx/ts/tsx/string` | `false`  | target extension, default: `ts`                                                                           |
| `options.injectNoCheck`       | `boolean`              | `false`  | inject // @ts-nocheck to file header                                                                      |
| `options.injectESLintDisable` | `boolean`              | `false`  | inject /_ eslint-disable _/ to file header                                                                |
| `options.encoding`            | `boolean`              | `false`  | file encoding type, like: `utf-8`                                                                         |

### Commands

```shell
fs-ops.js ext-to <glob...>

change files extensions

Options:
  -f, --ext                  replace to extension, default: ts          [string]
  -n, --injectNoCheck        inject // @ts-nocheck to file header      [boolean]
  -d, --injectESLintDisable  inject /* eslint-disable */ to file header[boolean]
  -e, --encoding             file encoding type, like: utf-8            [string]
  -v, --version              Show version number                       [boolean]
  -h, --help                 Show help                                 [boolean]
```
