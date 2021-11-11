import * as dotenv from 'dotenv'
import { mocked } from 'ts-jest/utils'

jest.mock('dotenv')

describe('index', () => {
  it('loads configs', async () => {
    const index = await import('./index')
    expect(mocked(dotenv).config).toBeCalledTimes(1)
    await index.callAddItem()
  })
})
