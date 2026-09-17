// Typed models for the Tillo SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Brand
 * @property {*} [brands]
 * @property {string} [last_refreshed_at]
 */

/**
 * @typedef {Object} BrandLoadMatch
 * @property {string} [brand]
 * @property {string} [category]
 * @property {string} [country]
 * @property {string} [currency]
 * @property {boolean} [detail]
 */

/**
 * @typedef {Object} BrandTemplate
 */

/**
 * @typedef {Object} BrandTemplateLoadMatch
 * @property {string} brand
 * @property {string} [template]
 * @property {string} [version]
 */

/**
 * @typedef {Object} DigitalGiftCard
 * @property {string} brand
 * @property {string} client_request_id
 * @property {string} [code]
 * @property {Object} [data]
 * @property {Object} face_value
 * @property {string} [message]
 * @property {string} [original_client_request_id]
 * @property {string} [pin]
 * @property {string} [reference]
 * @property {string} sector
 * @property {string} [serial_number]
 * @property {string} [status]
 */

/**
 * @typedef {Object} DigitalGiftCardLoadMatch
 * @property {string} [brand]
 */

/**
 * @typedef {Object} DigitalGiftCardCreateData
 * @property {string} brand
 * @property {string} client_request_id
 * @property {string} [code]
 * @property {Object} [data]
 * @property {Object} face_value
 * @property {string} [message]
 * @property {string} [original_client_request_id]
 * @property {string} [pin]
 * @property {string} [reference]
 * @property {string} sector
 * @property {string} [serial_number]
 * @property {string} [status]
 */

/**
 * @typedef {Object} DigitalIssueDelete
 * @property {string} brand
 * @property {string} client_request_id
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} original_client_request_id
 * @property {string} reference
 * @property {string} sector
 * @property {Array} [tags]
 */

/**
 * @typedef {Object} DigitalIssueDeleteCreateData
 * @property {string} brand
 * @property {string} client_request_id
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} original_client_request_id
 * @property {string} reference
 * @property {string} sector
 * @property {Array} [tags]
 */

/**
 * @typedef {Object} DigitalIssueDeleteRemoveMatch
 * @property {string} [brand]
 * @property {string} [client_request_id]
 * @property {Object} [face_value]
 * @property {Object} [float_balance]
 * @property {string} [original_client_request_id]
 * @property {string} [reference]
 * @property {string} [sector]
 * @property {Array} [tags]
 */

/**
 * @typedef {Object} DigitalIssuePost
 * @property {Object} barcode
 * @property {string} brand
 * @property {string} client_request_id
 * @property {string} [code]
 * @property {Object} cost_value
 * @property {string} delivery_method
 * @property {number} discount
 * @property {string} [expiration_date]
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} fulfilment_by
 * @property {Object} fulfilment_parameters
 * @property {Object} personalisation
 * @property {string} [pin]
 * @property {string} reference
 * @property {string} sector
 * @property {string} [security_code]
 * @property {string} [serial_number]
 * @property {Array} [tags]
 * @property {string} [url]
 */

/**
 * @typedef {Object} DigitalIssuePostCreateData
 * @property {Object} barcode
 * @property {string} brand
 * @property {string} client_request_id
 * @property {string} [code]
 * @property {Object} cost_value
 * @property {string} delivery_method
 * @property {number} discount
 * @property {string} [expiration_date]
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} fulfilment_by
 * @property {Object} fulfilment_parameters
 * @property {Object} personalisation
 * @property {string} [pin]
 * @property {string} reference
 * @property {string} sector
 * @property {string} [security_code]
 * @property {string} [serial_number]
 * @property {Array} [tags]
 * @property {string} [url]
 */

/**
 * @typedef {Object} DigitalOrderCard
 * @property {string} brand
 * @property {string} client_request_id
 * @property {Object} cost_value
 * @property {string} delivery_method
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} fulfilment_by
 * @property {Object} fulfilment_parameters
 * @property {Object} personalisation
 * @property {string} reference
 * @property {string} sector
 * @property {Array} [tags]
 */

/**
 * @typedef {Object} DigitalOrderCardCreateData
 * @property {string} brand
 * @property {string} client_request_id
 * @property {Object} cost_value
 * @property {string} delivery_method
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} fulfilment_by
 * @property {Object} fulfilment_parameters
 * @property {Object} personalisation
 * @property {string} reference
 * @property {string} sector
 * @property {Array} [tags]
 */

/**
 * @typedef {Object} DigitalOrderStatus
 * @property {Object} barcode
 * @property {string} [brand]
 * @property {string} [code]
 * @property {Object} cost_value
 * @property {number} [discount]
 * @property {string} [expiration_date]
 * @property {Object} face_value
 * @property {string} [pin]
 * @property {string} reference
 * @property {string} [security_code]
 * @property {string} [serial_number]
 * @property {string} status
 * @property {string} [url]
 */

/**
 * @typedef {Object} DigitalOrderStatusLoadMatch
 * @property {string} [original_client_request_id]
 * @property {string} [reference]
 */

/**
 * @typedef {Object} DigitalTopUpPost
 * @property {string} brand
 * @property {string} client_request_id
 * @property {string} code
 * @property {Object} cost_value
 * @property {number} discount
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} [pin]
 * @property {string} reference
 * @property {string} sector
 * @property {string} [serial_number]
 * @property {Array} [tags]
 */

/**
 * @typedef {Object} DigitalTopUpPostCreateData
 * @property {string} brand
 * @property {string} client_request_id
 * @property {string} code
 * @property {Object} cost_value
 * @property {number} discount
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} [pin]
 * @property {string} reference
 * @property {string} sector
 * @property {string} [serial_number]
 * @property {Array} [tags]
 */

/**
 * @typedef {Object} Float
 * @property {Object} floats
 * @property {string} last_refreshed_at
 */

/**
 * @typedef {Object} FloatLoadMatch
 * @property {string} [currency]
 */

/**
 * @typedef {Object} FloatListMatch
 * @property {string} [currency]
 * @property {string} [end_date]
 * @property {string} [float]
 * @property {string} [payment_reference]
 * @property {string} [start_date]
 * @property {string} [status]
 */

/**
 * @typedef {Object} FloatCreateData
 * @property {Object} floats
 * @property {string} last_refreshed_at
 */

/**
 * @typedef {Object} PhysicalGiftCard
 * @property {string} brand
 * @property {string} client_request_id
 * @property {string} code
 * @property {Object} cost_value
 * @property {number} discount
 * @property {string} [expiration_date]
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} [fulfilled_at]
 * @property {string} original_client_request_id
 * @property {string} [pin]
 * @property {string} reference
 * @property {string} sector
 * @property {string} [security_code]
 * @property {string} [serial_number]
 * @property {Array} [tags]
 * @property {string} [url]
 */

/**
 * @typedef {Object} PhysicalGiftCardCreateData
 * @property {string} brand
 * @property {string} client_request_id
 * @property {string} code
 * @property {Object} cost_value
 * @property {number} discount
 * @property {string} [expiration_date]
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} [fulfilled_at]
 * @property {string} original_client_request_id
 * @property {string} [pin]
 * @property {string} reference
 * @property {string} sector
 * @property {string} [security_code]
 * @property {string} [serial_number]
 * @property {Array} [tags]
 * @property {string} [url]
 */

/**
 * @typedef {Object} PhysicalGiftCardRemoveMatch
 * @property {string} [brand]
 * @property {string} [client_request_id]
 * @property {string} [code]
 * @property {Object} [cost_value]
 * @property {number} [discount]
 * @property {string} [expiration_date]
 * @property {Object} [face_value]
 * @property {Object} [float_balance]
 * @property {string} [fulfilled_at]
 * @property {string} [original_client_request_id]
 * @property {string} [pin]
 * @property {string} [reference]
 * @property {string} [sector]
 * @property {string} [security_code]
 * @property {string} [serial_number]
 * @property {Array} [tags]
 * @property {string} [url]
 */

/**
 * @typedef {Object} PhysicalOrderCard
 * @property {string} brand
 * @property {string} client_request_id
 * @property {Object} cost_value
 * @property {number} discount
 * @property {string} [expiration_date]
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} fulfilment_by
 * @property {Object} fulfilment_parameters
 * @property {Object} personalisation
 * @property {string} reference
 * @property {string} sector
 * @property {string} shipping_method
 * @property {Array} [tags]
 */

/**
 * @typedef {Object} PhysicalOrderCardCreateData
 * @property {string} brand
 * @property {string} client_request_id
 * @property {Object} cost_value
 * @property {number} discount
 * @property {string} [expiration_date]
 * @property {Object} face_value
 * @property {Object} float_balance
 * @property {string} fulfilment_by
 * @property {Object} fulfilment_parameters
 * @property {Object} personalisation
 * @property {string} reference
 * @property {string} sector
 * @property {string} shipping_method
 * @property {Array} [tags]
 */

/**
 * @typedef {Object} PhysicalOrderStatus
 * @property {Array} references
 */

/**
 * @typedef {Object} PhysicalOrderStatusCreateData
 * @property {Array} references
 */

/**
 * @typedef {Object} Promotion
 * @property {string} last_refreshed_at
 * @property {Object} standard
 */

/**
 * @typedef {Object} PromotionLoadMatch
 * @property {string} [last_refreshed_at]
 * @property {Object} [standard]
 */

/**
 * @typedef {Object} Template
 * @property {string} last_refreshed_at
 * @property {Object} templates
 */

/**
 * @typedef {Object} TemplateLoadMatch
 * @property {string} [brand]
 * @property {string} [template]
 */

