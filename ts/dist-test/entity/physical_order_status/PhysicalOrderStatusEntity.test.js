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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "references": { "a": true, "h": "References", "n": "references", "r": true, "sh": "Array of order references to check.", "t": "`$ARRAY`", "key$": "references", "index$": 0 } }, "name": "physical_order_status", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /physical/order-status", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/physical/order-status", "q": {}, "r": {}, "s": [{ "lit": "physical" }, { "lit": "order-status" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "physical_order_status", "name__orig": "physical_order_status", "Name": "PhysicalOrderStatus", "name_": "physical_order_status", "name-": "physical-order-status", "NAME": "PHYSICAL_ORDER_STATUS", "index$": 11 }, { "active": true, "entity": "physical_order_status", "key$": "BasicPhysicalOrderStatusFlow", "kind": "basic", "name": "BasicPhysicalOrderStatusFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "physical_order_status_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'PhysicalOrderStatus', { "POST /physical/order-status": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["references"], "properties": { "references": { "type": "array", "minItems": 1, "items": { "type": "string", "format": "uuid", "minLength": 1, "description": "Order reference (UUID) to check status for" }, "description": "Array of order references to check. Each reference should be a UUID from a previous order-card request.\nReturns status information for each reference, including 'not found' for references that don't exist.\n", "key$": "references" } }, "x-ref": "#/components/schemas/PhysicalOrderStatusRequest", "index$": 1 }, "examples": { "single_reference": { "summary": "Single Reference", "description": "Check status for a single order reference", "value": { "references": ["ab337240-e731-11e8-b7dc-8d2baaa618cb"] } }, "multiple_references": { "summary": "Multiple References", "description": "Check status for multiple order references", "value": { "references": ["ab337240-e731-11e8-b7dc-8d2baaa618cb", "ab3223c0-ed7b-11f0-b734-4fea3167b172"] } } } } } }, "parameters": [] } });
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