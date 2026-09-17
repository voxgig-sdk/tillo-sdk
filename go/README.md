# Tillo Golang SDK



The Golang SDK for the Tillo API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Brand(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/tillo-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/tillo-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/tillo-sdk/go=../tillo-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/tillo-sdk/go"
)

func main() {
    client := sdk.NewTilloSDK(map[string]any{
        "apikey": os.Getenv("TILLO_APIKEY"),
    })

    // Load a single brand — the value is the loaded record.
    brand, err := client.Brand(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(brand)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
promotion, err := client.Promotion(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = promotion
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

promotion, err := client.Promotion(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(promotion) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewTilloSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
TILLO_TEST_LIVE=TRUE
TILLO_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewTilloSDK

```go
func NewTilloSDK(options map[string]any) *TilloSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *TilloSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### TilloSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Brand` | `(data map[string]any) TilloEntity` | Create a Brand entity instance. |
| `BrandTemplate` | `(data map[string]any) TilloEntity` | Create a BrandTemplate entity instance. |
| `DigitalGiftCard` | `(data map[string]any) TilloEntity` | Create a DigitalGiftCard entity instance. |
| `DigitalIssueDelete` | `(data map[string]any) TilloEntity` | Create a DigitalIssueDelete entity instance. |
| `DigitalIssuePost` | `(data map[string]any) TilloEntity` | Create a DigitalIssuePost entity instance. |
| `DigitalOrderCard` | `(data map[string]any) TilloEntity` | Create a DigitalOrderCard entity instance. |
| `DigitalOrderStatus` | `(data map[string]any) TilloEntity` | Create a DigitalOrderStatus entity instance. |
| `DigitalTopUpPost` | `(data map[string]any) TilloEntity` | Create a DigitalTopUpPost entity instance. |
| `Float` | `(data map[string]any) TilloEntity` | Create a Float entity instance. |
| `PhysicalGiftCard` | `(data map[string]any) TilloEntity` | Create a PhysicalGiftCard entity instance. |
| `PhysicalOrderCard` | `(data map[string]any) TilloEntity` | Create a PhysicalOrderCard entity instance. |
| `PhysicalOrderStatus` | `(data map[string]any) TilloEntity` | Create a PhysicalOrderStatus entity instance. |
| `Promotion` | `(data map[string]any) TilloEntity` | Create a Promotion entity instance. |
| `Template` | `(data map[string]any) TilloEntity` | Create a Template entity instance. |

### Entity interface (TilloEntity)

All entities implement the `TilloEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    brand, err := client.Brand(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // brand is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Brand

| Field | Description |
| --- | --- |
| `"brands"` |  |
| `"last_refreshed_at"` |  |

Operations: Load.

API path: `/brands`

#### BrandTemplate

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/template`

#### DigitalGiftCard

| Field | Description |
| --- | --- |
| `"brand"` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `"client_request_id"` | Unique identifier for this request. |
| `"code"` | Gift card code |
| `"data"` |  |
| `"face_value"` |  |
| `"message"` |  |
| `"original_client_request_id"` | This field will be the `client_request_id` provided in the original transaction. |
| `"pin"` | Gift card PIN. |
| `"reference"` | This is the `reference` you received when making the original issuance request. |
| `"sector"` | Must match one of the sectors configured for your buyer account. |
| `"serial_number"` | The serial number is a required parameter for any Sainsburys brand |
| `"status"` |  |

Operations: Create, Load.

API path: `/digital/check-balance`

#### DigitalIssueDelete

| Field | Description |
| --- | --- |
| `"brand"` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `"client_request_id"` | Unique identifier for this request. |
| `"face_value"` |  |
| `"float_balance"` | Your remaining balance on the float used for this cancellation transaction. |
| `"original_client_request_id"` | This field will be the `client_request_id` provided in the original transaction. |
| `"reference"` | Unique reference (UUID) for the cancellation transaction |
| `"sector"` | Must match one of the sectors configured for your buyer account. |
| `"tags"` | Optional meta data associated with the issuance. |

Operations: Create, Remove.

API path: `/digital/reverse`

#### DigitalIssuePost

| Field | Description |
| --- | --- |
| `"barcode"` | Some brands provide a barcode alongside a code delivery. |
| `"brand"` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `"client_request_id"` | Unique identifier for this request. |
| `"code"` | Gift card code (for code-delivery brands) |
| `"cost_value"` |  |
| `"delivery_method"` |  |
| `"discount"` | The discount percentage used on this transaction |
| `"expiration_date"` | The expiration date for this gift card. |
| `"face_value"` |  |
| `"float_balance"` |  |
| `"fulfilment_by"` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `"fulfilment_parameters"` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `"personalisation"` |  |
| `"pin"` | Gift card PIN (for code-delivery brands). |
| `"reference"` | Unique reference for this transaction |
| `"sector"` | Must match one of the sectors configured for your buyer account. |
| `"security_code"` | Gift card security code (for code-delivery brands). |
| `"serial_number"` | Gift card serial number. |
| `"tags"` | Optional meta data associated with the issuance. |
| `"url"` | Gift card URL (for URL-delivery brands) |

Operations: Create.

API path: `/digital/issue`

#### DigitalOrderCard

| Field | Description |
| --- | --- |
| `"brand"` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `"client_request_id"` | Unique identifier for this request. |
| `"cost_value"` |  |
| `"delivery_method"` |  |
| `"face_value"` |  |
| `"float_balance"` |  |
| `"fulfilment_by"` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `"fulfilment_parameters"` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `"personalisation"` |  |
| `"reference"` | Unique reference for this transaction |
| `"sector"` | Must match one of the sectors configured for your buyer account. |
| `"tags"` | Optional meta data associated with the issuance. |

Operations: Create.

API path: `/digital/order-card`

#### DigitalOrderStatus

| Field | Description |
| --- | --- |
| `"barcode"` | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `"brand"` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `"code"` | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `"cost_value"` | Cost value of the gift card (only present when status is 'SUCCESS') |
| `"discount"` | The discount percentage used on this transaction |
| `"expiration_date"` | The expiration date for this gift card. |
| `"face_value"` | Face value of the gift card (only present when status is 'SUCCESS') |
| `"pin"` | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `"reference"` | Unique reference for this transaction |
| `"security_code"` | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `"serial_number"` | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `"status"` | The current status of the order |
| `"url"` | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

Operations: Load.

API path: `/digital/order-status`

#### DigitalTopUpPost

| Field | Description |
| --- | --- |
| `"brand"` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `"client_request_id"` | Unique identifier for this request. |
| `"code"` | Gift card code |
| `"cost_value"` |  |
| `"discount"` | The discount percentage used on this transaction |
| `"face_value"` |  |
| `"float_balance"` |  |
| `"pin"` | Gift card PIN. |
| `"reference"` | Unique reference for this transaction |
| `"sector"` | Must match one of the sectors configured for your buyer account. |
| `"serial_number"` | Gift card serial number. |
| `"tags"` | Optional meta data associated with the issuance. |

Operations: Create.

API path: `/digital/top-up`

#### Float

| Field | Description |
| --- | --- |
| `"floats"` | Float balances grouped by currency code |
| `"last_refreshed_at"` | ISO 8601 timestamp of when the float data was last refreshed |

Operations: Create, List, Load.

API path: `/float/request-payment-transfer`

#### PhysicalGiftCard

| Field | Description |
| --- | --- |
| `"brand"` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `"client_request_id"` | Unique identifier for this request. |
| `"code"` | The long card number on the physical gift card you wish to cash out |
| `"cost_value"` |  |
| `"discount"` | The discount percentage used on this transaction |
| `"expiration_date"` | The expiration date for this gift card. |
| `"face_value"` |  |
| `"float_balance"` |  |
| `"fulfilled_at"` | The date for which this this gift card was fulfilled. |
| `"original_client_request_id"` | This field will be the `client_request_id` provided in the original transaction. |
| `"pin"` | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `"reference"` | Unique reference for this transaction |
| `"sector"` | Must match one of the sectors configured for your buyer account. |
| `"security_code"` | Gift card security code (for code-delivery brands). |
| `"serial_number"` | Gift card serial number. |
| `"tags"` | Optional meta data associated with the issuance. |
| `"url"` | Gift card URL (for URL-delivery brands) |

Operations: Create, Remove.

API path: `/physical/activate`

#### PhysicalOrderCard

| Field | Description |
| --- | --- |
| `"brand"` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `"client_request_id"` | Unique identifier for this request. |
| `"cost_value"` | The amount you actually paid (once the discount has been taken into consideration) |
| `"discount"` | The discount percentage used on this transaction |
| `"expiration_date"` | The expiration date for this gift card. |
| `"face_value"` | the face value amount of the gift card. |
| `"float_balance"` | Your remaining balance on the float used to make this transaction |
| `"fulfilment_by"` | When ordering a physical gift card, this must be set to `rewardcloud` |
| `"fulfilment_parameters"` |  |
| `"personalisation"` |  |
| `"reference"` | Unique reference for this transaction |
| `"sector"` | Must match one of the sectors configured for your buyer account. |
| `"shipping_method"` | Shipping method identifier. |
| `"tags"` | Optional meta data associated with the issuance. |

Operations: Create.

API path: `/physical/order-card`

#### PhysicalOrderStatus

| Field | Description |
| --- | --- |
| `"references"` | Array of order references to check. |

Operations: Create.

API path: `/physical/order-status`

#### Promotion

| Field | Description |
| --- | --- |
| `"last_refreshed_at"` | ISO 8601 timestamp of when promotion data was last refreshed. |
| `"standard"` | Standard promotions grouped by brand slug. |

Operations: Load.

API path: `/promotions`

#### Template

| Field | Description |
| --- | --- |
| `"last_refreshed_at"` | ISO 8601 timestamp of when the template data was last refreshed |
| `"templates"` | Object mapping brand slugs to their template variants and versions. |

Operations: Load.

API path: `/templates`



## Entities


### Brand

Create an instance: `brand := client.Brand(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brands` | `any` |  |
| `last_refreshed_at` | `string` |  |

#### Example: Load

```go
brand, err := client.Brand(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(brand) // the loaded record
```


### BrandTemplate

Create an instance: `brandTemplate := client.BrandTemplate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
brandTemplate, err := client.BrandTemplate(nil).Load(map[string]any{"brand": "brand"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(brandTemplate) // the loaded record
```


### DigitalGiftCard

Create an instance: `digitalGiftCard := client.DigitalGiftCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `code` | `string` | Gift card code |
| `data` | `map[string]any` |  |
| `face_value` | `map[string]any` |  |
| `message` | `string` |  |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | Gift card PIN. |
| `reference` | `string` | This is the `reference` you received when making the original issuance request. |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | The serial number is a required parameter for any Sainsburys brand |
| `status` | `string` |  |

#### Example: Load

```go
digitalGiftCard, err := client.DigitalGiftCard(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(digitalGiftCard) // the loaded record
```

#### Example: Create

```go
result, err := client.DigitalGiftCard(nil).Create(map[string]any{
    "brand": "example_brand",
    "client_request_id": "example_client_request_id",
    "face_value": map[string]any{},
    "sector": "example_sector",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### DigitalIssueDelete

Create an instance: `digitalIssueDelete := client.DigitalIssueDelete(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `face_value` | `map[string]any` |  |
| `float_balance` | `map[string]any` | Your remaining balance on the float used for this cancellation transaction. |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `reference` | `string` | Unique reference (UUID) for the cancellation transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `tags` | `[]any` | Optional meta data associated with the issuance. |

#### Example: Create

```go
result, err := client.DigitalIssueDelete(nil).Create(map[string]any{
    "brand": "example_brand",
    "client_request_id": "example_client_request_id",
    "face_value": map[string]any{},
    "float_balance": map[string]any{},
    "original_client_request_id": "example_original_client_request_id",
    "reference": "example_reference",
    "sector": "example_sector",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### DigitalIssuePost

Create an instance: `digitalIssuePost := client.DigitalIssuePost(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `barcode` | `map[string]any` | Some brands provide a barcode alongside a code delivery. |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `code` | `string` | Gift card code (for code-delivery brands) |
| `cost_value` | `map[string]any` |  |
| `delivery_method` | `string` |  |
| `discount` | `float64` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `map[string]any` |  |
| `float_balance` | `map[string]any` |  |
| `fulfilment_by` | `string` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `map[string]any` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `map[string]any` |  |
| `pin` | `string` | Gift card PIN (for code-delivery brands). |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `[]any` | Optional meta data associated with the issuance. |
| `url` | `string` | Gift card URL (for URL-delivery brands) |

#### Example: Create

```go
result, err := client.DigitalIssuePost(nil).Create(map[string]any{
    "barcode": map[string]any{},
    "brand": "example_brand",
    "client_request_id": "example_client_request_id",
    "cost_value": map[string]any{},
    "delivery_method": "example_delivery_method",
    "discount": 1,
    "face_value": map[string]any{},
    "float_balance": map[string]any{},
    "fulfilment_by": "example_fulfilment_by",
    "fulfilment_parameters": map[string]any{},
    "personalisation": map[string]any{},
    "reference": "example_reference",
    "sector": "example_sector",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### DigitalOrderCard

Create an instance: `digitalOrderCard := client.DigitalOrderCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `cost_value` | `map[string]any` |  |
| `delivery_method` | `string` |  |
| `face_value` | `map[string]any` |  |
| `float_balance` | `map[string]any` |  |
| `fulfilment_by` | `string` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `map[string]any` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `map[string]any` |  |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `tags` | `[]any` | Optional meta data associated with the issuance. |

#### Example: Create

```go
result, err := client.DigitalOrderCard(nil).Create(map[string]any{
    "brand": "example_brand",
    "client_request_id": "example_client_request_id",
    "cost_value": map[string]any{},
    "delivery_method": "example_delivery_method",
    "face_value": map[string]any{},
    "float_balance": map[string]any{},
    "fulfilment_by": "example_fulfilment_by",
    "fulfilment_parameters": map[string]any{},
    "personalisation": map[string]any{},
    "reference": "example_reference",
    "sector": "example_sector",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### DigitalOrderStatus

Create an instance: `digitalOrderStatus := client.DigitalOrderStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `barcode` | `map[string]any` | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `code` | `string` | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `cost_value` | `map[string]any` | Cost value of the gift card (only present when status is 'SUCCESS') |
| `discount` | `float64` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `map[string]any` | Face value of the gift card (only present when status is 'SUCCESS') |
| `pin` | `string` | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `reference` | `string` | Unique reference for this transaction |
| `security_code` | `string` | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `serial_number` | `string` | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `status` | `string` | The current status of the order |
| `url` | `string` | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

#### Example: Load

```go
digitalOrderStatus, err := client.DigitalOrderStatus(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(digitalOrderStatus) // the loaded record
```


### DigitalTopUpPost

Create an instance: `digitalTopUpPost := client.DigitalTopUpPost(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `code` | `string` | Gift card code |
| `cost_value` | `map[string]any` |  |
| `discount` | `float64` | The discount percentage used on this transaction |
| `face_value` | `map[string]any` |  |
| `float_balance` | `map[string]any` |  |
| `pin` | `string` | Gift card PIN. |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `[]any` | Optional meta data associated with the issuance. |

#### Example: Create

```go
result, err := client.DigitalTopUpPost(nil).Create(map[string]any{
    "brand": "example_brand",
    "client_request_id": "example_client_request_id",
    "code": "example_code",
    "cost_value": map[string]any{},
    "discount": 1,
    "face_value": map[string]any{},
    "float_balance": map[string]any{},
    "reference": "example_reference",
    "sector": "example_sector",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Float

Create an instance: `float := client.Float(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `floats` | `map[string]any` | Float balances grouped by currency code |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when the float data was last refreshed |

#### Example: Load

```go
float, err := client.Float(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(float) // the loaded record
```

#### Example: List

```go
floats, err := client.Float(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(floats) // the array of records
```

#### Example: Create

```go
result, err := client.Float(nil).Create(map[string]any{
    "floats": map[string]any{},
    "last_refreshed_at": "example_last_refreshed_at",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### PhysicalGiftCard

Create an instance: `physicalGiftCard := client.PhysicalGiftCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `code` | `string` | The long card number on the physical gift card you wish to cash out |
| `cost_value` | `map[string]any` |  |
| `discount` | `float64` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `map[string]any` |  |
| `float_balance` | `map[string]any` |  |
| `fulfilled_at` | `string` | The date for which this this gift card was fulfilled. |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `[]any` | Optional meta data associated with the issuance. |
| `url` | `string` | Gift card URL (for URL-delivery brands) |

#### Example: Create

```go
result, err := client.PhysicalGiftCard(nil).Create(map[string]any{
    "brand": "example_brand",
    "client_request_id": "example_client_request_id",
    "code": "example_code",
    "cost_value": map[string]any{},
    "discount": 1,
    "face_value": map[string]any{},
    "float_balance": map[string]any{},
    "original_client_request_id": "example_original_client_request_id",
    "reference": "example_reference",
    "sector": "example_sector",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### PhysicalOrderCard

Create an instance: `physicalOrderCard := client.PhysicalOrderCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `cost_value` | `map[string]any` | The amount you actually paid (once the discount has been taken into consideration) |
| `discount` | `float64` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `map[string]any` | the face value amount of the gift card. |
| `float_balance` | `map[string]any` | Your remaining balance on the float used to make this transaction |
| `fulfilment_by` | `string` | When ordering a physical gift card, this must be set to `rewardcloud` |
| `fulfilment_parameters` | `map[string]any` |  |
| `personalisation` | `map[string]any` |  |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `shipping_method` | `string` | Shipping method identifier. |
| `tags` | `[]any` | Optional meta data associated with the issuance. |

#### Example: Create

```go
result, err := client.PhysicalOrderCard(nil).Create(map[string]any{
    "brand": "example_brand",
    "client_request_id": "example_client_request_id",
    "cost_value": map[string]any{},
    "discount": 1,
    "face_value": map[string]any{},
    "float_balance": map[string]any{},
    "fulfilment_by": "example_fulfilment_by",
    "fulfilment_parameters": map[string]any{},
    "personalisation": map[string]any{},
    "reference": "example_reference",
    "sector": "example_sector",
    "shipping_method": "example_shipping_method",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### PhysicalOrderStatus

Create an instance: `physicalOrderStatus := client.PhysicalOrderStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `references` | `[]any` | Array of order references to check. |

#### Example: Create

```go
result, err := client.PhysicalOrderStatus(nil).Create(map[string]any{
    "references": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Promotion

Create an instance: `promotion := client.Promotion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | `map[string]any` | Standard promotions grouped by brand slug. |

#### Example: Load

```go
promotion, err := client.Promotion(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(promotion) // the loaded record
```


### Template

Create an instance: `template := client.Template(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | `map[string]any` | Object mapping brand slugs to their template variants and versions. |

#### Example: Load

```go
template, err := client.Template(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(template) // the loaded record
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Request/response capture ring buffer for debugging |
| [`idempotency`](#idempotency) | Idempotency keys for safe retries of mutating operations |
| [`metrics`](#metrics) | Statistics capture: per-operation counters and latency |
| [`paging`](#paging) | Pagination signals for list operations |
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Request/response capture ring buffer for debugging.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency keys for safe retries of mutating operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Statistics capture: per-operation counters and latency.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Pagination signals for list operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **DebugFeature**: Request/response capture ring buffer for debugging
- **IdempotencyFeature**: Idempotency keys for safe retries of mutating operations
- **MetricsFeature**: Statistics capture: per-operation counters and latency
- **PagingFeature**: Pagination signals for list operations
- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/tillo-sdk/go/
├── tillo.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/tillo-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
promotion := client.Promotion(nil)
promotion.Load(nil, nil)

// promotion.Data() now returns the promotion data from the last load
// promotion.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
