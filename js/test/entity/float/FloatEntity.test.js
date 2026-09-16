
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { TilloSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('FloatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.Float()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"balance","req":false,"type":"`$NUMBER`","index$":0},{"active":true,"name":"currency","req":false,"type":"`$STRING`","index$":1}],"name":"float","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /check-floats","json":"{\"operationId\":\"listFloats\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"balance\":{\"type\":\"number\"},\"currency\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Floats\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/check-floats","segments":[{"lit":"check-floats"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"float","name__orig":"float","Name":"Float","name_":"float","name-":"float","NAME":"FLOAT","index$":2}, {"active":true,"entity":"float","key$":"BasicFloatFlow","kind":"basic","name":"BasicFloatFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"float_ref01"}}],"index$":0}]}, 'Float')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let float_ref01_data = Object.values(setup.data.existing.float)[0]

    // LIST
    const float_ref01_ent = client.Float()
    const float_ref01_match = {}

    const float_ref01_list = (await float_ref01_ent.list(float_ref01_match)).map((e) => e.data())


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/float/FloatTestData.json')

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
    ['float01','float02','float03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_FLOAT_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_FLOAT_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_FLOAT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TilloSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.TILLO_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
