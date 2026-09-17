

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

    const live = 'TRUE' === process.env.TILLO_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'digital_order_card.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"brand","req":true,"short":"Brand identifier/slug (lowercase letters, numbers, hyphens only).","type":"`$STRING`","index$":0},{"active":true,"name":"client_request_id","req":true,"short":"Unique identifier for this request.","type":"`$STRING`","index$":1},{"active":true,"name":"cost_value","req":true,"type":"`$OBJECT`","index$":2},{"active":true,"name":"delivery_method","req":true,"type":"`$STRING`","index$":3},{"active":true,"name":"face_value","req":true,"type":"`$OBJECT`","index$":4},{"active":true,"name":"float_balance","req":true,"type":"`$OBJECT`","index$":5},{"active":true,"name":"fulfilment_by","req":true,"short":"This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.","type":"`$STRING`","index$":6},{"active":true,"name":"fulfilment_parameters","req":true,"short":"Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf","type":"`$OBJECT`","index$":7},{"active":true,"name":"personalisation","req":true,"type":"`$OBJECT`","index$":8},{"active":true,"format":"uuid","name":"reference","req":true,"short":"Unique reference for this transaction","type":"`$STRING`","index$":9},{"active":true,"name":"sector","req":true,"short":"Must match one of the sectors configured for your buyer account.","type":"`$STRING`","index$":10},{"active":true,"name":"tags","req":false,"short":"Optional meta data associated with the issuance.","type":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"index$":11}],"name":"digital_order_card","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /digital/order-card","json":"{\"operationId\":\"postDigitalOrderCard\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"order_choice_link_with_theme\":{\"description\":\"Order a Choice Link (ChoicePlus) with customised theme\",\"summary\":\"Order Choice Link - with custom theme\",\"value\":{\"brand\":\"choiceplus-mock-uk\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"url\",\"face_value\":{\"amount\":20,\"currency\":\"GBP\"},\"fulfilment_by\":\"partner\",\"personalisation\":{\"choice_link_theme\":\"my-custom-theme\",\"from_name\":\"Sender\",\"message\":\"Happy Birthday! Enjoy your gift card\",\"template\":\"standard\",\"to_name\":\"Recipient\"},\"sector\":\"voluntary-benefits\"}},\"order_gift_card_with_code\":{\"description\":\"Simple example of ordering a digital gift card with code delivery method\",\"summary\":\"Order Digital Gift Card - Code\",\"value\":{\"brand\":\"sync-open-code-uk\",\"client_request_id\":\"req-12345-67890\",\"delivery_method\":\"code\",\"face_value\":{\"amount\":25,\"currency\":\"GBP\"},\"fulfilment_by\":\"partner\",\"sector\":\"marketplace\"}},\"order_gift_card_with_fulfilment\":{\"description\":\"Example of ordering a digital gift card with Tillo handling the email fulfilment\",\"summary\":\"Order Digital Gift Card - with fulfilment by Tillo\",\"value\":{\"brand\":\"fixed-async-us\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"url\",\"face_value\":{\"amount\":20,\"currency\":\"USD\"},\"fulfilment_by\":\"rewardcloud\",\"fulfilment_parameters\":{\"from_email\":\"noreply@sandbox.tillo.dev\",\"from_name\":\"Partner name\",\"subject\":\"[TestCode] Here is your gift card!\",\"to_email\":\"test@tillo.io\",\"to_name\":\"Receiver\"},\"personalisation\":{\"from_name\":\"Sender\",\"message\":\"Here is your gift\",\"template\":\"standard\",\"to_name\":\"Recipient\"},\"sector\":\"voluntary-benefits\"}},\"order_gift_card_with_personalisation\":{\"description\":\"Example of ordering a digital gift card with personalisation options\",\"summary\":\"Order Digital Gift Card - with Personalisation\",\"value\":{\"brand\":\"open-async-eur\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"url\",\"face_value\":{\"amount\":20.5,\"currency\":\"EUR\"},\"fulfilment_by\":\"partner\",\"personalisation\":{\"from_name\":\"Sender\",\"message\":\"Here is your gift\",\"template\":\"standard\",\"to_name\":\"Recipient\"},\"sector\":\"voluntary-benefits\"}},\"order_gift_card_with_url\":{\"description\":\"Simple example of ordering a digital gift card with URL delivery method\",\"summary\":\"Order Digital Gift Card - URL\",\"value\":{\"brand\":\"fixed-async-uk\",\"client_request_id\":\"req-12345-67890\",\"delivery_method\":\"url\",\"face_value\":{\"amount\":41,\"currency\":\"GBP\"},\"fulfilment_by\":\"partner\",\"sector\":\"marketplace\"}},\"order_reward_pass_with_email\":{\"description\":\"Order a Reward Pass product with an email delivery\",\"summary\":\"Order Reward Pass - Email\",\"value\":{\"brand\":\"loop-card-uk\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"email\",\"face_value\":{\"amount\":5,\"currency\":\"GBP\"},\"fulfilment_by\":\"partner\",\"personalisation\":{\"carrier_message\":\"Message to appear on letter if physical card fulfilment\",\"email_message\":\"Message to appear in payment notification email\",\"from_name\":\"Sender\",\"message\":\"Here is your gift\",\"redemption_message\":\"Message to appear on participant portal\",\"template\":\"standard\",\"to_name\":\"Recipient\"},\"sector\":\"voluntary-benefits\"}},\"order_reward_pass_with_url\":{\"description\":\"Order a Reward Pass product with a URL delivery\",\"summary\":\"Order Reward Pass - URL\",\"value\":{\"brand\":\"open-loop-uk\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"url\",\"face_value\":{\"amount\":5,\"currency\":\"GBP\"},\"fulfilment_by\":\"partner\",\"personalisation\":{\"carrier_message\":\"Message to appear on letter if physical card fulfilment\",\"email_message\":\"Message to appear in payment notification email\",\"message\":\"Here is your gift\",\"redemption_message\":\"Message to appear on participant portal\"},\"sector\":\"voluntary-benefits\"}}},\"schema\":{\"if\":{\"properties\":{\"fulfilment_by\":{\"const\":\"rewardcloud\"}}},\"properties\":{\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"client_request_id\":{\"description\":\"Unique identifier for this request. Also acts as an idempotency key\",\"example\":\"req-12345-67890\",\"maxLength\":50,\"minLength\":5,\"pattern\":\"^[A-Za-z0-9_-]+$\",\"type\":\"string\"},\"delivery_method\":{\"enum\":[\"code\",\"url\",\"email\",\"wrapped\"],\"minLength\":3,\"type\":\"string\"},\"face_value\":{\"properties\":{\"amount\":{\"description\":\"Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\\nMinimum and maximum amounts depend on the buyer↔brand configuration.\\nUse the brand discovery endpoint to retrieve valid denomination ranges.\\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\\n\",\"oneOf\":[{\"examples\":[\"25\",\"25.0\",\"25.00\"],\"pattern\":\"^\\\\d+(\\\\.\\\\d{1,2})?$\",\"type\":\"string\"},{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"}]},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"fulfilment_by\":{\"description\":\"This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.  If you are planning on sending out the email please set this to 'partner', if you would like us to fulfil the email for you then please provide 'rewardcloud' as the value. Please note, that when we are fulfilling the email on your behalf you will need to provide the additional 'fulfilment_parameters' field\",\"enum\":[\"partner\",\"rewardcloud\"],\"type\":\"string\"},\"fulfilment_parameters\":{\"description\":\"Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf\",\"properties\":{\"address_1\":{\"type\":\"string\"},\"address_2\":{\"type\":\"string\"},\"city\":{\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"customer_id\":{\"type\":\"string\"},\"from_email\":{\"type\":\"string\"},\"from_name\":{\"type\":\"string\"},\"language\":{\"type\":\"string\"},\"postal_code\":{\"type\":\"string\"},\"subject\":{\"type\":\"string\"},\"to_email\":{\"type\":\"string\"},\"to_first_name\":{\"type\":\"string\"},\"to_last_name\":{\"type\":\"string\"},\"to_name\":{\"type\":\"string\"}},\"required\":[\"to_email\",\"from_name\",\"from_email\",\"subject\"],\"type\":\"object\"},\"personalisation\":{\"properties\":{\"carrier_message\":{\"description\":\"This only needs to be added when purchasing a Reward Pass product\",\"type\":\"string\"},\"choice_link_theme\":{\"description\":\"This is an optional field, and only used when purchasing a Choice Link when you have set up a custom theme\",\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"email_message\":{\"description\":\"This only needs to be added when purchasing a Reward Pass product\",\"type\":\"string\"},\"from_name\":{\"description\":\"This field is required, unless your purchasing a Reward Pass product\",\"example\":\"Jane Doe\",\"type\":\"string\"},\"gifted_by\":{\"description\":\"This is an optional field, and only used when purchasing a Choice Link\",\"type\":\"string\"},\"language\":{\"example\":\"English\",\"type\":\"string\"},\"message\":{\"example\":\"Thanks for all your hard work!\",\"type\":\"string\"},\"redemption_message\":{\"description\":\"This only needs to be added when purchasing a Reward Pass product\",\"type\":\"string\"},\"template\":{\"description\":\"This field is required, unless your purchasing a Reward Pass product\",\"example\":\"standard\",\"type\":\"string\"},\"to_name\":{\"description\":\"This field is required, unless your purchasing a Reward Pass product\",\"example\":\"John Doe\",\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"},\"sector\":{\"description\":\"Must match one of the sectors configured for your buyer account.\\n\",\"enum\":[\"affiliate-marketing\",\"aggregator\",\"b2c-marketplace\",\"cashback\",\"cash-out\",\"charity\",\"consumer\",\"consumer-rewards-and-incentives\",\"crypto-currency\",\"crypto-off-ramp\",\"customer-acquisition\",\"digital-currency\",\"employee-benefits\",\"employee-rewards-and-incentives\",\"gift-card-mall\",\"insurance\",\"marketplace\",\"other\",\"relief-support-and-disbursement\",\"reward-recognition\",\"voluntary-benefits\"],\"example\":\"voluntary-benefits\",\"minLength\":1,\"type\":\"string\"},\"tags\":{\"description\":\"Optional meta data associated with the issuance.\",\"items\":{\"anyOf\":[{\"pattern\":\"^[-A-Za-z0-9 ]+$\",\"type\":\"string\"},{\"type\":\"number\"}]},\"type\":\"array\"}},\"required\":[\"client_request_id\",\"brand\",\"face_value\",\"delivery_method\",\"fulfilment_by\",\"sector\"],\"then\":{\"required\":[\"fulfilment_parameters\"]},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"order_successful_response\":{\"description\":\"Response when a digital gift card order is successfully created\",\"summary\":\"Successful order response\",\"value\":{\"code\":\"000\",\"data\":{\"brand\":\"fixed-async-uk\",\"cost_value\":{\"amount\":36.9,\"currency\":\"GBP\"},\"face_value\":{\"amount\":41,\"currency\":\"GBP\"},\"float_balance\":{\"amount\":9998771,\"currency\":\"GBP\"},\"reference\":\"019ade93-d513-776b-92a2-b6323329b661\"},\"message\":\"Card ordered successfully\",\"status\":\"success\"}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"properties\":{\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"cost_value\":{\"properties\":{\"amount\":{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"face_value\":{\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/properties\"},\"required\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/required\"},\"type\":\"object\"},\"float_balance\":{\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/properties\"},\"required\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/required\"},\"type\":\"object\"},\"reference\":{\"description\":\"Unique reference for this transaction\",\"example\":\"019ade93-d513-776b-92a2-b6323329b661\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"brand\",\"face_value\",\"cost_value\",\"reference\"],\"type\":\"object\"},\"message\":{\"example\":\"Card ordered successfully\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Card ordered successfully. The order is being processed asynchronously.\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"delivery_method_not_supported\":{\"description\":\"This is an example error response when provided with a delivery method that the brand does not support\",\"summary\":\"Invalid delivery method\",\"value\":{\"code\":\"713\",\"message\":\"You cannot deliver codes via [code] for [my-example-brand]\",\"status\":\"error\"}},\"invalid_brand\":{\"description\":\"This is an example error response when provided with a non-existent brand slug.\",\"summary\":\"Invalid brand\",\"value\":{\"code\":\"072\",\"message\":\"The requested brand [abc123] does not exist\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Validation error code\",\"example\":\"433\",\"type\":\"string\"},\"data\":{\"additionalProperties\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Optional detailed validation errors by field\",\"example\":{\"brand\":[\"The brand field is required.\"],\"faceValue.amount\":[\"The amount must be a positive number.\"]},\"type\":\"object\"},\"message\":{\"description\":\"Error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"},\"500\":{\"content\":{\"application/json\":{\"examples\":{\"external_error\":{\"summary\":\"Example when we have an intermittent issue with a particular brand or processor\",\"value\":{\"code\":\"603\",\"message\":\"Error returned by the Processor\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/400/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Internal Server Error\"},\"502\":{\"description\":\"Bad Gateway.  No response body is returned.\\n\"},\"504\":{\"description\":\"Gateway Timeout.  No response body is returned\\n\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/digital/order-card","segments":[{"lit":"digital"},{"lit":"order-card"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"digital_order_card","name__orig":"digital_order_card","Name":"DigitalOrderCard","name_":"digital_order_card","name-":"digital-order-card","NAME":"DIGITAL_ORDER_CARD","index$":5}, {"active":true,"entity":"digital_order_card","key$":"BasicDigitalOrderCardFlow","kind":"basic","name":"BasicDigitalOrderCardFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"digital_order_card_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'DigitalOrderCard')
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



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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
  
