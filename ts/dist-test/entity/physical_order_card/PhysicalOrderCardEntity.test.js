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
(0, node_test_1.describe)('PhysicalOrderCardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TILLO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TilloSDK.test();
        const ent = testsdk.PhysicalOrderCard();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TILLO_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'physical_order_card.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "brand": { "a": true, "h": "Brand", "n": "brand", "r": true, "sh": "Brand identifier/slug (lowercase letters, numbers, hyphens only).", "t": "`$STRING`", "key$": "brand", "index$": 0 }, "client_request_id": { "a": true, "h": "Client Request Id", "n": "client_request_id", "r": true, "sh": "Unique identifier for this request.", "t": "`$STRING`", "key$": "client_request_id", "index$": 1 }, "cost_value": { "a": true, "h": "Cost Value", "n": "cost_value", "r": true, "sh": "The amount you actually paid (once the discount has been taken into consideration)", "t": "`$OBJECT`", "key$": "cost_value", "index$": 2 }, "discount": { "a": true, "fo": "float", "h": "Discount", "n": "discount", "r": true, "sh": "The discount percentage used on this transaction", "t": "`$NUMBER`", "key$": "discount", "index$": 3 }, "expiration_date": { "a": true, "fo": "date-time", "h": "Expiration Date", "n": "expiration_date", "r": false, "sh": "The expiration date for this gift card.", "t": "`$STRING`", "key$": "expiration_date", "index$": 4 }, "face_value": { "a": true, "h": "Face Value", "n": "face_value", "r": true, "sh": "the face value amount of the gift card.", "t": "`$OBJECT`", "key$": "face_value", "index$": 5 }, "float_balance": { "a": true, "h": "Float Balance", "n": "float_balance", "r": true, "sh": "Your remaining balance on the float used to make this transaction", "t": "`$OBJECT`", "key$": "float_balance", "index$": 6 }, "fulfilment_by": { "a": true, "h": "Fulfilment By", "n": "fulfilment_by", "r": true, "sh": "When ordering a physical gift card, this must be set to `rewardcloud`", "t": "`$STRING`", "key$": "fulfilment_by", "index$": 7 }, "fulfilment_parameters": { "a": true, "h": "Fulfilment Parameters", "n": "fulfilment_parameters", "r": true, "t": "`$OBJECT`", "key$": "fulfilment_parameters", "index$": 8 }, "personalisation": { "a": true, "h": "Personalisation", "n": "personalisation", "r": true, "t": "`$OBJECT`", "key$": "personalisation", "index$": 9 }, "reference": { "a": true, "fo": "uuid", "h": "Reference", "n": "reference", "r": true, "sh": "Unique reference for this transaction", "t": "`$STRING`", "key$": "reference", "index$": 10 }, "sector": { "a": true, "h": "Sector", "n": "sector", "r": true, "sh": "Must match one of the sectors configured for your buyer account.", "t": "`$STRING`", "key$": "sector", "index$": 11 }, "shipping_method": { "a": true, "h": "Shipping Method", "n": "shipping_method", "r": true, "sh": "Shipping method identifier.", "t": "`$STRING`", "key$": "shipping_method", "index$": 12 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "Optional meta data associated with the issuance.", "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 1 }, "key$": "tags", "index$": 13 } }, "name": "physical_order_card", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /physical/order-card", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/physical/order-card", "q": {}, "r": {}, "s": [{ "lit": "physical" }, { "lit": "order-card" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "physical_order_card", "name__orig": "physical_order_card", "Name": "PhysicalOrderCard", "name_": "physical_order_card", "name-": "physical-order-card", "NAME": "PHYSICAL_ORDER_CARD", "index$": 10 }, { "active": true, "entity": "physical_order_card", "key$": "BasicPhysicalOrderCardFlow", "kind": "basic", "name": "BasicPhysicalOrderCardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "physical_order_card_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'PhysicalOrderCard', { "POST /physical/order-card": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["client_request_id", "brand", "face_value", "shipping_method", "fulfilment_by", "fulfilment_parameters", "sector"], "properties": { "client_request_id": { "type": "string", "minLength": 5, "maxLength": 50, "pattern": "^[A-Za-z0-9_-]+$", "description": "Unique identifier for this request. Also acts as an idempotency key", "example": "req-12345-67890", "x-ref": "#/components/schemas/ClientRequestId", "key$": "client_request_id" }, "brand": { "type": "string", "minLength": 1, "maxLength": 255, "pattern": "^[a-z0-9-]+$", "description": "Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\n", "example": "fixed-async-uk", "x-ref": "#/components/schemas/BrandSlug", "key$": "brand" }, "face_value": { "type": "object", "required": ["amount", "currency"], "properties": { "amount": { "oneOf": [{}, {}], "description": "Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\nMinimum and maximum amounts depend on the buyer↔brand configuration.\nUse the brand discovery endpoint to retrieve valid denomination ranges.\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\n" }, "currency": { "type": "string", "minLength": 3, "maxLength": 3, "pattern": "^[A-Z]{3}$", "enum": ["AED", "AUD", "BHD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HUF", "INR", "JPY", "KWD", "MXN", "NOK", "NZD", "OMR", "PLN", "QAR", "RON", "SAR", "SEK", "USD"], "x-ref": "#/components/schemas/CurrencyIsoCode" } }, "x-ref": "#/components/schemas/FaceValue", "key$": "face_value" }, "shipping_method": { "type": "string", "enum": ["standard", "standard-signed", "standard-tracked", "second-class", "second-class-signed"], "description": "Shipping method identifier. Must be a valid shipping method for the fulfilment house. Returns 400 if the shipping method is not available for the fulfilment house.", "example": "standard", "key$": "shipping_method" }, "fulfilment_by": { "type": "string", "const": "rewardcloud", "description": "When ordering a physical gift card, this must be set to `rewardcloud`", "key$": "fulfilment_by" }, "fulfilment_parameters": { "type": "object", "required": ["to_name", "address_1", "postal_code", "country"], "properties": { "to_name": { "type": "string" }, "company_name": { "type": "string" }, "address_1": { "type": "string" }, "address_2": { "type": "string" }, "address_3": { "type": "string" }, "address_4": { "type": "string" }, "city": { "type": "string" }, "postal_code": { "type": "string" }, "country": { "type": "string" } }, "x-ref": "#/components/schemas/FulfilmentParametersPhysical", "key$": "fulfilment_parameters" }, "personalisation": { "type": "object", "required": ["message"], "properties": { "message": { "type": "string", "minLength": 1 } }, "key$": "personalisation" }, "sector": { "type": "string", "minLength": 1, "description": "Must match one of the sectors configured for your buyer account.\n", "enum": ["affiliate-marketing", "aggregator", "b2c-marketplace", "cashback", "cash-out", "charity", "consumer", "consumer-rewards-and-incentives", "crypto-currency", "crypto-off-ramp", "customer-acquisition", "digital-currency", "employee-benefits", "employee-rewards-and-incentives", "gift-card-mall", "insurance", "marketplace", "other", "relief-support-and-disbursement", "reward-recognition", "voluntary-benefits"], "example": "voluntary-benefits", "x-ref": "#/components/schemas/Sector", "key$": "sector" }, "tags": { "type": "array", "description": "Optional meta data associated with the issuance.", "items": { "anyOf": [{ "type": "string", "pattern": "^[-A-Za-z0-9 ]+$" }, { "type": "number" }] }, "x-ref": "#/components/schemas/Tags", "key$": "tags" } }, "x-ref": "#/components/schemas/PhysicalOrderCardRequest", "index$": 1 }, "examples": { "normal": { "summary": "Normal Order (No Personalisation)", "description": "Standard physical card order without personalisation", "value": { "client_request_id": "req-12345-67890", "brand": "example-brand", "face_value": { "amount": 20, "currency": "GBP" }, "shipping_method": "standard", "fulfilment_by": "rewardcloud", "fulfilment_parameters": { "to_name": "John Doe", "company_name": "Acme Corp", "address_1": "123 Main Street", "address_2": "", "address_3": "", "address_4": "", "city": "London", "postal_code": "SW1A 1AA", "country": "United Kingdom" }, "sector": "voluntary-benefits", "tags": ["order-123"] } }, "with_personalisation": { "summary": "Order With Personalisation", "description": "Physical card order with personalisation message", "value": { "client_request_id": "req-67890-12345", "brand": "example-brand", "face_value": { "amount": 50, "currency": "GBP" }, "shipping_method": "standard", "fulfilment_by": "rewardcloud", "fulfilment_parameters": { "to_name": "Jane Smith", "company_name": "Acme Corp", "address_1": "123 Main Street", "address_2": "Suite 100", "address_3": "", "address_4": "", "city": "London", "postal_code": "SW1A 1AA", "country": "United Kingdom" }, "personalisation": { "message": "Thank you for your hard work! Enjoy your gift card." }, "sector": "voluntary-benefits", "tags": ["employee-reward", "physical"] } } } } } }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const physical_order_card_ref01_ent = client.PhysicalOrderCard();
        let physical_order_card_ref01_data = setup.data.new.physical_order_card['physical_order_card_ref01'];
        physical_order_card_ref01_data = (await physical_order_card_ref01_ent.create(physical_order_card_ref01_data)).data();
        (0, node_assert_1.default)(null != physical_order_card_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/physical_order_card/PhysicalOrderCardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TilloSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['physical_order_card01', 'physical_order_card02', 'physical_order_card03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TILLO_TEST_PHYSICAL_ORDER_CARD_ENTID': idmap,
        'TILLO_TEST_LIVE': 'FALSE',
        'TILLO_TEST_EXPLAIN': 'FALSE',
        'TILLO_APIKEY': '',
    });
    idmap = env['TILLO_TEST_PHYSICAL_ORDER_CARD_ENTID'];
    const live = 'TRUE' === env.TILLO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TILLO_TEST_PHYSICAL_ORDER_CARD_ENTID'];
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
//# sourceMappingURL=PhysicalOrderCardEntity.test.js.map