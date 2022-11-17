import fs from 'fs';

import { tryMkdirSync } from './utils';

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
});
