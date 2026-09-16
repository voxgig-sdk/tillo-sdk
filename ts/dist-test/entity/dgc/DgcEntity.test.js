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
(0, node_test_1.describe)('DgcEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TILLO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TilloSDK.test();
        const ent = testsdk.Dgc();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TILLO_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'dgc.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "brand", "req": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "client_request_id", "req": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "delivery_method", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "face_value", "req": true, "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "sector", "req": false, "type": "`$STRING`", "index$": 4 }], "name": "dgc", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /digital/issue", "json": "{\"operationId\":\"issueDigitalGiftCard\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"brand\":{\"type\":\"string\"},\"client_request_id\":{\"type\":\"string\"},\"delivery_method\":{\"type\":\"string\"},\"face_value\":{\"properties\":{\"amount\":{\"type\":\"number\"},\"currency\":{\"type\":\"string\"}},\"type\":\"object\"},\"sector\":{\"type\":\"string\"}},\"required\":[\"client_request_id\",\"brand\",\"face_value\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"brand\":{\"type\":\"string\"},\"client_request_id\":{\"type\":\"string\"},\"code\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The issued gift card order\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/digital/issue", "segments": [{ "lit": "digital" }, { "lit": "issue" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "dgc", "name__orig": "dgc", "Name": "Dgc", "name_": "dgc", "name-": "dgc", "NAME": "DGC", "index$": 1 }, { "active": true, "entity": "dgc", "key$": "BasicDgcFlow", "kind": "basic", "name": "BasicDgcFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "dgc_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Dgc');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const dgc_ref01_ent = client.Dgc();
        let dgc_ref01_data = setup.data.new.dgc['dgc_ref01'];
        dgc_ref01_data = (await dgc_ref01_ent.create(dgc_ref01_data)).data();
        (0, node_assert_1.default)(null != dgc_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/dgc/DgcTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TilloSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['dgc01', 'dgc02', 'dgc03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TILLO_TEST_DGC_ENTID': idmap,
        'TILLO_TEST_LIVE': 'FALSE',
        'TILLO_TEST_EXPLAIN': 'FALSE',
        'TILLO_APIKEY': '',
    });
    idmap = env['TILLO_TEST_DGC_ENTID'];
    const live = 'TRUE' === env.TILLO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TILLO_TEST_DGC_ENTID'];
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
//# sourceMappingURL=DgcEntity.test.js.map