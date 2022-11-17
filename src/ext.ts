import { copyFileSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { sync as globSync } from 'glob';

import { Progress } from './progress';
import { print, toArray } from './utils';

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
  const progress = new Progress({
    title: 'Replace...',
    total: files.length,
    bar: true,
  });

  files.forEach((item, index) => {
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

    progress.update(index + 1);
  });

  progress.end();
  print(`Replace extensions Complete!`);
}
