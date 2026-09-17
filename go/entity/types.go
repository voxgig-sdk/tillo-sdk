// Typed models for the Tillo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/tillo-sdk/go/core"
)

// Brand is the typed data model for the brand entity.
type Brand struct {
	Brands *any `json:"brands,omitempty"`
	LastRefreshedAt *string `json:"last_refreshed_at,omitempty"`
}

// BrandLoadMatch is the typed request payload for Brand.LoadTyped.
type BrandLoadMatch struct {
	Brand *string `json:"brand,omitempty"`
	Category *string `json:"category,omitempty"`
	Country *string `json:"country,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Detail *bool `json:"detail,omitempty"`
}

// BrandTemplate is the typed data model for the brand_template entity.
type BrandTemplate struct {
}

// BrandTemplateLoadMatch is the typed request payload for BrandTemplate.LoadTyped.
type BrandTemplateLoadMatch struct {
	Brand string `json:"brand"`
	Template *string `json:"template,omitempty"`
	Version *string `json:"version,omitempty"`
}

// DigitalGiftCard is the typed data model for the digital_gift_card entity.
type DigitalGiftCard struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	Code *string `json:"code,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	FaceValue map[string]any `json:"face_value"`
	Message *string `json:"message,omitempty"`
	OriginalClientRequestId *string `json:"original_client_request_id,omitempty"`
	Pin *string `json:"pin,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Sector string `json:"sector"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Status *string `json:"status,omitempty"`
}

// DigitalGiftCardLoadMatch is the typed request payload for DigitalGiftCard.LoadTyped.
type DigitalGiftCardLoadMatch struct {
	Brand *string `json:"brand,omitempty"`
}

// DigitalGiftCardCreateData is the typed request payload for DigitalGiftCard.CreateTyped.
type DigitalGiftCardCreateData struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	Code *string `json:"code,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	FaceValue map[string]any `json:"face_value"`
	Message *string `json:"message,omitempty"`
	OriginalClientRequestId *string `json:"original_client_request_id,omitempty"`
	Pin *string `json:"pin,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Sector string `json:"sector"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Status *string `json:"status,omitempty"`
}

// DigitalIssueDelete is the typed data model for the digital_issue_delete entity.
type DigitalIssueDelete struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	OriginalClientRequestId string `json:"original_client_request_id"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	Tags *[]any `json:"tags,omitempty"`
}

// DigitalIssueDeleteCreateData is the typed request payload for DigitalIssueDelete.CreateTyped.
type DigitalIssueDeleteCreateData struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	OriginalClientRequestId string `json:"original_client_request_id"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	Tags *[]any `json:"tags,omitempty"`
}

// DigitalIssueDeleteRemoveMatch is the typed request payload for DigitalIssueDelete.RemoveTyped.
type DigitalIssueDeleteRemoveMatch struct {
	Brand *string `json:"brand,omitempty"`
	ClientRequestId *string `json:"client_request_id,omitempty"`
	FaceValue *map[string]any `json:"face_value,omitempty"`
	FloatBalance *map[string]any `json:"float_balance,omitempty"`
	OriginalClientRequestId *string `json:"original_client_request_id,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Sector *string `json:"sector,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
}

// DigitalIssuePost is the typed data model for the digital_issue_post entity.
type DigitalIssuePost struct {
	Barcode map[string]any `json:"barcode"`
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	Code *string `json:"code,omitempty"`
	CostValue map[string]any `json:"cost_value"`
	DeliveryMethod string `json:"delivery_method"`
	Discount float64 `json:"discount"`
	ExpirationDate *string `json:"expiration_date,omitempty"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	FulfilmentBy string `json:"fulfilment_by"`
	FulfilmentParameters map[string]any `json:"fulfilment_parameters"`
	Personalisation map[string]any `json:"personalisation"`
	Pin *string `json:"pin,omitempty"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	SecurityCode *string `json:"security_code,omitempty"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Url *string `json:"url,omitempty"`
}

// DigitalIssuePostCreateData is the typed request payload for DigitalIssuePost.CreateTyped.
type DigitalIssuePostCreateData struct {
	Barcode map[string]any `json:"barcode"`
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	Code *string `json:"code,omitempty"`
	CostValue map[string]any `json:"cost_value"`
	DeliveryMethod string `json:"delivery_method"`
	Discount float64 `json:"discount"`
	ExpirationDate *string `json:"expiration_date,omitempty"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	FulfilmentBy string `json:"fulfilment_by"`
	FulfilmentParameters map[string]any `json:"fulfilment_parameters"`
	Personalisation map[string]any `json:"personalisation"`
	Pin *string `json:"pin,omitempty"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	SecurityCode *string `json:"security_code,omitempty"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Url *string `json:"url,omitempty"`
}

// DigitalOrderCard is the typed data model for the digital_order_card entity.
type DigitalOrderCard struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	CostValue map[string]any `json:"cost_value"`
	DeliveryMethod string `json:"delivery_method"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	FulfilmentBy string `json:"fulfilment_by"`
	FulfilmentParameters map[string]any `json:"fulfilment_parameters"`
	Personalisation map[string]any `json:"personalisation"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	Tags *[]any `json:"tags,omitempty"`
}

// DigitalOrderCardCreateData is the typed request payload for DigitalOrderCard.CreateTyped.
type DigitalOrderCardCreateData struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	CostValue map[string]any `json:"cost_value"`
	DeliveryMethod string `json:"delivery_method"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	FulfilmentBy string `json:"fulfilment_by"`
	FulfilmentParameters map[string]any `json:"fulfilment_parameters"`
	Personalisation map[string]any `json:"personalisation"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	Tags *[]any `json:"tags,omitempty"`
}

// DigitalOrderStatus is the typed data model for the digital_order_status entity.
type DigitalOrderStatus struct {
	Barcode map[string]any `json:"barcode"`
	Brand *string `json:"brand,omitempty"`
	Code *string `json:"code,omitempty"`
	CostValue map[string]any `json:"cost_value"`
	Discount *float64 `json:"discount,omitempty"`
	ExpirationDate *string `json:"expiration_date,omitempty"`
	FaceValue map[string]any `json:"face_value"`
	Pin *string `json:"pin,omitempty"`
	Reference string `json:"reference"`
	SecurityCode *string `json:"security_code,omitempty"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Status string `json:"status"`
	Url *string `json:"url,omitempty"`
}

// DigitalOrderStatusLoadMatch is the typed request payload for DigitalOrderStatus.LoadTyped.
type DigitalOrderStatusLoadMatch struct {
	OriginalClientRequestId *string `json:"original_client_request_id,omitempty"`
	Reference *string `json:"reference,omitempty"`
}

// DigitalTopUpPost is the typed data model for the digital_top_up_post entity.
type DigitalTopUpPost struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	Code string `json:"code"`
	CostValue map[string]any `json:"cost_value"`
	Discount float64 `json:"discount"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	Pin *string `json:"pin,omitempty"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
}

// DigitalTopUpPostCreateData is the typed request payload for DigitalTopUpPost.CreateTyped.
type DigitalTopUpPostCreateData struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	Code string `json:"code"`
	CostValue map[string]any `json:"cost_value"`
	Discount float64 `json:"discount"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	Pin *string `json:"pin,omitempty"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
}

// Float is the typed data model for the float entity.
type Float struct {
	Floats map[string]any `json:"floats"`
	LastRefreshedAt string `json:"last_refreshed_at"`
}

// FloatLoadMatch is the typed request payload for Float.LoadTyped.
type FloatLoadMatch struct {
	Currency *string `json:"currency,omitempty"`
}

// FloatListMatch is the typed request payload for Float.ListTyped.
type FloatListMatch struct {
	Currency *string `json:"currency,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	Float *string `json:"float,omitempty"`
	PaymentReference *string `json:"payment_reference,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	Status *string `json:"status,omitempty"`
}

// FloatCreateData is the typed request payload for Float.CreateTyped.
type FloatCreateData struct {
	Floats map[string]any `json:"floats"`
	LastRefreshedAt string `json:"last_refreshed_at"`
}

// PhysicalGiftCard is the typed data model for the physical_gift_card entity.
type PhysicalGiftCard struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	Code string `json:"code"`
	CostValue map[string]any `json:"cost_value"`
	Discount float64 `json:"discount"`
	ExpirationDate *string `json:"expiration_date,omitempty"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	FulfilledAt *string `json:"fulfilled_at,omitempty"`
	OriginalClientRequestId string `json:"original_client_request_id"`
	Pin *string `json:"pin,omitempty"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	SecurityCode *string `json:"security_code,omitempty"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PhysicalGiftCardCreateData is the typed request payload for PhysicalGiftCard.CreateTyped.
type PhysicalGiftCardCreateData struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	Code string `json:"code"`
	CostValue map[string]any `json:"cost_value"`
	Discount float64 `json:"discount"`
	ExpirationDate *string `json:"expiration_date,omitempty"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	FulfilledAt *string `json:"fulfilled_at,omitempty"`
	OriginalClientRequestId string `json:"original_client_request_id"`
	Pin *string `json:"pin,omitempty"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	SecurityCode *string `json:"security_code,omitempty"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PhysicalGiftCardRemoveMatch is the typed request payload for PhysicalGiftCard.RemoveTyped.
type PhysicalGiftCardRemoveMatch struct {
	Brand *string `json:"brand,omitempty"`
	ClientRequestId *string `json:"client_request_id,omitempty"`
	Code *string `json:"code,omitempty"`
	CostValue *map[string]any `json:"cost_value,omitempty"`
	Discount *float64 `json:"discount,omitempty"`
	ExpirationDate *string `json:"expiration_date,omitempty"`
	FaceValue *map[string]any `json:"face_value,omitempty"`
	FloatBalance *map[string]any `json:"float_balance,omitempty"`
	FulfilledAt *string `json:"fulfilled_at,omitempty"`
	OriginalClientRequestId *string `json:"original_client_request_id,omitempty"`
	Pin *string `json:"pin,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Sector *string `json:"sector,omitempty"`
	SecurityCode *string `json:"security_code,omitempty"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PhysicalOrderCard is the typed data model for the physical_order_card entity.
type PhysicalOrderCard struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	CostValue map[string]any `json:"cost_value"`
	Discount float64 `json:"discount"`
	ExpirationDate *string `json:"expiration_date,omitempty"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	FulfilmentBy string `json:"fulfilment_by"`
	FulfilmentParameters map[string]any `json:"fulfilment_parameters"`
	Personalisation map[string]any `json:"personalisation"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	ShippingMethod string `json:"shipping_method"`
	Tags *[]any `json:"tags,omitempty"`
}

// PhysicalOrderCardCreateData is the typed request payload for PhysicalOrderCard.CreateTyped.
type PhysicalOrderCardCreateData struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	CostValue map[string]any `json:"cost_value"`
	Discount float64 `json:"discount"`
	ExpirationDate *string `json:"expiration_date,omitempty"`
	FaceValue map[string]any `json:"face_value"`
	FloatBalance map[string]any `json:"float_balance"`
	FulfilmentBy string `json:"fulfilment_by"`
	FulfilmentParameters map[string]any `json:"fulfilment_parameters"`
	Personalisation map[string]any `json:"personalisation"`
	Reference string `json:"reference"`
	Sector string `json:"sector"`
	ShippingMethod string `json:"shipping_method"`
	Tags *[]any `json:"tags,omitempty"`
}

// PhysicalOrderStatus is the typed data model for the physical_order_status entity.
type PhysicalOrderStatus struct {
	References []any `json:"references"`
}

// PhysicalOrderStatusCreateData is the typed request payload for PhysicalOrderStatus.CreateTyped.
type PhysicalOrderStatusCreateData struct {
	References []any `json:"references"`
}

// Promotion is the typed data model for the promotion entity.
type Promotion struct {
	LastRefreshedAt string `json:"last_refreshed_at"`
	Standard map[string]any `json:"standard"`
}

// PromotionLoadMatch is the typed request payload for Promotion.LoadTyped.
type PromotionLoadMatch struct {
	LastRefreshedAt *string `json:"last_refreshed_at,omitempty"`
	Standard *map[string]any `json:"standard,omitempty"`
}

// Template is the typed data model for the template entity.
type Template struct {
	LastRefreshedAt string `json:"last_refreshed_at"`
	Templates map[string]any `json:"templates"`
}

// TemplateLoadMatch is the typed request payload for Template.LoadTyped.
type TemplateLoadMatch struct {
	Brand *string `json:"brand,omitempty"`
	Template *string `json:"template,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
