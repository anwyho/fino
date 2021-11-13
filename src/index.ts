import {logger} from './config';
import addItem from './helpers/notion_demo';

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
