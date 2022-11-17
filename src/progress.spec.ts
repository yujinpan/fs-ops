import { Progress } from './progress';

describe('progress', () => {
  it('should show progress infos', async function () {
    const progress = new Progress();
    while (progress.current < 100) {
      await sleep(200);
      progress.update(progress.current + 20);
    }
  });
});

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
