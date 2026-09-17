-- Typed models for the Tillo SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Brand
---@field brands? any
---@field last_refreshed_at? string

---@class BrandLoadMatch
---@field brand? string
---@field category? string
---@field country? string
---@field currency? string
---@field detail? boolean

---@class BrandTemplate

---@class BrandTemplateLoadMatch
---@field brand string
---@field template? string
---@field version? string

---@class DigitalGiftCard
---@field brand string
---@field client_request_id string
---@field code? string
---@field data? table
---@field face_value table
---@field message? string
---@field original_client_request_id? string
---@field pin? string
---@field reference? string
---@field sector string
---@field serial_number? string
---@field status? string

---@class DigitalGiftCardLoadMatch
---@field brand? string

---@class DigitalGiftCardCreateData
---@field brand string
---@field client_request_id string
---@field code? string
---@field data? table
---@field face_value table
---@field message? string
---@field original_client_request_id? string
---@field pin? string
---@field reference? string
---@field sector string
---@field serial_number? string
---@field status? string

---@class DigitalIssueDelete
---@field brand string
---@field client_request_id string
---@field face_value table
---@field float_balance table
---@field original_client_request_id string
---@field reference string
---@field sector string
---@field tags? table

---@class DigitalIssueDeleteCreateData
---@field brand string
---@field client_request_id string
---@field face_value table
---@field float_balance table
---@field original_client_request_id string
---@field reference string
---@field sector string
---@field tags? table

---@class DigitalIssueDeleteRemoveMatch
---@field brand? string
---@field client_request_id? string
---@field face_value? table
---@field float_balance? table
---@field original_client_request_id? string
---@field reference? string
---@field sector? string
---@field tags? table

---@class DigitalIssuePost
---@field barcode table
---@field brand string
---@field client_request_id string
---@field code? string
---@field cost_value table
---@field delivery_method string
---@field discount number
---@field expiration_date? string
---@field face_value table
---@field float_balance table
---@field fulfilment_by string
---@field fulfilment_parameters table
---@field personalisation table
---@field pin? string
---@field reference string
---@field sector string
---@field security_code? string
---@field serial_number? string
---@field tags? table
---@field url? string

---@class DigitalIssuePostCreateData
---@field barcode table
---@field brand string
---@field client_request_id string
---@field code? string
---@field cost_value table
---@field delivery_method string
---@field discount number
---@field expiration_date? string
---@field face_value table
---@field float_balance table
---@field fulfilment_by string
---@field fulfilment_parameters table
---@field personalisation table
---@field pin? string
---@field reference string
---@field sector string
---@field security_code? string
---@field serial_number? string
---@field tags? table
---@field url? string

---@class DigitalOrderCard
---@field brand string
---@field client_request_id string
---@field cost_value table
---@field delivery_method string
---@field face_value table
---@field float_balance table
---@field fulfilment_by string
---@field fulfilment_parameters table
---@field personalisation table
---@field reference string
---@field sector string
---@field tags? table

---@class DigitalOrderCardCreateData
---@field brand string
---@field client_request_id string
---@field cost_value table
---@field delivery_method string
---@field face_value table
---@field float_balance table
---@field fulfilment_by string
---@field fulfilment_parameters table
---@field personalisation table
---@field reference string
---@field sector string
---@field tags? table

---@class DigitalOrderStatus
---@field barcode table
---@field brand? string
---@field code? string
---@field cost_value table
---@field discount? number
---@field expiration_date? string
---@field face_value table
---@field pin? string
---@field reference string
---@field security_code? string
---@field serial_number? string
---@field status string
---@field url? string

---@class DigitalOrderStatusLoadMatch
---@field original_client_request_id? string
---@field reference? string

---@class DigitalTopUpPost
---@field brand string
---@field client_request_id string
---@field code string
---@field cost_value table
---@field discount number
---@field face_value table
---@field float_balance table
---@field pin? string
---@field reference string
---@field sector string
---@field serial_number? string
---@field tags? table

---@class DigitalTopUpPostCreateData
---@field brand string
---@field client_request_id string
---@field code string
---@field cost_value table
---@field discount number
---@field face_value table
---@field float_balance table
---@field pin? string
---@field reference string
---@field sector string
---@field serial_number? string
---@field tags? table

---@class Float
---@field floats table
---@field last_refreshed_at string

---@class FloatLoadMatch
---@field currency? string

---@class FloatListMatch
---@field currency? string
---@field end_date? string
---@field float? string
---@field payment_reference? string
---@field start_date? string
---@field status? string

---@class FloatCreateData
---@field floats table
---@field last_refreshed_at string

---@class PhysicalGiftCard
---@field brand string
---@field client_request_id string
---@field code string
---@field cost_value table
---@field discount number
---@field expiration_date? string
---@field face_value table
---@field float_balance table
---@field fulfilled_at? string
---@field original_client_request_id string
---@field pin? string
---@field reference string
---@field sector string
---@field security_code? string
---@field serial_number? string
---@field tags? table
---@field url? string

---@class PhysicalGiftCardCreateData
---@field brand string
---@field client_request_id string
---@field code string
---@field cost_value table
---@field discount number
---@field expiration_date? string
---@field face_value table
---@field float_balance table
---@field fulfilled_at? string
---@field original_client_request_id string
---@field pin? string
---@field reference string
---@field sector string
---@field security_code? string
---@field serial_number? string
---@field tags? table
---@field url? string

---@class PhysicalGiftCardRemoveMatch
---@field brand? string
---@field client_request_id? string
---@field code? string
---@field cost_value? table
---@field discount? number
---@field expiration_date? string
---@field face_value? table
---@field float_balance? table
---@field fulfilled_at? string
---@field original_client_request_id? string
---@field pin? string
---@field reference? string
---@field sector? string
---@field security_code? string
---@field serial_number? string
---@field tags? table
---@field url? string

---@class PhysicalOrderCard
---@field brand string
---@field client_request_id string
---@field cost_value table
---@field discount number
---@field expiration_date? string
---@field face_value table
---@field float_balance table
---@field fulfilment_by string
---@field fulfilment_parameters table
---@field personalisation table
---@field reference string
---@field sector string
---@field shipping_method string
---@field tags? table

---@class PhysicalOrderCardCreateData
---@field brand string
---@field client_request_id string
---@field cost_value table
---@field discount number
---@field expiration_date? string
---@field face_value table
---@field float_balance table
---@field fulfilment_by string
---@field fulfilment_parameters table
---@field personalisation table
---@field reference string
---@field sector string
---@field shipping_method string
---@field tags? table

---@class PhysicalOrderStatus
---@field references table

---@class PhysicalOrderStatusCreateData
---@field references table

---@class Promotion
---@field last_refreshed_at string
---@field standard table

---@class PromotionLoadMatch
---@field last_refreshed_at? string
---@field standard? table

---@class Template
---@field last_refreshed_at string
---@field templates table

---@class TemplateLoadMatch
---@field brand? string
---@field template? string

local M = {}

return M
