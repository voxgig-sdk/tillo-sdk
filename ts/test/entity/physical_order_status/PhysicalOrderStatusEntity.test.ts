

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


describe('PhysicalOrderStatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.PhysicalOrderStatus()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TILLO_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'physical_order_status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"references","req":true,"short":"Array of order references to check.","type":"`$ARRAY`","index$":0}],"name":"physical_order_status","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /physical/order-status","json":"{\"operationId\":\"postPhysicalOrderStatus\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"multiple_references\":{\"description\":\"Check status for multiple order references\",\"summary\":\"Multiple References\",\"value\":{\"references\":[\"ab337240-e731-11e8-b7dc-8d2baaa618cb\",\"ab3223c0-ed7b-11f0-b734-4fea3167b172\"]}},\"single_reference\":{\"description\":\"Check status for a single order reference\",\"summary\":\"Single Reference\",\"value\":{\"references\":[\"ab337240-e731-11e8-b7dc-8d2baaa618cb\"]}}},\"schema\":{\"properties\":{\"references\":{\"description\":\"Array of order references to check. Each reference should be a UUID from a previous order-card request.\\nReturns status information for each reference, including 'not found' for references that don't exist.\\n\",\"items\":{\"description\":\"Order reference (UUID) to check status for\",\"format\":\"uuid\",\"minLength\":1,\"type\":\"string\"},\"minItems\":1,\"type\":\"array\"}},\"required\":[\"references\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"error_status\":{\"description\":\"Order that encountered an error during processing\",\"summary\":\"Order with Error Status\",\"value\":{\"code\":\"000\",\"data\":{\"error-reference-123\":{\"reference\":\"error-reference-123\",\"status\":\"error\"}},\"message\":\"Order statuses\",\"status\":\"success\"}},\"fulfilled_with_code\":{\"description\":\"Order that has been fulfilled and includes the gift card code\",\"summary\":\"Fulfilled Order with Code\",\"value\":{\"code\":\"000\",\"data\":{\"ab337240-e731-11e8-b7dc-8d2baaa618cb\":{\"code\":\"5045075881749921691\",\"reference\":\"ab337240-e731-11e8-b7dc-8d2baaa618cb\",\"status\":\"fulfilled\"}},\"message\":\"Order statuses\",\"status\":\"success\"}},\"multiple_statuses\":{\"description\":\"Response showing statuses for multiple references including processing and not found\",\"summary\":\"Multiple Order Statuses\",\"value\":{\"code\":\"000\",\"data\":{\"ab337240-e731-11e8-b7dc-8d2baaa618cb\":{\"reference\":\"ab337240-e731-11e8-b7dc-8d2baaa618cb\",\"status\":\"processing\"},\"this-does-not-exist\":{\"reference\":\"this-does-not-exist\",\"status\":\"not found\"}},\"message\":\"Order statuses\",\"status\":\"success\"}},\"not_found\":{\"description\":\"Reference that does not exist or is not accessible\",\"summary\":\"Order Not Found\",\"value\":{\"code\":\"000\",\"data\":{\"this-does-not-exist\":{\"reference\":\"this-does-not-exist\",\"status\":\"not found\"}},\"message\":\"Order statuses\",\"status\":\"success\"}},\"processing_order\":{\"description\":\"Order that is currently being processed\",\"summary\":\"Processing Order\",\"value\":{\"code\":\"000\",\"data\":{\"ab337240-e731-11e8-b7dc-8d2baaa618cb\":{\"reference\":\"ab337240-e731-11e8-b7dc-8d2baaa618cb\",\"status\":\"processing\"},\"this-does-not-exist\":{\"reference\":\"this-does-not-exist\",\"status\":\"not found\"}},\"message\":\"Order statuses\",\"status\":\"success\"}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"additionalProperties\":{\"properties\":{\"code\":{\"description\":\"Gift card code. This will only be present when the order status is `fulfilled` and a code is available.\",\"example\":\"5045075881749921691\",\"type\":\"string\"},\"reference\":{\"description\":\"The order reference UUID\",\"example\":\"ab337240-e731-11e8-b7dc-8d2baaa618cb\",\"type\":\"string\"},\"status\":{\"description\":\"The current status of the order:\\n- `received`: Order has been received and is queued for processing\\n- `processing`: Order is currently being processed\\n- `fulfilled`: Order has been fulfilled\\n- `error`: Order encountered an error during processing\\n- `not found`: Reference does not exist or is not accessible to the authenticated buyer\\n\",\"enum\":[\"received\",\"processing\",\"fulfilled\",\"error\",\"not found\"],\"example\":\"fulfilled\",\"type\":\"string\"}},\"required\":[\"reference\",\"status\"],\"type\":\"object\"},\"description\":\"Object where keys are order reference UUIDs and values are order status objects.\\nEach reference provided in the request will have a corresponding entry in this object.\\n\",\"type\":\"object\"},\"message\":{\"example\":\"Order statuses\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"empty_references\":{\"description\":\"The references array cannot be empty\",\"summary\":\"Invalid or missing parameter\",\"value\":{\"code\":\"433\",\"data\":{\"references\":\"The [references] field is required and must be an array\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Validation error code\",\"example\":\"433\",\"type\":\"string\"},\"data\":{\"additionalProperties\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Optional detailed validation errors by field\",\"example\":{\"brand\":[\"The brand field is required.\"],\"faceValue.amount\":[\"The amount must be a positive number.\"]},\"type\":\"object\"},\"message\":{\"description\":\"Error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"},\"502\":{\"description\":\"Bad Gateway.  No response body is returned.\"},\"504\":{\"description\":\"Gateway Timeout.  No response body is returned\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/physical/order-status","segments":[{"lit":"physical"},{"lit":"order-status"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"physical_order_status","name__orig":"physical_order_status","Name":"PhysicalOrderStatus","name_":"physical_order_status","name-":"physical-order-status","NAME":"PHYSICAL_ORDER_STATUS","index$":11}, {"active":true,"entity":"physical_order_status","key$":"BasicPhysicalOrderStatusFlow","kind":"basic","name":"BasicPhysicalOrderStatusFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"physical_order_status_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'PhysicalOrderStatus')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const physical_order_status_ref01_ent = client.PhysicalOrderStatus()
    let physical_order_status_ref01_data = setup.data.new.physical_order_status['physical_order_status_ref01']

    physical_order_status_ref01_data = (await physical_order_status_ref01_ent.create(physical_order_status_ref01_data)).data()
    assert(null != physical_order_status_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/physical_order_status/PhysicalOrderStatusTestData.json')

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
    ['physical_order_status01','physical_order_status02','physical_order_status03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_PHYSICAL_ORDER_STATUS_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_PHYSICAL_ORDER_STATUS_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_PHYSICAL_ORDER_STATUS_ENTID']
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
  
