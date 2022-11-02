import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

export default zip;

function zip(destPath: string, outPath?: string) {
  outPath = normalizeOutPath(destPath, outPath);

  fs.rmSync(outPath, { force: true });

  // create a file to stream archive data to.
  const outputFile = path.resolve(__dirname, `${Date.now()}.zip`);
  const outputStream = fs.createWriteStream(outputFile);
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  archive.pipe(outputStream);

  if (path.extname(destPath)) {
    archive.glob(destPath);
  } else {
    archive.directory(destPath, false);
  }

  return archive.finalize().then(() => {
    return new Promise((resolve, reject) => {
      outputStream.once('close', () => {
        fs.copyFileSync(outputFile, outPath);
        fs.rmSync(outputFile);

        // eslint-disable-next-line no-console
        console.log(
          `Zip Complete: ${outPath}\nTotal size: ${getSize(archive.pointer())}`,
        );

        resolve(outPath);
      });
      outputStream.once('error', reject);
    });
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
 */
function normalizeOutPath(destPath: string, outPath?: string) {
  return outPath
    ? outPath.endsWith('.zip')
      ? outPath
      : outPath.endsWith('/')
      ? `${outPath}${path.basename(destPath)}.zip`
      : `${outPath}.zip`
    : destPath.replace(/\/+$/, '') + '.zip';
}
