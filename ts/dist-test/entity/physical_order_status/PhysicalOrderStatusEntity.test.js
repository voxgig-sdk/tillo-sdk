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
(0, node_test_1.describe)('PhysicalOrderStatusEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TILLO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TilloSDK.test();
        const ent = testsdk.PhysicalOrderStatus();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TILLO_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'physical_order_status.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "references", "req": true, "short": "Array of order references to check.", "type": "`$ARRAY`", "index$": 0 }], "name": "physical_order_status", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /physical/order-status", "json": "{\"operationId\":\"postPhysicalOrderStatus\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"multiple_references\":{\"description\":\"Check status for multiple order references\",\"summary\":\"Multiple References\",\"value\":{\"references\":[\"ab337240-e731-11e8-b7dc-8d2baaa618cb\",\"ab3223c0-ed7b-11f0-b734-4fea3167b172\"]}},\"single_reference\":{\"description\":\"Check status for a single order reference\",\"summary\":\"Single Reference\",\"value\":{\"references\":[\"ab337240-e731-11e8-b7dc-8d2baaa618cb\"]}}},\"schema\":{\"properties\":{\"references\":{\"description\":\"Array of order references to check. Each reference should be a UUID from a previous order-card request.\\nReturns status information for each reference, including 'not found' for references that don't exist.\\n\",\"items\":{\"description\":\"Order reference (UUID) to check status for\",\"format\":\"uuid\",\"minLength\":1,\"type\":\"string\"},\"minItems\":1,\"type\":\"array\"}},\"required\":[\"references\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"error_status\":{\"description\":\"Order that encountered an error during processing\",\"summary\":\"Order with Error Status\",\"value\":{\"code\":\"000\",\"data\":{\"error-reference-123\":{\"reference\":\"error-reference-123\",\"status\":\"error\"}},\"message\":\"Order statuses\",\"status\":\"success\"}},\"fulfilled_with_code\":{\"description\":\"Order that has been fulfilled and includes the gift card code\",\"summary\":\"Fulfilled Order with Code\",\"value\":{\"code\":\"000\",\"data\":{\"ab337240-e731-11e8-b7dc-8d2baaa618cb\":{\"code\":\"5045075881749921691\",\"reference\":\"ab337240-e731-11e8-b7dc-8d2baaa618cb\",\"status\":\"fulfilled\"}},\"message\":\"Order statuses\",\"status\":\"success\"}},\"multiple_statuses\":{\"description\":\"Response showing statuses for multiple references including processing and not found\",\"summary\":\"Multiple Order Statuses\",\"value\":{\"code\":\"000\",\"data\":{\"ab337240-e731-11e8-b7dc-8d2baaa618cb\":{\"reference\":\"ab337240-e731-11e8-b7dc-8d2baaa618cb\",\"status\":\"processing\"},\"this-does-not-exist\":{\"reference\":\"this-does-not-exist\",\"status\":\"not found\"}},\"message\":\"Order statuses\",\"status\":\"success\"}},\"not_found\":{\"description\":\"Reference that does not exist or is not accessible\",\"summary\":\"Order Not Found\",\"value\":{\"code\":\"000\",\"data\":{\"this-does-not-exist\":{\"reference\":\"this-does-not-exist\",\"status\":\"not found\"}},\"message\":\"Order statuses\",\"status\":\"success\"}},\"processing_order\":{\"description\":\"Order that is currently being processed\",\"summary\":\"Processing Order\",\"value\":{\"code\":\"000\",\"data\":{\"ab337240-e731-11e8-b7dc-8d2baaa618cb\":{\"reference\":\"ab337240-e731-11e8-b7dc-8d2baaa618cb\",\"status\":\"processing\"},\"this-does-not-exist\":{\"reference\":\"this-does-not-exist\",\"status\":\"not found\"}},\"message\":\"Order statuses\",\"status\":\"success\"}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"additionalProperties\":{\"properties\":{\"code\":{\"description\":\"Gift card code. This will only be present when the order status is `fulfilled` and a code is available.\",\"example\":\"5045075881749921691\",\"type\":\"string\"},\"reference\":{\"description\":\"The order reference UUID\",\"example\":\"ab337240-e731-11e8-b7dc-8d2baaa618cb\",\"type\":\"string\"},\"status\":{\"description\":\"The current status of the order:\\n- `received`: Order has been received and is queued for processing\\n- `processing`: Order is currently being processed\\n- `fulfilled`: Order has been fulfilled\\n- `error`: Order encountered an error during processing\\n- `not found`: Reference does not exist or is not accessible to the authenticated buyer\\n\",\"enum\":[\"received\",\"processing\",\"fulfilled\",\"error\",\"not found\"],\"example\":\"fulfilled\",\"type\":\"string\"}},\"required\":[\"reference\",\"status\"],\"type\":\"object\"},\"description\":\"Object where keys are order reference UUIDs and values are order status objects.\\nEach reference provided in the request will have a corresponding entry in this object.\\n\",\"type\":\"object\"},\"message\":{\"example\":\"Order statuses\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"empty_references\":{\"description\":\"The references array cannot be empty\",\"summary\":\"Invalid or missing parameter\",\"value\":{\"code\":\"433\",\"data\":{\"references\":\"The [references] field is required and must be an array\"},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Validation error code\",\"example\":\"433\",\"type\":\"string\"},\"data\":{\"additionalProperties\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Optional detailed validation errors by field\",\"example\":{\"brand\":[\"The brand field is required.\"],\"faceValue.amount\":[\"The amount must be a positive number.\"]},\"type\":\"object\"},\"message\":{\"description\":\"Error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"},\"502\":{\"description\":\"Bad Gateway.  No response body is returned.\"},\"504\":{\"description\":\"Gateway Timeout.  No response body is returned\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/physical/order-status", "segments": [{ "lit": "physical" }, { "lit": "order-status" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "physical_order_status", "name__orig": "physical_order_status", "Name": "PhysicalOrderStatus", "name_": "physical_order_status", "name-": "physical-order-status", "NAME": "PHYSICAL_ORDER_STATUS", "index$": 11 }, { "active": true, "entity": "physical_order_status", "key$": "BasicPhysicalOrderStatusFlow", "kind": "basic", "name": "BasicPhysicalOrderStatusFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "physical_order_status_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'PhysicalOrderStatus');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const physical_order_status_ref01_ent = client.PhysicalOrderStatus();
        let physical_order_status_ref01_data = setup.data.new.physical_order_status['physical_order_status_ref01'];
        physical_order_status_ref01_data = (await physical_order_status_ref01_ent.create(physical_order_status_ref01_data)).data();
        (0, node_assert_1.default)(null != physical_order_status_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/physical_order_status/PhysicalOrderStatusTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TilloSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['physical_order_status01', 'physical_order_status02', 'physical_order_status03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TILLO_TEST_PHYSICAL_ORDER_STATUS_ENTID': idmap,
        'TILLO_TEST_LIVE': 'FALSE',
        'TILLO_TEST_EXPLAIN': 'FALSE',
        'TILLO_APIKEY': '',
    });
    idmap = env['TILLO_TEST_PHYSICAL_ORDER_STATUS_ENTID'];
    const live = 'TRUE' === env.TILLO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TILLO_TEST_PHYSICAL_ORDER_STATUS_ENTID'];
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
//# sourceMappingURL=PhysicalOrderStatusEntity.test.js.map