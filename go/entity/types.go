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
	Currency *string `json:"currency,omitempty"`
	Name *string `json:"name,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// BrandListMatch is the typed request payload for Brand.ListTyped.
type BrandListMatch struct {
	Currency *string `json:"currency,omitempty"`
	Name *string `json:"name,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// Dgc is the typed data model for the dgc entity.
type Dgc struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	DeliveryMethod *string `json:"delivery_method,omitempty"`
	FaceValue map[string]any `json:"face_value"`
	Sector *string `json:"sector,omitempty"`
}

// DgcCreateData is the typed request payload for Dgc.CreateTyped.
type DgcCreateData struct {
	Brand string `json:"brand"`
	ClientRequestId string `json:"client_request_id"`
	DeliveryMethod *string `json:"delivery_method,omitempty"`
	FaceValue map[string]any `json:"face_value"`
	Sector *string `json:"sector,omitempty"`
}

// Float is the typed data model for the float entity.
type Float struct {
	Balance *float64 `json:"balance,omitempty"`
	Currency *string `json:"currency,omitempty"`
}

// FloatListMatch is the typed request payload for Float.ListTyped.
type FloatListMatch struct {
	Balance *float64 `json:"balance,omitempty"`
	Currency *string `json:"currency,omitempty"`
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
