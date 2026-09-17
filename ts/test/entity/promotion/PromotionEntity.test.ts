

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


describe('PromotionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.Promotion()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TILLO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'promotion.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"last_refreshed_at","req":true,"short":"ISO 8601 timestamp of when promotion data was last refreshed.","type":"`$STRING`","index$":0},{"active":true,"name":"standard","req":true,"short":"Standard promotions grouped by brand slug.","type":"`$OBJECT`","index$":1}],"name":"promotion","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /promotions","json":"{\"operationId\":\"getPromotions\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"standard_promotions_multiple_brands\":{\"description\":\"Multiple brands with several promotions, including one promotion with face value restrictions.\",\"summary\":\"Standard promotions\",\"value\":{\"code\":\"000\",\"data\":{\"last_refreshed_at\":\"2026-02-01T00:00:00+00:00\",\"standard\":{\"adidas-nl\":[{\"code\":\"R7ZG3LQ\",\"description\":\"extra 2% across whole of feb\",\"discount\":7.5,\"end_date\":\"2026-02-28T23:59:59+00:00\",\"last_edited_at\":\"2026-02-01T00:00:00+00:00\",\"name\":\"FEB-2026-SALE\",\"priority\":2,\"restrictions\":{\"face_value_maximum_amount\":null,\"face_value_minimum_amount\":null,\"transaction_types\":[\"digital_issuance\"]},\"start_date\":\"2026-02-01T00:00:00+00:00\"},{\"code\":\"7DZ6P21\",\"description\":\"Sales between 10-100 & Max budget of 100 Euros\",\"discount\":8.5,\"end_date\":\"2026-02-14T23:59:59+00:00\",\"last_edited_at\":\"2026-02-01T00:00:00+00:00\",\"name\":\"VALENTINES-2026\",\"priority\":1,\"restrictions\":{\"face_value_maximum_amount\":100,\"face_value_minimum_amount\":10,\"transaction_types\":[\"digital_issuance\",\"digital_top_up\"]},\"start_date\":\"2026-02-14T00:00:00+00:00\"}],\"amazon\":[{\"code\":\"V0231ZM\",\"description\":\"Covers Amazon-UK and Amazon-Rewards.\",\"discount\":7.5,\"end_date\":\"2026-02-21T23:59:59+00:00\",\"last_edited_at\":\"2026-02-01T00:00:00+00:00\",\"name\":\"AMAZON-PROMO-TEST\",\"priority\":null,\"restrictions\":{\"face_value_maximum_amount\":100,\"face_value_minimum_amount\":10,\"transaction_types\":[\"digital_issuance\",\"physical_activation\",\"physical_top_up\",\"digital_top_up\"]},\"start_date\":\"2026-02-01T00:00:00+00:00\"}],\"amazon-rewards\":[{\"code\":\"V0231ZM\",\"description\":\"Covers Amazon-UK and Amazon-Rewards.\",\"discount\":7.5,\"end_date\":\"2026-02-21T23:59:59+00:00\",\"last_edited_at\":\"2026-02-01T00:00:00+00:00\",\"name\":\"AMAZON-PROMO-TEST\",\"priority\":1,\"restrictions\":{\"face_value_maximum_amount\":100,\"face_value_minimum_amount\":10,\"transaction_types\":[\"digital_issuance\",\"physical_activation\",\"physical_top_up\",\"digital_top_up\"]},\"start_date\":\"2026-02-01T00:00:00+00:00\"}]}},\"message\":\"Promotions information\",\"status\":\"success\"}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"type\":\"string\"},\"data\":{\"additionalProperties\":false,\"properties\":{\"last_refreshed_at\":{\"description\":\"ISO 8601 timestamp of when promotion data was last refreshed. This timestamp is always in UTC.\",\"example\":\"2026-02-01T00:00:00+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"standard\":{\"additionalProperties\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"description\":\"Promotion code identifier.\",\"example\":\"R7ZG3LQ\",\"maxLength\":7,\"minLength\":7,\"pattern\":\"^[A-Z0-9]{7}$\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the promotion and how it applies.\",\"example\":\"extra 2% across whole of feb\",\"type\":\"string\"},\"discount\":{\"description\":\"The discount percentage used on this transaction\",\"examples\":[0,9.5,5.75],\"format\":\"float\",\"minimum\":0,\"type\":\"number\"},\"end_date\":{\"description\":\"ISO 8601 timestamp when the promotion stops being active. This timestamp is always in UTC.\",\"format\":\"date-time\",\"type\":\"string\"},\"last_edited_at\":{\"description\":\"ISO 8601 timestamp when the promotion was last edited.\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Human-readable promotion name.\",\"example\":\"FEB-2026-SALE\",\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"priority\":{\"description\":\"Promotion priority where lower numbers indicate higher priority, or null when no priority is assigned.\",\"example\":1,\"oneOf\":[{\"minimum\":1,\"type\":\"integer\"},{\"type\":\"null\"}]},\"restrictions\":{\"additionalProperties\":false,\"properties\":{\"face_value_maximum_amount\":{\"description\":\"Maximum face value amount allowed for this promotion, or null when there is no upper bound.\",\"oneOf\":[{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},{\"type\":\"null\"}]},\"face_value_minimum_amount\":{\"description\":\"Minimum face value amount allowed for this promotion, or null when there is no lower bound.\",\"oneOf\":[{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},{\"type\":\"null\"}]},\"transaction_types\":{\"description\":\"Transaction types for which this promotion can be applied.\",\"items\":{\"enum\":[\"balance_check\",\"cancelled_digital_issuance\",\"cancelled_physical_activation\",\"cancelled_physical_top_up\",\"digital_cash_out\",\"digital_issuance\",\"digital_top_up\",\"physical_activation\",\"physical_cash_out\",\"physical_top_up\"],\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"minItems\":1,\"type\":\"array\"}},\"required\":[\"transaction_types\",\"face_value_minimum_amount\",\"face_value_maximum_amount\"],\"type\":\"object\"},\"start_date\":{\"description\":\"ISO 8601 timestamp when the promotion becomes active. This timestamp is always in UTC.\",\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"code\",\"name\",\"discount\",\"description\",\"start_date\",\"end_date\",\"priority\",\"restrictions\",\"last_edited_at\"],\"type\":\"object\"},\"type\":\"array\"},\"description\":\"Standard promotions grouped by brand slug.\",\"propertyNames\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"type\":\"object\"}},\"required\":[\"last_refreshed_at\",\"standard\"],\"type\":\"object\"},\"message\":{\"example\":\"Promotions information\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"List of standard promotions grouped by brand slug\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"211\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Too many attempts for the API rate limit\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Too many requests. Rate limit exceeded.\"},\"502\":{\"description\":\"Bad Gateway. No response body is returned.\\n\"},\"504\":{\"description\":\"Gateway Timeout. No response body is returned.\\n\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/promotions","segments":[{"lit":"promotions"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"promotion","name__orig":"promotion","Name":"Promotion","name_":"promotion","name-":"promotion","NAME":"PROMOTION","index$":12}, {"active":true,"entity":"promotion","key$":"BasicPromotionFlow","kind":"basic","name":"BasicPromotionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"promotion_ref01","srcdatavar":"promotion_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-promotion_ref01"}}],"index$":0}]}, 'Promotion')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let promotion_ref01_data = Object.values(setup.data.existing.promotion)[0] as any

    // LOAD
    const promotion_ref01_ent = client.Promotion()
    const promotion_ref01_match_dt0: any = {}
    const promotion_ref01_data_dt0 = (await promotion_ref01_ent.load(promotion_ref01_match_dt0)).data()
    assert(null != promotion_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/promotion/PromotionTestData.json')

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
    ['promotion01','promotion02','promotion03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_PROMOTION_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_PROMOTION_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_PROMOTION_ENTID']
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
  
