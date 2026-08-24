-- Typed models for the Tillo SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Brand
---@field currency? string
---@field name? string
---@field slug? string

---@class BrandListMatch
---@field currency? string
---@field name? string
---@field slug? string

---@class Dgc
---@field brand string
---@field client_request_id string
---@field delivery_method? string
---@field face_value table
---@field sector? string

---@class DgcCreateData
---@field brand string
---@field client_request_id string
---@field delivery_method? string
---@field face_value table
---@field sector? string

---@class Float
---@field balance? number
---@field currency? string

---@class FloatListMatch
---@field balance? number
---@field currency? string

local M = {}

return M
