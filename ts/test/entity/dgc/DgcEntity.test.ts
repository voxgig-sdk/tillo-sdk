

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TilloSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('DgcEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.Dgc()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TILLO_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dgc.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"brand","req":true,"type":"`$STRING`","index$":0},{"active":true,"name":"client_request_id","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"delivery_method","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"face_value","req":true,"type":"`$OBJECT`","index$":3},{"active":true,"name":"sector","req":false,"type":"`$STRING`","index$":4}],"name":"dgc","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /digital/issue","json":"{\"operationId\":\"issueDigitalGiftCard\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"brand\":{\"type\":\"string\"},\"client_request_id\":{\"type\":\"string\"},\"delivery_method\":{\"type\":\"string\"},\"face_value\":{\"properties\":{\"amount\":{\"type\":\"number\"},\"currency\":{\"type\":\"string\"}},\"type\":\"object\"},\"sector\":{\"type\":\"string\"}},\"required\":[\"client_request_id\",\"brand\",\"face_value\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"brand\":{\"type\":\"string\"},\"client_request_id\":{\"type\":\"string\"},\"code\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The issued gift card order\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/digital/issue","segments":[{"lit":"digital"},{"lit":"issue"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"dgc","name__orig":"dgc","Name":"Dgc","name_":"dgc","name-":"dgc","NAME":"DGC","index$":1}, {"active":true,"entity":"dgc","key$":"BasicDgcFlow","kind":"basic","name":"BasicDgcFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"dgc_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Dgc')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const dgc_ref01_ent = client.Dgc()
    let dgc_ref01_data = setup.data.new.dgc['dgc_ref01']

    dgc_ref01_data = (await dgc_ref01_ent.create(dgc_ref01_data)).data()
    assert(null != dgc_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/dgc/DgcTestData.json')

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
    ['dgc01','dgc02','dgc03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_DGC_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_DGC_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_DGC_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
