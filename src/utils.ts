import fs from 'fs';

export function toArray(val: any | any[]) {
  return Array.isArray(val) ? val : isValidVal(val) ? [val] : [];
}

export function isValidVal(val: any) {
  return ![undefined, null, NaN].includes(val);
}

export function tryMkdirSync(destPath: string) {
  try {
    fs.mkdirSync(destPath, { recursive: true });
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw e;
    }
  }
}
