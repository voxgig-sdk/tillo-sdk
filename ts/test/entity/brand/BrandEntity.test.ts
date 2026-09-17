

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TilloSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('BrandEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TILLO_TEST_LIVE=TRUE.
  afterEach(liveDelay('TILLO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TilloSDK.test()
    const ent = testsdk.Brand()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TILLO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'brand.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"brands","req":false,"type":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"index$":0},{"active":true,"format":"date-time","name":"last_refreshed_at","req":false,"type":"`$STRING`","index$":1}],"name":"brand","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"mock-brand","kind":"query","name":"brand","orig":"brand","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"food-and-drink","kind":"query","name":"category","orig":"category","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"GB","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"GBP","kind":"query","name":"currency","orig":"currency","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"example":true,"kind":"query","name":"detail","orig":"detail","reqd":false,"type":"`$BOOLEAN`","index$":4}]},"contract":{"id":"GET /brands","json":"{\"operationId\":\"getBrands\",\"parameters\":[{\"description\":\"Filter by a specific brand slug\",\"example\":\"mock-brand\",\"in\":\"query\",\"name\":\"brand\",\"required\":false,\"schema\":{\"maxLength\":100,\"minLength\":1,\"pattern\":\"^[a-z0-9-]+$\",\"type\":\"string\"}},{\"description\":\"Include detailed brand information\",\"example\":true,\"in\":\"query\",\"name\":\"detail\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Filter brands based on the country, provide the two-character ISO 3166-1 alpha-2 country code (eg. GB, FR, US). Must be uppercase\",\"example\":\"GB\",\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"maxLength\":2,\"minLength\":2,\"pattern\":\"^[A-Z]{2}$\",\"type\":\"string\"}},{\"description\":\"Filter brands based on the currency, please provide the three-character ISO 4217 currency code (eg. GBP, EUR, USD). Must be uppercase\",\"example\":\"GBP\",\"in\":\"query\",\"name\":\"currency\",\"required\":false,\"schema\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},{\"description\":\"Filter brands based on the category slug (eg. fashion, gaming)\",\"example\":\"food-and-drink\",\"in\":\"query\",\"name\":\"category\",\"required\":false,\"schema\":{\"enum\":[\"baby\",\"beauty\",\"books\",\"cars\",\"charity\",\"craft\",\"cryptocurrency\",\"cycling\",\"department-store\",\"electronics\",\"fashion\",\"food-and-drink\",\"gaming\",\"home\",\"jewellery\",\"music\",\"other\",\"school-vouchers\",\"sports\",\"supermarket\",\"toys\",\"travel-and-leisure\",\"tv-and-movies\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"all_brands_with_detail\":{\"description\":\"Get detailed information for all available brands\",\"summary\":\"All Brands with Detail\",\"value\":{\"code\":\"000\",\"data\":{\"brands\":{\"example-brand-one\":{\"async_only\":true,\"categories\":[\"toys\"],\"countries_served\":[\"FR\",\"DE\",\"ES\"],\"currency\":\"EUR\",\"delivery_methods\":[\"code\",\"url\"],\"detail\":{\"assets\":{\"gift_card_url\":\"https://assets.example.com/brand-one-card.jpg\",\"logo_url\":\"https://assets.example.com/brand-one-logo.jpg\"},\"barcode\":\"NONE\",\"description\":\"Brand one description\",\"expiry\":\"Expiry information\",\"redemption_methods\":[\"Online\"],\"website_url\":\"https://example.com\"},\"digital_face_value_limits\":{\"lower\":10,\"minor_unit\":0.01,\"upper\":2000},\"discount\":3,\"gc_pool\":false,\"last_updated\":\"2024-01-15T10:30:00+00:00\",\"name\":\"Example Brand One\",\"slug\":\"example-brand-one\",\"status\":{\"code\":\"ENABLED\"},\"transaction_types\":[\"cancelled_digital_issuance\",\"digital_issuance\"],\"type\":\"gift-card\"},\"example-brand-three\":{\"async_only\":false,\"categories\":[\"department-store\"],\"choices\":[\"example-choice-brand-one\",\"example-choice-brand-two\",\"example-choice-brand-three\"],\"countries_served\":[\"GB\"],\"currency\":\"GBP\",\"delivery_methods\":[\"url\"],\"detail\":{\"assets\":{\"gift_card_url\":\"https://assets.example.com/brand-three-card.jpg\",\"logo_url\":\"https://assets.example.com/brand-three-logo.jpg\"},\"barcode\":\"C128\",\"description\":\"Brand three description\",\"expiry\":\"24 consecutive months of non use\",\"redemption_methods\":[\"Instore\"],\"website_url\":\"https://example.com\"},\"digital_face_value_limits\":{\"lower\":50,\"minor_unit\":0.01,\"upper\":250},\"discount\":2,\"gc_pool\":false,\"last_updated\":\"2024-01-15T10:30:00+00:00\",\"name\":\"Example Brand Three\",\"slug\":\"example-brand-three\",\"status\":{\"code\":\"DISABLED\",\"reason\":\"Relationship disabled by brand\"},\"transaction_types\":[\"cancelled_digital_issuance\",\"digital_issuance\"],\"type\":\"choice-link\"},\"example-brand-two\":{\"async_only\":false,\"categories\":[\"fashion\"],\"countries_served\":[\"GB\"],\"currency\":\"GBP\",\"delivery_methods\":[\"code\",\"url\"],\"denominations\":[\"10.00\",\"20.00\",\"25.00\",\"50.00\",\"100.00\"],\"detail\":{\"assets\":{\"gift_card_url\":\"https://assets.example.com/brand-two-card.jpg\",\"logo_url\":\"https://assets.example.com/brand-two-logo.jpg\"},\"barcode\":\"C128\",\"description\":\"Brand two description\",\"expiry\":\"24 months from date of activation\",\"redemption_methods\":[\"Online\"],\"website_url\":\"https://example.com\"},\"digital_denominations\":[10,20,25,50,100],\"discount\":6,\"gc_pool\":true,\"last_updated\":\"2024-01-15T10:30:00+00:00\",\"name\":\"Example Brand Two\",\"slug\":\"example-brand-two\",\"status\":{\"code\":\"ENABLED\"},\"transaction_types\":[\"cancelled_digital_issuance\",\"digital_issuance\"],\"type\":\"gift-card\"}},\"last_refreshed_at\":\"2024-01-15T10:30:00+00:00\"},\"message\":\"Brands information with details\",\"status\":\"success\"}},\"brand_with_detail\":{\"description\":\"Get detailed information for a specific brand\",\"summary\":\"Single Brand with Detail\",\"value\":{\"code\":\"000\",\"data\":{\"brands\":{\"example-brand\":{\"async_only\":false,\"categories\":[\"beauty\",\"sports\"],\"countries_served\":[\"GB\"],\"currency\":\"GBP\",\"delivery_methods\":[\"code\",\"url\",\"wrapped\"],\"detail\":{\"assets\":{\"gift_card_url\":\"https://assets.example.com/card.jpg\",\"logo_url\":\"https://assets.example.com/logo.jpg\"},\"balance_enquiry_url\":\"https://example.com/balance\",\"barcode\":\"C128\",\"description\":\"Brand description and information\",\"expiry\":\"Expiry date information\",\"faq_url\":\"https://example.com/faq\",\"redemption_instructions_url\":\"https://example.com/redeem\",\"redemption_methods\":[\"Online\",\"Instore\"],\"terms_and_conditions_url\":\"https://example.com/terms\",\"website_url\":\"https://example.com\"},\"digital_face_value_limits\":{\"lower\":10,\"minor_unit\":0.01,\"upper\":2000},\"discount\":2.5,\"gc_pool\":false,\"last_updated\":\"2024-01-15T10:30:00+00:00\",\"name\":\"Example Brand\",\"physical_face_value_limits\":{\"lower\":5,\"upper\":500},\"shipping_methods\":[{\"standard\":{\"cost\":{\"amount\":1.3,\"currency\":\"GBP\"},\"description\":\"First Class\",\"identifier\":\"standard\"}},{\"standard-signed\":{\"cost\":{\"amount\":2.42,\"currency\":\"GBP\"},\"description\":\"First Class Signed For\",\"identifier\":\"standard-signed\"}}],\"slug\":\"example-brand\",\"status\":{\"code\":\"ENABLED\"},\"transaction_types\":[\"cancelled_digital_issuance\",\"digital_issuance\",\"physical_activation\",\"physical_top_up\",\"balance_check\"],\"type\":\"gift-card\",\"vat\":{\"exempt\":false,\"rate\":\"5.00\",\"type\":\"MPV\"}}},\"last_refreshed_at\":\"2024-01-15T10:30:00+00:00\"},\"message\":\"Brand information for [example-brand] with details\",\"status\":\"success\"}},\"brands_filtered_by_category\":{\"description\":\"Get brands filtered by country and category\",\"summary\":\"Brands Filtered by Category\",\"value\":{\"code\":\"000\",\"data\":{\"brands\":{\"example-brand-one\":{\"async_only\":true,\"categories\":[\"fashion\",\"other\"],\"countries_served\":[\"GB\"],\"currency\":\"GBP\",\"delivery_methods\":[\"code\",\"url\"],\"digital_face_value_limits\":{\"lower\":10,\"minor_unit\":0.01,\"upper\":2000},\"discount\":3,\"gc_pool\":false,\"last_updated\":\"2024-01-15T10:30:00+00:00\",\"name\":\"Example Brand One\",\"slug\":\"example-brand-one\",\"status\":{\"code\":\"ENABLED\"},\"transaction_types\":[\"cancelled_digital_issuance\",\"digital_issuance\"],\"type\":\"gift-card\"},\"example-brand-two\":{\"async_only\":false,\"categories\":[\"fashion\"],\"countries_served\":[\"GB\"],\"currency\":\"GBP\",\"delivery_methods\":[\"code\",\"url\"],\"denominations\":[\"10.00\",\"20.00\",\"25.00\",\"50.00\"],\"digital_denominations\":[10,20,25,50,100],\"discount\":6,\"gc_pool\":true,\"last_updated\":\"2024-01-15T10:30:00+00:00\",\"name\":\"Example Brand Two\",\"slug\":\"example-brand-two\",\"status\":{\"code\":\"ENABLED\"},\"transaction_types\":[\"cancelled_digital_issuance\",\"digital_issuance\"],\"type\":\"gift-card\"}},\"last_refreshed_at\":\"2024-01-15T10:30:00+00:00\"},\"message\":\"Brands information, filtered by category [fashion]\",\"status\":\"success\"}},\"brands_without_detail\":{\"description\":\"Get basic information for all brands without detailed info\",\"summary\":\"Brands Without Detail\",\"value\":{\"code\":\"000\",\"data\":{\"brands\":{\"example-brand-one\":{\"async_only\":false,\"categories\":[\"home\",\"gaming\"],\"countries_served\":[\"US\"],\"currency\":\"USD\",\"delivery_methods\":[\"code\",\"url\",\"wrapped\"],\"digital_face_value_limits\":{\"lower\":10,\"minor_unit\":0.01,\"upper\":2000},\"discount\":3,\"gc_pool\":false,\"last_updated\":\"2024-01-15T10:30:00+00:00\",\"name\":\"Example Brand One\",\"slug\":\"example-brand-one\",\"status\":{\"code\":\"ENABLED\"},\"transaction_types\":[\"cancelled_digital_issuance\",\"digital_issuance\"],\"type\":\"gift-card\"},\"example-brand-two\":{\"async_only\":false,\"categories\":[\"beauty\",\"fashion\"],\"countries_served\":[\"AU\"],\"currency\":\"AUD\",\"delivery_methods\":[\"code\",\"url\"],\"denominations\":[\"9.99\",\"19.99\",\"49.99\"],\"digital_denominations\":[9.99,19.99,49.99],\"discount\":6,\"gc_pool\":true,\"last_updated\":\"2024-01-15T10:30:00+00:00\",\"name\":\"Example Brand Two\",\"slug\":\"example-brand-two\",\"status\":{\"code\":\"ENABLED\"},\"transaction_types\":[\"cancelled_digital_issuance\",\"digital_issuance\"],\"type\":\"gift-card\"}},\"last_refreshed_at\":\"2024-01-15T10:30:00+00:00\"},\"message\":\"Brands information\",\"status\":\"success\"}}},\"schema\":{\"properties\":{\"code\":{\"type\":\"string\"},\"data\":{\"properties\":{\"brands\":{\"oneOf\":[{\"additionalProperties\":{\"additionalProperties\":false,\"properties\":{\"async_only\":{\"type\":\"boolean\"},\"categories\":{\"items\":{\"enum\":[\"baby\",\"beauty\",\"books\",\"cars\",\"charity\",\"craft\",\"cryptocurrency\",\"cycling\",\"department-store\",\"electronics\",\"fashion\",\"food-and-drink\",\"gaming\",\"home\",\"jewellery\",\"music\",\"other\",\"school-vouchers\",\"sports\",\"supermarket\",\"toys\",\"travel-and-leisure\",\"tv-and-movies\"],\"type\":\"string\"},\"type\":\"array\"},\"choices\":{\"items\":{\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"type\":\"array\"},\"countries_served\":{\"items\":{\"maxLength\":2,\"minLength\":2,\"pattern\":\"^[A-Z]{2}$\",\"type\":\"string\"},\"type\":\"array\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"},\"delivery_methods\":{\"items\":{\"enum\":[\"code\",\"url\",\"email\",\"wrapped\"],\"minLength\":3,\"type\":\"string\"},\"type\":\"array\"},\"denominations\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"detail\":{\"additionalProperties\":false,\"properties\":{\"assets\":{\"properties\":{\"gift_card_url\":{\"format\":\"uri\",\"type\":\"string\"},\"logo_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"logo_url\",\"gift_card_url\"],\"type\":\"object\"},\"balance_enquiry_url\":{\"format\":\"uri\",\"type\":\"string\"},\"barcode\":{\"enum\":[\"C128\",\"C128A\",\"C39\",\"I25\",\"QRCODE\",\"PDF417\",\"NONE\"],\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"digital_activation_limit\":{\"type\":\"string\"},\"digital_cancellation_window\":{\"type\":\"string\"},\"digital_general_restrictions\":{\"type\":\"string\"},\"expiry\":{\"type\":\"string\"},\"faq_url\":{\"format\":\"uri\",\"type\":\"string\"},\"instore_order_restrictions\":{\"type\":\"string\"},\"online_order_restrictions\":{\"type\":\"string\"},\"physical_activation_limit\":{\"type\":\"string\"},\"physical_cancellation_window\":{\"type\":\"string\"},\"physical_general_restrictions\":{\"type\":\"string\"},\"redemption_instructions_url\":{\"format\":\"uri\",\"type\":\"string\"},\"redemption_methods\":{\"items\":{\"enum\":[\"Code\",\"Instore\",\"Online\",\"Phone\"],\"type\":\"string\"},\"type\":\"array\"},\"terms_and_conditions_copy\":{\"type\":\"string\"},\"terms_and_conditions_url\":{\"format\":\"uri\",\"type\":\"string\"},\"website_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"assets\",\"barcode\",\"redemption_methods\"],\"type\":\"object\"},\"digital_denominations\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"digital_face_value_limits\":{\"additionalProperties\":false,\"properties\":{\"lower\":{\"type\":\"number\"},\"minor_unit\":{\"type\":\"number\"},\"upper\":{\"type\":\"number\"}},\"type\":\"object\"},\"discount\":{\"format\":\"float\",\"type\":\"number\"},\"gc_pool\":{\"type\":\"boolean\"},\"last_updated\":{\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"physical_face_value_limits\":{\"additionalProperties\":false,\"properties\":{\"lower\":{\"type\":\"number\"},\"upper\":{\"type\":\"number\"}},\"type\":\"object\"},\"shipping_methods\":{\"items\":{\"additionalProperties\":{\"additionalProperties\":false,\"properties\":{\"cost\":{\"properties\":{\"amount\":{\"description\":\"Monetary amount\",\"format\":\"float\",\"minimum\":0.01,\"type\":\"number\"},\"currency\":{\"enum\":[\"AED\",\"AUD\",\"BHD\",\"BRL\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HUF\",\"INR\",\"JPY\",\"KWD\",\"MXN\",\"NOK\",\"NZD\",\"OMR\",\"PLN\",\"QAR\",\"RON\",\"SAR\",\"SEK\",\"USD\"],\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},\"required\":[\"currency\",\"amount\"],\"type\":\"object\"},\"description\":{\"enum\":[\"First Class\",\"First Class Signed For\",\"First Class Tracked\",\"Second Class\",\"Second Class Signed For\"],\"type\":\"string\"},\"identifier\":{\"enum\":[\"standard\",\"standard-signed\",\"standard-tracked\",\"second-class\",\"second-class-signed\"],\"type\":\"string\"}},\"required\":[\"identifier\",\"description\",\"cost\"],\"type\":\"object\"},\"maxProperties\":1,\"minProperties\":1,\"type\":\"object\"},\"type\":\"array\"},\"slug\":{\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"status\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"enum\":[\"ENABLED\",\"PAUSED\",\"DISABLED\"],\"type\":\"string\"},\"reason\":{\"type\":\"string\"}},\"required\":[\"code\"],\"type\":\"object\"},\"transaction_types\":{\"items\":{\"enum\":[\"balance_check\",\"cancelled_digital_issuance\",\"cancelled_physical_activation\",\"cancelled_physical_top_up\",\"digital_cash_out\",\"digital_issuance\",\"digital_top_up\",\"physical_activation\",\"physical_cash_out\",\"physical_top_up\"],\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"type\":\"array\"},\"type\":{\"enum\":[\"gift-card\",\"choice-link\"],\"type\":\"string\"},\"vat\":{\"additionalProperties\":false,\"properties\":{\"exempt\":{\"type\":\"boolean\"},\"rate\":{\"type\":\"string\"},\"type\":{\"enum\":[\"MPV\",\"SPV\"],\"type\":\"string\"}},\"required\":[\"exempt\",\"type\"],\"type\":\"object\"}},\"required\":[\"slug\",\"name\",\"type\",\"status\",\"currency\",\"discount\",\"last_updated\",\"transaction_types\",\"delivery_methods\",\"countries_served\",\"gc_pool\",\"async_only\",\"categories\"],\"type\":\"object\"},\"type\":\"object\"},{\"items\":{\"additionalProperties\":false,\"properties\":{\"async_only\":{\"type\":\"boolean\"},\"categories\":{\"items\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/categories/items\"},\"type\":\"array\"},\"choices\":{\"items\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/choices/items\"},\"type\":\"array\"},\"countries_served\":{\"items\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/countries_served/items\"},\"type\":\"array\"},\"currency\":{\"enum\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/currency/enum\"},\"maxLength\":3,\"minLength\":3,\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"},\"delivery_methods\":{\"items\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/delivery_methods/items\"},\"type\":\"array\"},\"denominations\":{\"items\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/denominations/items\"},\"type\":\"array\"},\"detail\":{\"additionalProperties\":false,\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/detail/properties\"},\"required\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/detail/required\"},\"type\":\"object\"},\"digital_denominations\":{\"items\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/digital_denominations/items\"},\"type\":\"array\"},\"digital_face_value_limits\":{\"additionalProperties\":false,\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/digital_face_value_limits/properties\"},\"type\":\"object\"},\"discount\":{\"format\":\"float\",\"type\":\"number\"},\"gc_pool\":{\"type\":\"boolean\"},\"last_updated\":{\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"physical_face_value_limits\":{\"additionalProperties\":false,\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/physical_face_value_limits/properties\"},\"type\":\"object\"},\"shipping_methods\":{\"items\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/shipping_methods/items\"},\"type\":\"array\"},\"slug\":{\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"status\":{\"additionalProperties\":false,\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/status/properties\"},\"required\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/status/required\"},\"type\":\"object\"},\"transaction_types\":{\"items\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/transaction_types/items\"},\"type\":\"array\"},\"type\":{\"enum\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/type/enum\"},\"type\":\"string\"},\"vat\":{\"additionalProperties\":false,\"properties\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/vat/properties\"},\"required\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/data/properties/brands/oneOf/0/additionalProperties/properties/vat/required\"},\"type\":\"object\"}},\"required\":[\"slug\",\"name\",\"type\",\"status\",\"currency\",\"discount\",\"last_updated\",\"transaction_types\",\"delivery_methods\",\"countries_served\",\"gc_pool\",\"async_only\",\"categories\"],\"type\":\"object\"},\"maxItems\":0,\"type\":\"array\"}]},\"last_refreshed_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"message\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\",\"data\"],\"type\":\"object\"}}},\"description\":\"List of brands with optional filtering and detail\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Internal error code (3-digit string)\",\"example\":\"434\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Authentication failed\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Authentication failed. Invalid API key, signature, or timestamp.\"},\"422\":{\"content\":{\"application/json\":{\"examples\":{\"invalid_brand\":{\"summary\":\"Invalid Brand slug\",\"value\":{\"code\":\"433\",\"data\":{\"brand\":[\"The requested brand is not available.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}},\"invalid_currency\":{\"summary\":\"Invalid Currency\",\"value\":{\"code\":\"433\",\"data\":{\"currency\":[\"The requested currency is not available.\"]},\"message\":\"There were errors validating the request\",\"status\":\"error\"}}},\"schema\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Validation error code\",\"example\":\"433\",\"type\":\"string\"},\"data\":{\"additionalProperties\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Optional detailed validation errors by field\",\"example\":{\"brand\":[\"The brand field is required.\"],\"faceValue.amount\":[\"The amount must be a positive number.\"]},\"type\":\"object\"},\"message\":{\"description\":\"Error message\",\"example\":\"There were errors validating the request\",\"type\":\"string\"},\"status\":{\"const\":\"error\",\"description\":\"Status of the response\",\"type\":\"string\"}},\"required\":[\"code\",\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Validation error. Request data failed validation rules.\"}}},\"description\":\"Unprocessable Entity\"}},\"security\":[{\"APIKey\":[],\"HMACSignature\":[],\"Timestamp\":[]}],\"securitySchemes\":{\"APIKey\":{\"description\":\"Your API key\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"},\"HMACSignature\":{\"description\":\"HMAC-SHA256 signature of the request\",\"in\":\"header\",\"name\":\"Signature\",\"type\":\"apiKey\"},\"Timestamp\":{\"description\":\"Unix timestamp in milliseconds\",\"in\":\"header\",\"name\":\"Timestamp\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/brands","segments":[{"lit":"brands"}],"select":{"exist":["brand","category","country","currency","detail"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"brand","name__orig":"brand","Name":"Brand","name_":"brand","name-":"brand","NAME":"BRAND","index$":0}, {"active":true,"entity":"brand","key$":"BasicBrandFlow","kind":"basic","name":"BasicBrandFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"brand_ref01","srcdatavar":"brand_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-brand_ref01"}}],"index$":0}]}, 'Brand')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let brand_ref01_data = Object.values(setup.data.existing.brand)[0] as any

    // LOAD
    const brand_ref01_ent = client.Brand()
    const brand_ref01_match_dt0: any = {}
    const brand_ref01_data_dt0 = (await brand_ref01_ent.load(brand_ref01_match_dt0)).data()
    assert(null != brand_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/brand/BrandTestData.json')

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
    ['brand01','brand02','brand03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TILLO_TEST_BRAND_ENTID': idmap,
    'TILLO_TEST_LIVE': 'FALSE',
    'TILLO_TEST_EXPLAIN': 'FALSE',
    'TILLO_APIKEY': '',
  })

  idmap = env['TILLO_TEST_BRAND_ENTID']

  const live = 'TRUE' === env.TILLO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TILLO_TEST_BRAND_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
