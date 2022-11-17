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

/**
 * 'Hello, {red|World}!' => Hello, World! (World is red)
 */
export function getStyleText(msg: string) {
  const match = Array.from(msg.match(/\{\w+\|[^}]*}/g) || []);
  if (match.length) {
    const styles = {
      red: 31,
      green: 32,
      greenBg: 42,
      blue: 33,
      magenta: 35,
      cyan: 36,
      white: 37,
      whiteBg: 47,
    };
    match.forEach((item) => {
      const [style, text] = item.slice(1, -1).split('|');
      msg = msg.replace(item, `\x1b[${styles[style] || 0}m${text}\x1b[0m`);
    });
  }
  return msg;
}

export function print(msg: string) {
  // eslint-disable-next-line no-console
  console.log(getStyleText(msg));
}
