
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


describe('DigitalTopUpPostEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.DigitalTopUpPost()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"brand","req":true,"short":"Brand identifier/slug (lowercase letters, numbers, hyphens only).","type":"`$STRING`","index$":0},{"active":true,"name":"client_request_id","req":true,"short":"Unique identifier for this request.","type":"`$STRING`","index$":1},{"active":true,"name":"code","op":{"create":{"req":false,"type":"`$STRING`"}},"req":true,"short":"Gift card code","type":"`$STRING`","index$":2},{"active":true,"name":"cost_value","req":true,"type":"`$OBJECT`","index$":3},{"active":true,"format":"float","name":"discount","req":true,"short":"The discount percentage used on this transaction","type":"`$NUMBER`","index$":4},{"active":true,"name":"face_value","req":true,"type":"`$OBJECT`","index$":5},{"active":true,"name":"float_balance","req":true,"type":"`$OBJECT`","index$":6},{"active":true,"name":"pin","req":false,"short":"Gift card PIN.","type":"`$STRING`","index$":7},{"active":true,"format":"uuid","name":"reference","op":{"create":{"req":false,"type":"`$STRING`"}},"req":true,"short":"Unique reference for this transaction","type":"`$STRING`","index$":8},{"active":true,"name":"sector","req":true,"short":"Must match one of the sectors configured for your buyer account.","type":"`$STRING`","index$":9},{"active":true,"name":"serial_number","req":false,"short":"Gift card serial number.","type":"`$STRING`","index$":10},{"active":true,"name":"tags","req":false,"short":"Optional meta data associated with the issuance.","type":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"index$":11}],"name":"digital_top_up_post","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /digital/top-up","json":"{\"operationId\":\"postDigitalTopUp\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"with_code_and_pin\":{\"description\":\"Standard top-up request with both code and PIN\",\"summary\":\"Code and PIN\",\"value\":{\"brand\":\"mock-brand\",\"client_request_id\":\"req-12345-67890\",\"code\":\"6280390102830976\",\"face_value\":{\"amount\":12.35,\"currency\":\"GBP\"},\"pin\":\"12562161\",\"sector\":\"marketplace\"}},\"with_code_and_serial\":{\"description\":\"Top-up request with code and serial number (when PIN is not required by processor)\",\"summary\":\"Code and Serial Number\",\"value\":{\"brand\":\"mock-brand\",\"client_request_id\":\"req-12345-67892\",\"code\":\"6280390102830976\",\"face_value\":{\"amount\":50,\"currency\":\"GBP\"},\"sector\":\"marketplace\",\"serial_number\":\"SN123456789\"}},\"with_code_only\":{\"description\":\"Top-up request with code only (when PIN is not required by processor)\",\"summary\":\"Code Only\",\"value\":{\"brand\":\"mock-brand\",\"client_request_id\":\"req-12345-67891\",\"code\":\"ABC123456789DEF\",\"face_value\":{\"amount\":25,\"currency\":\"GBP\"},\"sector\":\"voluntary-benefits\"}},\"with_reference\":{\"description\":\"Top-up request with reference only.\",\"summary\":\"Reference Only\",\"value\":{\"brand\":\"mock-brand\",\"client_request_id\":\"req-12345-67893\",\"face_value\":{\"amount\":25,\"currency\":\"GBP\"},\"reference\":\"ad38c984-b509-11e7-9abc-06c4ed57771a\",\"sector\":\"voluntary-benefits\"}}},\"schema\":{\"oneOf\":[{\"required\":[\"code\"]},{\"required\":[\"reference\"]}],\"properties\":{\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"client_request_id\":{\"description\":\"Unique identifier for this request. Also acts as an idempotency key\",\"example\":\"req-12345-67890\",\"maxLength\":50,\"minLength\":5,\"pattern\":\"^[A-Za-z0-9_-]+$\",\"type\":\"string\"},\"code\":{\"description\":\"Gift card code. Must be between 8 and 110 characters.\\nAllowed characters: alphanumeric, space, period, underscore, hyphen.\\n\",\"example\":\"6280390102830976\",\"maxLength\":110,\"minLength\":8,\"pattern\":\"^[a-zA-Z0-9 ._-]+$\",\"type\":\"string\"},\"face_value\":{\"properties\":{\"amount\":{\"description\":\"Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\\nMinimum and maximum amounts depend on the buyer↔brand configuration.\\nUse the brand discovery endpoint to retrieve valid denomination ranges.\\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\\n\",\"oneOf\":[{\"examples\":[\"25\",\"25.0\",\"25.00\"],\"pattern\":\"^\\\\d+(\\\\.\\\\d{1,2})?$\",\"type\":\"string\"},{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"}]},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"pin\":{\"description\":\"Gift card PIN. Required for certain brands.\\nMust be between 3 and 20 characters when provided.\\nAllowed characters: alphanumeric, underscore, hyphen.\\n\",\"example\":\"12562161\",\"maxLength\":20,\"minLength\":3,\"pattern\":\"^[a-zA-Z0-9_-]+$\",\"type\":\"string\"},\"reference\":{\"description\":\"Unique reference for this transaction\",\"example\":\"019ade93-d513-776b-92a2-b6323329b661\",\"format\":\"uuid\",\"type\":\"string\"},\"sector\":{\"description\":\"Must match one of the sectors configured for your buyer account.\\n\",\"enum\":[\"affiliate-marketing\",\"aggregator\",\"b2c-marketplace\",\"cashback\",\"cash-out\",\"charity\",\"consumer\",\"consumer-rewards-and-incentives\",\"crypto-currency\",\"crypto-off-ramp\",\"customer-acquisition\",\"digital-currency\",\"employee-benefits\",\"employee-rewards-and-incentives\",\"gift-card-mall\",\"insurance\",\"marketplace\",\"other\",\"relief-support-and-disbursement\",\"reward-recognition\",\"voluntary-benefits\"],\"example\":\"voluntary-benefits\",\"minLength\":1,\"type\":\"string\"},\"serial_number\":{\"description\":\"Gift card serial number. Required for certain brands.\\nMust be at least 1 character when provided.\\n\",\"example\":\"SN123456789\",\"minLength\":1,\"type\":\"string\"},\"tags\":{\"description\":\"Optional meta data associated with the issuance.\",\"items\":{\"anyOf\":[{\"pattern\":\"^[-A-Za-z0-9 ]+$\",\"type\":\"string\"},{\"type\":\"number\"}]},\"type\":\"array\"}},\"required\":[\"client_request_id\",\"brand\",\"face_value\",\"sector\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"with_code_and_pin\":{\"description\":\"Top-up successful with both code and PIN returned\",\"summary\":\"Successful Response - Code and PIN\",\"value\":{\"code\":\"000\",\"data\":{\"brand\":\"mock-brand\",\"code\":\"ABC1234\",\"cost_value\":{\"amount\":192,\"currency\":\"GBP\"},\"discount\":4,\"face_value\":{\"amount\":200,\"currency\":\"GBP\"},\"float_balance\":{\"amount\":20763.3,\"currency\":\"GBP\"},\"pin\":\"1234\",\"reference\":\"a491f1f0-0c75-11eb-af67-09b215648e5c\"},\"message\":\"Card topped up successfully\",\"status\":\"success\"}},\"with_code_and_serial\":{\"description\":\"Top-up successful with code returned (serial_number is only used in the request, not returned in the response)\",\"summary\":\"Successful Response - Code and Serial Number\",\"value\":{\"code\":\"000\",\"data\":{\"brand\":\"mock-brand\",\"code\":\"ABC1234\",\"cost_value\":{\"amount\":192,\"currency\":\"GBP\"},\"discount\":4,\"face_value\":{\"amount\":200,\"currency\":\"GBP\"},\"float_balance\":{\"amount\":20763.3,\"currency\":\"GBP\"},\"reference\":\"a491f1f0-0c75-11eb-af67-09b215648e5c\"},\"message\":\"Card topped up successfully\",\"status\":\"success\"}},\"with_code_only\":{\"description\":\"Top-up successful with only code returned\",\"summary\":\"Successful Response - Code Only\",\"value\":{\"code\":\"000\",\"data\":{\"brand\":\"mock-brand\",\"code\":\"ABC1234\",\"cost_value\":{\"amount\":192,\"currency\":\"GBP\"},\"discount\":4,\"face_value\":{\"amount\":200,\"currency\":\"GBP\"},\"float_balance\":{\"amount\":20763.3,\"currency\":\"GBP\"},\"reference\":\"a491f1f0-0c75-11eb-af67-09b215648e5c\"},\"message\":\"Card topped up successfully\",\"status\":\"success\"}},\"with_reference\":{\"description\":\"Top-up successful with code returned (Sometimes both code and pin are returned, depending on brand)\",\"summary\":\"Successful Response - Reference\",\"value\":{\"code\":\"000\",\"data\":{\"brand\":\"mock-brand\",\"code\":\"ABC1234\",\"cost_value\":{\"amount\":192,\"currency\":\"GBP\"},\"discount\":4,\"face_value\":{\"amount\":200,\"currency\":\"GBP\"},\"float_balance\":{\"amount\":20763.3,\"currency\":\"GBP\"},\"reference\":\"a491f1f0-0c75-11eb-af67-09b215648e5c\"},\"message\":\"Card topped up successfully\",\"status\":\"success\"}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"description\":\"Response code\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"properties\":{\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"code\":{\"description\":\"Gift card code\",\"example\":\"ABC1234\",\"type\":\"string\"},\"cost_value\":{\"properties\":{\"amount\":{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"discount\":{\"description\":\"The discount percentage used on this transaction\",\"examples\":[0,9.5,5.75],\"format\":\"float\",\"minimum\":0,\"type\":\"number\"},\"face_value\":{\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/properties\"},\"required\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/required\"},\"type\":\"object\"},\"float_balance\":{\"properties\":{\"amount\":{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"nullable\":true,\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"nullable\":true,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"currency\",\"amount\"],\"type\":\"object\"},\"pin\":{\"description\":\"Gift card PIN. Required for certain brands.\\nMust be between 3 and 20 characters when provided.\\nAllowed characters: alphanumeric, underscore, hyphen.\\n\",\"example\":\"12562161\",\"maxLength\":20,\"minLength\":3,\"pattern\":\"^[a-zA-Z0-9_-]+$\",\"type\":\"string\"},\"reference\":{\"description\":\"Unique reference for this transaction\",\"example\":\"019ade93-d513-776b-92a2-b6323329b661\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"brand\",\"code\",\"face_value\",\"cost_value\",\"discount\",\"float_balance\",\"reference\"],\"type\":\"object\"},\"message\":{\"description\":\"Human-readable response message\",\"example\":\"Card topped up successfully\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successful Response\",\"headers\":{\"X-RateLimit-Limit\":{\"description\":\"The number of requests you are allowed to make to this endpoint within a 60 second window\",\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"description\":\"The number of requests you have remaining within your 60 second window\",\"schema\":{\"type\":\"integer\"}}}},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"invalid_face_value_range\":{\"description\":\"Validation error when face value amount is outside the allowed range for the brand (min and max values are brand-specific)\",\"summary\":\"Invalid Face Value Range\",\"value\":{\"code\":\"704\",\"message\":\"The face value must be between [1.00] and [150.00]\",\"status\":\"error\"}},\"invalid_sector\":{\"description\":\"Validation error when sector field contains an invalid value\",\"summary\":\"Invalid Sector\",\"value\":{\"code\":\"704\",\"data\":{\"sector\":\"The sector [marketplaces] is invalid. Please provide an acceptable one\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"missing_code_or_reference\":{\"description\":\"Bad request with missing required parameters\",\"summary\":\"Missing Parameters code or reference\",\"value\":{\"code\":\"070\",\"data\":{\"code\":\"The code field is required when reference is not present.\",\"reference\":\"The reference field is required when code is not present.\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"missing_parameter\":{\"description\":\"Bad request with missing required parameters\",\"summary\":\"Missing Parameter\",\"value\":{\"code\":\"070\",\"data\":{\"sector\":\"Missing parameter [sector]\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"validation_error\":{\"description\":\"Bad request with validation errors\",\"summary\":\"Validation Error\",\"value\":{\"code\":\"704\",\"data\":{\"amount\":\"The [amount] must be a number\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request. Invalid or missing required parameters.\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"currency_not_found\":{\"description\":\"The requested currency was not found\",\"summary\":\"Currency Not Found\",\"value\":{\"code\":\"721\",\"message\":\"The requested currency was not found\",\"status\":\"error\"}},\"currency_not_supported_by_brand\":{\"description\":\"The requested currency is not supported by this brand\",\"summary\":\"Currency Not Supported by Brand\",\"value\":{\"code\":\"723\",\"message\":\"The requested currency is not supported by this brand\",\"status\":\"error\"}},\"invalid_reference\":{\"description\":\"When an invalid sale reference is provided to attempt top-up.\",\"summary\":\"When an invalid sale reference is provided.\",\"value\":{\"code\":\"433\",\"message\":\"Invalid sale reference provided.\",\"status\":\"error\"}},\"invalid_sale\":{\"description\":\"If the provided reference does not belong to a digital issuance sale, this can't be topped-up.\",\"summary\":\"When a gift card can't be topped-up.\",\"value\":{\"code\":\"433\",\"message\":\"The requested action is not valid on this sale.\",\"status\":\"error\"}},\"transaction_type_not_available\":{\"description\":\"The requested transaction type is not available for the requested brand\",\"summary\":\"Transaction Type Not Available for Brand\",\"value\":{\"code\":\"720\",\"message\":\"The transaction type is not available for the requested brand\",\"status\":\"error\"}},\"transaction_type_not_supported\":{\"description\":\"The requested transaction type is not supported by the partner\",\"summary\":\"Transaction Type Not Supported by Partner\",\"value\":{\"code\":\"719\",\"message\":\"The transaction type is not supported by the partner\",\"status\":\"error\"}},\"validation_error\":{\"description\":\"Request data failed validation rules\",\"summary\":\"Validation Error\",\"value\":{\"code\":\"433\",\"data\":{\"brand\":[\"The brand field is required.\"],\"face_value.amount\":[\"The amount must be a positive number.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/400/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"211\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Too many attempts for the API rate limit\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Too many requests. Rate limit exceeded.\"},\"500\":{\"content\":{\"application/json\":{\"examples\":{\"internal_error\":{\"description\":\"Internal server error\",\"summary\":\"Internal Error\",\"value\":{\"code\":\"999\",\"message\":\"Internal error\",\"status\":\"error\"}},\"processor_error\":{\"description\":\"Error returned by the processor\",\"summary\":\"Processor Error\",\"value\":{\"code\":\"603\",\"message\":\"Error returned by the Processor\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/400/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Internal server error. Error returned by the processor.\"},\"502\":{\"description\":\"Bad Gateway.  No response body is returned.\\n\"},\"504\":{\"description\":\"Gateway Timeout.  No response body is returned\\n\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/digital/top-up","segments":[{"lit":"digital"},{"lit":"top-up"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"digital_top_up_post","name__orig":"digital_top_up_post","Name":"DigitalTopUpPost","name_":"digital_top_up_post","name-":"digital-top-up-post","NAME":"DIGITAL_TOP_UP_POST","index$":7}, {"active":true,"entity":"digital_top_up_post","key$":"BasicDigitalTopUpPostFlow","kind":"basic","name":"BasicDigitalTopUpPostFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"digital_top_up_post_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'DigitalTopUpPost')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const digital_top_up_post_ref01_ent = client.DigitalTopUpPost()
    let digital_top_up_post_ref01_data = setup.data.new.digital_top_up_post['digital_top_up_post_ref01']

    digital_top_up_post_ref01_data = (await digital_top_up_post_ref01_ent.create(digital_top_up_post_ref01_data)).data()
    assert(null != digital_top_up_post_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/digital_top_up_post/DigitalTopUpPostTestData.json')

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
    ['digital_top_up_post01','digital_top_up_post02','digital_top_up_post03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_DIGITAL_TOP_UP_POST_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_DIGITAL_TOP_UP_POST_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_DIGITAL_TOP_UP_POST_ENTID']
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
  
