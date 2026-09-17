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
(0, node_test_1.describe)('TemplateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TILLO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TilloSDK.test();
        const ent = testsdk.Template();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TILLO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'template.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "last_refreshed_at", "req": true, "short": "ISO 8601 timestamp of when the template data was last refreshed", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "templates", "req": true, "short": "Object mapping brand slugs to their template variants and versions.", "type": "`$OBJECT`", "index$": 1 }], "name": "template", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "fixed-async-uk", "kind": "query", "name": "brand", "orig": "brand", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "standard", "kind": "query", "name": "template", "orig": "template", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /templates", "json": "{\"operationId\":\"getTemplates\",\"parameters\":[{\"description\":\"Brand identifier/slug. Required if template parameter is provided. If omitted, returns templates for all brands accessible to the partner.\",\"example\":\"fixed-async-uk\",\"in\":\"query\",\"name\":\"brand\",\"required\":false,\"schema\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"}},{\"description\":\"Template variant name (e.g., 'standard', 'premium').  If provided, brand parameter is required. Input is case-insensitive and normalized to lowercase.\",\"example\":\"standard\",\"in\":\"query\",\"name\":\"template\",\"required\":false,\"schema\":{\"pattern\":\"^[a-zA-Z0-9_-]+$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"list_all_templates\":{\"description\":\"Response when listing templates for all accessible brands\",\"summary\":\"List all templates\",\"value\":{\"code\":\"000\",\"data\":{\"last_refreshed_at\":\"2025-11-26T09:45:00+00:00\",\"templates\":{\"example-brand-one\":{\"standard\":\"2025-12-31\"},\"example-brand-two\":{\"standard\":\"2024-01-26\",\"winter\":\"2024-02-17\"}}},\"message\":\"Template information\",\"status\":\"success\"}},\"list_template_for_brand\":{\"description\":\"Response when listing a specific template for a specific brand\",\"summary\":\"List specific template for specific brand\",\"value\":{\"code\":\"000\",\"data\":{\"last_refreshed_at\":\"2018-11-26T09:11:17+00:00\",\"templates\":{\"example-brand-three\":{\"standard\":\"2025-12-31\"}}},\"message\":\"Template information for [example-brand-three] with version [standard]\",\"status\":\"success\"}},\"list_templates_for_brand\":{\"description\":\"Response when listing templates for a specific brand\",\"summary\":\"List templates for specific brand\",\"value\":{\"code\":\"000\",\"data\":{\"last_refreshed_at\":\"2023-01-19T08:30:00+00:00\",\"templates\":{\"example-brand-one\":{\"standard\":\"2025-12-31\"}}},\"message\":\"Template information for [example brand one]\",\"status\":\"success\"}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"properties\":{\"last_refreshed_at\":{\"description\":\"ISO 8601 timestamp of when the template data was last refreshed\",\"example\":\"2024-01-15T10:30:00+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"templates\":{\"additionalProperties\":{\"additionalProperties\":{\"description\":\"Version string for the template variant\",\"example\":\"2024-01-15\",\"type\":\"string\"},\"type\":\"object\"},\"description\":\"Object mapping brand slugs to their template variants and versions. Each brand slug maps to an object where keys are variant names (e.g., 'standard') and values are version strings.\",\"example\":{\"fixed-async-uk\":{\"standard\":\"2024-01-15\"},\"sync-open-code-uk\":{\"premium\":\"2024-02-10\",\"standard\":\"2024-03-20\"}},\"type\":\"object\"}},\"required\":[\"templates\",\"last_refreshed_at\"],\"type\":\"object\"},\"message\":{\"example\":\"Template information\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successfully retrieved template list\"},\"401\":{\"content\":{\"application/json\":{\"examples\":{\"unauthorized_no_template_access\":{\"description\":\"Error when partner does not have access to HTML email templates for the brand\",\"summary\":\"No template access for brand\",\"value\":{\"code\":\"717\",\"message\":\"Template for brand [amazon-de] is not available for this partner\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed or insufficient permissions.\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"validation_error_brand_not_found\":{\"description\":\"Error when the specified brand does not exist\",\"summary\":\"Brand not found\",\"value\":{\"code\":\"433\",\"data\":{\"brand\":[\"The requested brand is not available.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"validation_error_brand_required_with_template\":{\"description\":\"Error when template is provided without brand parameter\",\"summary\":\"Brand required when template provided\",\"value\":{\"code\":\"433\",\"data\":{\"brand\":[\"The brand field is required when template is present.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"validation_error_invalid_template_format\":{\"description\":\"Error when template parameter has invalid format\",\"summary\":\"Invalid template format\",\"value\":{\"code\":\"433\",\"data\":{\"template\":[\"The template must only contain lowercase letters, numbers, hyphens, and underscores.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/401/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"},\"502\":{\"description\":\"Bad Gateway. No response body is returned.\"},\"504\":{\"description\":\"Gateway Timeout. No response body is returned.\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/templates", "segments": [{ "lit": "templates" }], "select": { "exist": ["brand", "template"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "template", "name__orig": "template", "Name": "Template", "name_": "template", "name-": "template", "NAME": "TEMPLATE", "index$": 13 }, { "active": true, "entity": "template", "key$": "BasicTemplateFlow", "kind": "basic", "name": "BasicTemplateFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "template_ref01", "srcdatavar": "template_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-template_ref01" } }], "index$": 0 }] }, 'Template');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let template_ref01_data = Object.values(setup.data.existing.template)[0];
        // LOAD
        const template_ref01_ent = client.Template();
        const template_ref01_match_dt0 = {};
        const template_ref01_data_dt0 = (await template_ref01_ent.load(template_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != template_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/template/TemplateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TilloSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['template01', 'template02', 'template03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TILLO_TEST_TEMPLATE_ENTID': idmap,
        'TILLO_TEST_LIVE': 'FALSE',
        'TILLO_TEST_EXPLAIN': 'FALSE',
        'TILLO_APIKEY': '',
    });
    idmap = env['TILLO_TEST_TEMPLATE_ENTID'];
    const live = 'TRUE' === env.TILLO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TILLO_TEST_TEMPLATE_ENTID'];
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
//# sourceMappingURL=TemplateEntity.test.js.map