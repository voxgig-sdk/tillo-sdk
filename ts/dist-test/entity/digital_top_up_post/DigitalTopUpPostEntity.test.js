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
(0, node_test_1.describe)('DigitalTopUpPostEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TILLO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TilloSDK.test();
        const ent = testsdk.DigitalTopUpPost();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TILLO_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'digital_top_up_post.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "brand": { "a": true, "h": "Brand", "n": "brand", "r": true, "sh": "Brand identifier/slug (lowercase letters, numbers, hyphens only).", "t": "`$STRING`", "key$": "brand", "index$": 0 }, "client_request_id": { "a": true, "h": "Client Request Id", "n": "client_request_id", "r": true, "sh": "Unique identifier for this request.", "t": "`$STRING`", "key$": "client_request_id", "index$": 1 }, "code": { "a": true, "h": "Code", "n": "code", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Gift card code", "t": "`$STRING`", "key$": "code", "index$": 2 }, "cost_value": { "a": true, "h": "Cost Value", "n": "cost_value", "r": true, "t": "`$OBJECT`", "key$": "cost_value", "index$": 3 }, "discount": { "a": true, "fo": "float", "h": "Discount", "n": "discount", "r": true, "sh": "The discount percentage used on this transaction", "t": "`$NUMBER`", "key$": "discount", "index$": 4 }, "face_value": { "a": true, "h": "Face Value", "n": "face_value", "r": true, "t": "`$OBJECT`", "key$": "face_value", "index$": 5 }, "float_balance": { "a": true, "h": "Float Balance", "n": "float_balance", "r": true, "t": "`$OBJECT`", "key$": "float_balance", "index$": 6 }, "pin": { "a": true, "h": "Pin", "n": "pin", "r": false, "sh": "Gift card PIN.", "t": "`$STRING`", "key$": "pin", "index$": 7 }, "reference": { "a": true, "fo": "uuid", "h": "Reference", "n": "reference", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Unique reference for this transaction", "t": "`$STRING`", "key$": "reference", "index$": 8 }, "sector": { "a": true, "h": "Sector", "n": "sector", "r": true, "sh": "Must match one of the sectors configured for your buyer account.", "t": "`$STRING`", "key$": "sector", "index$": 9 }, "serial_number": { "a": true, "h": "Serial Number", "n": "serial_number", "r": false, "sh": "Gift card serial number.", "t": "`$STRING`", "key$": "serial_number", "index$": 10 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "Optional meta data associated with the issuance.", "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 1 }, "key$": "tags", "index$": 11 } }, "name": "digital_top_up_post", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /digital/top-up", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/digital/top-up", "q": {}, "r": {}, "s": [{ "lit": "digital" }, { "lit": "top-up" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "digital_top_up_post", "name__orig": "digital_top_up_post", "Name": "DigitalTopUpPost", "name_": "digital_top_up_post", "name-": "digital-top-up-post", "NAME": "DIGITAL_TOP_UP_POST", "index$": 7 }, { "active": true, "entity": "digital_top_up_post", "key$": "BasicDigitalTopUpPostFlow", "kind": "basic", "name": "BasicDigitalTopUpPostFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "digital_top_up_post_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'DigitalTopUpPost', { "POST /digital/top-up": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["client_request_id", "brand", "face_value", "sector"], "oneOf": [{ "required": ["code"] }, { "required": ["reference"] }], "properties": { "client_request_id": { "type": "string", "minLength": 5, "maxLength": 50, "pattern": "^[A-Za-z0-9_-]+$", "description": "Unique identifier for this request. Also acts as an idempotency key", "example": "req-12345-67890", "x-ref": "#/components/schemas/ClientRequestId", "key$": "client_request_id" }, "brand": { "type": "string", "minLength": 1, "maxLength": 255, "pattern": "^[a-z0-9-]+$", "description": "Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\n", "example": "fixed-async-uk", "x-ref": "#/components/schemas/BrandSlug", "key$": "brand" }, "face_value": { "type": "object", "required": ["amount", "currency"], "properties": { "amount": { "oneOf": [{}, {}], "description": "Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\nMinimum and maximum amounts depend on the buyer↔brand configuration.\nUse the brand discovery endpoint to retrieve valid denomination ranges.\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\n" }, "currency": { "type": "string", "minLength": 3, "maxLength": 3, "pattern": "^[A-Z]{3}$", "enum": ["AED", "AUD", "BHD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HUF", "INR", "JPY", "KWD", "MXN", "NOK", "NZD", "OMR", "PLN", "QAR", "RON", "SAR", "SEK", "USD"], "x-ref": "#/components/schemas/CurrencyIsoCode" } }, "x-ref": "#/components/schemas/FaceValue", "key$": "face_value" }, "sector": { "type": "string", "minLength": 1, "description": "Must match one of the sectors configured for your buyer account.\n", "enum": ["affiliate-marketing", "aggregator", "b2c-marketplace", "cashback", "cash-out", "charity", "consumer", "consumer-rewards-and-incentives", "crypto-currency", "crypto-off-ramp", "customer-acquisition", "digital-currency", "employee-benefits", "employee-rewards-and-incentives", "gift-card-mall", "insurance", "marketplace", "other", "relief-support-and-disbursement", "reward-recognition", "voluntary-benefits"], "example": "voluntary-benefits", "x-ref": "#/components/schemas/Sector", "key$": "sector" }, "reference": { "type": "string", "format": "uuid", "description": "Unique reference for this transaction", "example": "019ade93-d513-776b-92a2-b6323329b661", "x-ref": "#/components/schemas/Reference", "key$": "reference" }, "code": { "type": "string", "minLength": 8, "maxLength": 110, "pattern": "^[a-zA-Z0-9 ._-]+$", "description": "Gift card code. Must be between 8 and 110 characters.\nAllowed characters: alphanumeric, space, period, underscore, hyphen.\n", "example": "6280390102830976", "key$": "code" }, "pin": { "type": "string", "minLength": 3, "maxLength": 20, "pattern": "^[a-zA-Z0-9_-]+$", "description": "Gift card PIN. Required for certain brands.\nMust be between 3 and 20 characters when provided.\nAllowed characters: alphanumeric, underscore, hyphen.\n", "example": "12562161", "x-ref": "#/components/schemas/Pin", "key$": "pin" }, "serial_number": { "type": "string", "minLength": 1, "description": "Gift card serial number. Required for certain brands.\nMust be at least 1 character when provided.\n", "example": "SN123456789", "x-ref": "#/components/schemas/SerialNumber", "key$": "serial_number" }, "tags": { "type": "array", "description": "Optional meta data associated with the issuance.", "items": { "anyOf": [{ "type": "string", "pattern": "^[-A-Za-z0-9 ]+$" }, { "type": "number" }] }, "x-ref": "#/components/schemas/Tags", "key$": "tags" } }, "x-ref": "#/components/schemas/DigitalTopUpPostRequest", "index$": 1 }, "examples": { "with_reference": { "summary": "Reference Only", "description": "Top-up request with reference only.", "value": { "client_request_id": "req-12345-67893", "brand": "mock-brand", "face_value": { "amount": 25, "currency": "GBP" }, "reference": "ad38c984-b509-11e7-9abc-06c4ed57771a", "sector": "voluntary-benefits" } }, "with_code_only": { "summary": "Code Only", "description": "Top-up request with code only (when PIN is not required by processor)", "value": { "client_request_id": "req-12345-67891", "brand": "mock-brand", "face_value": { "amount": 25, "currency": "GBP" }, "code": "ABC123456789DEF", "sector": "voluntary-benefits" } }, "with_code_and_pin": { "summary": "Code and PIN", "description": "Standard top-up request with both code and PIN", "value": { "client_request_id": "req-12345-67890", "brand": "mock-brand", "face_value": { "amount": 12.35, "currency": "GBP" }, "code": "6280390102830976", "pin": "12562161", "sector": "marketplace" } }, "with_code_and_serial": { "summary": "Code and Serial Number", "description": "Top-up request with code and serial number (when PIN is not required by processor)", "value": { "client_request_id": "req-12345-67892", "brand": "mock-brand", "face_value": { "amount": 50, "currency": "GBP" }, "code": "6280390102830976", "serial_number": "SN123456789", "sector": "marketplace" } } } } } }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const digital_top_up_post_ref01_ent = client.DigitalTopUpPost();
        let digital_top_up_post_ref01_data = setup.data.new.digital_top_up_post['digital_top_up_post_ref01'];
        digital_top_up_post_ref01_data = (await digital_top_up_post_ref01_ent.create(digital_top_up_post_ref01_data)).data();
        (0, node_assert_1.default)(null != digital_top_up_post_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/digital_top_up_post/DigitalTopUpPostTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TilloSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['digital_top_up_post01', 'digital_top_up_post02', 'digital_top_up_post03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TILLO_TEST_DIGITAL_TOP_UP_POST_ENTID': idmap,
        'TILLO_TEST_LIVE': 'FALSE',
        'TILLO_TEST_EXPLAIN': 'FALSE',
        'TILLO_APIKEY': '',
    });
    idmap = env['TILLO_TEST_DIGITAL_TOP_UP_POST_ENTID'];
    const live = 'TRUE' === env.TILLO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TILLO_TEST_DIGITAL_TOP_UP_POST_ENTID'];
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
//# sourceMappingURL=DigitalTopUpPostEntity.test.js.map