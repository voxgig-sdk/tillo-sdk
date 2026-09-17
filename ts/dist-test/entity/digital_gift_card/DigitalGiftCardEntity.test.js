"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DigitalGiftCardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TILLO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TilloSDK.test();
        const ent = testsdk.DigitalGiftCard();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TILLO_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'digital_gift_card.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "brand", "req": true, "short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "client_request_id", "req": true, "short": "Unique identifier for this request.", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "code", "req": false, "short": "Gift card code", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "data", "req": false, "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "face_value", "req": true, "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "message", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "original_client_request_id", "req": false, "short": "This field will be the `client_request_id` provided in the original transaction.", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "pin", "req": false, "short": "Gift card PIN.", "type": "`$STRING`", "index$": 7 }, { "active": true, "format": "uuid", "name": "reference", "req": false, "short": "This is the `reference` you received when making the original issuance request.", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "sector", "req": true, "short": "Must match one of the sectors configured for your buyer account.", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "serial_number", "req": false, "short": "The serial number is a required parameter for any Sainsburys brand", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "status", "req": false, "type": "`$STRING`", "index$": 11 }], "name": "digital_gift_card", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /digital/check-balance", "json": "{\"operationId\":\"postDigitalCheckBalance\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"balance_check_with_code_and_pin\":{\"description\":\"Perform a balance check on a digital gift card using the gift card code. Please note, that in addition to the `code` some brands will also require the `pin`\",\"summary\":\"Balance Check - using code and pin\",\"value\":{\"brand\":\"fixed-sync-uk\",\"client_request_id\":\"req-12345-00002\",\"code\":\"1234123412341234\",\"face_value\":{\"currency\":\"GBP\"},\"pin\":\"0321\",\"sector\":\"gift-card-mall\"}},\"balance_check_with_original_client_request_id\":{\"description\":\"Perform a balance check on a digital gift card using the `original_client_request_id` - which is the `client_request_id` you used when making the original issuance.\",\"summary\":\"Balance Check - using original client request id\",\"value\":{\"brand\":\"fixed-sync-uk\",\"client_request_id\":\"req-12345-00002\",\"face_value\":{\"currency\":\"GBP\"},\"original_client_request_id\":\"req-12345-00001\",\"sector\":\"gift-card-mall\"}},\"balance_check_with_reference\":{\"description\":\"Perform a balance check on a digital gift card using the Tillo `reference` - which is the `reference` returned when making the original issuance.\",\"summary\":\"Balance Check - using reference\",\"value\":{\"brand\":\"fixed-sync-uk\",\"client_request_id\":\"req-12345-67890\",\"face_value\":{\"currency\":\"GBP\"},\"reference\":\"a0bdd3c0-5197-458d-bba7-073d3b839575\",\"sector\":\"gift-card-mall\"}},\"balance_check_with_serial_number\":{\"description\":\"Some brands, such as Sainsburys, require that the `serial_number` is provided when making a balance check. This can be used in combination with the `reference` to locate and check the balance of a digital card.\",\"summary\":\"Balance Check - using reference and serial number\",\"value\":{\"brand\":\"sainsburys\",\"client_request_id\":\"req-12345-00003\",\"face_value\":{\"currency\":\"GBP\"},\"reference\":\"a0bdd3c0-5197-458d-bba7-073d3b839575\",\"sector\":\"gift-card-mall\",\"serial_number\":\"111621374689\"}}},\"schema\":{\"anyOf\":[{\"required\":[\"code\"]},{\"required\":[\"reference\"]},{\"required\":[\"original_client_request_id\"]}],\"properties\":{\"brand\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"},\"client_request_id\":{\"description\":\"Unique identifier for this request. Also acts as an idempotency key\",\"example\":\"req-12345-67890\",\"maxLength\":50,\"minLength\":5,\"pattern\":\"^[A-Za-z0-9_-]+$\",\"type\":\"string\"},\"code\":{\"description\":\"Gift card code\",\"maxLength\":110,\"minLength\":8,\"pattern\":\"^[a-zA-Z0-9 ._-]+$\",\"type\":\"string\"},\"face_value\":{\"properties\":{\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"currency\"],\"type\":\"object\"},\"original_client_request_id\":{\"description\":\"This field will be the `client_request_id` provided in the original transaction.  For example, if you are performing some form of cancellation, then this would be the `client_request_id` you provided when making the original issuance request\\n\",\"example\":\"req-12345-67890\",\"maxLength\":50,\"minLength\":5,\"pattern\":\"^[A-Za-z0-9_-]+$\",\"type\":\"string\"},\"pin\":{\"description\":\"Gift card PIN. This field is optional and only some brands will require this to be added.\",\"type\":\"string\"},\"reference\":{\"description\":\"This is the `reference` you received when making the original issuance request.\",\"format\":\"uuid\",\"type\":\"string\"},\"sector\":{\"description\":\"Must match one of the sectors configured for your buyer account.\\n\",\"enum\":[\"affiliate-marketing\",\"aggregator\",\"b2c-marketplace\",\"cashback\",\"cash-out\",\"charity\",\"consumer\",\"consumer-rewards-and-incentives\",\"crypto-currency\",\"crypto-off-ramp\",\"customer-acquisition\",\"digital-currency\",\"employee-benefits\",\"employee-rewards-and-incentives\",\"gift-card-mall\",\"insurance\",\"marketplace\",\"other\",\"relief-support-and-disbursement\",\"reward-recognition\",\"voluntary-benefits\"],\"example\":\"voluntary-benefits\",\"minLength\":1,\"type\":\"string\"},\"serial_number\":{\"description\":\"The serial number is a required parameter for any Sainsburys brand\",\"type\":\"string\"}},\"required\":[\"client_request_id\",\"brand\",\"face_value\",\"sector\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"properties\":{\"face_value\":{\"properties\":{\"amount\":{\"examples\":[24.99,25,25.5],\"format\":\"float\",\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\"],\"type\":\"object\"}},\"required\":[\"face_value\"],\"type\":\"object\"},\"message\":{\"example\":\"Card balance retrieved successfully\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successful response\",\"headers\":{\"X-RateLimit-Limit\":{\"schema\":{\"description\":\"The number of requests you are allowed to make to this endpoint within a 60 second window\",\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"schema\":{\"description\":\"The number of requests you have remaining within your 60 second window\",\"type\":\"integer\"}}}},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"missing_serial_number\":{\"summary\":\"Example when missing required parameter\",\"value\":{\"code\":\"704\",\"data\":{\"serial_number\":[\"The serial number field is required.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Validation error code\",\"example\":\"433\",\"type\":\"string\"},\"data\":{\"additionalProperties\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Optional detailed validation errors by field\",\"example\":{\"brand\":[\"The brand field is required.\"],\"faceValue.amount\":[\"The amount must be a positive number.\"]},\"type\":\"object\"},\"message\":{\"description\":\"Error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"211\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Too many attempts for the API rate limit\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Too many requests. Rate limit exceeded.\"},\"500\":{\"content\":{\"application/json\":{\"examples\":{\"external_error\":{\"summary\":\"Example processor error\",\"value\":{\"code\":\"603\",\"message\":\"Error returned by the Processor\",\"status\":\"error\"}},\"unable_to_locate_sale\":{\"summary\":\"Example missing sale\",\"value\":{\"code\":\"724\",\"message\":\"Could not locate original sale record.\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/400/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Internal Server Error\"},\"502\":{\"description\":\"Bad Gateway No response body is returned.\\n\"},\"504\":{\"description\":\"Gateway Timeout No response body is returned\\n\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/digital/check-balance", "segments": [{ "lit": "digital" }, { "lit": "check-balance" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "example-brand", "kind": "query", "name": "brand", "orig": "brand", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /check-stock", "json": "{\"operationId\":\"getCheckStock\",\"parameters\":[{\"description\":\"Brand identifier/slug\",\"example\":\"example-brand\",\"in\":\"query\",\"name\":\"brand\",\"required\":false,\"schema\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"all_brands\":{\"description\":\"Returns stock levels for all available vault brands when no brand parameter is provided\",\"summary\":\"All Brands (No Parameters)\",\"value\":{\"code\":\"000\",\"data\":{\"fabyouless\":{\"19.95\":\"OUT\"},\"john-lewis\":{\"100.00\":\"OUT\",\"200.00\":\"OUT\",\"25.00\":\"OUT\",\"50.00\":\"OUT\"},\"nowtv-sky-sports\":{\"10.00\":\"OUT\",\"25.00\":\"OUT\"},\"sports-direct\":{\"10.00\":\"OUT\",\"100.00\":\"OUT\",\"25.00\":\"OUT\",\"5.00\":\"OUT\",\"50.00\":\"OUT\"}},\"message\":\"Stock levels for all Vault brands\",\"status\":\"success\"}},\"with_brand\":{\"description\":\"Returns stock levels for a specific brand when the brand parameter is provided\",\"summary\":\"With Brand\",\"value\":{\"code\":\"000\",\"data\":{\"sports-direct\":{\"10.00\":\"OUT\",\"100.00\":\"OUT\",\"25.00\":\"OUT\",\"5.00\":\"OUT\",\"50.00\":\"OUT\"}},\"message\":\"Stock levels for [brand-slug]\",\"status\":\"success\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Response code\",\"example\":\"000\",\"type\":\"string\"},\"data\":{\"additionalProperties\":{\"oneOf\":[{\"additionalProperties\":{\"description\":\"Stock status or quantity for this denomination (e.g., \\\"OUT\\\" or quantity as string)\",\"example\":\"OUT\",\"type\":\"string\"},\"description\":\"Denominations available for this brand\",\"type\":\"object\"},{\"description\":\"Empty array when brand has no stock\",\"items\":{},\"maxItems\":0,\"type\":\"array\"}]},\"description\":\"Stock levels grouped by brand slug. Each brand contains denominations as key-value pairs where the key is the denomination amount as a decimal string (e.g., \\\"10.00\\\", \\\"25.00\\\") and the value is the stock status (e.g., \\\"OUT\\\" for out of stock, or a quantity number as a string).\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable response message\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successfully retrieved stock levels\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"invalid_request\":{\"description\":\"The request is malformed or contains invalid parameters\",\"summary\":\"Invalid Request\",\"value\":{\"code\":\"714\",\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"714\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad request. Invalid or missing required parameters.\"}}},\"description\":\"Bad request. Invalid or missing required parameters.\"},\"401\":{\"content\":{\"application/json\":{\"examples\":{\"invalid_authentication\":{\"description\":\"Authentication failed due to invalid API key or signature\",\"summary\":\"Invalid Authentication\",\"value\":{\"code\":\"434\",\"message\":\"Authentication failed\",\"status\":\"error\"}},\"invalid_brand_access\":{\"description\":\"The requested brand is not available or not accessible to the authenticated partner\",\"summary\":\"Invalid Brand Access\",\"value\":{\"code\":\"434\",\"message\":\"The requested brand is not available\",\"status\":\"error\"}}},\"schema\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"}}},\"description\":\"Unauthorized. Invalid authentication or brand access denied.\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"brand_not_supported\":{\"description\":\"The requested brand does not support the check-stock endpoint (not a vault brand)\",\"summary\":\"Brand Not Supported\",\"value\":{\"code\":\"433\",\"data\":{\"brand\":\"Service [check-stock] is not supported for brand [brand-slug]\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"invalid_brand_slug\":{\"description\":\"The provided brand slug does not exist or is not available\",\"summary\":\"Invalid Brand Slug\",\"value\":{\"code\":\"433\",\"data\":{\"brand\":\"The requested brand is not available\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Validation error code\",\"example\":\"433\",\"type\":\"string\"},\"data\":{\"additionalProperties\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Optional detailed validation errors by field\",\"example\":{\"brand\":[\"The brand field is required.\"],\"faceValue.amount\":[\"The amount must be a positive number.\"]},\"type\":\"object\"},\"message\":{\"description\":\"Error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"}}},\"description\":\"Validation error. Request data failed validation rules.\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/check-stock", "segments": [{ "lit": "check-stock" }], "select": { "exist": ["brand"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "digital_gift_card", "name__orig": "digital_gift_card", "Name": "DigitalGiftCard", "name_": "digital_gift_card", "name-": "digital-gift-card", "NAME": "DIGITAL_GIFT_CARD", "index$": 2 }, { "active": true, "entity": "digital_gift_card", "key$": "BasicDigitalGiftCardFlow", "kind": "basic", "name": "BasicDigitalGiftCardFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "digital_gift_card_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "digital_gift_card_ref01", "srcdatavar": "digital_gift_card_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-digital_gift_card_ref01" } }], "index$": 1 }] }, 'DigitalGiftCard');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const digital_gift_card_ref01_ent = client.DigitalGiftCard();
        let digital_gift_card_ref01_data = setup.data.new.digital_gift_card['digital_gift_card_ref01'];
        digital_gift_card_ref01_data = (await digital_gift_card_ref01_ent.create(digital_gift_card_ref01_data)).data();
        (0, node_assert_1.default)(null != digital_gift_card_ref01_data);
        // LOAD
        const digital_gift_card_ref01_match_dt0 = {};
        const digital_gift_card_ref01_data_dt0 = (await digital_gift_card_ref01_ent.load(digital_gift_card_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != digital_gift_card_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/digital_gift_card/DigitalGiftCardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TilloSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['digital_gift_card01', 'digital_gift_card02', 'digital_gift_card03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TILLO_TEST_DIGITAL_GIFT_CARD_ENTID': idmap,
        'TILLO_TEST_LIVE': 'FALSE',
        'TILLO_TEST_EXPLAIN': 'FALSE',
        'TILLO_APIKEY': '',
    });
    idmap = env['TILLO_TEST_DIGITAL_GIFT_CARD_ENTID'];
    const live = 'TRUE' === env.TILLO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TILLO_TEST_DIGITAL_GIFT_CARD_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TilloSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=DigitalGiftCardEntity.test.js.map