
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TilloSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TilloSDK.test()
    equal(testsdk instanceof TilloSDK, true,
      'TilloSDK.test() must return a client synchronously')
  })

})
