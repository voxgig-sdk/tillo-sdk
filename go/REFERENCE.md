# Tillo Golang SDK Reference

Complete API reference for the Tillo Golang SDK.


## TilloSDK

### Constructor

```go
func NewTilloSDK(options map[string]any) *TilloSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *TilloSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *TilloSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Brand(data map[string]any) TilloEntity`

Create a new `Brand` entity instance. Pass `nil` for no initial data.

#### `BrandTemplate(data map[string]any) TilloEntity`

Create a new `BrandTemplate` entity instance. Pass `nil` for no initial data.

#### `DigitalGiftCard(data map[string]any) TilloEntity`

Create a new `DigitalGiftCard` entity instance. Pass `nil` for no initial data.

#### `DigitalIssueDelete(data map[string]any) TilloEntity`

Create a new `DigitalIssueDelete` entity instance. Pass `nil` for no initial data.

#### `DigitalIssuePost(data map[string]any) TilloEntity`

Create a new `DigitalIssuePost` entity instance. Pass `nil` for no initial data.

#### `DigitalOrderCard(data map[string]any) TilloEntity`

Create a new `DigitalOrderCard` entity instance. Pass `nil` for no initial data.

#### `DigitalOrderStatus(data map[string]any) TilloEntity`

Create a new `DigitalOrderStatus` entity instance. Pass `nil` for no initial data.

#### `DigitalTopUpPost(data map[string]any) TilloEntity`

Create a new `DigitalTopUpPost` entity instance. Pass `nil` for no initial data.

#### `Float(data map[string]any) TilloEntity`

Create a new `Float` entity instance. Pass `nil` for no initial data.

#### `PhysicalGiftCard(data map[string]any) TilloEntity`

Create a new `PhysicalGiftCard` entity instance. Pass `nil` for no initial data.

#### `PhysicalOrderCard(data map[string]any) TilloEntity`

Create a new `PhysicalOrderCard` entity instance. Pass `nil` for no initial data.

#### `PhysicalOrderStatus(data map[string]any) TilloEntity`

Create a new `PhysicalOrderStatus` entity instance. Pass `nil` for no initial data.

#### `Promotion(data map[string]any) TilloEntity`

Create a new `Promotion` entity instance. Pass `nil` for no initial data.

#### `Template(data map[string]any) TilloEntity`

Create a new `Template` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BrandEntity

```go
brand := client.Brand(nil)
fmt.Println(brand.GetName()) // "brand"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brands` | `any` | No |  |
| `last_refreshed_at` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Brand(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BrandEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BrandTemplateEntity

```go
brandTemplate := client.BrandTemplate(nil)
fmt.Println(brandTemplate.GetName()) // "brand_template"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.BrandTemplate(nil).Load(map[string]any{"brand": "brand"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BrandTemplateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DigitalGiftCardEntity

```go
digitalGiftCard := client.DigitalGiftCard(nil)
fmt.Println(digitalGiftCard.GetName()) // "digital_gift_card"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | No | Gift card code |
| `data` | `map[string]any` | No |  |
| `face_value` | `map[string]any` | Yes |  |
| `message` | `string` | No |  |
| `original_client_request_id` | `string` | No | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | No | Gift card PIN. |
| `reference` | `string` | No | This is the `reference` you received when making the original issuance request. |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | No | The serial number is a required parameter for any Sainsburys brand |
| `status` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.DigitalGiftCard(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DigitalGiftCardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DigitalIssueDeleteEntity

```go
digitalIssueDelete := client.DigitalIssueDelete(nil)
fmt.Println(digitalIssueDelete.GetName()) // "digital_issue_delete"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `face_value` | `map[string]any` | Yes |  |
| `float_balance` | `map[string]any` | Yes | Your remaining balance on the float used for this cancellation transaction. |
| `original_client_request_id` | `string` | Yes | This field will be the `client_request_id` provided in the original transaction. |
| `reference` | `string` | Yes | Unique reference (UUID) for the cancellation transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `tags` | `[]any` | No | Optional meta data associated with the issuance. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.DigitalIssueDelete(nil).Remove(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DigitalIssueDeleteEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DigitalIssuePostEntity

```go
digitalIssuePost := client.DigitalIssuePost(nil)
fmt.Println(digitalIssuePost.GetName()) // "digital_issue_post"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode` | `map[string]any` | Yes | Some brands provide a barcode alongside a code delivery. |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | No | Gift card code (for code-delivery brands) |
| `cost_value` | `map[string]any` | Yes |  |
| `delivery_method` | `string` | Yes |  |
| `discount` | `float64` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `map[string]any` | Yes |  |
| `float_balance` | `map[string]any` | Yes |  |
| `fulfilment_by` | `string` | Yes | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `map[string]any` | Yes | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `map[string]any` | Yes |  |
| `pin` | `string` | No | Gift card PIN (for code-delivery brands). |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | No | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `[]any` | No | Optional meta data associated with the issuance. |
| `url` | `string` | No | Gift card URL (for URL-delivery brands) |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DigitalIssuePostEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DigitalOrderCardEntity

```go
digitalOrderCard := client.DigitalOrderCard(nil)
fmt.Println(digitalOrderCard.GetName()) // "digital_order_card"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `cost_value` | `map[string]any` | Yes |  |
| `delivery_method` | `string` | Yes |  |
| `face_value` | `map[string]any` | Yes |  |
| `float_balance` | `map[string]any` | Yes |  |
| `fulfilment_by` | `string` | Yes | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `map[string]any` | Yes | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `map[string]any` | Yes |  |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `tags` | `[]any` | No | Optional meta data associated with the issuance. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DigitalOrderCardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DigitalOrderStatusEntity

```go
digitalOrderStatus := client.DigitalOrderStatus(nil)
fmt.Println(digitalOrderStatus.GetName()) // "digital_order_status"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode` | `map[string]any` | Yes | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `brand` | `string` | No | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `code` | `string` | No | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `cost_value` | `map[string]any` | Yes | Cost value of the gift card (only present when status is 'SUCCESS') |
| `discount` | `float64` | No | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `map[string]any` | Yes | Face value of the gift card (only present when status is 'SUCCESS') |
| `pin` | `string` | No | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `security_code` | `string` | No | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `serial_number` | `string` | No | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `status` | `string` | Yes | The current status of the order |
| `url` | `string` | No | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.DigitalOrderStatus(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DigitalOrderStatusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DigitalTopUpPostEntity

```go
digitalTopUpPost := client.DigitalTopUpPost(nil)
fmt.Println(digitalTopUpPost.GetName()) // "digital_top_up_post"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | Yes | Gift card code |
| `cost_value` | `map[string]any` | Yes |  |
| `discount` | `float64` | Yes | The discount percentage used on this transaction |
| `face_value` | `map[string]any` | Yes |  |
| `float_balance` | `map[string]any` | Yes |  |
| `pin` | `string` | No | Gift card PIN. |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `[]any` | No | Optional meta data associated with the issuance. |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `brand` | - |
| `client_request_id` | - |
| `code` | Yes |
| `cost_value` | - |
| `discount` | - |
| `face_value` | - |
| `float_balance` | - |
| `pin` | - |
| `reference` | Yes |
| `sector` | - |
| `serial_number` | - |
| `tags` | - |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DigitalTopUpPostEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FloatEntity

```go
float := client.Float(nil)
fmt.Println(float.GetName()) // "float"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `floats` | `map[string]any` | Yes | Float balances grouped by currency code |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when the float data was last refreshed |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Float(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Float(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FloatEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PhysicalGiftCardEntity

```go
physicalGiftCard := client.PhysicalGiftCard(nil)
fmt.Println(physicalGiftCard.GetName()) // "physical_gift_card"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | Yes | The long card number on the physical gift card you wish to cash out |
| `cost_value` | `map[string]any` | Yes |  |
| `discount` | `float64` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `map[string]any` | Yes |  |
| `float_balance` | `map[string]any` | Yes |  |
| `fulfilled_at` | `string` | No | The date for which this this gift card was fulfilled. |
| `original_client_request_id` | `string` | Yes | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | No | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | No | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `[]any` | No | Optional meta data associated with the issuance. |
| `url` | `string` | No | Gift card URL (for URL-delivery brands) |

### Field Usage by Operation

| Field | create | remove |
| --- | --- | --- |
| `brand` | - | - |
| `client_request_id` | - | - |
| `code` | Yes | - |
| `cost_value` | - | - |
| `discount` | - | - |
| `expiration_date` | - | - |
| `face_value` | - | - |
| `float_balance` | - | - |
| `fulfilled_at` | - | - |
| `original_client_request_id` | - | - |
| `pin` | - | - |
| `reference` | - | - |
| `sector` | - | - |
| `security_code` | - | - |
| `serial_number` | - | - |
| `tags` | - | - |
| `url` | - | - |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.PhysicalGiftCard(nil).Remove(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PhysicalGiftCardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PhysicalOrderCardEntity

```go
physicalOrderCard := client.PhysicalOrderCard(nil)
fmt.Println(physicalOrderCard.GetName()) // "physical_order_card"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `cost_value` | `map[string]any` | Yes | The amount you actually paid (once the discount has been taken into consideration) |
| `discount` | `float64` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `map[string]any` | Yes | the face value amount of the gift card. |
| `float_balance` | `map[string]any` | Yes | Your remaining balance on the float used to make this transaction |
| `fulfilment_by` | `string` | Yes | When ordering a physical gift card, this must be set to `rewardcloud` |
| `fulfilment_parameters` | `map[string]any` | Yes |  |
| `personalisation` | `map[string]any` | Yes |  |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `shipping_method` | `string` | Yes | Shipping method identifier. |
| `tags` | `[]any` | No | Optional meta data associated with the issuance. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PhysicalOrderCardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PhysicalOrderStatusEntity

```go
physicalOrderStatus := client.PhysicalOrderStatus(nil)
fmt.Println(physicalOrderStatus.GetName()) // "physical_order_status"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `references` | `[]any` | Yes | Array of order references to check. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.PhysicalOrderStatus(nil).Create(map[string]any{
    "references": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PhysicalOrderStatusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PromotionEntity

```go
promotion := client.Promotion(nil)
fmt.Println(promotion.GetName()) // "promotion"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | `map[string]any` | Yes | Standard promotions grouped by brand slug. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Promotion(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PromotionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TemplateEntity

```go
template := client.Template(nil)
fmt.Println(template.GetName()) // "template"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | `map[string]any` | Yes | Object mapping brand slugs to their template variants and versions. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Template(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Request/response capture ring buffer for debugging |
| `idempotency` | 0.0.1 | Idempotency keys for safe retries of mutating operations |
| `metrics` | 0.0.1 | Statistics capture: per-operation counters and latency |
| `paging` | 0.0.1 | Pagination signals for list operations |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```go
client := sdk.NewTilloSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Request/response capture ring buffer for debugging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency keys for safe retries of mutating operations.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Statistics capture: per-operation counters and latency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Pagination signals for list operations.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

