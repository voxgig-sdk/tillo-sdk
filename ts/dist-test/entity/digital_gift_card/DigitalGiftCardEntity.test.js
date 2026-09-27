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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "brand": { "a": true, "h": "Brand", "n": "brand", "r": true, "sh": "Brand identifier/slug (lowercase letters, numbers, hyphens only).", "t": "`$STRING`", "key$": "brand", "index$": 0 }, "client_request_id": { "a": true, "h": "Client Request Id", "n": "client_request_id", "r": true, "sh": "Unique identifier for this request.", "t": "`$STRING`", "key$": "client_request_id", "index$": 1 }, "code": { "a": true, "h": "Code", "n": "code", "r": false, "sh": "Gift card code", "t": "`$STRING`", "key$": "code", "index$": 2 }, "data": { "a": true, "h": "Data", "n": "data", "r": false, "t": "`$OBJECT`", "key$": "data", "index$": 3 }, "face_value": { "a": true, "h": "Face Value", "n": "face_value", "r": true, "t": "`$OBJECT`", "key$": "face_value", "index$": 4 }, "message": { "a": true, "h": "Message", "n": "message", "r": false, "t": "`$STRING`", "key$": "message", "index$": 5 }, "original_client_request_id": { "a": true, "h": "Original Client Request Id", "n": "original_client_request_id", "r": false, "sh": "This field will be the `client_request_id` provided in the original transaction.", "t": "`$STRING`", "key$": "original_client_request_id", "index$": 6 }, "pin": { "a": true, "h": "Pin", "n": "pin", "r": false, "sh": "Gift card PIN.", "t": "`$STRING`", "key$": "pin", "index$": 7 }, "reference": { "a": true, "fo": "uuid", "h": "Reference", "n": "reference", "r": false, "sh": "This is the `reference` you received when making the original issuance request.", "t": "`$STRING`", "key$": "reference", "index$": 8 }, "sector": { "a": true, "h": "Sector", "n": "sector", "r": true, "sh": "Must match one of the sectors configured for your buyer account.", "t": "`$STRING`", "key$": "sector", "index$": 9 }, "serial_number": { "a": true, "h": "Serial Number", "n": "serial_number", "r": false, "sh": "The serial number is a required parameter for any Sainsburys brand", "t": "`$STRING`", "key$": "serial_number", "index$": 10 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 11 } }, "name": "digital_gift_card", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /digital/check-balance", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/digital/check-balance", "q": {}, "r": {}, "s": [{ "lit": "digital" }, { "lit": "check-balance" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /check-stock", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "example-brand", "k": "query", "n": "brand", "or": "brand", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/check-stock", "q": { "exist": ["brand"] }, "r": {}, "s": [{ "lit": "check-stock" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "digital_gift_card", "name__orig": "digital_gift_card", "Name": "DigitalGiftCard", "name_": "digital_gift_card", "name-": "digital-gift-card", "NAME": "DIGITAL_GIFT_CARD", "index$": 2 }, { "active": true, "entity": "digital_gift_card", "key$": "BasicDigitalGiftCardFlow", "kind": "basic", "name": "BasicDigitalGiftCardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "digital_gift_card_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "digital_gift_card_ref01", "srcdatavar": "digital_gift_card_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-digital_gift_card_ref01" } }], "index$": 1 }] }, 'DigitalGiftCard', { "POST /digital/check-balance": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["client_request_id", "brand", "face_value", "sector"], "properties": { "client_request_id": { "type": "string", "minLength": 5, "maxLength": 50, "pattern": "^[A-Za-z0-9_-]+$", "description": "Unique identifier for this request. Also acts as an idempotency key", "example": "req-12345-67890", "x-ref": "#/components/schemas/ClientRequestId", "key$": "client_request_id" }, "brand": { "type": "string", "minLength": 1, "maxLength": 255, "pattern": "^[a-z0-9-]+$", "description": "Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\n", "example": "fixed-async-uk", "x-ref": "#/components/schemas/BrandSlug", "key$": "brand" }, "face_value": { "type": "object", "required": ["currency"], "properties": { "currency": { "type": "string", "minLength": 3, "maxLength": 3, "pattern": "^[A-Z]{3}$", "enum": ["AED", "AUD", "BHD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HUF", "INR", "JPY", "KWD", "MXN", "NOK", "NZD", "OMR", "PLN", "QAR", "RON", "SAR", "SEK", "USD"], "x-ref": "#/components/schemas/CurrencyIsoCode" } }, "key$": "face_value" }, "sector": { "type": "string", "minLength": 1, "description": "Must match one of the sectors configured for your buyer account.\n", "enum": ["affiliate-marketing", "aggregator", "b2c-marketplace", "cashback", "cash-out", "charity", "consumer", "consumer-rewards-and-incentives", "crypto-currency", "crypto-off-ramp", "customer-acquisition", "digital-currency", "employee-benefits", "employee-rewards-and-incentives", "gift-card-mall", "insurance", "marketplace", "other", "relief-support-and-disbursement", "reward-recognition", "voluntary-benefits"], "example": "voluntary-benefits", "x-ref": "#/components/schemas/Sector", "key$": "sector" }, "code": { "type": "string", "minLength": 8, "maxLength": 110, "pattern": "^[a-zA-Z0-9 ._-]+$", "description": "Gift card code", "key$": "code" }, "pin": { "type": "string", "description": "Gift card PIN. This field is optional and only some brands will require this to be added.", "key$": "pin" }, "serial_number": { "type": "string", "description": "The serial number is a required parameter for any Sainsburys brand", "key$": "serial_number" }, "reference": { "type": "string", "format": "uuid", "description": "This is the `reference` you received when making the original issuance request.", "key$": "reference" }, "original_client_request_id": { "type": "string", "minLength": 5, "maxLength": 50, "pattern": "^[A-Za-z0-9_-]+$", "description": "This field will be the `client_request_id` provided in the original transaction.  For example, if you are performing some form of cancellation, then this would be the `client_request_id` you provided when making the original issuance request\n", "example": "req-12345-67890", "x-ref": "#/components/schemas/OriginalClientRequestId", "key$": "original_client_request_id" } }, "anyOf": [{ "required": ["code"] }, { "required": ["reference"] }, { "required": ["original_client_request_id"] }], "index$": 1 }, "examples": { "balance_check_with_reference": { "summary": "Balance Check - using reference", "description": "Perform a balance check on a digital gift card using the Tillo `reference` - which is the `reference` returned when making the original issuance.", "value": { "client_request_id": "req-12345-67890", "brand": "fixed-sync-uk", "face_value": { "currency": "GBP" }, "reference": "a0bdd3c0-5197-458d-bba7-073d3b839575", "sector": "gift-card-mall" } }, "balance_check_with_original_client_request_id": { "summary": "Balance Check - using original client request id", "description": "Perform a balance check on a digital gift card using the `original_client_request_id` - which is the `client_request_id` you used when making the original issuance.", "value": { "client_request_id": "req-12345-00002", "brand": "fixed-sync-uk", "face_value": { "currency": "GBP" }, "original_client_request_id": "req-12345-00001", "sector": "gift-card-mall" } }, "balance_check_with_code_and_pin": { "summary": "Balance Check - using code and pin", "description": "Perform a balance check on a digital gift card using the gift card code. Please note, that in addition to the `code` some brands will also require the `pin`", "value": { "client_request_id": "req-12345-00002", "brand": "fixed-sync-uk", "face_value": { "currency": "GBP" }, "code": "1234123412341234", "pin": "0321", "sector": "gift-card-mall" } }, "balance_check_with_serial_number": { "summary": "Balance Check - using reference and serial number", "description": "Some brands, such as Sainsburys, require that the `serial_number` is provided when making a balance check. This can be used in combination with the `reference` to locate and check the balance of a digital card.", "value": { "client_request_id": "req-12345-00003", "brand": "sainsburys", "face_value": { "currency": "GBP" }, "reference": "a0bdd3c0-5197-458d-bba7-073d3b839575", "serial_number": "111621374689", "sector": "gift-card-mall" } } } } } }, "parameters": [] }, "GET /check-stock": { "protocol": "http", "parameters": [{ "name": "brand", "in": "query", "required": false, "description": "Brand identifier/slug", "example": "example-brand", "schema": { "type": "string", "minLength": 1, "maxLength": 255, "pattern": "^[a-z0-9-]+$", "description": "Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\n", "example": "fixed-async-uk", "x-ref": "#/components/schemas/BrandSlug" }, "index$": 0 }] } });
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