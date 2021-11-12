import {logger} from './config';
import addItem from './helpers/notion_demo';

logger.info('started server');

let iteration = 0;

// TODO: This should switch up timeouts based on recency of successful poll and maybe time of day
//  How does this work if the setTimeout has already started? Can we return true early?
const nextTimeout = async (): Promise<boolean> => {
  const timeoutDuration = 6000;
  return await new Promise(resolve => {
    setTimeout(() => {
      iteration += 1;
      logger.info(`standard ${iteration}`);
      resolve(true);
    }, timeoutDuration);
    // while(
    setTimeout(() => {
      resolveEarly().then(shouldResolveEarly => {
        if (shouldResolveEarly) {
          iteration += 1;
          logger.info(`early ${iteration}`);
          shouldResolveEarly && resolve(true);
        }
      });
    }, 1000);
    // ) {}
  });
};

const resolveEarly = async (): Promise<boolean> => {
  // return await new Promise(resolve => setTimeout(() => { resolve(true) }, 2000))
  logger.info('asked if should resolve early');
  return Math.random() > 0.5;
};

const poll = async (): Promise<void> => {
  logger.info('polling...');
};

async function poller(): Promise<void> {
  if (require.main === module) {
    logger.info('starting poller');
    do {
      await poll();
    } while (await nextTimeout());
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
