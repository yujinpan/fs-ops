import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

import { toArray, tryMkdirSync } from './utils';

export default zip;

let zipNum = 0;

function zip(destPath: string | string[], outPath?: string): Promise<any> {
  outPath = normalizeOutPath(destPath, outPath);

  fs.rmSync(outPath, { force: true });

  // create a file to stream archive data to.
  const outputFile = path.resolve(__dirname, `zip${zipNum++}.zip`);
  const outputStream = fs.createWriteStream(outputFile);
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  return new Promise((resolve, reject) => {
    outputStream.once('close', () => {
      tryMkdirSync(path.dirname(outPath));
      fs.copyFileSync(outputFile, outPath);
      fs.rmSync(outputFile);

      // eslint-disable-next-line no-console
      console.log(
        `Zip Complete: ${outPath}\nTotal size: ${getSize(archive.pointer())}`,
      );

      resolve(outPath);
    });
    outputStream.once('error', reject);

    archive.on('error', reject);

    archive.pipe(outputStream);

    toArray(destPath).map((item) => {
      if (path.extname(item)) {
        archive.glob(item);
      } else {
        archive.directory(item, false);
      }
    });

    archive.finalize();
  });
}

function getSize(byt: number) {
  let unit = 'KB';
  let size = byt / 1024;
  if (size >= 1e3) {
    unit = 'MB';
    size = size / 1024;
  }
  return `${size.toFixed(2)} ${unit}`;
}

/**
 * '' => '[destName].zip'
 * 'xx.zip' => 'xx.zip'
 * 'xx/' => 'xx/[destName].zip'
 * ['...', '...'] => dist.zip
 */
function normalizeOutPath(destPath: string | string[], outPath?: string) {
  return outPath
    ? outPath.endsWith('.zip')
      ? outPath
      : outPath.endsWith('/')
      ? `${outPath}${
          Array.isArray(destPath) ? 'dist' : path.basename(destPath)
        }.zip`
      : `${outPath}.zip`
    : Array.isArray(destPath)
    ? 'dist.zip'
    : destPath.replace(/\/+$/, '') + '.zip';
}
