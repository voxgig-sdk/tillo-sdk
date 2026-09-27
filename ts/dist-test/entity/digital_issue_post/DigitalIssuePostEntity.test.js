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
(0, node_test_1.describe)('DigitalIssuePostEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TILLO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TilloSDK.test();
        const ent = testsdk.DigitalIssuePost();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TILLO_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'digital_issue_post.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "barcode": { "a": true, "h": "Barcode", "n": "barcode", "r": true, "sh": "Some brands provide a barcode alongside a code delivery.", "t": "`$OBJECT`", "key$": "barcode", "index$": 0 }, "brand": { "a": true, "h": "Brand", "n": "brand", "r": true, "sh": "Brand identifier/slug (lowercase letters, numbers, hyphens only).", "t": "`$STRING`", "key$": "brand", "index$": 1 }, "client_request_id": { "a": true, "h": "Client Request Id", "n": "client_request_id", "r": true, "sh": "Unique identifier for this request.", "t": "`$STRING`", "key$": "client_request_id", "index$": 2 }, "code": { "a": true, "h": "Code", "n": "code", "r": false, "sh": "Gift card code (for code-delivery brands)", "t": "`$STRING`", "key$": "code", "index$": 3 }, "cost_value": { "a": true, "h": "Cost Value", "n": "cost_value", "r": true, "t": "`$OBJECT`", "key$": "cost_value", "index$": 4 }, "delivery_method": { "a": true, "h": "Delivery Method", "n": "delivery_method", "r": true, "t": "`$STRING`", "key$": "delivery_method", "index$": 5 }, "discount": { "a": true, "fo": "float", "h": "Discount", "n": "discount", "r": true, "sh": "The discount percentage used on this transaction", "t": "`$NUMBER`", "key$": "discount", "index$": 6 }, "expiration_date": { "a": true, "fo": "date-time", "h": "Expiration Date", "n": "expiration_date", "r": false, "sh": "The expiration date for this gift card.", "t": "`$STRING`", "key$": "expiration_date", "index$": 7 }, "face_value": { "a": true, "h": "Face Value", "n": "face_value", "r": true, "t": "`$OBJECT`", "key$": "face_value", "index$": 8 }, "float_balance": { "a": true, "h": "Float Balance", "n": "float_balance", "r": true, "t": "`$OBJECT`", "key$": "float_balance", "index$": 9 }, "fulfilment_by": { "a": true, "h": "Fulfilment By", "n": "fulfilment_by", "r": true, "sh": "This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.", "t": "`$STRING`", "key$": "fulfilment_by", "index$": 10 }, "fulfilment_parameters": { "a": true, "h": "Fulfilment Parameters", "n": "fulfilment_parameters", "r": true, "sh": "Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf", "t": "`$OBJECT`", "key$": "fulfilment_parameters", "index$": 11 }, "personalisation": { "a": true, "h": "Personalisation", "n": "personalisation", "r": true, "t": "`$OBJECT`", "key$": "personalisation", "index$": 12 }, "pin": { "a": true, "h": "Pin", "n": "pin", "r": false, "sh": "Gift card PIN (for code-delivery brands).", "t": "`$STRING`", "key$": "pin", "index$": 13 }, "reference": { "a": true, "fo": "uuid", "h": "Reference", "n": "reference", "r": true, "sh": "Unique reference for this transaction", "t": "`$STRING`", "key$": "reference", "index$": 14 }, "sector": { "a": true, "h": "Sector", "n": "sector", "r": true, "sh": "Must match one of the sectors configured for your buyer account.", "t": "`$STRING`", "key$": "sector", "index$": 15 }, "security_code": { "a": true, "h": "Security Code", "n": "security_code", "r": false, "sh": "Gift card security code (for code-delivery brands).", "t": "`$STRING`", "key$": "security_code", "index$": 16 }, "serial_number": { "a": true, "h": "Serial Number", "n": "serial_number", "r": false, "sh": "Gift card serial number.", "t": "`$STRING`", "key$": "serial_number", "index$": 17 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "Optional meta data associated with the issuance.", "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 1 }, "key$": "tags", "index$": 18 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "sh": "Gift card URL (for URL-delivery brands)", "t": "`$STRING`", "key$": "url", "index$": 19 } }, "name": "digital_issue_post", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /digital/issue", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/digital/issue", "q": {}, "r": {}, "s": [{ "lit": "digital" }, { "lit": "issue" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "digital_issue_post", "name__orig": "digital_issue_post", "Name": "DigitalIssuePost", "name_": "digital_issue_post", "name-": "digital-issue-post", "NAME": "DIGITAL_ISSUE_POST", "index$": 4 }, { "active": true, "entity": "digital_issue_post", "key$": "BasicDigitalIssuePostFlow", "kind": "basic", "name": "BasicDigitalIssuePostFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "digital_issue_post_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'DigitalIssuePost', { "POST /digital/issue": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["client_request_id", "brand", "face_value", "delivery_method", "fulfilment_by", "sector"], "properties": { "client_request_id": { "type": "string", "minLength": 5, "maxLength": 50, "pattern": "^[A-Za-z0-9_-]+$", "description": "Unique identifier for this request. Also acts as an idempotency key", "example": "req-12345-67890", "x-ref": "#/components/schemas/ClientRequestId", "key$": "client_request_id" }, "brand": { "type": "string", "minLength": 1, "maxLength": 255, "pattern": "^[a-z0-9-]+$", "description": "Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\n", "example": "fixed-async-uk", "x-ref": "#/components/schemas/BrandSlug", "key$": "brand" }, "face_value": { "type": "object", "required": ["amount", "currency"], "properties": { "amount": { "oneOf": [{}, {}], "description": "Amount in the brand's currency. Accepts string or number with up to 2 decimal places.\nMinimum and maximum amounts depend on the buyer↔brand configuration.\nUse the brand discovery endpoint to retrieve valid denomination ranges.\nReturns 400 if the amount is outside the allowed range for the buyer↔brand combination.\n" }, "currency": { "type": "string", "minLength": 3, "maxLength": 3, "pattern": "^[A-Z]{3}$", "enum": ["AED", "AUD", "BHD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HUF", "INR", "JPY", "KWD", "MXN", "NOK", "NZD", "OMR", "PLN", "QAR", "RON", "SAR", "SEK", "USD"], "x-ref": "#/components/schemas/CurrencyIsoCode" } }, "x-ref": "#/components/schemas/FaceValue", "key$": "face_value" }, "delivery_method": { "type": "string", "minLength": 3, "enum": ["code", "url", "email", "wrapped"], "x-ref": "#/components/schemas/DeliveryMethod", "key$": "delivery_method" }, "fulfilment_by": { "type": "string", "enum": ["partner", "rewardcloud"], "description": "This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.  If you are planning on sending out the email please set this to 'partner', if you would like us to fulfil the email for you then please provide 'rewardcloud' as the value. Please note, that when we are fulfilling the email on your behalf you will need to provide the additional 'fulfilment_parameters' field", "x-ref": "#/components/schemas/FulfilmentBy", "key$": "fulfilment_by" }, "sector": { "type": "string", "minLength": 1, "description": "Must match one of the sectors configured for your buyer account.\n", "enum": ["affiliate-marketing", "aggregator", "b2c-marketplace", "cashback", "cash-out", "charity", "consumer", "consumer-rewards-and-incentives", "crypto-currency", "crypto-off-ramp", "customer-acquisition", "digital-currency", "employee-benefits", "employee-rewards-and-incentives", "gift-card-mall", "insurance", "marketplace", "other", "relief-support-and-disbursement", "reward-recognition", "voluntary-benefits"], "example": "voluntary-benefits", "x-ref": "#/components/schemas/Sector", "key$": "sector" }, "personalisation": { "type": "object", "required": ["message"], "properties": { "to_name": { "type": "string", "example": "John Doe", "description": "This field is required, unless your purchasing a Reward Pass product" }, "from_name": { "type": "string", "example": "Jane Doe", "description": "This field is required, unless your purchasing a Reward Pass product" }, "message": { "type": "string", "example": "Thanks for all your hard work!" }, "template": { "type": "string", "example": "standard", "description": "This field is required, unless your purchasing a Reward Pass product" }, "language": { "type": "string", "example": "English" }, "email_message": { "type": "string", "description": "This only needs to be added when purchasing a Reward Pass product" }, "redemption_message": { "type": "string", "description": "This only needs to be added when purchasing a Reward Pass product" }, "carrier_message": { "type": "string", "description": "This only needs to be added when purchasing a Reward Pass product" }, "choice_link_theme": { "type": "string", "pattern": "^[a-z0-9-]+$", "description": "This is an optional field, and only used when purchasing a Choice Link when you have set up a custom theme" }, "gifted_by": { "type": "string", "description": "This is an optional field, and only used when purchasing a Choice Link" } }, "x-ref": "#/components/schemas/Personalisation", "key$": "personalisation" }, "fulfilment_parameters": { "type": "object", "required": ["to_email", "from_name", "from_email", "subject"], "description": "Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf", "properties": { "to_name": { "type": "string" }, "to_email": { "type": "string" }, "from_name": { "type": "string" }, "from_email": { "type": "string" }, "subject": { "type": "string" }, "language": { "type": "string" }, "customer_id": { "type": "string" }, "to_first_name": { "type": "string" }, "to_last_name": { "type": "string" }, "address_1": { "type": "string" }, "address_2": { "type": "string" }, "city": { "type": "string" }, "postal_code": { "type": "string" }, "country": { "type": "string" } }, "x-ref": "#/components/schemas/FulfilmentParametersDigital", "key$": "fulfilment_parameters" }, "tags": { "type": "array", "description": "Optional meta data associated with the issuance.", "items": { "anyOf": [{ "type": "string", "pattern": "^[-A-Za-z0-9 ]+$" }, { "type": "number" }] }, "x-ref": "#/components/schemas/Tags", "key$": "tags" } }, "if": { "properties": { "fulfilment_by": { "const": "rewardcloud" } } }, "then": { "required": ["fulfilment_parameters"] }, "x-ref": "#/components/schemas/DigitalIssuePostRequest", "index$": 1 }, "examples": { "issue_gift_card_with_url": { "summary": "Issue Digital Gift Card - URL", "description": "Simple example of issuing a URL", "value": { "client_request_id": "019ade93-d513-776b-92a2-b6323329b661", "brand": "fixed-sync-uk", "face_value": { "amount": 10, "currency": "GBP" }, "delivery_method": "url", "fulfilment_by": "partner", "sector": "gift-card-mall" } }, "issue_gift_card_with_code": { "summary": "Issue Digital Gift Card - Code", "description": "Simple example of issuing a Code", "value": { "client_request_id": "019ade93-d513-776b-92a2-b6323329b661", "brand": "sync-open-code-uk", "face_value": { "amount": 25, "currency": "GBP" }, "delivery_method": "code", "fulfilment_by": "partner", "sector": "marketplace" } }, "issue_gift_card_with_personalisation": { "summary": "Issue Digital Gift Card - with Personalisation", "description": "Example of issuing a Digital gift card with personalisation options", "value": { "client_request_id": "019ade93-d513-776b-92a2-b6323329b661", "brand": "open-sync-eur", "face_value": { "amount": 20.5, "currency": "EUR" }, "delivery_method": "url", "fulfilment_by": "partner", "personalisation": { "to_name": "Recipient", "from_name": "Sender", "message": "Here is your gift", "template": "standard" }, "sector": "voluntary-benefits" } }, "issue_gift_card_with_fulfilment_by_tillo": { "summary": "Issue Digital Gift Card - with fulfilment by Tillo", "description": "Example of issuing a Digital gift card with Tillo handling the email fulfilment", "value": { "client_request_id": "019ade93-d513-776b-92a2-b6323329b661", "brand": "fixed-sync-us", "face_value": { "amount": 20, "currency": "USD" }, "delivery_method": "url", "fulfilment_by": "rewardcloud", "fulfilment_parameters": { "to_name": "Receiver", "to_email": "test@tillo.io", "from_name": "Partner name", "from_email": "noreply@sandbox.tillo.dev", "subject": "[TestCode] Here is your gift card!" }, "personalisation": { "to_name": "Recipient", "from_name": "Sender", "message": "Here is your gift", "template": "standard" }, "sector": "voluntary-benefits" } }, "issue_choice_link_with_theme": { "summary": "Issue Choice Link - with custom theme", "description": "Choice Link with customised theme.", "value": { "client_request_id": "019ade93-d513-776b-92a2-b6323329b661", "brand": "choiceplus-mock-uk", "face_value": { "amount": 20, "currency": "GBP" }, "delivery_method": "url", "fulfilment_by": "partner", "personalisation": { "to_name": "Recipient", "from_name": "Sender", "message": "Happy Birthday! Enjoy your gift card", "template": "standard", "choice_link_theme": "my-custom-theme" }, "sector": "voluntary-benefits" } }, "issue_open_loop_with_url": { "summary": "Issue Reward Pass - URL", "description": "Issue a Reward Pass product with a URL delivery", "value": { "client_request_id": "019ade93-d513-776b-92a2-b6323329b661", "brand": "open-loop-uk", "face_value": { "amount": 5, "currency": "GBP" }, "delivery_method": "url", "fulfilment_by": "partner", "personalisation": { "message": "Here is your gift", "email_message": "Message to appear in payment notification email", "redemption_message": "Message to appear on participant portal", "carrier_message": "Message to appear on letter if physical card fulfilment" }, "sector": "voluntary-benefits" } }, "issue_open_loop_with_email": { "summary": "Issue Reward Pass - Email", "description": "Issue a Reward Pass product with an email delivery", "value": { "client_request_id": "019ade93-d513-776b-92a2-b6323329b661", "brand": "loop-card-uk", "face_value": { "amount": 5, "currency": "GBP" }, "delivery_method": "email", "fulfilment_by": "partner", "personalisation": { "to_name": "Recipient", "from_name": "Sender", "message": "Here is your gift", "template": "standard", "email_message": "Message to appear in payment notification email", "redemption_message": "Message to appear on participant portal", "carrier_message": "Message to appear on letter if physical card fulfilment" }, "sector": "voluntary-benefits" } } } } } }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const digital_issue_post_ref01_ent = client.DigitalIssuePost();
        let digital_issue_post_ref01_data = setup.data.new.digital_issue_post['digital_issue_post_ref01'];
        digital_issue_post_ref01_data = (await digital_issue_post_ref01_ent.create(digital_issue_post_ref01_data)).data();
        (0, node_assert_1.default)(null != digital_issue_post_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/digital_issue_post/DigitalIssuePostTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TilloSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['digital_issue_post01', 'digital_issue_post02', 'digital_issue_post03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TILLO_TEST_DIGITAL_ISSUE_POST_ENTID': idmap,
        'TILLO_TEST_LIVE': 'FALSE',
        'TILLO_TEST_EXPLAIN': 'FALSE',
        'TILLO_APIKEY': '',
    });
    idmap = env['TILLO_TEST_DIGITAL_ISSUE_POST_ENTID'];
    const live = 'TRUE' === env.TILLO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TILLO_TEST_DIGITAL_ISSUE_POST_ENTID'];
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
//# sourceMappingURL=DigitalIssuePostEntity.test.js.map