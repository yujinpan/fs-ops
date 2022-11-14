import { readFileSync, rmSync, writeFileSync } from 'fs';

import { extTo } from './ext';

describe('ext', () => {
  it('should replace extensions', function () {
    const file = 'test.js';

    writeFileSync(file, 'const test = 1;');
    extTo(file);
    expect(readFileSync('test.ts').toString()).toBe('const test = 1;');
    rmSync('test.ts');

    writeFileSync(file, 'const test = 1;');
    extTo(file, 'tsx');
    expect(readFileSync('test.tsx').toString()).toBe('const test = 1;');
    rmSync('test.tsx');

    writeFileSync(file, 'const test = 1;');
    extTo(file, 'tsx', { injectNoCheck: true });
    expect(readFileSync('test.tsx').toString()).toBe(
      '// @ts-nocheck\n\nconst test = 1;',
    );
    rmSync('test.tsx');

    writeFileSync(file, 'const test = 1;');
    extTo(file, 'tsx', { injectESLintDisable: true });
    expect(readFileSync('test.tsx').toString()).toBe(
      '/* eslint-disable */\n\nconst test = 1;',
    );
    rmSync('test.tsx');

    writeFileSync(file, 'const test = 1;');
    extTo(file, 'tsx', { injectESLintDisable: true, injectNoCheck: true });
    expect(readFileSync('test.tsx').toString()).toBe(
      '/* eslint-disable */\n// @ts-nocheck\n\nconst test = 1;',
    );
    rmSync('test.tsx');
  });
});
