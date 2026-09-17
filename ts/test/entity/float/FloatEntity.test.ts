

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"floats","req":true,"short":"Float balances grouped by currency code","type":"`$OBJECT`","index$":0},{"active":true,"format":"date-time","name":"last_refreshed_at","req":true,"short":"ISO 8601 timestamp of when the float data was last refreshed","type":"`$STRING`","index$":1}],"name":"float","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /float/request-payment-transfer","json":"{\"operationId\":\"postFloatRequestPaymentTransfer\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"minimal\":{\"description\":\"Minimal request with only required fields - Tillo generates payment reference\",\"summary\":\"Minimal\",\"value\":{\"amount\":100,\"currency\":\"GBP\",\"float\":\"universal-float\"}},\"minimal_with_payment_reference\":{\"description\":\"Minimal request with a custom payment reference provided by the partner\",\"summary\":\"Minimal (with your own payment reference)\",\"value\":{\"amount\":500,\"currency\":\"GBP\",\"float\":\"universal-float\",\"payment_reference\":\"PARTNER-REF-123\"}},\"with_finance_email\":{\"description\":\"Request with custom finance email override\",\"summary\":\"With finance email\",\"value\":{\"amount\":250,\"currency\":\"USD\",\"finance_email\":\"accounts@partner.com\",\"float\":\"amazon\",\"payment_reference\":\"CUSTOM-001\"}},\"with_proforma_invoice\":{\"description\":\"Request with proforma invoice company details override\",\"summary\":\"With proforma invoice details\",\"value\":{\"amount\":1000,\"currency\":\"GBP\",\"float\":\"universal-float\",\"payment_reference\":\"INV-2024-001\",\"proforma_invoice\":{\"address_line_1\":\"456 Commerce Road\",\"address_line_2\":\"Suite 100\",\"city\":\"Manchester\",\"company_name\":\"Acme Corporation Ltd\",\"contact_name\":\"Jane Doe\",\"country\":\"United Kingdom\",\"county\":\"Greater Manchester\",\"post_code\":\"M1 1AA\",\"vat_number\":\"GB987654321\"}}}},\"schema\":{\"properties\":{\"amount\":{\"description\":\"Amount to transfer. Accepts either a string or number. String amounts can have any number of decimal places (e.g., \\\"300.1000000000001\\\") and will be normalized to 2 decimal places in the response. Minimum value is 0.01, maximum is 99,999,999.99.\\n\",\"oneOf\":[{\"examples\":[\"25\",\"25.0\",\"25.00\"],\"pattern\":\"^\\\\d+(\\\\.\\\\d{1,2})?$\",\"type\":\"string\"},{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"}]},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"},\"finance_email\":{\"description\":\"Optional finance email address to override the default recipient. Required if partner has no default finance email configured.\",\"example\":\"finance@company.com\",\"format\":\"email\",\"maxLength\":255,\"type\":\"string\"},\"float\":{\"description\":\"Float identifier from the check-floats endpoint (e.g. universal-float, brand-specific float name)\",\"example\":\"universal-float\",\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"payment_reference\":{\"description\":\"Optional payment reference. If not provided, Tillo will generate one automatically. Uniqueness is not enforced, but unique references are recommended.\",\"example\":\"PAY-2024-001\",\"maxLength\":18,\"minLength\":1,\"type\":\"string\"},\"proforma_invoice\":{\"description\":\"Optional proforma invoice company details override. Only available if partner has proforma invoicing feature enabled. If provided, company_name is required.\",\"properties\":{\"address_line_1\":{\"example\":\"123 Business Street\",\"maxLength\":255,\"type\":\"string\"},\"address_line_2\":{\"example\":\"Floor 2\",\"maxLength\":255,\"type\":\"string\"},\"address_line_3\":{\"maxLength\":255,\"type\":\"string\"},\"address_line_4\":{\"maxLength\":255,\"type\":\"string\"},\"city\":{\"example\":\"London\",\"maxLength\":255,\"type\":\"string\"},\"company_name\":{\"example\":\"Example Company Ltd\",\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"contact_name\":{\"example\":\"John Smith\",\"maxLength\":255,\"type\":\"string\"},\"country\":{\"example\":\"United Kingdom\",\"maxLength\":255,\"type\":\"string\"},\"county\":{\"example\":\"Greater London\",\"maxLength\":255,\"type\":\"string\"},\"post_code\":{\"example\":\"SW1A 1AA\",\"maxLength\":255,\"type\":\"string\"},\"vat_number\":{\"example\":\"GB123456789\",\"maxLength\":255,\"type\":\"string\"}},\"required\":[\"company_name\"],\"type\":\"object\"}},\"required\":[\"float\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"success_response\":{\"summary\":\"Successful Transfer Request\",\"value\":{\"code\":\"000\",\"data\":{\"amount\":\"100.00\",\"currency\":\"GBP\",\"float\":\"universal-float\",\"payment_reference\":\"TILLO-123456\"},\"message\":\"Payment transfer request registered\",\"status\":\"success\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Response code\",\"example\":\"000\",\"type\":\"string\"},\"data\":{\"properties\":{\"amount\":{\"examples\":[\"25\",\"25.0\",\"25.00\"],\"pattern\":\"^\\\\d+(\\\\.\\\\d{1,2})?$\",\"type\":\"string\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"},\"float\":{\"description\":\"The float identifier that was requested\",\"example\":\"universal-float\",\"type\":\"string\"},\"payment_reference\":{\"description\":\"The payment reference (either partner-provided or Tillo-generated)\",\"example\":\"PAY-2024-001\",\"type\":\"string\"}},\"required\":[\"float\",\"payment_reference\"],\"type\":\"object\"},\"message\":{\"description\":\"Human-readable response message\",\"example\":\"Payment transfer request registered\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Payment transfer request successfully registered\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"714\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad request. Invalid or missing required parameters.\"},\"401\":{\"content\":{\"application/json\":{\"examples\":{\"disabled_partner\":{\"description\":\"Partner account has been disabled\",\"summary\":\"Disabled Partner Account\",\"value\":{\"code\":\"434\",\"message\":\"Authentication failed\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"status\":{\"const\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unauthorized - partner account is disabled or invalid credentials\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"invalid_amount\":{\"description\":\"Amount is outside valid range (0.01 - 99,999,999.99)\",\"summary\":\"Invalid Amount\",\"value\":{\"code\":\"433\",\"messages\":{\"amount\":[\"The amount must be at least 0.01.\",\"The amount must not be greater than 99999999.99.\"]},\"status\":\"error\"}},\"invalid_currency\":{\"description\":\"The provided currency code is not available\",\"summary\":\"Invalid Currency\",\"value\":{\"code\":\"433\",\"messages\":{\"currency\":[\"The requested currency is not available\"]},\"status\":\"error\"}},\"invalid_email\":{\"description\":\"Finance email is not a valid email address\",\"summary\":\"Invalid Email Format\",\"value\":{\"code\":\"433\",\"messages\":{\"finance_email\":[\"The \\\"finance email\\\" field must be a valid email address.\"]},\"status\":\"error\"}},\"invalid_float\":{\"description\":\"The float does not exist for this partner and currency combination\",\"summary\":\"Float Not Found\",\"value\":{\"code\":\"433\",\"messages\":{\"float\":[\"Float not found for partner\"]},\"status\":\"error\"}},\"missing_company_name\":{\"description\":\"Company name is required when proforma_invoice is provided\",\"summary\":\"Missing Company Name\",\"value\":{\"code\":\"433\",\"messages\":{\"proforma_invoice.company_name\":[\"The proforma invoice.company name field is required when proforma invoice is present.\"]},\"status\":\"error\"}},\"missing_finance_email\":{\"description\":\"Partner has no finance email recipients configured\",\"summary\":\"Finance Email Required\",\"value\":{\"code\":\"433\",\"messages\":{\"finance_email\":[\"Float has no payment request email recipients configured\"]},\"status\":\"error\"}},\"payment_reference_too_long\":{\"description\":\"Payment reference exceeds maximum length of 18 characters\",\"summary\":\"Payment Reference Too Long\",\"value\":{\"code\":\"433\",\"messages\":{\"payment_reference\":[\"The payment reference must not be greater than 18 characters.\"]},\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"example\":\"433\",\"type\":\"string\"},\"messages\":{\"additionalProperties\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Validation errors by field\",\"type\":\"object\"},\"status\":{\"const\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"messages\"],\"type\":\"object\"}}},\"description\":\"Validation error - invalid request parameters\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/float/request-payment-transfer","segments":[{"lit":"float"},{"lit":"request-payment-transfer"}],"select":{"$action":"request_payment_transfer"},"transform":{"req":{"float":"`reqdata`"},"res":"`body.data`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"GBP","kind":"query","name":"currency","orig":"currency","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"2025-10-16","kind":"query","name":"end_date","orig":"end_date","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"universal-float","kind":"query","name":"float","orig":"float","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"BUYER-PROVIDED-REF","kind":"query","name":"payment_reference","orig":"payment_reference","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"example":"2025-10-12","kind":"query","name":"start_date","orig":"start_date","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"example":"pending","kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":5}]},"contract":{"id":"GET /float/transfer-requests","json":"{\"operationId\":\"getFloatTransferRequests\",\"parameters\":[{\"description\":\"Specifies the target float (e.g., \\\"universal-float\\\", \\\"amazon\\\", \\\"reward-pass\\\")\",\"example\":\"universal-float\",\"in\":\"query\",\"name\":\"float\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Optional filter to return transfer requests for a specific currency only. Provide the three-character ISO 4217 currency code (eg. GBP, EUR, USD). Must be uppercase.\",\"example\":\"GBP\",\"in\":\"query\",\"name\":\"currency\",\"required\":false,\"schema\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},{\"description\":\"The payment reference to filter transfer requests\",\"example\":\"BUYER-PROVIDED-REF\",\"in\":\"query\",\"name\":\"payment_reference\",\"required\":false,\"schema\":{\"maxLength\":18,\"type\":\"string\"}},{\"description\":\"Beginning of the date range in ISO 8601 format\",\"example\":\"2025-10-12\",\"in\":\"query\",\"name\":\"start_date\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"End of the date range in ISO 8601 format\",\"example\":\"2025-10-16\",\"in\":\"query\",\"name\":\"end_date\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Filter for transfer request state\",\"example\":\"pending\",\"in\":\"query\",\"name\":\"status\",\"required\":false,\"schema\":{\"enum\":[\"pending\",\"approved\",\"approved_edited\",\"removed\",\"cancelled\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"multiple_statuses\":{\"description\":\"Returns transfer requests with various statuses across same float\",\"summary\":\"Multiple Transfer Requests\",\"value\":{\"code\":\"000\",\"data\":[{\"approved\":null,\"created_at\":\"2025-10-13T16:09:42+00:00\",\"float\":\"universal-float\",\"payment_reference\":\"BUYER-PROVIDED-REF\",\"requested\":{\"amount\":\"321.21\",\"currency\":\"GBP\"},\"status\":\"pending\"},{\"approved\":{\"amount\":\"321.21\",\"currency\":\"GBP\"},\"created_at\":\"2025-10-13T16:09:42+00:00\",\"float\":\"amazon\",\"payment_reference\":\"BUYER-PROVIDED-REF\",\"requested\":{\"amount\":\"321.21\",\"currency\":\"GBP\"},\"status\":\"approved\"},{\"approved\":{\"amount\":\"310.00\",\"currency\":\"GBP\"},\"created_at\":\"2025-10-13T16:09:42+00:00\",\"float\":\"amazon\",\"payment_reference\":\"BUYER-PROVIDED-REF\",\"requested\":{\"amount\":\"321.21\",\"currency\":\"GBP\"},\"status\":\"approved_edited\"},{\"approved\":{\"amount\":\"310.00\",\"currency\":\"GBP\"},\"created_at\":\"2025-10-13T16:09:42+00:00\",\"float\":\"amazon\",\"payment_reference\":\"BUYER-PROVIDED-REF\",\"requested\":{\"amount\":\"321.21\",\"currency\":\"GBP\"},\"status\":\"removed\"},{\"approved\":null,\"created_at\":\"2025-10-13T16:09:42+00:00\",\"float\":\"reward-pass\",\"payment_reference\":\"BUYER-PROVIDED-REF\",\"requested\":{\"amount\":\"321.21\",\"currency\":\"GBP\"},\"status\":\"cancelled\"}],\"status\":\"success\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Response code\",\"example\":\"000\",\"type\":\"string\"},\"data\":{\"items\":{\"properties\":{\"approved\":{\"description\":\"Approved amount (null if pending or cancelled)\",\"nullable\":true,\"properties\":{\"amount\":{\"type\":\"string\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"currency\",\"amount\"],\"type\":\"object\"},\"created_at\":{\"description\":\"Timestamp when the transfer request was created in ISO 8601 format\",\"format\":\"date-time\",\"type\":\"string\"},\"float\":{\"description\":\"The float identifier\",\"example\":\"universal-float\",\"type\":\"string\"},\"payment_reference\":{\"description\":\"The payment reference\",\"example\":\"BUYER-PROVIDED-REF\",\"type\":\"string\"},\"requested\":{\"properties\":{\"amount\":{\"type\":\"string\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"currency\",\"amount\"],\"type\":\"object\"},\"status\":{\"description\":\"Transfer request status\",\"enum\":[\"pending\",\"approved\",\"approved_edited\",\"removed\",\"cancelled\"],\"type\":\"string\"}},\"required\":[\"float\",\"requested\",\"approved\",\"payment_reference\",\"status\",\"created_at\"],\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"const\":\"success\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successfully retrieved transfer requests\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"invalid_end_date\":{\"description\":\"The provided end_date format is invalid\",\"summary\":\"Invalid End Date Format\",\"value\":{\"code\":\"433\",\"data\":[\"Invalid end_date format. Expected format: Y-m-d\"],\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"invalid_payment_reference\":{\"description\":\"The provided payment_reference exceeds maximum length\",\"summary\":\"Invalid Payment Reference\",\"value\":{\"code\":\"433\",\"data\":[\"Payment reference must be less than 19 characters\"],\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"invalid_start_date\":{\"description\":\"The provided start_date format is invalid\",\"summary\":\"Invalid Start Date Format\",\"value\":{\"code\":\"433\",\"data\":[\"Invalid start_date format. Expected format: Y-m-d\"],\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"invalid_status\":{\"description\":\"The provided status value is invalid\",\"summary\":\"Invalid Status Value\",\"value\":{\"code\":\"433\",\"data\":[\"Invalid status value\"],\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"433\",\"type\":\"string\"},\"data\":{\"description\":\"List of validation error messages\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Validation error - invalid parameters provided\"},\"502\":{\"description\":\"Bad Gateway No response body is returned.\\n\"},\"504\":{\"description\":\"Gateway Timeout No response body is returned\\n\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/float/transfer-requests","segments":[{"lit":"float"},{"lit":"transfer-requests"}],"select":{"$action":"transfer_request","exist":["currency","end_date","float","payment_reference","start_date","status"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"GBP","kind":"query","name":"currency","orig":"currency","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /check-floats","json":"{\"operationId\":\"getCheckFloats\",\"parameters\":[{\"description\":\"Optional filter to return floats for a specific currency only. Provide the three-character ISO 4217 currency code (eg. GBP, EUR, USD). Must be uppercase.\",\"example\":\"GBP\",\"in\":\"query\",\"name\":\"currency\",\"required\":false,\"schema\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"with_currency\":{\"description\":\"Returns floats for a specific currency when the currency parameter is provided\",\"summary\":\"With Currency\",\"value\":{\"code\":\"000\",\"data\":{\"floats\":{\"GBP\":{\"example-brand\":{\"available_balance\":{\"amount\":10000,\"currency\":\"GBP\"},\"pending_payments\":{\"amount\":0.01,\"currency\":\"GBP\"}},\"example-brand-company\":{\"available_balance\":{\"amount\":7500.5,\"currency\":\"GBP\"},\"pending_payments\":{\"amount\":100,\"currency\":\"GBP\"}},\"universal-float\":{\"available_balance\":{\"amount\":50000,\"currency\":\"GBP\"},\"pending_payments\":{\"amount\":2000.02,\"currency\":\"GBP\"}}}},\"last_refreshed_at\":\"2024-01-15T10:30:00+00:00\"},\"status\":\"success\"}},\"without_currency\":{\"description\":\"Returns all available floats across all currencies for the authenticated partner\",\"summary\":\"Without Currency\",\"value\":{\"code\":\"000\",\"data\":{\"floats\":{\"EUR\":{\"another-brand\":{\"available_balance\":{\"amount\":5000,\"currency\":\"EUR\"},\"pending_payments\":{\"amount\":250,\"currency\":\"EUR\"}},\"universal-float\":{\"available_balance\":{\"amount\":35000.5,\"currency\":\"EUR\"},\"pending_payments\":{\"amount\":500,\"currency\":\"EUR\"}}},\"GBP\":{\"example-brand\":{\"available_balance\":{\"amount\":10000,\"currency\":\"GBP\"},\"pending_payments\":{\"amount\":0.01,\"currency\":\"GBP\"}},\"universal-float\":{\"available_balance\":{\"amount\":50000,\"currency\":\"GBP\"},\"pending_payments\":{\"amount\":2000.02,\"currency\":\"GBP\"}}},\"USD\":{\"universal-float\":{\"available_balance\":{\"amount\":20000,\"currency\":\"USD\"},\"pending_payments\":{\"amount\":0.01,\"currency\":\"USD\"}}}},\"last_refreshed_at\":\"2024-01-15T10:30:00+00:00\"},\"status\":\"success\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Response code\",\"example\":\"000\",\"type\":\"string\"},\"data\":{\"properties\":{\"floats\":{\"additionalProperties\":{\"additionalProperties\":{\"properties\":{\"available_balance\":{\"properties\":{\"amount\":{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"},\"pending_payments\":{\"properties\":{\"amount\":{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"}},\"required\":[\"available_balance\",\"pending_payments\"],\"type\":\"object\"},\"description\":\"Float types available for this currency\",\"type\":\"object\"},\"description\":\"Float balances grouped by currency code\",\"propertyNames\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"},\"type\":\"object\"},\"last_refreshed_at\":{\"description\":\"ISO 8601 timestamp of when the float data was last refreshed\",\"example\":\"2024-01-15T10:30:00+00:00\",\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"floats\",\"last_refreshed_at\"],\"type\":\"object\"},\"status\":{\"const\":\"success\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successfully retrieved float balances\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"invalid_currency\":{\"description\":\"The provided currency code is not recognized or not available in the system\",\"summary\":\"Invalid Currency Code\",\"value\":{\"code\":\"721\",\"message\":\"The requested currency was not found\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"721\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"example\":\"The requested currency was not found\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Validation error - invalid currency code provided\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/check-floats","segments":[{"lit":"check-floats"}],"select":{"exist":["currency"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"float","name__orig":"float","Name":"Float","name_":"float","name-":"float","NAME":"FLOAT","index$":8}, {"active":true,"entity":"float","key$":"BasicFloatFlow","kind":"basic","name":"BasicFloatFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"float_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"float_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"float_ref01","srcdatavar":"float_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-float_ref01"}}],"index$":2}]}, 'Float')
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
  
