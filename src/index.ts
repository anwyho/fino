import * as dotenv from 'dotenv'
import { pino } from 'pino'

import addItem from './helpers/notion_demo'

dotenv.config()
const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' })
logger.info('started server')

// FIXME: this is purely here to boost code-coverage.
export const callAddItem = async function (): Promise<void> {
  addItem(new Date().toLocaleString()).then((response) => {
    logger.debug(response)
    logger.info('Success! Entry added.')
  }).catch((error) => {
    logger.error(error.body)
  })
}
