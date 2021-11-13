import * as dotenv from 'dotenv';
// eslint-disable-next-line node/no-unpublished-import
import {mocked} from 'ts-jest/utils';

jest.mock('dotenv');

describe('config', () => {
  it('loads configs', async () => {
    await import('../src/config');
    expect(mocked(dotenv).config).toBeCalledTimes(1);
  });
});
