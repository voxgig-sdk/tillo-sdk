
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


describe('PhysicalOrderCardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.PhysicalOrderCard()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"brand","req":true,"short":"Brand identifier/slug (lowercase letters, numbers, hyphens only).","type":"`$STRING`","index$":0},{"active":true,"name":"client_request_id","req":true,"short":"Unique identifier for this request.","type":"`$STRING`","index$":1},{"active":true,"name":"cost_value","req":true,"short":"The amount you actually paid (once the discount has been taken into consideration)","type":"`$OBJECT`","index$":2},{"active":true,"format":"float","name":"discount","req":true,"short":"The discount percentage used on this transaction","type":"`$NUMBER`","index$":3},{"active":true,"format":"date-time","name":"expiration_date","req":false,"short":"The expiration date for this gift card.","type":"`$STRING`","index$":4},{"active":true,"name":"face_value","req":true,"short":"the face value amount of the gift card.","type":"`$OBJECT`","index$":5},{"active":true,"name":"float_balance","req":true,"short":"Your remaining balance on the float used to make this transaction","type":"`$OBJECT`","index$":6},{"active":true,"name":"fulfilment_by","req":true,"short":"When ordering a physical gift card, this must be set to `rewardcloud`","type":"`$STRING`","index$":7},{"active":true,"name":"fulfilment_parameters","req":true,"type":"`$OBJECT`","index$":8},{"active":true,"name":"personalisation","req":true,"type":"`$OBJECT`","index$":9},{"active":true,"format":"uuid","name":"reference","req":true,"short":"Unique reference for this transaction","type":"`$STRING`","index$":10},{"active":true,"name":"sector","req":true,"short":"Must match one of the sectors configured for your buyer account.","type":"`$STRING`","index$":11},{"active":true,"name":"shipping_method","req":true,"short":"Shipping method identifier.","type":"`$STRING`","index$":12},{"active":true,"name":"tags","req":false,"short":"Optional meta data associated with the issuance.","type":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"index$":13}],"name":"physical_order_card","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /physical/order-card","json":"{\"operationId\":\"postPhysicalOrderCard\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"normal\":{\"description\":\"Standard physical card order without personalisation\",\"summary\":\"Normal Order (No Personalisation)\",\"value\":{\"brand\":\"example-brand\",\"client_request_id\":\"req-12345-67890\",\"face_value\":{\"amount\":20,\"currency\":\"GBP\"},\"fulfilment_by\":\"rewardcloud\",\"fulfilment_parameters\":{\"address_1\":\"123 Main Street\",\"address_2\":\"\",\"address_3\":\"\",\"address_4\":\"\",\"city\":\"London\",\"company_name\":\"Acme Corp\",\"country\":\"United Kingdom\",\"postal_code\":\"SW1A 1AA\",\"to_name\":\"John Doe\"},\"sector\":\"voluntary-benefits\",\"shipping_method\":\"standard\",\"tags\":[\"order-123\"]}},\"with_personalisation\":{\"description\":\"Physical card order with personalisation message\",\"summary\":\"Order With Personalisation\",\"value\":{\"brand\":\"example-brand\",\"client_request_id\":\"req-67890-12345\",\"face_value\":{\"amount\":50,\"currency\":\"GBP\"},\"fulfilment_by\":\"rewardcloud\",\"fulfilment_parameters\":{\"address_1\":\"123 Main Street\",\"address_2\":\"Suite 100\",\"address_3\":\"\",\"address_4\":\"\",\"city\":\"London\",\"company_name\":\"Acme Corp\",\"country\":\"United Kingdom\",\"postal_code\":\"SW1A 1AA\",\"to_name\":\"Jane Smith\"},\"personalisation\":{\"message\":\"Thank you for your hard work! Enjoy your gift card.\"},\"sector\":\"voluntary-benefits\",\"shipping_method\":\"standard\",\"tags\":[\"employee-reward\",\"physical\"]}}},\"schema\":{\"properties\":{\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"client_request_id\":{\"description\":\"Unique identifier for this request. Also acts as an idempotency key\",\"example\":\"req-12345-67890\",\"maxLength\":50,\"minLength\":5,\"pattern\":\"^[A-Za-z0-9_-]+$\",\"type\":\"string\"},\"face_value\":{\"properties\":{\"amount\":{\"description\":\"Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\\nMinimum and maximum amounts depend on the buyer↔brand configuration.\\nUse the brand discovery endpoint to retrieve valid denomination ranges.\\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\\n\",\"oneOf\":[{\"examples\":[\"25\",\"25.0\",\"25.00\"],\"pattern\":\"^\\\\d+(\\\\.\\\\d{1,2})?$\",\"type\":\"string\"},{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"}]},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"fulfilment_by\":{\"const\":\"rewardcloud\",\"description\":\"When ordering a physical gift card, this must be set to `rewardcloud`\",\"type\":\"string\"},\"fulfilment_parameters\":{\"properties\":{\"address_1\":{\"type\":\"string\"},\"address_2\":{\"type\":\"string\"},\"address_3\":{\"type\":\"string\"},\"address_4\":{\"type\":\"string\"},\"city\":{\"type\":\"string\"},\"company_name\":{\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"postal_code\":{\"type\":\"string\"},\"to_name\":{\"type\":\"string\"}},\"required\":[\"to_name\",\"address_1\",\"postal_code\",\"country\"],\"type\":\"object\"},\"personalisation\":{\"properties\":{\"message\":{\"minLength\":1,\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"},\"sector\":{\"description\":\"Must match one of the sectors configured for your buyer account.\\n\",\"enum\":[\"affiliate-marketing\",\"aggregator\",\"b2c-marketplace\",\"cashback\",\"cash-out\",\"charity\",\"consumer\",\"consumer-rewards-and-incentives\",\"crypto-currency\",\"crypto-off-ramp\",\"customer-acquisition\",\"digital-currency\",\"employee-benefits\",\"employee-rewards-and-incentives\",\"gift-card-mall\",\"insurance\",\"marketplace\",\"other\",\"relief-support-and-disbursement\",\"reward-recognition\",\"voluntary-benefits\"],\"example\":\"voluntary-benefits\",\"minLength\":1,\"type\":\"string\"},\"shipping_method\":{\"description\":\"Shipping method identifier. Must be a valid shipping method for the fulfilment house. Returns 400 if the shipping method is not available for the fulfilment house.\",\"enum\":[\"standard\",\"standard-signed\",\"standard-tracked\",\"second-class\",\"second-class-signed\"],\"example\":\"standard\",\"type\":\"string\"},\"tags\":{\"description\":\"Optional meta data associated with the issuance.\",\"items\":{\"anyOf\":[{\"pattern\":\"^[-A-Za-z0-9 ]+$\",\"type\":\"string\"},{\"type\":\"number\"}]},\"type\":\"array\"}},\"required\":[\"client_request_id\",\"brand\",\"face_value\",\"shipping_method\",\"fulfilment_by\",\"fulfilment_parameters\",\"sector\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"code\":\"000\",\"data\":{\"brand\":\"example-brand\",\"cost_value\":{\"amount\":9.8,\"currency\":\"GBP\"},\"discount\":10,\"face_value\":{\"amount\":10,\"currency\":\"GBP\"},\"float_balance\":{\"amount\":7557.63,\"currency\":\"GBP\"},\"reference\":\"a60ab120-eb17-11f0-9a51-1be5a50b6aae\"},\"message\":\"Card ordered successfully\",\"status\":\"success\"},\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"properties\":{\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"cost_value\":{\"description\":\"The amount you actually paid (once the discount has been taken into consideration)\",\"properties\":{\"amount\":{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"discount\":{\"description\":\"The discount percentage used on this transaction\",\"examples\":[0,9.5,5.75],\"format\":\"float\",\"minimum\":0,\"type\":\"number\"},\"expiration_date\":{\"description\":\"The expiration date for this gift card. This will only be present when the brand provides one.\",\"format\":\"date-time\",\"type\":\"string\"},\"face_value\":{\"description\":\"the face value amount of the gift card.\",\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/properties\"},\"required\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/required\"},\"type\":\"object\"},\"float_balance\":{\"description\":\"Your remaining balance on the float used to make this transaction\",\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/properties\"},\"required\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/required\"},\"type\":\"object\"},\"reference\":{\"description\":\"Unique reference for this transaction\",\"example\":\"019ade93-d513-776b-92a2-b6323329b661\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"brand\",\"face_value\",\"cost_value\",\"discount\",\"reference\"],\"type\":\"object\"},\"message\":{\"example\":\"Card ordered successfully\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"invalid_fulfilment_by\":{\"description\":\"When provided an invalid fulfilment_by value\",\"summary\":\"Invalid Fulfilment By Value\",\"value\":{\"code\":\"704\",\"data\":{\"fulfilment_by\":\"The fulfilment_by can only have one of the following options [rewardcloud]\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"invalid_shipping_method\":{\"description\":\"When provided an invalid shipping_method value\",\"summary\":\"Invalid Shipping Method\",\"value\":{\"code\":\"704\",\"data\":{\"shipping_method\":\"The shipping_method can only be one of the following values [standard, standard-signed, standard-tracked, second-class, second-class-signed]\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"missing_fulfilment_parameters\":{\"description\":\"Required fulfilment_parameters field is missing\",\"summary\":\"Missing required parameter\",\"value\":{\"code\":\"070\",\"data\":{\"fulfilment_parameters\":\"Missing parameter [fulfilment_parameters]\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Validation error code\",\"example\":\"433\",\"type\":\"string\"},\"data\":{\"additionalProperties\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Optional detailed validation errors by field\",\"example\":{\"brand\":[\"The brand field is required.\"],\"faceValue.amount\":[\"The amount must be a positive number.\"]},\"type\":\"object\"},\"message\":{\"description\":\"Error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"},\"502\":{\"description\":\"Bad Gateway.  No response body is returned.\"},\"504\":{\"description\":\"Gateway Timeout.  No response body is returned\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/physical/order-card","segments":[{"lit":"physical"},{"lit":"order-card"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"physical_order_card","name__orig":"physical_order_card","Name":"PhysicalOrderCard","name_":"physical_order_card","name-":"physical-order-card","NAME":"PHYSICAL_ORDER_CARD","index$":10}, {"active":true,"entity":"physical_order_card","key$":"BasicPhysicalOrderCardFlow","kind":"basic","name":"BasicPhysicalOrderCardFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"physical_order_card_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'PhysicalOrderCard')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const physical_order_card_ref01_ent = client.PhysicalOrderCard()
    let physical_order_card_ref01_data = setup.data.new.physical_order_card['physical_order_card_ref01']

    physical_order_card_ref01_data = (await physical_order_card_ref01_ent.create(physical_order_card_ref01_data)).data()
    assert(null != physical_order_card_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/physical_order_card/PhysicalOrderCardTestData.json')

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
    ['physical_order_card01','physical_order_card02','physical_order_card03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_PHYSICAL_ORDER_CARD_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_PHYSICAL_ORDER_CARD_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_PHYSICAL_ORDER_CARD_ENTID']
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
  
