import {logger} from './config';
import addItem from './helpers/notion_demo';

logger.info('started server');

const sleep = (delayMs: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, delayMs));
const standardTimeoutDurationMs = (): number => 6000;
const earlyTimeoutDurationMs = (): number => 500;
type resolveEarlyCallback = () => Promise<boolean>;

let iteration = 0;

const nextTimeout = async (
  resolveEarlyCb?: resolveEarlyCallback
): Promise<boolean> => {
  return new Promise(resolve => {
    // These two resolve calls compete with each other.
    // The first checks for
    // if (resolveEarlyCb) sleep(earlyTimeoutDurationMs()).then(() => { resolveEarly().then((shouldResolve) => shouldResolve && resolve(true)) })
    // sleep(standardTimeoutDurationMs()).then(() => { resolve(true) })

    iteration += 1;
    const curIteration = iteration;
    if (resolveEarlyCb) {
      sleep(earlyTimeoutDurationMs()).then(() => {
        resolveEarlyCb().then(shouldResolve => {
          if (shouldResolve) {
            console.log(`early ${curIteration}`);
            resolve(true);
          }
        });
      });
    }
    sleep(standardTimeoutDurationMs()).then(() => {
      console.log(`standard ${curIteration}`);
      resolve(true);
    });
  });
};

const shouldResolveEarly = async (): Promise<boolean> => {
  return Math.random() > 0.2;
};

const poll = async (): Promise<void> => {
  logger.info('polling...');
  await sleep(100);
};

async function poller(): Promise<void> {
  if (require.main === module) {
    logger.info('starting poller');
    do {
      await poll();
    } while (await nextTimeout(shouldResolveEarly));
  } else {
    logger.info("didn't start poller - not called as main");
  }
}

// FIXME: this is purely here to boost code-coverage.
export const callAddItem = async function (): Promise<void> {
  addItem(new Date().toLocaleString())
    .then(response => {
      logger.debug(response);
      logger.info('Success! Entry added.');
    })
    .catch(error => {
      logger.error(error.body);
    });
};

callAddItem();

if (require.main === module) {
  poller();
}
