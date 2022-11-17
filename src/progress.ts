import readline from 'readline';

import { getStyleText } from './utils';

export class Progress {
  private readonly stream: NodeJS.WriteStream;

  title = '';
  total = 0;
  current = 0;
  bar = false;

  constructor(
    options: {
      total?: number;
      current?: number;
      title?: string;
      bar?: boolean;
      stream?: NodeJS.WriteStream;
    } = {},
  ) {
    this.stream = options.stream || process.stdout;

    this.total = options.total || 100;
    this.current = options.current || 0;
    this.title = options.title || '';
    this.bar = options.bar;

    this.render();
  }

  update(current, total = this.total) {
    this.current = current;
    this.total = total;
    this.render();
  }

  end() {
    this.stream.write(' Done!\n');
  }

  render() {
    readline.cursorTo(this.stream, 0);
    readline.clearLine(this.stream, 1);
    this.stream.write(
      `${getStyleText(this.title)} ${this.bar ? this.renderBar() + ' ' : ''}${
        this.current
      }/${this.total}`,
    );
  }

  private renderBar() {
    const total = 20;
    const percent = this.current / this.total;
    const processed = Math.round(percent * total);
    const processedText = getStyleText(
      `{greenBg|${Array(processed).fill(' ').join('')}}`,
    );
    const unprocessedText = Array(total - processed)
      .fill(' ')
      .join('');
    return `[${processedText}${unprocessedText}]`;
  }
}
