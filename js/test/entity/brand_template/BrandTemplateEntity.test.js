
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


describe('BrandTemplateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.BrandTemplate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"brand_template","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /template","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"fixed-async-uk","k":"query","n":"brand","or":"brand","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"standard","k":"query","n":"template","or":"template","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"2024-01-15","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/template","q":{"exist":["brand","template","version"]},"r":{},"s":[{"lit":"template"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"brand_template","name__orig":"brand_template","Name":"BrandTemplate","name_":"brand_template","name-":"brand-template","NAME":"BRAND_TEMPLATE","index$":1}, {"active":true,"entity":"brand_template","key$":"BasicBrandTemplateFlow","kind":"basic","name":"BasicBrandTemplateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"brand_template_ref01","srcdatavar":"brand_template_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-brand_template_ref01"}}],"index$":0}]}, 'BrandTemplate', {"GET /template":{"protocol":"http","parameters":[{"name":"brand","in":"query","required":true,"schema":{"type":"string","minLength":1,"maxLength":255,"pattern":"^[a-z0-9-]+$","description":"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\n","example":"fixed-async-uk","x-ref":"#/components/schemas/BrandSlug"},"description":"Brand identifier/slug for which to download the template","example":"fixed-async-uk","index$":0},{"name":"template","in":"query","required":false,"schema":{"type":"string","pattern":"^[a-zA-Z0-9_-]+$"},"description":"Template variant name (e.g., 'standard', 'premium').  Defaults to 'standard' if not provided. Input is case-insensitive and normalized to lowercase.","example":"standard","index$":1},{"name":"version","in":"query","required":false,"schema":{"type":"string"},"description":"Specific template version to download. If omitted, downloads the latest version. Version strings are typically date-based (e.g., '2024-01-15') but can be any string.","example":"2024-01-15","index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let brand_template_ref01_data = Object.values(setup.data.existing.brand_template)[0]

    // LOAD
    const brand_template_ref01_ent = client.BrandTemplate()
    const brand_template_ref01_match_dt0 = {}
    const brand_template_ref01_data_dt0 = (await brand_template_ref01_ent.load(brand_template_ref01_match_dt0)).data()
    assert(null != brand_template_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/brand_template/BrandTemplateTestData.json')

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
    ['brand_template01','brand_template02','brand_template03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_BRAND_TEMPLATE_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_BRAND_TEMPLATE_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_BRAND_TEMPLATE_ENTID']
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
  
