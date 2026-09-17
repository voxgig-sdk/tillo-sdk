

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


describe('DigitalIssueDeleteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.DigitalIssueDelete()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TILLO_TEST_LIVE
    for (const op of ['create', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'digital_issue_delete.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"brand","req":true,"short":"Brand identifier/slug (lowercase letters, numbers, hyphens only).","type":"`$STRING`","index$":0},{"active":true,"name":"client_request_id","req":true,"short":"Unique identifier for this request.","type":"`$STRING`","index$":1},{"active":true,"name":"face_value","req":true,"type":"`$OBJECT`","union":{"branches":2,"count":1,"depth":2},"index$":2},{"active":true,"name":"float_balance","req":true,"short":"Your remaining balance on the float used for this cancellation transaction.","type":"`$OBJECT`","index$":3},{"active":true,"name":"original_client_request_id","req":true,"short":"This field will be the `client_request_id` provided in the original transaction.","type":"`$STRING`","index$":4},{"active":true,"format":"uuid","name":"reference","req":true,"short":"Unique reference (UUID) for the cancellation transaction","type":"`$STRING`","index$":5},{"active":true,"name":"sector","req":true,"short":"Must match one of the sectors configured for your buyer account.","type":"`$STRING`","index$":6},{"active":true,"name":"tags","req":false,"short":"Optional meta data associated with the issuance.","type":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"index$":7}],"name":"digital_issue_delete","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /digital/reverse","json":"{\"operationId\":\"postDigitalReverse\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"successful_response\":{\"summary\":\"Successful Response\",\"value\":{\"brand\":\"mock-brand\",\"client_request_id\":\"req-12345-67890\",\"face_value\":{\"amount\":25,\"currency\":\"GBP\"},\"original_client_request_id\":\"orig-req-12345-67890\",\"sector\":\"voluntary-benefits\",\"tags\":[\"premium\",\"lifetime\"]}}},\"schema\":{\"properties\":{\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"client_request_id\":{\"description\":\"Unique identifier for this request. Also acts as an idempotency key\",\"example\":\"req-12345-67890\",\"maxLength\":50,\"minLength\":5,\"pattern\":\"^[A-Za-z0-9_-]+$\",\"type\":\"string\"},\"face_value\":{\"properties\":{\"amount\":{\"description\":\"Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\\nMinimum and maximum amounts depend on the buyer↔brand configuration.\\nUse the brand discovery endpoint to retrieve valid denomination ranges.\\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\\n\",\"oneOf\":[{\"examples\":[\"25\",\"25.0\",\"25.00\"],\"pattern\":\"^\\\\d+(\\\\.\\\\d{1,2})?$\",\"type\":\"string\"},{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"}]},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"original_client_request_id\":{\"description\":\"This field will be the `client_request_id` provided in the original transaction.  For example, if you are performing some form of cancellation, then this would be the `client_request_id` you provided when making the original issuance request\\n\",\"example\":\"req-12345-67890\",\"maxLength\":50,\"minLength\":5,\"pattern\":\"^[A-Za-z0-9_-]+$\",\"type\":\"string\"},\"sector\":{\"description\":\"Must match one of the sectors configured for your buyer account.\\n\",\"enum\":[\"affiliate-marketing\",\"aggregator\",\"b2c-marketplace\",\"cashback\",\"cash-out\",\"charity\",\"consumer\",\"consumer-rewards-and-incentives\",\"crypto-currency\",\"crypto-off-ramp\",\"customer-acquisition\",\"digital-currency\",\"employee-benefits\",\"employee-rewards-and-incentives\",\"gift-card-mall\",\"insurance\",\"marketplace\",\"other\",\"relief-support-and-disbursement\",\"reward-recognition\",\"voluntary-benefits\"],\"example\":\"voluntary-benefits\",\"minLength\":1,\"type\":\"string\"},\"tags\":{\"description\":\"Optional meta data associated with the issuance.\",\"items\":{\"anyOf\":[{\"pattern\":\"^[-A-Za-z0-9 ]+$\",\"type\":\"string\"},{\"type\":\"number\"}]},\"type\":\"array\"}},\"required\":[\"client_request_id\",\"original_client_request_id\",\"brand\",\"face_value\",\"sector\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"successful_response\":{\"summary\":\"Successful Response\",\"value\":{\"code\":\"000\",\"data\":{\"float_balance\":{\"amount\":19824.25,\"currency\":\"GBP\"},\"reference\":\"aa2b34a0-f5e7-11f0-9bc9-1dc7625725fc\"},\"message\":\"Card cancelled successfully\",\"status\":\"success\"}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"description\":\"Response code\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"properties\":{\"float_balance\":{\"description\":\"Your remaining balance on the float used for this cancellation transaction. Only present when float balance information is available.\",\"properties\":{\"amount\":{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"reference\":{\"description\":\"Unique reference (UUID) for the cancellation transaction\",\"example\":\"019ade93-d513-776b-92a2-b6323329b661\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"reference\"],\"type\":\"object\"},\"message\":{\"description\":\"Human-readable response message\",\"example\":\"Card cancelled successfully\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successful Response\",\"headers\":{\"X-RateLimit-Limit\":{\"description\":\"The number of requests you are allowed to make to this endpoint within a 60 second window\",\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"description\":\"The number of requests you have remaining within your 60 second window\",\"schema\":{\"type\":\"integer\"}}}},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"brand_does_not_exist\":{\"summary\":\"Brand slug not in system\",\"value\":{\"code\":\"072\",\"message\":\"The requested brand [no-brand] does not exist\",\"status\":\"error\"}},\"face_value_out_of_range\":{\"summary\":\"Face value outside brand allowed range\",\"value\":{\"code\":\"704\",\"message\":\"The face value must be between [0.01] and [5000.00]\",\"status\":\"error\"}},\"invalid_original_client_request_id_format\":{\"summary\":\"Invalid format or length for original_client_request_id\",\"value\":{\"code\":\"070\",\"data\":{\"original_client_request_id\":[\"The original client request id may only contain letters, numbers, dashes and underscores.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"sector_invalid\":{\"summary\":\"Invalid sector\",\"value\":{\"code\":\"704\",\"data\":{\"sector\":\"The sector [xxxxxx] is invalid. Please provide an acceptable one\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad request. Invalid or missing parameters\"},\"401\":{\"content\":{\"application/json\":{\"examples\":{\"authentication_failed\":{\"summary\":\"Invalid API key, signature, or timestamp\",\"value\":{\"code\":\"434\",\"message\":\"Authentication failed\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/400/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"currency_not_supported_by_brand\":{\"summary\":\"Invalid currency for this brand\",\"value\":{\"code\":\"723\",\"message\":\"The requested currency is not supported by this brand\",\"status\":\"error\"}},\"no_sale_for_original_client_request_id\":{\"summary\":\"No sale for this partner with given original_client_request_id\",\"value\":{\"code\":\"724\",\"message\":\"The sale could not be found\",\"status\":\"error\"}},\"reversal_timeout_exceeded\":{\"summary\":\"Reversal window exceeded\",\"value\":{\"code\":\"100\",\"message\":\"Gift code cannot be reversed as more than X minutes have passed\",\"status\":\"error\"}},\"sale_not_found\":{\"summary\":\"Sale not found\",\"value\":{\"code\":\"724\",\"message\":\"The sale could not be found\",\"status\":\"error\"}},\"status_does_not_allow_reverse\":{\"summary\":\"Original sale status is not SUCCESS (e.g. pending, failed, already cancelled)\",\"value\":{\"code\":\"100\",\"message\":\"Gift code does not have a status that allows it to be reversed\",\"status\":\"error\"}},\"transaction_cannot_be_cancelled\":{\"summary\":\"Redemption or redemption-link not cancellable\",\"value\":{\"code\":\"100\",\"message\":\"This transaction cannot be cancelled.\",\"status\":\"error\"}},\"transaction_type_not_issue\":{\"summary\":\"Original sale is not an issue transaction\",\"value\":{\"code\":\"100\",\"message\":\"You can only reverse issue\",\"status\":\"error\"}},\"transaction_type_not_supported_by_brand\":{\"summary\":\"Brand does not support cancellation\",\"value\":{\"code\":\"720\",\"message\":\"The transaction type is not available for the requested brand\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/400/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Validation or business-rule error (sale not found, reversal window, transaction type, etc.).\"},\"502\":{\"description\":\"Bad Gateway No response body is returned.\\n\"},\"504\":{\"description\":\"Gateway Timeout No response body is returned.\\n\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/digital/reverse","segments":[{"lit":"digital"},{"lit":"reverse"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{},"contract":{"id":"DELETE /digital/issue","json":"{\"operationId\":\"deleteDigitalIssue\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"cancel_by_code\":{\"description\":\"Cancel a digital gift card using the gift card code (for code-delivery brands)\",\"summary\":\"Cancel Digital Gift Card by Code\",\"value\":{\"brand\":\"mock-brand\",\"client_request_id\":\"req-12345-67890\",\"code\":\"ABC123456789\",\"face_value\":{\"amount\":25,\"currency\":\"GBP\"},\"original_client_request_id\":\"orig-req-12345-67890\",\"sector\":\"voluntary-benefits\"}},\"cancel_by_code_and_pin\":{\"description\":\"Cancel a digital gift card using the gift card code and PIN (for code-delivery brands that require a PIN)\",\"summary\":\"Cancel Digital Gift Card by Code and PIN\",\"value\":{\"brand\":\"mock-brand\",\"client_request_id\":\"req-12345-67890\",\"code\":\"ABC123456789\",\"face_value\":{\"amount\":25,\"currency\":\"GBP\"},\"original_client_request_id\":\"orig-req-12345-67890\",\"pin\":\"1234\",\"sector\":\"voluntary-benefits\"}},\"cancel_by_url\":{\"description\":\"Cancel a digital gift card using the gift card URL (for URL-delivery brands)\",\"summary\":\"Cancel Digital Gift Card by URL\",\"value\":{\"brand\":\"mock-brand\",\"client_request_id\":\"req-12345-67890\",\"face_value\":{\"amount\":25,\"currency\":\"GBP\"},\"original_client_request_id\":\"orig-req-12345-67890\",\"sector\":\"voluntary-benefits\",\"url\":\"https://example.com/gift-card\"}},\"cancel_reward_pass_by_original_client_request_id\":{\"description\":\"Cancel a Reward Pass product using the original client request ID (for Reward Pass products)\",\"summary\":\"Cancel Reward Pass by Original Client Request ID\",\"value\":{\"brand\":\"example-reward-pass-brand\",\"client_request_id\":\"req-54321-67890\",\"face_value\":{\"amount\":5,\"currency\":\"GBP\"},\"original_client_request_id\":\"orig-req-12345-67890\",\"sector\":\"voluntary-benefits\"}}},\"schema\":{\"properties\":{\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"client_request_id\":{\"description\":\"Unique identifier for this request. Also acts as an idempotency key\",\"example\":\"req-12345-67890\",\"maxLength\":50,\"minLength\":5,\"pattern\":\"^[A-Za-z0-9_-]+$\",\"type\":\"string\"},\"code\":{\"description\":\"Gift card code to cancel (for code-delivery brands).\\nMust be between 8 and 110 characters. Only alphanumeric characters, dots, underscores, hyphens, colons, and forward slashes are allowed.\\n\",\"example\":\"ABC123456789\",\"maxLength\":110,\"minLength\":8,\"pattern\":\"^[a-zA-Z0-9._\\\\-:\\\\/]+$\",\"type\":\"string\"},\"face_value\":{\"properties\":{\"amount\":{\"description\":\"Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\\nMinimum and maximum amounts depend on the buyer↔brand configuration.\\nUse the brand discovery endpoint to retrieve valid denomination ranges.\\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\\n\",\"oneOf\":[{\"examples\":[\"25\",\"25.0\",\"25.00\"],\"pattern\":\"^\\\\d+(\\\\.\\\\d{1,2})?$\",\"type\":\"string\"},{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"}]},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"original_client_request_id\":{\"description\":\"This field will be the `client_request_id` provided in the original transaction.  For example, if you are performing some form of cancellation, then this would be the `client_request_id` you provided when making the original issuance request\\n\",\"example\":\"req-12345-67890\",\"maxLength\":50,\"minLength\":5,\"pattern\":\"^[A-Za-z0-9_-]+$\",\"type\":\"string\"},\"pin\":{\"description\":\"Gift card PIN. Required for cancelling certain brands when the original issue response included a PIN.\\n\",\"example\":\"12562161\",\"type\":\"string\"},\"sector\":{\"description\":\"Must match one of the sectors configured for your buyer account.\\n\",\"enum\":[\"affiliate-marketing\",\"aggregator\",\"b2c-marketplace\",\"cashback\",\"cash-out\",\"charity\",\"consumer\",\"consumer-rewards-and-incentives\",\"crypto-currency\",\"crypto-off-ramp\",\"customer-acquisition\",\"digital-currency\",\"employee-benefits\",\"employee-rewards-and-incentives\",\"gift-card-mall\",\"insurance\",\"marketplace\",\"other\",\"relief-support-and-disbursement\",\"reward-recognition\",\"voluntary-benefits\"],\"example\":\"voluntary-benefits\",\"minLength\":1,\"type\":\"string\"},\"tags\":{\"description\":\"Optional meta data associated with the issuance.\",\"items\":{\"anyOf\":[{\"pattern\":\"^[-A-Za-z0-9 ]+$\",\"type\":\"string\"},{\"type\":\"number\"}]},\"type\":\"array\"},\"url\":{\"description\":\"Gift card URL to cancel (for URL-delivery brands).\\nMust be between 8 and 255 characters and be a valid URI.\\n\",\"example\":\"https://example.com/gift-card/ABC123456789\",\"format\":\"uri\",\"maxLength\":255,\"minLength\":8,\"type\":\"string\"}},\"required\":[\"client_request_id\",\"original_client_request_id\",\"brand\",\"face_value\",\"sector\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"description\":\"Response code\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"properties\":{\"float_balance\":{\"description\":\"Your remaining balance on the float used for this cancellation transaction. Only present when float balance information is available.\",\"properties\":{\"amount\":{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"reference\":{\"description\":\"Unique reference (UUID) for the cancellation transaction\",\"example\":\"019ade93-d513-776b-92a2-b6323329b661\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"reference\"],\"type\":\"object\"},\"message\":{\"description\":\"Human-readable response message\",\"example\":\"Card cancelled successfully\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successful Response\",\"headers\":{\"X-RateLimit-Limit\":{\"description\":\"The number of requests you are allowed to make to this endpoint within a 60 second window\",\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"description\":\"The number of requests you have remaining within your 60 second window\",\"schema\":{\"type\":\"integer\"}}}},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"invalid_original_client_request_id_format\":{\"summary\":\"Example when original client request ID has invalid format\",\"value\":{\"code\":\"070\",\"data\":{\"originalClientRequestId\":[\"The original client request id may only contain letters, numbers, dashes and underscores.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"brand_mismatch\":{\"summary\":\"Example when attempting to cancel a gift code of a different brand.\",\"value\":{\"code\":\"433\",\"data\":{\"brand\":\"Attempting to cancel a gift code of a different brand\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"invalid_original_client_request_id\":{\"summary\":\"Example when provided a valid original client request ID but it does not match the original issuance request.\",\"value\":{\"code\":\"433\",\"data\":{\"client_request_id\":\"Invalid originalClientRequestID\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"invalid_original_client_request_id_and_url_combination\":{\"summary\":\"Example when providing an original client request ID and URL combination that does not match the original issuance request.\",\"value\":{\"code\":\"100\",\"message\":\"Invalid [original_client_request_id] and [url] combination\",\"status\":\"error\"}},\"transaction_type_not_available\":{\"summary\":\"Example when the brand does not support cancellation transaction type\",\"value\":{\"code\":\"720\",\"message\":\"The transaction type is not available for the requested brand\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/400/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Unprocessable Entity\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"211\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Too many attempts for the API rate limit\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Too many requests. Rate limit exceeded.\"},\"500\":{\"content\":{\"application/json\":{\"examples\":{\"internal_server_error\":{\"summary\":\"Example when we have an internal server error\",\"value\":{\"code\":\"600\",\"message\":\"Internal server error\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/400/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Internal Server Error\"},\"502\":{\"description\":\"Bad Gateway No response body is returned.\\n\"},\"504\":{\"description\":\"Gateway Timeout No response body is returned.\\n\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/digital/issue","segments":[{"lit":"digital"},{"lit":"issue"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"digital_issue_delete","name__orig":"digital_issue_delete","Name":"DigitalIssueDelete","name_":"digital_issue_delete","name-":"digital-issue-delete","NAME":"DIGITAL_ISSUE_DELETE","index$":3}, {"active":true,"entity":"digital_issue_delete","key$":"BasicDigitalIssueDeleteFlow","kind":"basic","name":"BasicDigitalIssueDeleteFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"digital_issue_delete_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"digital_issue_delete_ref01","suffix":"_rm0"},"match":{},"op":"remove","spec":[],"valid":[],"index$":1}]}, 'DigitalIssueDelete')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const digital_issue_delete_ref01_ent = client.DigitalIssueDelete()
    let digital_issue_delete_ref01_data = setup.data.new.digital_issue_delete['digital_issue_delete_ref01']

    digital_issue_delete_ref01_data = (await digital_issue_delete_ref01_ent.create(digital_issue_delete_ref01_data)).data()
    assert(null != digital_issue_delete_ref01_data)



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/digital_issue_delete/DigitalIssueDeleteTestData.json')

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
    ['digital_issue_delete01','digital_issue_delete02','digital_issue_delete03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_DIGITAL_ISSUE_DELETE_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_DIGITAL_ISSUE_DELETE_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_DIGITAL_ISSUE_DELETE_ENTID']
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
  
