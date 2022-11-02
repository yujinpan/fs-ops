import { Buffer } from 'buffer';
import fs from 'fs';

import zip from './zip';

describe('zip', () => {
  beforeEach(() => {
    fs.rmdirSync('test', { recursive: true });
    fs.mkdirSync('test');
    fs.writeFileSync('test/a.txt', '123');
  });
  afterEach(() => {
    fs.rmdirSync('test', { recursive: true });
    fs.rmSync('test.zip', { force: true });
  });

  it('should zip directory', async function () {
    const outFile = await zip('test');
    expect(outFile).toBe('test.zip');
    expect(fs.readFileSync(outFile)).toBeInstanceOf(Buffer);

    expect(await zip('test/')).toBe('test.zip');
    expect(await zip('test/', 'test')).toBe('test.zip');
    expect(await zip('test/', 'test.zip')).toBe('test.zip');
    expect(await zip('test/', 'test/')).toBe('test/test.zip');
  });

  it('should zip file', async function () {
    const outFile = await zip('test/a.txt');
    expect(outFile).toBe('test/a.txt.zip');
    expect(fs.readFileSync(outFile)).toBeInstanceOf(Buffer);
  });

  it('should zip with glob', async function () {
    const outFile = await zip('test/a.*');
    expect(outFile).toBe('test/a.*.zip');
    expect(fs.readFileSync(outFile)).toBeInstanceOf(Buffer);
  });
});
