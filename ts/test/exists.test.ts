
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TilloSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TilloSDK.test()
    equal(null !== testsdk, true)
  })

})
