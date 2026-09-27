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
(0, node_test_1.describe)('DigitalIssueDeleteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TILLO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TilloSDK.test();
        const ent = testsdk.DigitalIssueDelete();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TILLO_TEST_LIVE;
        for (const op of ['create', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'digital_issue_delete.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "brand": { "a": true, "h": "Brand", "n": "brand", "r": true, "sh": "Brand identifier/slug (lowercase letters, numbers, hyphens only).", "t": "`$STRING`", "key$": "brand", "index$": 0 }, "client_request_id": { "a": true, "h": "Client Request Id", "n": "client_request_id", "r": true, "sh": "Unique identifier for this request.", "t": "`$STRING`", "key$": "client_request_id", "index$": 1 }, "face_value": { "a": true, "h": "Face Value", "n": "face_value", "r": true, "t": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 2 }, "key$": "face_value", "index$": 2 }, "float_balance": { "a": true, "h": "Float Balance", "n": "float_balance", "r": true, "sh": "Your remaining balance on the float used for this cancellation transaction.", "t": "`$OBJECT`", "key$": "float_balance", "index$": 3 }, "original_client_request_id": { "a": true, "h": "Original Client Request Id", "n": "original_client_request_id", "r": true, "sh": "This field will be the `client_request_id` provided in the original transaction.", "t": "`$STRING`", "key$": "original_client_request_id", "index$": 4 }, "reference": { "a": true, "fo": "uuid", "h": "Reference", "n": "reference", "r": true, "sh": "Unique reference (UUID) for the cancellation transaction", "t": "`$STRING`", "key$": "reference", "index$": 5 }, "sector": { "a": true, "h": "Sector", "n": "sector", "r": true, "sh": "Must match one of the sectors configured for your buyer account.", "t": "`$STRING`", "key$": "sector", "index$": 6 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "Optional meta data associated with the issuance.", "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 1 }, "key$": "tags", "index$": 7 } }, "name": "digital_issue_delete", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /digital/reverse", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/digital/reverse", "q": {}, "r": {}, "s": [{ "lit": "digital" }, { "lit": "reverse" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /digital/issue", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "DELETE", "o": "/digital/issue", "q": {}, "r": {}, "s": [{ "lit": "digital" }, { "lit": "issue" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "digital_issue_delete", "name__orig": "digital_issue_delete", "Name": "DigitalIssueDelete", "name_": "digital_issue_delete", "name-": "digital-issue-delete", "NAME": "DIGITAL_ISSUE_DELETE", "index$": 3 }, { "active": true, "entity": "digital_issue_delete", "key$": "BasicDigitalIssueDeleteFlow", "kind": "basic", "name": "BasicDigitalIssueDeleteFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "digital_issue_delete_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "digital_issue_delete_ref01", "suffix": "_rm0" }, "m": {}, "o": "remove", "s": [], "v": [], "index$": 1 }] }, 'DigitalIssueDelete', { "POST /digital/reverse": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["client_request_id", "original_client_request_id", "brand", "face_value", "sector"], "properties": { "client_request_id": { "type": "string", "minLength": 5, "maxLength": 50, "pattern": "^[A-Za-z0-9_-]+$", "description": "Unique identifier for this request. Also acts as an idempotency key", "example": "req-12345-67890", "x-ref": "#/components/schemas/ClientRequestId", "key$": "client_request_id" }, "original_client_request_id": { "type": "string", "minLength": 5, "maxLength": 50, "pattern": "^[A-Za-z0-9_-]+$", "description": "This field will be the `client_request_id` provided in the original transaction.  For example, if you are performing some form of cancellation, then this would be the `client_request_id` you provided when making the original issuance request\n", "example": "req-12345-67890", "x-ref": "#/components/schemas/OriginalClientRequestId", "key$": "original_client_request_id" }, "brand": { "type": "string", "minLength": 1, "maxLength": 255, "pattern": "^[a-z0-9-]+$", "description": "Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\n", "example": "fixed-async-uk", "x-ref": "#/components/schemas/BrandSlug", "key$": "brand" }, "face_value": { "type": "object", "required": ["amount", "currency"], "properties": { "amount": { "oneOf": [{}, {}], "description": "Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\nMinimum and maximum amounts depend on the buyer↔brand configuration.\nUse the brand discovery endpoint to retrieve valid denomination ranges.\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\n" }, "currency": { "type": "string", "minLength": 3, "maxLength": 3, "pattern": "^[A-Z]{3}$", "enum": ["AED", "AUD", "BHD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HUF", "INR", "JPY", "KWD", "MXN", "NOK", "NZD", "OMR", "PLN", "QAR", "RON", "SAR", "SEK", "USD"], "x-ref": "#/components/schemas/CurrencyIsoCode" } }, "x-ref": "#/components/schemas/FaceValue", "key$": "face_value" }, "sector": { "type": "string", "minLength": 1, "description": "Must match one of the sectors configured for your buyer account.\n", "enum": ["affiliate-marketing", "aggregator", "b2c-marketplace", "cashback", "cash-out", "charity", "consumer", "consumer-rewards-and-incentives", "crypto-currency", "crypto-off-ramp", "customer-acquisition", "digital-currency", "employee-benefits", "employee-rewards-and-incentives", "gift-card-mall", "insurance", "marketplace", "other", "relief-support-and-disbursement", "reward-recognition", "voluntary-benefits"], "example": "voluntary-benefits", "x-ref": "#/components/schemas/Sector", "key$": "sector" }, "tags": { "type": "array", "description": "Optional meta data associated with the issuance.", "items": { "anyOf": [{ "type": "string", "pattern": "^[-A-Za-z0-9 ]+$" }, { "type": "number" }] }, "x-ref": "#/components/schemas/Tags", "key$": "tags" } }, "x-ref": "#/components/schemas/DigitalReversePostRequest", "index$": 1 }, "examples": { "successful_response": { "summary": "Successful Response", "value": { "client_request_id": "req-12345-67890", "original_client_request_id": "orig-req-12345-67890", "brand": "mock-brand", "face_value": { "amount": 25, "currency": "GBP" }, "sector": "voluntary-benefits", "tags": ["premium", "lifetime"] } } } } } }, "parameters": [] }, "DELETE /digital/issue": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["client_request_id", "original_client_request_id", "brand", "face_value", "sector"], "properties": { "client_request_id": { "type": "string", "minLength": 5, "maxLength": 50, "pattern": "^[A-Za-z0-9_-]+$", "description": "Unique identifier for this request. Also acts as an idempotency key", "example": "req-12345-67890", "x-ref": "#/components/schemas/ClientRequestId" }, "original_client_request_id": { "type": "string", "minLength": 5, "maxLength": 50, "pattern": "^[A-Za-z0-9_-]+$", "description": "This field will be the `client_request_id` provided in the original transaction.  For example, if you are performing some form of cancellation, then this would be the `client_request_id` you provided when making the original issuance request\n", "example": "req-12345-67890", "x-ref": "#/components/schemas/OriginalClientRequestId" }, "brand": { "type": "string", "minLength": 1, "maxLength": 255, "pattern": "^[a-z0-9-]+$", "description": "Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\n", "example": "fixed-async-uk", "x-ref": "#/components/schemas/BrandSlug" }, "face_value": { "type": "object", "required": ["amount", "currency"], "properties": { "amount": { "oneOf": [{}, {}], "description": "Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\nMinimum and maximum amounts depend on the buyer↔brand configuration.\nUse the brand discovery endpoint to retrieve valid denomination ranges.\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\n" }, "currency": { "type": "string", "minLength": 3, "maxLength": 3, "pattern": "^[A-Z]{3}$", "enum": ["AED", "AUD", "BHD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HUF", "INR", "JPY", "KWD", "MXN", "NOK", "NZD", "OMR", "PLN", "QAR", "RON", "SAR", "SEK", "USD"], "x-ref": "#/components/schemas/CurrencyIsoCode" } }, "x-ref": "#/components/schemas/FaceValue" }, "sector": { "type": "string", "minLength": 1, "description": "Must match one of the sectors configured for your buyer account.\n", "enum": ["affiliate-marketing", "aggregator", "b2c-marketplace", "cashback", "cash-out", "charity", "consumer", "consumer-rewards-and-incentives", "crypto-currency", "crypto-off-ramp", "customer-acquisition", "digital-currency", "employee-benefits", "employee-rewards-and-incentives", "gift-card-mall", "insurance", "marketplace", "other", "relief-support-and-disbursement", "reward-recognition", "voluntary-benefits"], "example": "voluntary-benefits", "x-ref": "#/components/schemas/Sector" }, "code": { "type": "string", "minLength": 8, "maxLength": 110, "pattern": "^[a-zA-Z0-9._\\-:\\/]+$", "description": "Gift card code to cancel (for code-delivery brands).\nMust be between 8 and 110 characters. Only alphanumeric characters, dots, underscores, hyphens, colons, and forward slashes are allowed.\n", "example": "ABC123456789" }, "pin": { "type": "string", "description": "Gift card PIN. Required for cancelling certain brands when the original issue response included a PIN.\n", "example": "12562161" }, "url": { "type": "string", "format": "uri", "minLength": 8, "maxLength": 255, "description": "Gift card URL to cancel (for URL-delivery brands).\nMust be between 8 and 255 characters and be a valid URI.\n", "example": "https://example.com/gift-card/ABC123456789" }, "tags": { "type": "array", "description": "Optional meta data associated with the issuance.", "items": { "anyOf": [{ "type": "string", "pattern": "^[-A-Za-z0-9 ]+$" }, { "type": "number" }] }, "x-ref": "#/components/schemas/Tags" } }, "x-ref": "#/components/schemas/DigitalIssueDeleteRequest" }, "examples": { "cancel_by_code": { "summary": "Cancel Digital Gift Card by Code", "description": "Cancel a digital gift card using the gift card code (for code-delivery brands)", "value": { "client_request_id": "req-12345-67890", "original_client_request_id": "orig-req-12345-67890", "brand": "mock-brand", "face_value": { "amount": 25, "currency": "GBP" }, "code": "ABC123456789", "sector": "voluntary-benefits" } }, "cancel_by_code_and_pin": { "summary": "Cancel Digital Gift Card by Code and PIN", "description": "Cancel a digital gift card using the gift card code and PIN (for code-delivery brands that require a PIN)", "value": { "client_request_id": "req-12345-67890", "original_client_request_id": "orig-req-12345-67890", "brand": "mock-brand", "face_value": { "amount": 25, "currency": "GBP" }, "code": "ABC123456789", "pin": "1234", "sector": "voluntary-benefits" } }, "cancel_by_url": { "summary": "Cancel Digital Gift Card by URL", "description": "Cancel a digital gift card using the gift card URL (for URL-delivery brands)", "value": { "client_request_id": "req-12345-67890", "original_client_request_id": "orig-req-12345-67890", "brand": "mock-brand", "face_value": { "amount": 25, "currency": "GBP" }, "url": "https://example.com/gift-card", "sector": "voluntary-benefits" } }, "cancel_reward_pass_by_original_client_request_id": { "summary": "Cancel Reward Pass by Original Client Request ID", "description": "Cancel a Reward Pass product using the original client request ID (for Reward Pass products)", "value": { "client_request_id": "req-54321-67890", "original_client_request_id": "orig-req-12345-67890", "brand": "example-reward-pass-brand", "face_value": { "amount": 5, "currency": "GBP" }, "sector": "voluntary-benefits" } } } } } }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const digital_issue_delete_ref01_ent = client.DigitalIssueDelete();
        let digital_issue_delete_ref01_data = setup.data.new.digital_issue_delete['digital_issue_delete_ref01'];
        digital_issue_delete_ref01_data = (await digital_issue_delete_ref01_ent.create(digital_issue_delete_ref01_data)).data();
        (0, node_assert_1.default)(null != digital_issue_delete_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/digital_issue_delete/DigitalIssueDeleteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TilloSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['digital_issue_delete01', 'digital_issue_delete02', 'digital_issue_delete03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TILLO_TEST_DIGITAL_ISSUE_DELETE_ENTID': idmap,
        'TILLO_TEST_LIVE': 'FALSE',
        'TILLO_TEST_EXPLAIN': 'FALSE',
        'TILLO_APIKEY': '',
    });
    idmap = env['TILLO_TEST_DIGITAL_ISSUE_DELETE_ENTID'];
    const live = 'TRUE' === env.TILLO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TILLO_TEST_DIGITAL_ISSUE_DELETE_ENTID'];
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
//# sourceMappingURL=DigitalIssueDeleteEntity.test.js.map