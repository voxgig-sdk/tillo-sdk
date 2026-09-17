
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


describe('DigitalIssuePostEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.DigitalIssuePost()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"barcode","req":true,"short":"Some brands provide a barcode alongside a code delivery.","type":"`$OBJECT`","index$":0},{"active":true,"name":"brand","req":true,"short":"Brand identifier/slug (lowercase letters, numbers, hyphens only).","type":"`$STRING`","index$":1},{"active":true,"name":"client_request_id","req":true,"short":"Unique identifier for this request.","type":"`$STRING`","index$":2},{"active":true,"name":"code","req":false,"short":"Gift card code (for code-delivery brands)","type":"`$STRING`","index$":3},{"active":true,"name":"cost_value","req":true,"type":"`$OBJECT`","index$":4},{"active":true,"name":"delivery_method","req":true,"type":"`$STRING`","index$":5},{"active":true,"format":"float","name":"discount","req":true,"short":"The discount percentage used on this transaction","type":"`$NUMBER`","index$":6},{"active":true,"format":"date-time","name":"expiration_date","req":false,"short":"The expiration date for this gift card.","type":"`$STRING`","index$":7},{"active":true,"name":"face_value","req":true,"type":"`$OBJECT`","index$":8},{"active":true,"name":"float_balance","req":true,"type":"`$OBJECT`","index$":9},{"active":true,"name":"fulfilment_by","req":true,"short":"This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.","type":"`$STRING`","index$":10},{"active":true,"name":"fulfilment_parameters","req":true,"short":"Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf","type":"`$OBJECT`","index$":11},{"active":true,"name":"personalisation","req":true,"type":"`$OBJECT`","index$":12},{"active":true,"name":"pin","req":false,"short":"Gift card PIN (for code-delivery brands).","type":"`$STRING`","index$":13},{"active":true,"format":"uuid","name":"reference","req":true,"short":"Unique reference for this transaction","type":"`$STRING`","index$":14},{"active":true,"name":"sector","req":true,"short":"Must match one of the sectors configured for your buyer account.","type":"`$STRING`","index$":15},{"active":true,"name":"security_code","req":false,"short":"Gift card security code (for code-delivery brands).","type":"`$STRING`","index$":16},{"active":true,"name":"serial_number","req":false,"short":"Gift card serial number.","type":"`$STRING`","index$":17},{"active":true,"name":"tags","req":false,"short":"Optional meta data associated with the issuance.","type":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"index$":18},{"active":true,"format":"uri","name":"url","req":false,"short":"Gift card URL (for URL-delivery brands)","type":"`$STRING`","index$":19}],"name":"digital_issue_post","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /digital/issue","json":"{\"operationId\":\"postDigitalIssue\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"issue_choice_link_with_theme\":{\"description\":\"Choice Link with customised theme.\",\"summary\":\"Issue Choice Link - with custom theme\",\"value\":{\"brand\":\"choiceplus-mock-uk\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"url\",\"face_value\":{\"amount\":20,\"currency\":\"GBP\"},\"fulfilment_by\":\"partner\",\"personalisation\":{\"choice_link_theme\":\"my-custom-theme\",\"from_name\":\"Sender\",\"message\":\"Happy Birthday! Enjoy your gift card\",\"template\":\"standard\",\"to_name\":\"Recipient\"},\"sector\":\"voluntary-benefits\"}},\"issue_gift_card_with_code\":{\"description\":\"Simple example of issuing a Code\",\"summary\":\"Issue Digital Gift Card - Code\",\"value\":{\"brand\":\"sync-open-code-uk\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"code\",\"face_value\":{\"amount\":25,\"currency\":\"GBP\"},\"fulfilment_by\":\"partner\",\"sector\":\"marketplace\"}},\"issue_gift_card_with_fulfilment_by_tillo\":{\"description\":\"Example of issuing a Digital gift card with Tillo handling the email fulfilment\",\"summary\":\"Issue Digital Gift Card - with fulfilment by Tillo\",\"value\":{\"brand\":\"fixed-sync-us\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"url\",\"face_value\":{\"amount\":20,\"currency\":\"USD\"},\"fulfilment_by\":\"rewardcloud\",\"fulfilment_parameters\":{\"from_email\":\"noreply@sandbox.tillo.dev\",\"from_name\":\"Partner name\",\"subject\":\"[TestCode] Here is your gift card!\",\"to_email\":\"test@tillo.io\",\"to_name\":\"Receiver\"},\"personalisation\":{\"from_name\":\"Sender\",\"message\":\"Here is your gift\",\"template\":\"standard\",\"to_name\":\"Recipient\"},\"sector\":\"voluntary-benefits\"}},\"issue_gift_card_with_personalisation\":{\"description\":\"Example of issuing a Digital gift card with personalisation options\",\"summary\":\"Issue Digital Gift Card - with Personalisation\",\"value\":{\"brand\":\"open-sync-eur\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"url\",\"face_value\":{\"amount\":20.5,\"currency\":\"EUR\"},\"fulfilment_by\":\"partner\",\"personalisation\":{\"from_name\":\"Sender\",\"message\":\"Here is your gift\",\"template\":\"standard\",\"to_name\":\"Recipient\"},\"sector\":\"voluntary-benefits\"}},\"issue_gift_card_with_url\":{\"description\":\"Simple example of issuing a URL\",\"summary\":\"Issue Digital Gift Card - URL\",\"value\":{\"brand\":\"fixed-sync-uk\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"url\",\"face_value\":{\"amount\":10,\"currency\":\"GBP\"},\"fulfilment_by\":\"partner\",\"sector\":\"gift-card-mall\"}},\"issue_open_loop_with_email\":{\"description\":\"Issue a Reward Pass product with an email delivery\",\"summary\":\"Issue Reward Pass - Email\",\"value\":{\"brand\":\"loop-card-uk\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"email\",\"face_value\":{\"amount\":5,\"currency\":\"GBP\"},\"fulfilment_by\":\"partner\",\"personalisation\":{\"carrier_message\":\"Message to appear on letter if physical card fulfilment\",\"email_message\":\"Message to appear in payment notification email\",\"from_name\":\"Sender\",\"message\":\"Here is your gift\",\"redemption_message\":\"Message to appear on participant portal\",\"template\":\"standard\",\"to_name\":\"Recipient\"},\"sector\":\"voluntary-benefits\"}},\"issue_open_loop_with_url\":{\"description\":\"Issue a Reward Pass product with a URL delivery\",\"summary\":\"Issue Reward Pass - URL\",\"value\":{\"brand\":\"open-loop-uk\",\"client_request_id\":\"019ade93-d513-776b-92a2-b6323329b661\",\"delivery_method\":\"url\",\"face_value\":{\"amount\":5,\"currency\":\"GBP\"},\"fulfilment_by\":\"partner\",\"personalisation\":{\"carrier_message\":\"Message to appear on letter if physical card fulfilment\",\"email_message\":\"Message to appear in payment notification email\",\"message\":\"Here is your gift\",\"redemption_message\":\"Message to appear on participant portal\"},\"sector\":\"voluntary-benefits\"}}},\"schema\":{\"if\":{\"properties\":{\"fulfilment_by\":{\"const\":\"rewardcloud\"}}},\"properties\":{\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"client_request_id\":{\"description\":\"Unique identifier for this request. Also acts as an idempotency key\",\"example\":\"req-12345-67890\",\"maxLength\":50,\"minLength\":5,\"pattern\":\"^[A-Za-z0-9_-]+$\",\"type\":\"string\"},\"delivery_method\":{\"enum\":[\"code\",\"url\",\"email\",\"wrapped\"],\"minLength\":3,\"type\":\"string\"},\"face_value\":{\"properties\":{\"amount\":{\"description\":\"Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\\nMinimum and maximum amounts depend on the buyer↔brand configuration.\\nUse the brand discovery endpoint to retrieve valid denomination ranges.\\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\\n\",\"oneOf\":[{\"examples\":[\"25\",\"25.0\",\"25.00\"],\"pattern\":\"^\\\\d+(\\\\.\\\\d{1,2})?$\",\"type\":\"string\"},{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"}]},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"fulfilment_by\":{\"description\":\"This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.  If you are planning on sending out the email please set this to 'partner', if you would like us to fulfil the email for you then please provide 'rewardcloud' as the value. Please note, that when we are fulfilling the email on your behalf you will need to provide the additional 'fulfilment_parameters' field\",\"enum\":[\"partner\",\"rewardcloud\"],\"type\":\"string\"},\"fulfilment_parameters\":{\"description\":\"Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf\",\"properties\":{\"address_1\":{\"type\":\"string\"},\"address_2\":{\"type\":\"string\"},\"city\":{\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"customer_id\":{\"type\":\"string\"},\"from_email\":{\"type\":\"string\"},\"from_name\":{\"type\":\"string\"},\"language\":{\"type\":\"string\"},\"postal_code\":{\"type\":\"string\"},\"subject\":{\"type\":\"string\"},\"to_email\":{\"type\":\"string\"},\"to_first_name\":{\"type\":\"string\"},\"to_last_name\":{\"type\":\"string\"},\"to_name\":{\"type\":\"string\"}},\"required\":[\"to_email\",\"from_name\",\"from_email\",\"subject\"],\"type\":\"object\"},\"personalisation\":{\"properties\":{\"carrier_message\":{\"description\":\"This only needs to be added when purchasing a Reward Pass product\",\"type\":\"string\"},\"choice_link_theme\":{\"description\":\"This is an optional field, and only used when purchasing a Choice Link when you have set up a custom theme\",\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"email_message\":{\"description\":\"This only needs to be added when purchasing a Reward Pass product\",\"type\":\"string\"},\"from_name\":{\"description\":\"This field is required, unless your purchasing a Reward Pass product\",\"example\":\"Jane Doe\",\"type\":\"string\"},\"gifted_by\":{\"description\":\"This is an optional field, and only used when purchasing a Choice Link\",\"type\":\"string\"},\"language\":{\"example\":\"English\",\"type\":\"string\"},\"message\":{\"example\":\"Thanks for all your hard work!\",\"type\":\"string\"},\"redemption_message\":{\"description\":\"This only needs to be added when purchasing a Reward Pass product\",\"type\":\"string\"},\"template\":{\"description\":\"This field is required, unless your purchasing a Reward Pass product\",\"example\":\"standard\",\"type\":\"string\"},\"to_name\":{\"description\":\"This field is required, unless your purchasing a Reward Pass product\",\"example\":\"John Doe\",\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"},\"sector\":{\"description\":\"Must match one of the sectors configured for your buyer account.\\n\",\"enum\":[\"affiliate-marketing\",\"aggregator\",\"b2c-marketplace\",\"cashback\",\"cash-out\",\"charity\",\"consumer\",\"consumer-rewards-and-incentives\",\"crypto-currency\",\"crypto-off-ramp\",\"customer-acquisition\",\"digital-currency\",\"employee-benefits\",\"employee-rewards-and-incentives\",\"gift-card-mall\",\"insurance\",\"marketplace\",\"other\",\"relief-support-and-disbursement\",\"reward-recognition\",\"voluntary-benefits\"],\"example\":\"voluntary-benefits\",\"minLength\":1,\"type\":\"string\"},\"tags\":{\"description\":\"Optional meta data associated with the issuance.\",\"items\":{\"anyOf\":[{\"pattern\":\"^[-A-Za-z0-9 ]+$\",\"type\":\"string\"},{\"type\":\"number\"}]},\"type\":\"array\"}},\"required\":[\"client_request_id\",\"brand\",\"face_value\",\"delivery_method\",\"fulfilment_by\",\"sector\"],\"then\":{\"required\":[\"fulfilment_parameters\"]},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"issue_gift_card_with_code\":{\"description\":\"When successfully being issued a gift card when you have requested the code delivery method.\",\"summary\":\"Successful Code issuance\",\"value\":{\"code\":\"000\",\"data\":{\"brand\":\"sync-open-code-uk\",\"code\":\"99998888777766665555\",\"cost_value\":{\"amount\":4.5,\"currency\":\"GBP\"},\"discount\":10,\"expiration_date\":\"2027-12-02T23:59:59+00:00\",\"face_value\":{\"amount\":5,\"currency\":\"GBP\"},\"float_balance\":{\"amount\":9998771.7,\"currency\":\"GBP\"},\"pin\":\"1234\",\"reference\":\"a8ecaf60-cf99-11f0-ad32-c1adc663ef75\"},\"message\":\"Card created successfully\",\"status\":\"success\"}},\"issue_gift_card_with_url\":{\"description\":\"When successfully being issued a gift card when you have requested the URL delivery method\",\"summary\":\"Successful URL issuance\",\"value\":{\"code\":\"000\",\"data\":{\"brand\":\"fixed-sync-uk\",\"cost_value\":{\"amount\":4.5,\"currency\":\"GBP\"},\"discount\":10,\"expiration_date\":\"2027-12-02T23:59:59+00:00\",\"face_value\":{\"amount\":5,\"currency\":\"GBP\"},\"float_balance\":{\"amount\":9998771.7,\"currency\":\"GBP\"},\"reference\":\"a8ecaf60-cf99-11f0-ad32-c1adc663ef75\",\"url\":\"https://example.com\"},\"message\":\"Card created successfully\",\"status\":\"success\"}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"properties\":{\"barcode\":{\"additionalProperties\":false,\"description\":\"Some brands provide a barcode alongside a code delivery. You can determine which brands return a barcode using the brand information endpoint\",\"properties\":{\"string\":{\"type\":\"string\"},\"type\":{\"enum\":[\"C128\",\"C128A\",\"C39\",\"I25\",\"QRCODE\",\"PDF417\",\"NONE\"],\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"type\",\"string\",\"url\"],\"type\":\"object\"},\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"code\":{\"description\":\"Gift card code (for code-delivery brands)\",\"example\":\"9999888877776666\",\"type\":\"string\"},\"cost_value\":{\"properties\":{\"amount\":{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"discount\":{\"description\":\"The discount percentage used on this transaction\",\"examples\":[0,9.5,5.75],\"format\":\"float\",\"minimum\":0,\"type\":\"number\"},\"expiration_date\":{\"description\":\"The expiration date for this gift card. This will only be present when the brand provides one.\",\"format\":\"date-time\",\"type\":\"string\"},\"face_value\":{\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/properties\"},\"required\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/required\"},\"type\":\"object\"},\"float_balance\":{\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/properties\"},\"required\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/cost_value/required\"},\"type\":\"object\"},\"pin\":{\"description\":\"Gift card PIN (for code-delivery brands). This will only be present when the brand provides one.\",\"example\":\"1234\",\"type\":\"string\"},\"reference\":{\"description\":\"Unique reference for this transaction\",\"example\":\"019ade93-d513-776b-92a2-b6323329b661\",\"format\":\"uuid\",\"type\":\"string\"},\"security_code\":{\"description\":\"Gift card security code (for code-delivery brands). This will only be present when the brand provides one.\",\"type\":\"string\"},\"serial_number\":{\"description\":\"Gift card serial number. Required for certain brands.\\nMust be at least 1 character when provided.\\n\",\"example\":\"SN123456789\",\"minLength\":1,\"type\":\"string\"},\"url\":{\"description\":\"Gift card URL (for URL-delivery brands)\",\"example\":\"https://example-gift-card.com\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"brand\",\"face_value\",\"cost_value\",\"discount\",\"reference\"],\"type\":\"object\"},\"message\":{\"example\":\"Card created successfully\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Standard Issue Digital Code\",\"headers\":{\"X-RateLimit-Limit\":{\"description\":\"The number of requests you are allowed to make to this endpoint within a 60 second window\",\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"description\":\"The number of requests you have remaining within your 60 second window\",\"schema\":{\"type\":\"integer\"}}},\"links\":{\"cancelDigitalGiftCardByCode\":{\"description\":\"Cancel the newly issued digital gift card by code (used when delivery_method is 'code')\",\"operationId\":\"deleteDigitalIssue\",\"requestBody\":{\"brand\":\"$request.body#/brand\",\"code\":\"$response.body#/data/code\",\"face_value\":\"$request.body#/face_value\",\"original_client_request_id\":\"$request.body#/client_request_id\",\"sector\":\"$request.body#/sector\"}},\"cancelDigitalGiftCardByUrl\":{\"description\":\"Cancel the newly issued digital gift card by URL (used when delivery_method is 'url')\",\"operationId\":\"deleteDigitalIssue\",\"requestBody\":{\"brand\":\"$request.body#/brand\",\"face_value\":\"$request.body#/face_value\",\"original_client_request_id\":\"$request.body#/client_request_id\",\"sector\":\"$request.body#/sector\",\"url\":\"$response.body#/data/url\"}}}},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"delivery_method_not_supported\":{\"summary\":\"Example when requesting a delivery method that the brand does not support\",\"value\":{\"code\":\"713\",\"message\":\"You cannot deliver codes via [code] for [my-example-brand]\",\"status\":\"error\"}},\"invalid_brand\":{\"summary\":\"Example when provided an invalid brand\",\"value\":{\"code\":\"072\",\"message\":\"The requested brand [abc123] does not exist\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Validation error code\",\"example\":\"433\",\"type\":\"string\"},\"data\":{\"additionalProperties\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Optional detailed validation errors by field\",\"example\":{\"brand\":[\"The brand field is required.\"],\"faceValue.amount\":[\"The amount must be a positive number.\"]},\"type\":\"object\"},\"message\":{\"description\":\"Error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"211\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Too many attempts for the API rate limit\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Too many requests. Rate limit exceeded.\"},\"500\":{\"content\":{\"application/json\":{\"examples\":{\"internal_server_error\":{\"summary\":\"Example when we have an internal server error\",\"value\":{\"code\":\"600\",\"message\":\"Internal server error\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/400/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Internal Server Error\"},\"502\":{\"description\":\"Bad Gateway No response body is returned.\\n\"},\"503\":{\"content\":{\"application/json\":{\"examples\":{\"external_error\":{\"summary\":\"Example when we have an intermittent issue with a particular brand or processor\",\"value\":{\"code\":\"603\",\"message\":\"Error returned by the Processor\",\"status\":\"error\"}},\"service_unavailable\":{\"summary\":\"Example when our hosting service is temporarily down\",\"value\":{\"code\":\"715\",\"message\":\"The URL hosting service is currently unavailable\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/400/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Service Unavailable\"},\"504\":{\"description\":\"Gateway Timeout No response body is returned.\\n\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/digital/issue","segments":[{"lit":"digital"},{"lit":"issue"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"digital_issue_post","name__orig":"digital_issue_post","Name":"DigitalIssuePost","name_":"digital_issue_post","name-":"digital-issue-post","NAME":"DIGITAL_ISSUE_POST","index$":4}, {"active":true,"entity":"digital_issue_post","key$":"BasicDigitalIssuePostFlow","kind":"basic","name":"BasicDigitalIssuePostFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"digital_issue_post_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'DigitalIssuePost')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const digital_issue_post_ref01_ent = client.DigitalIssuePost()
    let digital_issue_post_ref01_data = setup.data.new.digital_issue_post['digital_issue_post_ref01']

    digital_issue_post_ref01_data = (await digital_issue_post_ref01_ent.create(digital_issue_post_ref01_data)).data()
    assert(null != digital_issue_post_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/digital_issue_post/DigitalIssuePostTestData.json')

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
    ['digital_issue_post01','digital_issue_post02','digital_issue_post03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_DIGITAL_ISSUE_POST_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_DIGITAL_ISSUE_POST_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_DIGITAL_ISSUE_POST_ENTID']
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
  
