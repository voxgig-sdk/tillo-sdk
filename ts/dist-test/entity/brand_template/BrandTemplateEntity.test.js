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
(0, node_test_1.describe)('BrandTemplateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TILLO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TilloSDK.test();
        const ent = testsdk.BrandTemplate();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TILLO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'brand_template.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "brand_template", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "fixed-async-uk", "kind": "query", "name": "brand", "orig": "brand", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "standard", "kind": "query", "name": "template", "orig": "template", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "2024-01-15", "kind": "query", "name": "version", "orig": "version", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /template", "json": "{\"operationId\":\"getTemplate\",\"parameters\":[{\"description\":\"Brand identifier/slug for which to download the template\",\"example\":\"fixed-async-uk\",\"in\":\"query\",\"name\":\"brand\",\"required\":true,\"schema\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"}},{\"description\":\"Template variant name (e.g., 'standard', 'premium').  Defaults to 'standard' if not provided. Input is case-insensitive and normalized to lowercase.\",\"example\":\"standard\",\"in\":\"query\",\"name\":\"template\",\"required\":false,\"schema\":{\"pattern\":\"^[a-zA-Z0-9_-]+$\",\"type\":\"string\"}},{\"description\":\"Specific template version to download. If omitted, downloads the latest version. Version strings are typically date-based (e.g., '2024-01-15') but can be any string.\",\"example\":\"2024-01-15\",\"in\":\"query\",\"name\":\"version\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/zip\":{\"schema\":{\"description\":\"ZIP file containing the email template and associated assets\",\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Template ZIP file download\",\"headers\":{\"Content-Disposition\":{\"description\":\"Indicates the file should be downloaded with the specified filename\",\"example\":\"attachment; filename=\\\"template-standard-2024-01-15.zip\\\"\",\"schema\":{\"pattern\":\"^attachment; filename=\\\".+\\\\.zip\\\"$\",\"type\":\"string\"}},\"Content-Type\":{\"description\":\"MIME type of the response\",\"schema\":{\"const\":\"application/zip\",\"type\":\"string\"}}}},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"template_not_found\":{\"description\":\"Error when the requested template variant or version does not exist\",\"summary\":\"Template not found\",\"value\":{\"code\":\"716\",\"message\":\"The requested template was not found\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad request. Invalid or missing required parameters.\"},\"401\":{\"content\":{\"application/json\":{\"examples\":{\"unauthorized_invalid_brand\":{\"description\":\"Error when the brand is valid but not accessible to the partner\",\"summary\":\"Invalid brand for partner\",\"value\":{\"code\":\"072\",\"message\":\"Brand [amazon-de] is not available for partner [partner-slug]\",\"status\":\"error\"}},\"unauthorized_no_template_access\":{\"description\":\"Error when partner does not have access to HTML email templates for the brand\",\"summary\":\"No template access\",\"value\":{\"code\":\"717\",\"message\":\"Template for brand [example-brand] is not available for this partner\",\"status\":\"error\"}}},\"schema\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"}}},\"description\":\"Authentication failed or insufficient permissions.\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"validation_error_brand_not_found\":{\"description\":\"Error when the specified brand does not exist\",\"summary\":\"Brand not found\",\"value\":{\"code\":\"433\",\"data\":{\"brand\":[\"The requested brand is not available.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"validation_error_brand_required\":{\"description\":\"Error when brand parameter is missing\",\"summary\":\"Brand required\",\"value\":{\"code\":\"433\",\"data\":{\"brand\":[\"The brand field is required.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"validation_error_invalid_template_format\":{\"description\":\"Error when template parameter has invalid format\",\"summary\":\"Invalid template format\",\"value\":{\"code\":\"433\",\"data\":{\"template\":[\"The template must only contain lowercase letters, numbers, hyphens, and underscores.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/400/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"},\"502\":{\"description\":\"Bad Gateway No response body is returned.\\n\"},\"504\":{\"description\":\"Gateway Timeout No response body is returned\\n\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/template", "segments": [{ "lit": "template" }], "select": { "exist": ["brand", "template", "version"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "brand_template", "name__orig": "brand_template", "Name": "BrandTemplate", "name_": "brand_template", "name-": "brand-template", "NAME": "BRAND_TEMPLATE", "index$": 1 }, { "active": true, "entity": "brand_template", "key$": "BasicBrandTemplateFlow", "kind": "basic", "name": "BasicBrandTemplateFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "brand_template_ref01", "srcdatavar": "brand_template_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-brand_template_ref01" } }], "index$": 0 }] }, 'BrandTemplate');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let brand_template_ref01_data = Object.values(setup.data.existing.brand_template)[0];
        // LOAD
        const brand_template_ref01_ent = client.BrandTemplate();
        const brand_template_ref01_match_dt0 = {};
        const brand_template_ref01_data_dt0 = (await brand_template_ref01_ent.load(brand_template_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != brand_template_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/brand_template/BrandTemplateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TilloSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['brand_template01', 'brand_template02', 'brand_template03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TILLO_TEST_BRAND_TEMPLATE_ENTID': idmap,
        'TILLO_TEST_LIVE': 'FALSE',
        'TILLO_TEST_EXPLAIN': 'FALSE',
        'TILLO_APIKEY': '',
    });
    idmap = env['TILLO_TEST_BRAND_TEMPLATE_ENTID'];
    const live = 'TRUE' === env.TILLO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TILLO_TEST_BRAND_TEMPLATE_ENTID'];
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
//# sourceMappingURL=BrandTemplateEntity.test.js.map