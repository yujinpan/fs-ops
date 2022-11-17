import fs from 'fs';

import { getStyleText, tryMkdirSync } from './utils';

describe('utils', function () {
  it('should tryMkdirSync', function () {
    tryMkdirSync('a');
    expect(fs.existsSync('a')).toBe(true);
    expect(tryMkdirSync('a')).toBe(undefined);
    tryMkdirSync('a/b/');
    expect(fs.existsSync('a/b')).toBe(true);
    tryMkdirSync('a/b/c');
    expect(fs.existsSync('a/b/c')).toBe(true);
    fs.rmSync('a', { recursive: true });
  });

  it('should getStyleText', function () {
    expect(getStyleText('Hello, World!')).toBe('Hello, World!');
    expect(getStyleText('Hello, {red|World}!')).toBe(
      'Hello, \x1b[31mWorld\x1b[0m!',
    );
    expect(getStyleText('Hello, {123|World}!')).toBe(
      'Hello, \x1b[0mWorld\x1b[0m!',
    );
    expect(
      getStyleText(`Hello,
{red|World}!`),
    ).toBe(`Hello,
\x1b[31mWorld\x1b[0m!`);
  });
});
