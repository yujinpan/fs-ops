import { copyFileSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { sync as globSync } from 'glob';

import { toArray } from './utils';

export type ExtToOptions = {
  injectNoCheck?: boolean;
  injectESLintDisable?: boolean;
  encoding?: BufferEncoding;
};

export function extTo(
  glob: string | string[],
  ext: 'js' | 'jsx' | 'ts' | 'tsx' | string = 'ts',
  options: ExtToOptions = {},
) {
  const files = toArray(glob).flatMap((item) => globSync(item));
  files.forEach((item) => {
    const dest = item.replace(/(\.\w+)?$/, `.${ext}`);
    copyFileSync(item, dest);

    if (options.injectNoCheck || options.injectESLintDisable) {
      const content = readFileSync(dest).toString(options.encoding);
      writeFileSync(
        dest,
        (options.injectESLintDisable ? '/* eslint-disable */\n' : '') +
          (options.injectNoCheck ? '// @ts-nocheck\n' : '') +
          '\n' +
          content,
      );
    }

    if (item !== dest) rmSync(item);
  });
}
