

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TemplateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.Template()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TILLO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'template.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"last_refreshed_at":{"a":true,"fo":"date-time","h":"Last Refreshed At","n":"last_refreshed_at","r":true,"sh":"ISO 8601 timestamp of when the template data was last refreshed","t":"`$STRING`","key$":"last_refreshed_at","index$":0},"templates":{"a":true,"h":"Templates","n":"templates","r":true,"sh":"Object mapping brand slugs to their template variants and versions.","t":"`$OBJECT`","key$":"templates","index$":1}},"name":"template","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /templates","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"fixed-async-uk","k":"query","n":"brand","or":"brand","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"standard","k":"query","n":"template","or":"template","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/templates","q":{"exist":["brand","template"]},"r":{},"s":[{"lit":"templates"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"template","name__orig":"template","Name":"Template","name_":"template","name-":"template","NAME":"TEMPLATE","index$":13}, {"active":true,"entity":"template","key$":"BasicTemplateFlow","kind":"basic","name":"BasicTemplateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"template_ref01","srcdatavar":"template_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-template_ref01"}}],"index$":0}]}, 'Template', {"GET /templates":{"protocol":"http","parameters":[{"name":"brand","in":"query","required":false,"schema":{"type":"string","minLength":1,"maxLength":255,"pattern":"^[a-z0-9-]+$","description":"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\n","example":"fixed-async-uk","x-ref":"#/components/schemas/BrandSlug"},"description":"Brand identifier/slug. Required if template parameter is provided. If omitted, returns templates for all brands accessible to the partner.","example":"fixed-async-uk","index$":0},{"name":"template","in":"query","required":false,"schema":{"type":"string","pattern":"^[a-zA-Z0-9_-]+$"},"description":"Template variant name (e.g., 'standard', 'premium').  If provided, brand parameter is required. Input is case-insensitive and normalized to lowercase.","example":"standard","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let template_ref01_data = Object.values(setup.data.existing.template)[0] as any

    // LOAD
    const template_ref01_ent = client.Template()
    const template_ref01_match_dt0: any = {}
    const template_ref01_data_dt0 = (await template_ref01_ent.load(template_ref01_match_dt0)).data()
    assert(null != template_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/template/TemplateTestData.json')

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
    ['template01','template02','template03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_TEMPLATE_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_TEMPLATE_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_TEMPLATE_ENTID']
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
  
