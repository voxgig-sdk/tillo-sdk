// Typed models for the Tillo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Brand {
  currency?: string
  name?: string
  slug?: string
}

export interface BrandListMatch {
  currency?: string
  name?: string
  slug?: string
}

export interface Dgc {
  brand: string
  client_request_id: string
  delivery_method?: string
  face_value: Record<string, any>
  sector?: string
}

export interface DgcCreateData {
  brand: string
  client_request_id: string
  delivery_method?: string
  face_value: Record<string, any>
  sector?: string
}

export interface Float {
  balance?: number
  currency?: string
}

export interface FloatListMatch {
  balance?: number
  currency?: string
}

