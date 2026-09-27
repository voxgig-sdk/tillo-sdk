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
(0, node_test_1.describe)('BrandEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TILLO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TilloSDK.test();
        const ent = testsdk.Brand();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TILLO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'brand.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "brands": { "a": true, "h": "Brands", "n": "brands", "r": false, "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "brands", "index$": 0 }, "last_refreshed_at": { "a": true, "fo": "date-time", "h": "Last Refreshed At", "n": "last_refreshed_at", "r": false, "t": "`$STRING`", "key$": "last_refreshed_at", "index$": 1 } }, "name": "brand", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /brands", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "mock-brand", "k": "query", "n": "brand", "or": "brand", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "food-and-drink", "k": "query", "n": "category", "or": "category", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "GB", "k": "query", "n": "country", "or": "country", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "GBP", "k": "query", "n": "currency", "or": "currency", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": true, "k": "query", "n": "detail", "or": "detail", "r": false, "t": "`$BOOLEAN`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/brands", "q": { "exist": ["brand", "category", "country", "currency", "detail"] }, "r": {}, "s": [{ "lit": "brands" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "brand", "name__orig": "brand", "Name": "Brand", "name_": "brand", "name-": "brand", "NAME": "BRAND", "index$": 0 }, { "active": true, "entity": "brand", "key$": "BasicBrandFlow", "kind": "basic", "name": "BasicBrandFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "brand_ref01", "srcdatavar": "brand_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-brand_ref01" } }], "index$": 0 }] }, 'Brand', { "GET /brands": { "protocol": "http", "parameters": [{ "name": "brand", "in": "query", "required": false, "description": "Filter by a specific brand slug", "example": "mock-brand", "schema": { "type": "string", "minLength": 1, "maxLength": 100, "pattern": "^[a-z0-9-]+$" }, "index$": 0 }, { "name": "detail", "in": "query", "required": false, "description": "Include detailed brand information", "example": true, "schema": { "type": "boolean" }, "index$": 1 }, { "name": "country", "in": "query", "required": false, "description": "Filter brands based on the country, provide the two-character ISO 3166-1 alpha-2 country code (eg. GB, FR, US). Must be uppercase", "example": "GB", "schema": { "type": "string", "minLength": 2, "maxLength": 2, "pattern": "^[A-Z]{2}$", "x-ref": "#/components/schemas/CountryIsoCode" }, "index$": 2 }, { "name": "currency", "in": "query", "required": false, "description": "Filter brands based on the currency, please provide the three-character ISO 4217 currency code (eg. GBP, EUR, USD). Must be uppercase", "example": "GBP", "schema": { "type": "string", "minLength": 3, "maxLength": 3, "pattern": "^[A-Z]{3}$", "enum": ["AED", "AUD", "BHD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HUF", "INR", "JPY", "KWD", "MXN", "NOK", "NZD", "OMR", "PLN", "QAR", "RON", "SAR", "SEK", "USD"], "x-ref": "#/components/schemas/CurrencyIsoCode" }, "index$": 3 }, { "name": "category", "in": "query", "required": false, "description": "Filter brands based on the category slug (eg. fashion, gaming)", "example": "food-and-drink", "schema": { "type": "string", "enum": ["baby", "beauty", "books", "cars", "charity", "craft", "cryptocurrency", "cycling", "department-store", "electronics", "fashion", "food-and-drink", "gaming", "home", "jewellery", "music", "other", "school-vouchers", "sports", "supermarket", "toys", "travel-and-leisure", "tv-and-movies"], "x-ref": "#/components/schemas/CategorySlug" }, "index$": 4 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let brand_ref01_data = Object.values(setup.data.existing.brand)[0];
        // LOAD
        const brand_ref01_ent = client.Brand();
        const brand_ref01_match_dt0 = {};
        const brand_ref01_data_dt0 = (await brand_ref01_ent.load(brand_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != brand_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/brand/BrandTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TilloSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['brand01', 'brand02', 'brand03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TILLO_TEST_BRAND_ENTID': idmap,
        'TILLO_TEST_LIVE': 'FALSE',
        'TILLO_TEST_EXPLAIN': 'FALSE',
        'TILLO_APIKEY': '',
    });
    idmap = env['TILLO_TEST_BRAND_ENTID'];
    const live = 'TRUE' === env.TILLO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TILLO_TEST_BRAND_ENTID'];
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
//# sourceMappingURL=BrandEntity.test.js.map