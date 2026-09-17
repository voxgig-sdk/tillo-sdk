

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


describe('DigitalOrderStatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.DigitalOrderStatus()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TILLO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'digital_order_status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"barcode","req":true,"short":"Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS')","type":"`$OBJECT`","index$":0},{"active":true,"name":"brand","req":false,"short":"Brand identifier/slug (lowercase letters, numbers, hyphens only).","type":"`$STRING`","index$":1},{"active":true,"name":"code","req":false,"short":"Gift card code (for code-delivery brands, only present when status is 'SUCCESS')","type":"`$STRING`","index$":2},{"active":true,"name":"cost_value","req":true,"short":"Cost value of the gift card (only present when status is 'SUCCESS')","type":"`$OBJECT`","index$":3},{"active":true,"format":"float","name":"discount","req":false,"short":"The discount percentage used on this transaction","type":"`$NUMBER`","index$":4},{"active":true,"format":"date-time","name":"expiration_date","req":false,"short":"The expiration date for this gift card.","type":"`$STRING`","index$":5},{"active":true,"name":"face_value","req":true,"short":"Face value of the gift card (only present when status is 'SUCCESS')","type":"`$OBJECT`","index$":6},{"active":true,"name":"pin","req":false,"short":"Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)","type":"`$STRING`","index$":7},{"active":true,"format":"uuid","name":"reference","req":true,"short":"Unique reference for this transaction","type":"`$STRING`","index$":8},{"active":true,"name":"security_code","req":false,"short":"Gift card security code (only present when status is 'SUCCESS' and brand provides one)","type":"`$STRING`","index$":9},{"active":true,"name":"serial_number","req":false,"short":"Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)","type":"`$STRING`","index$":10},{"active":true,"name":"status","req":true,"short":"The current status of the order","type":"`$STRING`","index$":11},{"active":true,"format":"uri","name":"url","req":false,"short":"Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS')","type":"`$STRING`","index$":12}],"name":"digital_order_status","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"req-12345-67890","kind":"query","name":"original_client_request_id","orig":"original_client_request_id","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"019ade93-d513-776b-92a2-b6323329b661","kind":"query","name":"reference","orig":"reference","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /digital/order-status","json":"{\"operationId\":\"getDigitalOrderStatus\",\"parameters\":[{\"description\":\"The unique reference (UUID) returned when the order was created.  Cannot be used together with original_client_request_id.\",\"example\":\"019ade93-d513-776b-92a2-b6323329b661\",\"in\":\"query\",\"name\":\"reference\",\"required\":false,\"schema\":{\"description\":\"Unique reference for this transaction\",\"example\":\"019ade93-d513-776b-92a2-b6323329b661\",\"format\":\"uuid\",\"type\":\"string\"}},{\"description\":\"The unique identifier (client_request_id) that you provided when creating the order. Cannot be used together with reference.\",\"example\":\"req-12345-67890\",\"in\":\"query\",\"name\":\"original_client_request_id\",\"required\":false,\"schema\":{\"description\":\"This field will be the `client_request_id` provided in the original transaction.  For example, if you are performing some form of cancellation, then this would be the `client_request_id` you provided when making the original issuance request\\n\",\"example\":\"req-12345-67890\",\"maxLength\":50,\"minLength\":5,\"pattern\":\"^[A-Za-z0-9_-]+$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"failed_order\":{\"description\":\"Response when the order has failed to process\",\"summary\":\"Order failed\",\"value\":{\"code\":\"000\",\"data\":{\"reference\":\"019ade93-d513-776b-92a2-b6323329b661\",\"status\":\"ERROR\"},\"message\":\"Order failed to process\",\"status\":\"success\"}},\"pending_order\":{\"description\":\"Response when checking by reference and the order is still being processed\",\"summary\":\"Order still processing\",\"value\":{\"code\":\"000\",\"data\":{\"reference\":\"ab8044e0-82cb-11e9-8395-f18b28b35eef\",\"status\":\"PENDING\"},\"message\":\"Order is still processing\",\"status\":\"success\"}},\"successful_code_order\":{\"description\":\"Response when the order has completed successfully with code delivery method\",\"summary\":\"Order successful - Code delivery\",\"value\":{\"code\":\"000\",\"data\":{\"barcode\":{\"string\":\"97801149999107077547\",\"type\":\"C128\",\"url\":\"https://example.com?type=C128&code=97801149999107077547\"},\"brand\":\"async-mock-brand\",\"code\":\"97801149999107077547\",\"cost_value\":{\"amount\":4.5,\"currency\":\"GBP\"},\"expiration_date\":\"2024-05-30T11:12:49+00:00\",\"face_value\":{\"amount\":5,\"currency\":\"GBP\"},\"pin\":\"7547\",\"reference\":\"ab8044e0-82cb-11e9-8395-f18b28b35eef\",\"status\":\"SUCCESS\"},\"message\":\"Order has finished processing\",\"status\":\"success\"}},\"successful_url_order\":{\"description\":\"Response when the order has completed successfully with URL delivery method\",\"summary\":\"Order successful - URL delivery\",\"value\":{\"code\":\"000\",\"data\":{\"brand\":\"fixed-async-uk\",\"cost_value\":{\"amount\":36.9,\"currency\":\"GBP\"},\"discount\":10,\"expiration_date\":\"2027-12-02T23:59:59+00:00\",\"face_value\":{\"amount\":41,\"currency\":\"GBP\"},\"reference\":\"019ade93-d513-776b-92a2-b6323329b661\",\"status\":\"SUCCESS\",\"url\":\"https://example.com\"},\"message\":\"Order has finished processing\",\"status\":\"success\"}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"properties\":{\"barcode\":{\"additionalProperties\":false,\"description\":\"Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS')\",\"properties\":{\"string\":{\"type\":\"string\"},\"type\":{\"enum\":[\"C128\",\"C128A\",\"C39\",\"I25\",\"QRCODE\",\"PDF417\",\"NONE\"],\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"type\",\"string\",\"url\"],\"type\":\"object\"},\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"code\":{\"description\":\"Gift card code (for code-delivery brands, only present when status is 'SUCCESS')\",\"example\":\"99998888777766665555\",\"type\":\"string\"},\"cost_value\":{\"description\":\"Cost value of the gift card (only present when status is 'SUCCESS')\",\"properties\":{\"amount\":{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"discount\":{\"description\":\"The discount percentage used on this transaction\",\"examples\":[0,9.5,5.75],\"format\":\"float\",\"minimum\":0,\"type\":\"number\"},\"expiration_date\":{\"description\":\"The expiration date for this gift card. This will only be present when the brand provides one.\",\"format\":\"date-time\",\"type\":\"string\"},\"face_value\":{\"description\":\"Face value of the gift card (only present when status is 'SUCCESS')\",\"properties\":{\"amount\":{\"examples\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/properties/amount/examples\"},\"format\":\"float\",\"type\":\"number\"},\"currency\":{\"enum\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/properties/currency/enum\"},\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"pin\":{\"description\":\"Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)\",\"example\":\"1234\",\"type\":\"string\"},\"reference\":{\"description\":\"Unique reference for this transaction\",\"example\":\"019ade93-d513-776b-92a2-b6323329b661\",\"format\":\"uuid\",\"type\":\"string\"},\"security_code\":{\"description\":\"Gift card security code (only present when status is 'SUCCESS' and brand provides one)\",\"type\":\"string\"},\"serial_number\":{\"description\":\"Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)\",\"type\":\"string\"},\"status\":{\"description\":\"The current status of the order\",\"enum\":[\"REQUESTED\",\"PENDING\",\"PROCESSING\",\"SUCCESS\",\"ERROR\",\"CANCELLED\"],\"type\":\"string\"},\"url\":{\"description\":\"Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS')\",\"example\":\"https://example-gift-card.com/redeem/abc123\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"reference\",\"status\"],\"type\":\"object\"},\"message\":{\"example\":\"Order has finished processing\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Order status retrieved successfully\",\"headers\":{\"X-RateLimit-Limit\":{\"description\":\"The number of requests you are allowed to make to this endpoint within a 60 second window\",\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"description\":\"The number of requests you have remaining within your 60 second window\",\"schema\":{\"type\":\"integer\"}}}},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"714\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad request. Invalid or missing required parameters.\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"validation_error_both_parameters\":{\"description\":\"Error when both reference and original_client_request_id are provided\",\"summary\":\"Both parameters provided\",\"value\":{\"code\":\"433\",\"data\":{\"original_client_request_id\":[\"The original client request id field is prohibited when reference is present.\"],\"reference\":[\"The reference field is prohibited when original_client_request_id is present.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"validation_error_invalid_reference\":{\"description\":\"Error when reference is not a valid UUID\",\"summary\":\"Invalid reference format\",\"value\":{\"code\":\"433\",\"data\":{\"reference\":[\"The reference must be a valid UUID.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"validation_error_no_parameters\":{\"description\":\"Error when neither reference nor original_client_request_id is provided\",\"summary\":\"No parameters provided\",\"value\":{\"code\":\"433\",\"data\":{\"reference\":[\"At least one of reference or original_client_request_id must be provided.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"validation_error_sale_not_found\":{\"description\":\"Error when the order cannot be found\",\"summary\":\"Sale not found\",\"value\":{\"code\":\"433\",\"data\":{\"reference\":\"The sale could not be found.\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"211\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Too many attempts for the API rate limit\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Too many requests. Rate limit exceeded.\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/digital/order-status","segments":[{"lit":"digital"},{"lit":"order-status"}],"select":{"exist":["original_client_request_id","reference"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"digital_order_status","name__orig":"digital_order_status","Name":"DigitalOrderStatus","name_":"digital_order_status","name-":"digital-order-status","NAME":"DIGITAL_ORDER_STATUS","index$":6}, {"active":true,"entity":"digital_order_status","key$":"BasicDigitalOrderStatusFlow","kind":"basic","name":"BasicDigitalOrderStatusFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"digital_order_status_ref01","srcdatavar":"digital_order_status_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-digital_order_status_ref01"}}],"index$":0}]}, 'DigitalOrderStatus')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let digital_order_status_ref01_data = Object.values(setup.data.existing.digital_order_status)[0] as any

    // LOAD
    const digital_order_status_ref01_ent = client.DigitalOrderStatus()
    const digital_order_status_ref01_match_dt0: any = {}
    const digital_order_status_ref01_data_dt0 = (await digital_order_status_ref01_ent.load(digital_order_status_ref01_match_dt0)).data()
    assert(null != digital_order_status_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/digital_order_status/DigitalOrderStatusTestData.json')

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
    ['digital_order_status01','digital_order_status02','digital_order_status03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_DIGITAL_ORDER_STATUS_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_DIGITAL_ORDER_STATUS_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_DIGITAL_ORDER_STATUS_ENTID']
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
  
