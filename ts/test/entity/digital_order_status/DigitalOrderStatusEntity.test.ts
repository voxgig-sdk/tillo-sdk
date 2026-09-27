

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"barcode":{"a":true,"h":"Barcode","n":"barcode","r":true,"sh":"Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS')","t":"`$OBJECT`","key$":"barcode","index$":0},"brand":{"a":true,"h":"Brand","n":"brand","r":false,"sh":"Brand identifier/slug (lowercase letters, numbers, hyphens only).","t":"`$STRING`","key$":"brand","index$":1},"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"Gift card code (for code-delivery brands, only present when status is 'SUCCESS')","t":"`$STRING`","key$":"code","index$":2},"cost_value":{"a":true,"h":"Cost Value","n":"cost_value","r":true,"sh":"Cost value of the gift card (only present when status is 'SUCCESS')","t":"`$OBJECT`","key$":"cost_value","index$":3},"discount":{"a":true,"fo":"float","h":"Discount","n":"discount","r":false,"sh":"The discount percentage used on this transaction","t":"`$NUMBER`","key$":"discount","index$":4},"expiration_date":{"a":true,"fo":"date-time","h":"Expiration Date","n":"expiration_date","r":false,"sh":"The expiration date for this gift card.","t":"`$STRING`","key$":"expiration_date","index$":5},"face_value":{"a":true,"h":"Face Value","n":"face_value","r":true,"sh":"Face value of the gift card (only present when status is 'SUCCESS')","t":"`$OBJECT`","key$":"face_value","index$":6},"pin":{"a":true,"h":"Pin","n":"pin","r":false,"sh":"Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)","t":"`$STRING`","key$":"pin","index$":7},"reference":{"a":true,"fo":"uuid","h":"Reference","n":"reference","r":true,"sh":"Unique reference for this transaction","t":"`$STRING`","key$":"reference","index$":8},"security_code":{"a":true,"h":"Security Code","n":"security_code","r":false,"sh":"Gift card security code (only present when status is 'SUCCESS' and brand provides one)","t":"`$STRING`","key$":"security_code","index$":9},"serial_number":{"a":true,"h":"Serial Number","n":"serial_number","r":false,"sh":"Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)","t":"`$STRING`","key$":"serial_number","index$":10},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"The current status of the order","t":"`$STRING`","key$":"status","index$":11},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS')","t":"`$STRING`","key$":"url","index$":12}},"name":"digital_order_status","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /digital/order-status","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"req-12345-67890","k":"query","n":"original_client_request_id","or":"original_client_request_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"019ade93-d513-776b-92a2-b6323329b661","k":"query","n":"reference","or":"reference","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/digital/order-status","q":{"exist":["original_client_request_id","reference"]},"r":{},"s":[{"lit":"digital"},{"lit":"order-status"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"digital_order_status","name__orig":"digital_order_status","Name":"DigitalOrderStatus","name_":"digital_order_status","name-":"digital-order-status","NAME":"DIGITAL_ORDER_STATUS","index$":6}, {"active":true,"entity":"digital_order_status","key$":"BasicDigitalOrderStatusFlow","kind":"basic","name":"BasicDigitalOrderStatusFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"digital_order_status_ref01","srcdatavar":"digital_order_status_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-digital_order_status_ref01"}}],"index$":0}]}, 'DigitalOrderStatus', {"GET /digital/order-status":{"protocol":"http","parameters":[{"name":"reference","in":"query","required":false,"schema":{"type":"string","format":"uuid","description":"Unique reference for this transaction","example":"019ade93-d513-776b-92a2-b6323329b661","x-ref":"#/components/schemas/Reference"},"description":"The unique reference (UUID) returned when the order was created.  Cannot be used together with original_client_request_id.","example":"019ade93-d513-776b-92a2-b6323329b661","index$":0},{"name":"original_client_request_id","in":"query","required":false,"schema":{"type":"string","minLength":5,"maxLength":50,"pattern":"^[A-Za-z0-9_-]+$","description":"This field will be the `client_request_id` provided in the original transaction.  For example, if you are performing some form of cancellation, then this would be the `client_request_id` you provided when making the original issuance request\n","example":"req-12345-67890","x-ref":"#/components/schemas/OriginalClientRequestId"},"description":"The unique identifier (client_request_id) that you provided when creating the order. Cannot be used together with reference.","example":"req-12345-67890","index$":1}]}})
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
  
