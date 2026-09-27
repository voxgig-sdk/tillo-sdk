
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


describe('DigitalOrderCardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.DigitalOrderCard()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"brand":{"a":true,"h":"Brand","n":"brand","r":true,"sh":"Brand identifier/slug (lowercase letters, numbers, hyphens only).","t":"`$STRING`","key$":"brand","index$":0},"client_request_id":{"a":true,"h":"Client Request Id","n":"client_request_id","r":true,"sh":"Unique identifier for this request.","t":"`$STRING`","key$":"client_request_id","index$":1},"cost_value":{"a":true,"h":"Cost Value","n":"cost_value","r":true,"t":"`$OBJECT`","key$":"cost_value","index$":2},"delivery_method":{"a":true,"h":"Delivery Method","n":"delivery_method","r":true,"t":"`$STRING`","key$":"delivery_method","index$":3},"face_value":{"a":true,"h":"Face Value","n":"face_value","r":true,"t":"`$OBJECT`","key$":"face_value","index$":4},"float_balance":{"a":true,"h":"Float Balance","n":"float_balance","r":true,"t":"`$OBJECT`","key$":"float_balance","index$":5},"fulfilment_by":{"a":true,"h":"Fulfilment By","n":"fulfilment_by","r":true,"sh":"This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.","t":"`$STRING`","key$":"fulfilment_by","index$":6},"fulfilment_parameters":{"a":true,"h":"Fulfilment Parameters","n":"fulfilment_parameters","r":true,"sh":"Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf","t":"`$OBJECT`","key$":"fulfilment_parameters","index$":7},"personalisation":{"a":true,"h":"Personalisation","n":"personalisation","r":true,"t":"`$OBJECT`","key$":"personalisation","index$":8},"reference":{"a":true,"fo":"uuid","h":"Reference","n":"reference","r":true,"sh":"Unique reference for this transaction","t":"`$STRING`","key$":"reference","index$":9},"sector":{"a":true,"h":"Sector","n":"sector","r":true,"sh":"Must match one of the sectors configured for your buyer account.","t":"`$STRING`","key$":"sector","index$":10},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"Optional meta data associated with the issuance.","t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"key$":"tags","index$":11}},"name":"digital_order_card","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /digital/order-card","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/digital/order-card","q":{},"r":{},"s":[{"lit":"digital"},{"lit":"order-card"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"digital_order_card","name__orig":"digital_order_card","Name":"DigitalOrderCard","name_":"digital_order_card","name-":"digital-order-card","NAME":"DIGITAL_ORDER_CARD","index$":5}, {"active":true,"entity":"digital_order_card","key$":"BasicDigitalOrderCardFlow","kind":"basic","name":"BasicDigitalOrderCardFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"digital_order_card_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'DigitalOrderCard', {"POST /digital/order-card":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["client_request_id","brand","face_value","delivery_method","fulfilment_by","sector"],"properties":{"client_request_id":{"type":"string","minLength":5,"maxLength":50,"pattern":"^[A-Za-z0-9_-]+$","description":"Unique identifier for this request. Also acts as an idempotency key","example":"req-12345-67890","x-ref":"#/components/schemas/ClientRequestId","key$":"client_request_id"},"brand":{"type":"string","minLength":1,"maxLength":255,"pattern":"^[a-z0-9-]+$","description":"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\n","example":"fixed-async-uk","x-ref":"#/components/schemas/BrandSlug","key$":"brand"},"face_value":{"type":"object","required":["amount","currency"],"properties":{"amount":{"oneOf":[{},{}],"description":"Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\nMinimum and maximum amounts depend on the buyer↔brand configuration.\nUse the brand discovery endpoint to retrieve valid denomination ranges.\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\n"},"currency":{"type":"string","minLength":3,"maxLength":3,"pattern":"^[A-Z]{3}$","enum":["AED","AUD","BHD","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HUF","INR","JPY","KWD","MXN","NOK","NZD","OMR","PLN","QAR","RON","SAR","SEK","USD"],"x-ref":"#/components/schemas/CurrencyIsoCode"}},"x-ref":"#/components/schemas/FaceValue","key$":"face_value"},"delivery_method":{"type":"string","minLength":3,"enum":["code","url","email","wrapped"],"x-ref":"#/components/schemas/DeliveryMethod","key$":"delivery_method"},"fulfilment_by":{"type":"string","enum":["partner","rewardcloud"],"description":"This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.  If you are planning on sending out the email please set this to 'partner', if you would like us to fulfil the email for you then please provide 'rewardcloud' as the value. Please note, that when we are fulfilling the email on your behalf you will need to provide the additional 'fulfilment_parameters' field","x-ref":"#/components/schemas/FulfilmentBy","key$":"fulfilment_by"},"sector":{"type":"string","minLength":1,"description":"Must match one of the sectors configured for your buyer account.\n","enum":["affiliate-marketing","aggregator","b2c-marketplace","cashback","cash-out","charity","consumer","consumer-rewards-and-incentives","crypto-currency","crypto-off-ramp","customer-acquisition","digital-currency","employee-benefits","employee-rewards-and-incentives","gift-card-mall","insurance","marketplace","other","relief-support-and-disbursement","reward-recognition","voluntary-benefits"],"example":"voluntary-benefits","x-ref":"#/components/schemas/Sector","key$":"sector"},"personalisation":{"type":"object","required":["message"],"properties":{"to_name":{"type":"string","example":"John Doe","description":"This field is required, unless your purchasing a Reward Pass product"},"from_name":{"type":"string","example":"Jane Doe","description":"This field is required, unless your purchasing a Reward Pass product"},"message":{"type":"string","example":"Thanks for all your hard work!"},"template":{"type":"string","example":"standard","description":"This field is required, unless your purchasing a Reward Pass product"},"language":{"type":"string","example":"English"},"email_message":{"type":"string","description":"This only needs to be added when purchasing a Reward Pass product"},"redemption_message":{"type":"string","description":"This only needs to be added when purchasing a Reward Pass product"},"carrier_message":{"type":"string","description":"This only needs to be added when purchasing a Reward Pass product"},"choice_link_theme":{"type":"string","pattern":"^[a-z0-9-]+$","description":"This is an optional field, and only used when purchasing a Choice Link when you have set up a custom theme"},"gifted_by":{"type":"string","description":"This is an optional field, and only used when purchasing a Choice Link"}},"x-ref":"#/components/schemas/Personalisation","key$":"personalisation"},"fulfilment_parameters":{"type":"object","required":["to_email","from_name","from_email","subject"],"description":"Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf","properties":{"to_name":{"type":"string"},"to_email":{"type":"string"},"from_name":{"type":"string"},"from_email":{"type":"string"},"subject":{"type":"string"},"language":{"type":"string"},"customer_id":{"type":"string"},"to_first_name":{"type":"string"},"to_last_name":{"type":"string"},"address_1":{"type":"string"},"address_2":{"type":"string"},"city":{"type":"string"},"postal_code":{"type":"string"},"country":{"type":"string"}},"x-ref":"#/components/schemas/FulfilmentParametersDigital","key$":"fulfilment_parameters"},"tags":{"type":"array","description":"Optional meta data associated with the issuance.","items":{"anyOf":[{"type":"string","pattern":"^[-A-Za-z0-9 ]+$"},{"type":"number"}]},"x-ref":"#/components/schemas/Tags","key$":"tags"}},"if":{"properties":{"fulfilment_by":{"const":"rewardcloud"}}},"then":{"required":["fulfilment_parameters"]},"x-ref":"#/components/schemas/DigitalOrderCardPostRequest","index$":1},"examples":{"order_gift_card_with_code":{"summary":"Order Digital Gift Card - Code","description":"Simple example of ordering a digital gift card with code delivery method","value":{"client_request_id":"req-12345-67890","brand":"sync-open-code-uk","face_value":{"amount":25,"currency":"GBP"},"delivery_method":"code","fulfilment_by":"partner","sector":"marketplace"}},"order_gift_card_with_url":{"summary":"Order Digital Gift Card - URL","description":"Simple example of ordering a digital gift card with URL delivery method","value":{"client_request_id":"req-12345-67890","brand":"fixed-async-uk","face_value":{"amount":41,"currency":"GBP"},"delivery_method":"url","fulfilment_by":"partner","sector":"marketplace"}},"order_gift_card_with_personalisation":{"summary":"Order Digital Gift Card - with Personalisation","description":"Example of ordering a digital gift card with personalisation options","value":{"client_request_id":"019ade93-d513-776b-92a2-b6323329b661","brand":"open-async-eur","face_value":{"amount":20.5,"currency":"EUR"},"delivery_method":"url","fulfilment_by":"partner","personalisation":{"to_name":"Recipient","from_name":"Sender","message":"Here is your gift","template":"standard"},"sector":"voluntary-benefits"}},"order_choice_link_with_theme":{"summary":"Order Choice Link - with custom theme","description":"Order a Choice Link (ChoicePlus) with customised theme","value":{"client_request_id":"019ade93-d513-776b-92a2-b6323329b661","brand":"choiceplus-mock-uk","face_value":{"amount":20,"currency":"GBP"},"delivery_method":"url","fulfilment_by":"partner","personalisation":{"to_name":"Recipient","from_name":"Sender","message":"Happy Birthday! Enjoy your gift card","template":"standard","choice_link_theme":"my-custom-theme"},"sector":"voluntary-benefits"}},"order_gift_card_with_fulfilment":{"summary":"Order Digital Gift Card - with fulfilment by Tillo","description":"Example of ordering a digital gift card with Tillo handling the email fulfilment","value":{"client_request_id":"019ade93-d513-776b-92a2-b6323329b661","brand":"fixed-async-us","face_value":{"amount":20,"currency":"USD"},"delivery_method":"url","fulfilment_by":"rewardcloud","fulfilment_parameters":{"to_name":"Receiver","to_email":"test@tillo.io","from_name":"Partner name","from_email":"noreply@sandbox.tillo.dev","subject":"[TestCode] Here is your gift card!"},"personalisation":{"to_name":"Recipient","from_name":"Sender","message":"Here is your gift","template":"standard"},"sector":"voluntary-benefits"}},"order_reward_pass_with_url":{"summary":"Order Reward Pass - URL","description":"Order a Reward Pass product with a URL delivery","value":{"client_request_id":"019ade93-d513-776b-92a2-b6323329b661","brand":"open-loop-uk","face_value":{"amount":5,"currency":"GBP"},"delivery_method":"url","fulfilment_by":"partner","personalisation":{"message":"Here is your gift","email_message":"Message to appear in payment notification email","redemption_message":"Message to appear on participant portal","carrier_message":"Message to appear on letter if physical card fulfilment"},"sector":"voluntary-benefits"}},"order_reward_pass_with_email":{"summary":"Order Reward Pass - Email","description":"Order a Reward Pass product with an email delivery","value":{"client_request_id":"019ade93-d513-776b-92a2-b6323329b661","brand":"loop-card-uk","face_value":{"amount":5,"currency":"GBP"},"delivery_method":"email","fulfilment_by":"partner","personalisation":{"to_name":"Recipient","from_name":"Sender","message":"Here is your gift","template":"standard","email_message":"Message to appear in payment notification email","redemption_message":"Message to appear on participant portal","carrier_message":"Message to appear on letter if physical card fulfilment"},"sector":"voluntary-benefits"}}}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const digital_order_card_ref01_ent = client.DigitalOrderCard()
    let digital_order_card_ref01_data = setup.data.new.digital_order_card['digital_order_card_ref01']

    digital_order_card_ref01_data = (await digital_order_card_ref01_ent.create(digital_order_card_ref01_data)).data()
    assert(null != digital_order_card_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/digital_order_card/DigitalOrderCardTestData.json')

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
    ['digital_order_card01','digital_order_card02','digital_order_card03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_DIGITAL_ORDER_CARD_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_DIGITAL_ORDER_CARD_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_DIGITAL_ORDER_CARD_ENTID']
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
  
