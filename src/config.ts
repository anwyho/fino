import * as dotenv from 'dotenv';
import {Client, LogLevel as NotionLogLevel} from '@notionhq/client/build/src';
// eslint-disable-next-line node/no-unpublished-import
import {pino} from 'pino';

dotenv.config();

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
const logLevel: LogLevel = (process.env.LOG_LEVEL ?? 'info') as LogLevel;

export const logger = pino({level: logLevel});
export const notionLogger = logger.child({module: 'notion'});

const notionLoggerAdapter = (
  logLevel: NotionLogLevel,
  message: string,
  extraInfo: Record<string, unknown>
): void => notionLogger[logLevel as LogLevel](extraInfo, message);

export const notion = new Client({
  auth: process.env.NOTION_KEY,
  logLevel: logLevel as NotionLogLevel,
  logger: notionLoggerAdapter,
});
