

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

    const live = 'TRUE' === process.env.TILLO_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'float.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"floats":{"a":true,"h":"Floats","n":"floats","r":true,"sh":"Float balances grouped by currency code","t":"`$OBJECT`","key$":"floats","index$":0},"last_refreshed_at":{"a":true,"fo":"date-time","h":"Last Refreshed At","n":"last_refreshed_at","r":true,"sh":"ISO 8601 timestamp of when the float data was last refreshed","t":"`$STRING`","key$":"last_refreshed_at","index$":1}},"name":"float","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /float/request-payment-transfer","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/float/request-payment-transfer","q":{"$action":"request_payment_transfer"},"r":{},"s":[{"lit":"float"},{"lit":"request-payment-transfer"}],"t":{"req":{"float":"`reqdata`"},"res":"`body.data`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /float/transfer-requests","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"GBP","k":"query","n":"currency","or":"currency","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"2025-10-16","k":"query","n":"end_date","or":"end_date","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"universal-float","k":"query","n":"float","or":"float","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"BUYER-PROVIDED-REF","k":"query","n":"payment_reference","or":"payment_reference","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"2025-10-12","k":"query","n":"start_date","or":"start_date","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"pending","k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/float/transfer-requests","q":{"$action":"transfer_request","exist":["currency","end_date","float","payment_reference","start_date","status"]},"r":{},"s":[{"lit":"float"},{"lit":"transfer-requests"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /check-floats","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"GBP","k":"query","n":"currency","or":"currency","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/check-floats","q":{"exist":["currency"]},"r":{},"s":[{"lit":"check-floats"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"float","name__orig":"float","Name":"Float","name_":"float","name-":"float","NAME":"FLOAT","index$":8}, {"active":true,"entity":"float","key$":"BasicFloatFlow","kind":"basic","name":"BasicFloatFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"float_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"float_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"float_ref01","srcdatavar":"float_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-float_ref01"}}],"index$":2}]}, 'Float', {"POST /float/request-payment-transfer":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["float"],"properties":{"float":{"type":"string","description":"Float identifier from the check-floats endpoint (e.g. universal-float, brand-specific float name)","minLength":1,"maxLength":255,"example":"universal-float"},"payment_reference":{"type":"string","description":"Optional payment reference. If not provided, Tillo will generate one automatically. Uniqueness is not enforced, but unique references are recommended.","minLength":1,"maxLength":18,"example":"PAY-2024-001"},"finance_email":{"type":"string","format":"email","description":"Optional finance email address to override the default recipient. Required if partner has no default finance email configured.","maxLength":255,"example":"finance@company.com"},"proforma_invoice":{"type":"object","description":"Optional proforma invoice company details override. Only available if partner has proforma invoicing feature enabled. If provided, company_name is required.","required":["company_name"],"properties":{"company_name":{"type":"string","minLength":1,"maxLength":255,"example":"Example Company Ltd"},"address_line_1":{"type":"string","maxLength":255,"example":"123 Business Street"},"address_line_2":{"type":"string","maxLength":255,"example":"Floor 2"},"address_line_3":{"type":"string","maxLength":255},"address_line_4":{"type":"string","maxLength":255},"city":{"type":"string","maxLength":255,"example":"London"},"post_code":{"type":"string","maxLength":255,"example":"SW1A 1AA"},"county":{"type":"string","maxLength":255,"example":"Greater London"},"country":{"type":"string","maxLength":255,"example":"United Kingdom"},"vat_number":{"type":"string","maxLength":255,"example":"GB123456789"},"contact_name":{"type":"string","maxLength":255,"example":"John Smith"}}},"currency":{"type":"string","minLength":3,"maxLength":3,"pattern":"^[A-Z]{3}$","enum":["AED","AUD","BHD","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HUF","INR","JPY","KWD","MXN","NOK","NZD","OMR","PLN","QAR","RON","SAR","SEK","USD"],"x-ref":"#/components/schemas/CurrencyIsoCode"},"amount":{"oneOf":[{"type":"string","pattern":"^\\d+(\\.\\d{1,2})?$","examples":["25","25.0","25.00"],"x-ref":"#/components/schemas/AmountString"},{"type":"number","format":"float","examples":[24.99,25,25.5],"x-ref":"#/components/schemas/AmountNumeric"}],"description":"Amount to transfer. Accepts either a string or number. String amounts can have any number of decimal places (e.g., \"300.1000000000001\") and will be normalized to 2 decimal places in the response. Minimum value is 0.01, maximum is 99,999,999.99.\n"}}},"examples":{"minimal":{"summary":"Minimal","description":"Minimal request with only required fields - Tillo generates payment reference","value":{"float":"universal-float","currency":"GBP","amount":100}},"minimal_with_payment_reference":{"summary":"Minimal (with your own payment reference)","description":"Minimal request with a custom payment reference provided by the partner","value":{"float":"universal-float","currency":"GBP","amount":500,"payment_reference":"PARTNER-REF-123"}},"with_proforma_invoice":{"summary":"With proforma invoice details","description":"Request with proforma invoice company details override","value":{"float":"universal-float","currency":"GBP","amount":1000,"payment_reference":"INV-2024-001","proforma_invoice":{"company_name":"Acme Corporation Ltd","address_line_1":"456 Commerce Road","address_line_2":"Suite 100","city":"Manchester","post_code":"M1 1AA","county":"Greater Manchester","country":"United Kingdom","vat_number":"GB987654321","contact_name":"Jane Doe"}}},"with_finance_email":{"summary":"With finance email","description":"Request with custom finance email override","value":{"float":"amazon","currency":"USD","amount":250,"payment_reference":"CUSTOM-001","finance_email":"accounts@partner.com"}}}}}},"parameters":[]},"GET /float/transfer-requests":{"protocol":"http","parameters":[{"name":"float","in":"query","required":false,"description":"Specifies the target float (e.g., \"universal-float\", \"amazon\", \"reward-pass\")","example":"universal-float","schema":{"type":"string"},"index$":0},{"name":"currency","in":"query","required":false,"description":"Optional filter to return transfer requests for a specific currency only. Provide the three-character ISO 4217 currency code (eg. GBP, EUR, USD). Must be uppercase.","example":"GBP","schema":{"type":"string","minLength":3,"maxLength":3,"pattern":"^[A-Z]{3}$","enum":["AED","AUD","BHD","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HUF","INR","JPY","KWD","MXN","NOK","NZD","OMR","PLN","QAR","RON","SAR","SEK","USD"],"x-ref":"#/components/schemas/CurrencyIsoCode"},"index$":1},{"name":"payment_reference","in":"query","required":false,"description":"The payment reference to filter transfer requests","example":"BUYER-PROVIDED-REF","schema":{"type":"string","maxLength":18},"index$":2},{"name":"start_date","in":"query","required":false,"description":"Beginning of the date range in ISO 8601 format","example":"2025-10-12","schema":{"type":"string","format":"date"},"index$":3},{"name":"end_date","in":"query","required":false,"description":"End of the date range in ISO 8601 format","example":"2025-10-16","schema":{"type":"string","format":"date"},"index$":4},{"name":"status","in":"query","required":false,"description":"Filter for transfer request state","example":"pending","schema":{"type":"string","enum":["pending","approved","approved_edited","removed","cancelled"]},"index$":5}]},"GET /check-floats":{"protocol":"http","parameters":[{"name":"currency","in":"query","required":false,"description":"Optional filter to return floats for a specific currency only. Provide the three-character ISO 4217 currency code (eg. GBP, EUR, USD). Must be uppercase.","example":"GBP","schema":{"type":"string","minLength":3,"maxLength":3,"pattern":"^[A-Z]{3}$","enum":["AED","AUD","BHD","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HUF","INR","JPY","KWD","MXN","NOK","NZD","OMR","PLN","QAR","RON","SAR","SEK","USD"],"x-ref":"#/components/schemas/CurrencyIsoCode"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const float_ref01_ent = client.Float()
    let float_ref01_data = setup.data.new.float['float_ref01']

    float_ref01_data = (await float_ref01_ent.create(float_ref01_data)).data()
    assert(null != float_ref01_data)


    // LIST
    const float_ref01_match: any = {}

    const float_ref01_list = (await float_ref01_ent.list(float_ref01_match)).map((e: any) => e.data())


    // LOAD
    const float_ref01_match_dt0: any = {}
    const float_ref01_data_dt0 = (await float_ref01_ent.load(float_ref01_match_dt0)).data()
    assert(null != float_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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
  
