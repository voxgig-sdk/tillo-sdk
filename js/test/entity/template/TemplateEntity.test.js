
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { TilloSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('TemplateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.Template()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"last_refreshed_at","req":true,"short":"ISO 8601 timestamp of when the template data was last refreshed","type":"`$STRING`","index$":0},{"active":true,"name":"templates","req":true,"short":"Object mapping brand slugs to their template variants and versions.","type":"`$OBJECT`","index$":1}],"name":"template","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"fixed-async-uk","kind":"query","name":"brand","orig":"brand","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"standard","kind":"query","name":"template","orig":"template","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /templates","json":"{\"operationId\":\"getTemplates\",\"parameters\":[{\"description\":\"Brand identifier/slug. Required if template parameter is provided. If omitted, returns templates for all brands accessible to the partner.\",\"example\":\"fixed-async-uk\",\"in\":\"query\",\"name\":\"brand\",\"required\":false,\"schema\":{\"description\":\"Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.\\n\",\"example\":\"fixed-async-uk\",\"maxLength\":255,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"}},{\"description\":\"Template variant name (e.g., 'standard', 'premium').  If provided, brand parameter is required. Input is case-insensitive and normalized to lowercase.\",\"example\":\"standard\",\"in\":\"query\",\"name\":\"template\",\"required\":false,\"schema\":{\"pattern\":\"^[a-zA-Z0-9_-]+$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"list_all_templates\":{\"description\":\"Response when listing templates for all accessible brands\",\"summary\":\"List all templates\",\"value\":{\"code\":\"000\",\"data\":{\"last_refreshed_at\":\"2025-11-26T09:45:00+00:00\",\"templates\":{\"example-brand-one\":{\"standard\":\"2025-12-31\"},\"example-brand-two\":{\"standard\":\"2024-01-26\",\"winter\":\"2024-02-17\"}}},\"message\":\"Template information\",\"status\":\"success\"}},\"list_template_for_brand\":{\"description\":\"Response when listing a specific template for a specific brand\",\"summary\":\"List specific template for specific brand\",\"value\":{\"code\":\"000\",\"data\":{\"last_refreshed_at\":\"2018-11-26T09:11:17+00:00\",\"templates\":{\"example-brand-three\":{\"standard\":\"2025-12-31\"}}},\"message\":\"Template information for [example-brand-three] with version [standard]\",\"status\":\"success\"}},\"list_templates_for_brand\":{\"description\":\"Response when listing templates for a specific brand\",\"summary\":\"List templates for specific brand\",\"value\":{\"code\":\"000\",\"data\":{\"last_refreshed_at\":\"2023-01-19T08:30:00+00:00\",\"templates\":{\"example-brand-one\":{\"standard\":\"2025-12-31\"}}},\"message\":\"Template information for [example brand one]\",\"status\":\"success\"}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"const\":\"000\",\"maxLength\":3,\"minLength\":3,\"type\":\"string\"},\"data\":{\"properties\":{\"last_refreshed_at\":{\"description\":\"ISO 8601 timestamp of when the template data was last refreshed\",\"example\":\"2024-01-15T10:30:00+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"templates\":{\"additionalProperties\":{\"additionalProperties\":{\"description\":\"Version string for the template variant\",\"example\":\"2024-01-15\",\"type\":\"string\"},\"type\":\"object\"},\"description\":\"Object mapping brand slugs to their template variants and versions. Each brand slug maps to an object where keys are variant names (e.g., 'standard') and values are version strings.\",\"example\":{\"fixed-async-uk\":{\"standard\":\"2024-01-15\"},\"sync-open-code-uk\":{\"premium\":\"2024-02-10\",\"standard\":\"2024-03-20\"}},\"type\":\"object\"}},\"required\":[\"templates\",\"last_refreshed_at\"],\"type\":\"object\"},\"message\":{\"example\":\"Template information\",\"type\":\"string\"},\"status\":{\"const\":\"success\",\"type\":\"string\"}},\"required\":[\"status\",\"code\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successfully retrieved template list\"},\"401\":{\"content\":{\"application/json\":{\"examples\":{\"unauthorized_no_template_access\":{\"description\":\"Error when partner does not have access to HTML email templates for the brand\",\"summary\":\"No template access for brand\",\"value\":{\"code\":\"717\",\"message\":\"Template for brand [amazon-de] is not available for this partner\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"data\":{\"additionalProperties\":true,\"description\":\"Optional additional error details\",\"type\":\"object\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed or insufficient permissions.\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"validation_error_brand_not_found\":{\"description\":\"Error when the specified brand does not exist\",\"summary\":\"Brand not found\",\"value\":{\"code\":\"433\",\"data\":{\"brand\":[\"The requested brand is not available.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"validation_error_brand_required_with_template\":{\"description\":\"Error when template is provided without brand parameter\",\"summary\":\"Brand required when template provided\",\"value\":{\"code\":\"433\",\"data\":{\"brand\":[\"The brand field is required when template is present.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"validation_error_invalid_template_format\":{\"description\":\"Error when template parameter has invalid format\",\"summary\":\"Invalid template format\",\"value\":{\"code\":\"433\",\"data\":{\"template\":[\"The template must only contain lowercase letters, numbers, hyphens, and underscores.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"required\":{\"$ref\":\"#/responses/401/content/application~1json/schema/required\"},\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"},\"502\":{\"description\":\"Bad Gateway. No response body is returned.\"},\"504\":{\"description\":\"Gateway Timeout. No response body is returned.\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/templates","segments":[{"lit":"templates"}],"select":{"exist":["brand","template"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"template","name__orig":"template","Name":"Template","name_":"template","name-":"template","NAME":"TEMPLATE","index$":13}, {"active":true,"entity":"template","key$":"BasicTemplateFlow","kind":"basic","name":"BasicTemplateFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"template_ref01","srcdatavar":"template_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-template_ref01"}}],"index$":0}]}, 'Template')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let template_ref01_data = Object.values(setup.data.existing.template)[0]

    // LOAD
    const template_ref01_ent = client.Template()
    const template_ref01_match_dt0 = {}
    const template_ref01_data_dt0 = (await template_ref01_ent.load(template_ref01_match_dt0)).data()
    assert(null != template_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/template/TemplateTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TilloSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['template01','template02','template03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_TEMPLATE_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_TEMPLATE_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_TEMPLATE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TilloSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.TILLO_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
