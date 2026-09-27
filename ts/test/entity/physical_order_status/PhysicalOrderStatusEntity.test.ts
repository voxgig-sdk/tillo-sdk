

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"references":{"a":true,"h":"References","n":"references","r":true,"sh":"Array of order references to check.","t":"`$ARRAY`","key$":"references","index$":0}},"name":"physical_order_status","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /physical/order-status","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/physical/order-status","q":{},"r":{},"s":[{"lit":"physical"},{"lit":"order-status"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"physical_order_status","name__orig":"physical_order_status","Name":"PhysicalOrderStatus","name_":"physical_order_status","name-":"physical-order-status","NAME":"PHYSICAL_ORDER_STATUS","index$":11}, {"active":true,"entity":"physical_order_status","key$":"BasicPhysicalOrderStatusFlow","kind":"basic","name":"BasicPhysicalOrderStatusFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"physical_order_status_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'PhysicalOrderStatus', {"POST /physical/order-status":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["references"],"properties":{"references":{"type":"array","minItems":1,"items":{"type":"string","format":"uuid","minLength":1,"description":"Order reference (UUID) to check status for"},"description":"Array of order references to check. Each reference should be a UUID from a previous order-card request.\nReturns status information for each reference, including 'not found' for references that don't exist.\n","key$":"references"}},"x-ref":"#/components/schemas/PhysicalOrderStatusRequest","index$":1},"examples":{"single_reference":{"summary":"Single Reference","description":"Check status for a single order reference","value":{"references":["ab337240-e731-11e8-b7dc-8d2baaa618cb"]}},"multiple_references":{"summary":"Multiple References","description":"Check status for multiple order references","value":{"references":["ab337240-e731-11e8-b7dc-8d2baaa618cb","ab3223c0-ed7b-11f0-b734-4fea3167b172"]}}}}}},"parameters":[]}})
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
  
