
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { TilloSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('BrandEntity', async () => {

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.Brand()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let brand_ref01_data = Object.values(setup.data.existing.brand)[0]

    // LIST
    const brand_ref01_ent = client.Brand()
    const brand_ref01_match = {}

    const brand_ref01_list = (await brand_ref01_ent.list(brand_ref01_match)).map((e) => e.data())


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/brand/BrandTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TilloSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['brand01','brand02','brand03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_BRAND_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': 'NONE',
  })

  idmap = env['TILLO_TEST_BRAND_ENTID']

  if ('TRUE' === env.TILLO_TEST_LIVE) {
    client = new TilloSDK(merge([
      {
        apikey: env.TILLO_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TILLO_TEST_EXPLAIN,
    now: Date.now(),
  }

  return setup
}
  
