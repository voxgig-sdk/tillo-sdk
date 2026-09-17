// Typed models for the Tillo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Brand {
  brands?: any
  last_refreshed_at?: string
}

export interface BrandLoadMatch {
  brand?: string
  category?: string
  country?: string
  currency?: string
  detail?: boolean
}

export interface BrandTemplate {
}

export interface BrandTemplateLoadMatch {
  brand: string
  template?: string
  version?: string
}

export interface DigitalGiftCard {
  brand: string
  client_request_id: string
  code?: string
  data?: Record<string, any>
  face_value: Record<string, any>
  message?: string
  original_client_request_id?: string
  pin?: string
  reference?: string
  sector: string
  serial_number?: string
  status?: string
}

export interface DigitalGiftCardLoadMatch {
  brand?: string
}

export interface DigitalGiftCardCreateData {
  brand: string
  client_request_id: string
  code?: string
  data?: Record<string, any>
  face_value: Record<string, any>
  message?: string
  original_client_request_id?: string
  pin?: string
  reference?: string
  sector: string
  serial_number?: string
  status?: string
}

export interface DigitalIssueDelete {
  brand: string
  client_request_id: string
  face_value: Record<string, any>
  float_balance: Record<string, any>
  original_client_request_id: string
  reference: string
  sector: string
  tags?: any[]
}

export interface DigitalIssueDeleteCreateData {
  brand: string
  client_request_id: string
  face_value: Record<string, any>
  float_balance: Record<string, any>
  original_client_request_id: string
  reference: string
  sector: string
  tags?: any[]
}

export interface DigitalIssueDeleteRemoveMatch {
  brand?: string
  client_request_id?: string
  face_value?: Record<string, any>
  float_balance?: Record<string, any>
  original_client_request_id?: string
  reference?: string
  sector?: string
  tags?: any[]
}

export interface DigitalIssuePost {
  barcode: Record<string, any>
  brand: string
  client_request_id: string
  code?: string
  cost_value: Record<string, any>
  delivery_method: string
  discount: number
  expiration_date?: string
  face_value: Record<string, any>
  float_balance: Record<string, any>
  fulfilment_by: string
  fulfilment_parameters: Record<string, any>
  personalisation: Record<string, any>
  pin?: string
  reference: string
  sector: string
  security_code?: string
  serial_number?: string
  tags?: any[]
  url?: string
}

export interface DigitalIssuePostCreateData {
  barcode: Record<string, any>
  brand: string
  client_request_id: string
  code?: string
  cost_value: Record<string, any>
  delivery_method: string
  discount: number
  expiration_date?: string
  face_value: Record<string, any>
  float_balance: Record<string, any>
  fulfilment_by: string
  fulfilment_parameters: Record<string, any>
  personalisation: Record<string, any>
  pin?: string
  reference: string
  sector: string
  security_code?: string
  serial_number?: string
  tags?: any[]
  url?: string
}

export interface DigitalOrderCard {
  brand: string
  client_request_id: string
  cost_value: Record<string, any>
  delivery_method: string
  face_value: Record<string, any>
  float_balance: Record<string, any>
  fulfilment_by: string
  fulfilment_parameters: Record<string, any>
  personalisation: Record<string, any>
  reference: string
  sector: string
  tags?: any[]
}

export interface DigitalOrderCardCreateData {
  brand: string
  client_request_id: string
  cost_value: Record<string, any>
  delivery_method: string
  face_value: Record<string, any>
  float_balance: Record<string, any>
  fulfilment_by: string
  fulfilment_parameters: Record<string, any>
  personalisation: Record<string, any>
  reference: string
  sector: string
  tags?: any[]
}

export interface DigitalOrderStatus {
  barcode: Record<string, any>
  brand?: string
  code?: string
  cost_value: Record<string, any>
  discount?: number
  expiration_date?: string
  face_value: Record<string, any>
  pin?: string
  reference: string
  security_code?: string
  serial_number?: string
  status: string
  url?: string
}

export interface DigitalOrderStatusLoadMatch {
  original_client_request_id?: string
  reference?: string
}

export interface DigitalTopUpPost {
  brand: string
  client_request_id: string
  code: string
  cost_value: Record<string, any>
  discount: number
  face_value: Record<string, any>
  float_balance: Record<string, any>
  pin?: string
  reference: string
  sector: string
  serial_number?: string
  tags?: any[]
}

export interface DigitalTopUpPostCreateData {
  brand: string
  client_request_id: string
  code: string
  cost_value: Record<string, any>
  discount: number
  face_value: Record<string, any>
  float_balance: Record<string, any>
  pin?: string
  reference: string
  sector: string
  serial_number?: string
  tags?: any[]
}

export interface Float {
  floats: Record<string, any>
  last_refreshed_at: string
}

export interface FloatLoadMatch {
  currency?: string
}

export interface FloatListMatch {
  currency?: string
  end_date?: string
  float?: string
  payment_reference?: string
  start_date?: string
  status?: string

  // Selects a custom action instead of the plain list:
  //   'transfer_request'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface FloatCreateData {
  floats: Record<string, any>
  last_refreshed_at: string

  // Selects a custom action instead of the plain create:
  //   'request_payment_transfer'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PhysicalGiftCard {
  brand: string
  client_request_id: string
  code: string
  cost_value: Record<string, any>
  discount: number
  expiration_date?: string
  face_value: Record<string, any>
  float_balance: Record<string, any>
  fulfilled_at?: string
  original_client_request_id: string
  pin?: string
  reference: string
  sector: string
  security_code?: string
  serial_number?: string
  tags?: any[]
  url?: string
}

export interface PhysicalGiftCardCreateData {
  brand: string
  client_request_id: string
  code: string
  cost_value: Record<string, any>
  discount: number
  expiration_date?: string
  face_value: Record<string, any>
  float_balance: Record<string, any>
  fulfilled_at?: string
  original_client_request_id: string
  pin?: string
  reference: string
  sector: string
  security_code?: string
  serial_number?: string
  tags?: any[]
  url?: string
}

export interface PhysicalGiftCardRemoveMatch {
  brand?: string
  client_request_id?: string
  code?: string
  cost_value?: Record<string, any>
  discount?: number
  expiration_date?: string
  face_value?: Record<string, any>
  float_balance?: Record<string, any>
  fulfilled_at?: string
  original_client_request_id?: string
  pin?: string
  reference?: string
  sector?: string
  security_code?: string
  serial_number?: string
  tags?: any[]
  url?: string
}

export interface PhysicalOrderCard {
  brand: string
  client_request_id: string
  cost_value: Record<string, any>
  discount: number
  expiration_date?: string
  face_value: Record<string, any>
  float_balance: Record<string, any>
  fulfilment_by: string
  fulfilment_parameters: Record<string, any>
  personalisation: Record<string, any>
  reference: string
  sector: string
  shipping_method: string
  tags?: any[]
}

export interface PhysicalOrderCardCreateData {
  brand: string
  client_request_id: string
  cost_value: Record<string, any>
  discount: number
  expiration_date?: string
  face_value: Record<string, any>
  float_balance: Record<string, any>
  fulfilment_by: string
  fulfilment_parameters: Record<string, any>
  personalisation: Record<string, any>
  reference: string
  sector: string
  shipping_method: string
  tags?: any[]
}

export interface PhysicalOrderStatus {
  references: any[]
}

export interface PhysicalOrderStatusCreateData {
  references: any[]
}

export interface Promotion {
  last_refreshed_at: string
  standard: Record<string, any>
}

export interface PromotionLoadMatch {
  last_refreshed_at?: string
  standard?: Record<string, any>
}

export interface Template {
  last_refreshed_at: string
  templates: Record<string, any>
}

export interface TemplateLoadMatch {
  brand?: string
  template?: string
}

