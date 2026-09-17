# Tillo Lua SDK Reference

Complete API reference for the Tillo Lua SDK.


## TilloSDK

### Constructor

```lua
local sdk = require("tillo_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Brand(data)`

Create a new `Brand` entity instance. Pass `nil` for no initial data.

#### `BrandTemplate(data)`

Create a new `BrandTemplate` entity instance. Pass `nil` for no initial data.

#### `DigitalGiftCard(data)`

Create a new `DigitalGiftCard` entity instance. Pass `nil` for no initial data.

#### `DigitalIssueDelete(data)`

Create a new `DigitalIssueDelete` entity instance. Pass `nil` for no initial data.

#### `DigitalIssuePost(data)`

Create a new `DigitalIssuePost` entity instance. Pass `nil` for no initial data.

#### `DigitalOrderCard(data)`

Create a new `DigitalOrderCard` entity instance. Pass `nil` for no initial data.

#### `DigitalOrderStatus(data)`

Create a new `DigitalOrderStatus` entity instance. Pass `nil` for no initial data.

#### `DigitalTopUpPost(data)`

Create a new `DigitalTopUpPost` entity instance. Pass `nil` for no initial data.

#### `Float(data)`

Create a new `Float` entity instance. Pass `nil` for no initial data.

#### `PhysicalGiftCard(data)`

Create a new `PhysicalGiftCard` entity instance. Pass `nil` for no initial data.

#### `PhysicalOrderCard(data)`

Create a new `PhysicalOrderCard` entity instance. Pass `nil` for no initial data.

#### `PhysicalOrderStatus(data)`

Create a new `PhysicalOrderStatus` entity instance. Pass `nil` for no initial data.

#### `Promotion(data)`

Create a new `Promotion` entity instance. Pass `nil` for no initial data.

#### `Template(data)`

Create a new `Template` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BrandEntity

```lua
local brand = client:Brand(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brands` | `any` | No |  |
| `last_refreshed_at` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Brand():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrandEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BrandTemplateEntity

```lua
local brand_template = client:BrandTemplate(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:BrandTemplate():load({ brand = "brand" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrandTemplateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DigitalGiftCardEntity

```lua
local digital_gift_card = client:DigitalGiftCard(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | No | Gift card code |
| `data` | `table` | No |  |
| `face_value` | `table` | Yes |  |
| `message` | `string` | No |  |
| `original_client_request_id` | `string` | No | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | No | Gift card PIN. |
| `reference` | `string` | No | This is the `reference` you received when making the original issuance request. |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | No | The serial number is a required parameter for any Sainsburys brand |
| `status` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:DigitalGiftCard():create({
  brand = --[[ string ]],
  client_request_id = --[[ string ]],
  face_value = --[[ table ]],
  sector = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:DigitalGiftCard():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalGiftCardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DigitalIssueDeleteEntity

```lua
local digital_issue_delete = client:DigitalIssueDelete(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `face_value` | `table` | Yes |  |
| `float_balance` | `table` | Yes | Your remaining balance on the float used for this cancellation transaction. |
| `original_client_request_id` | `string` | Yes | This field will be the `client_request_id` provided in the original transaction. |
| `reference` | `string` | Yes | Unique reference (UUID) for the cancellation transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `tags` | `table` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:DigitalIssueDelete():create({
  brand = --[[ string ]],
  client_request_id = --[[ string ]],
  face_value = --[[ table ]],
  float_balance = --[[ table ]],
  original_client_request_id = --[[ string ]],
  reference = --[[ string ]],
  sector = --[[ string ]],
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:DigitalIssueDelete():remove()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalIssueDeleteEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DigitalIssuePostEntity

```lua
local digital_issue_post = client:DigitalIssuePost(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode` | `table` | Yes | Some brands provide a barcode alongside a code delivery. |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | No | Gift card code (for code-delivery brands) |
| `cost_value` | `table` | Yes |  |
| `delivery_method` | `string` | Yes |  |
| `discount` | `number` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `table` | Yes |  |
| `float_balance` | `table` | Yes |  |
| `fulfilment_by` | `string` | Yes | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `table` | Yes | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `table` | Yes |  |
| `pin` | `string` | No | Gift card PIN (for code-delivery brands). |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | No | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `table` | No | Optional meta data associated with the issuance. |
| `url` | `string` | No | Gift card URL (for URL-delivery brands) |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:DigitalIssuePost():create({
  barcode = --[[ table ]],
  brand = --[[ string ]],
  client_request_id = --[[ string ]],
  cost_value = --[[ table ]],
  delivery_method = --[[ string ]],
  discount = --[[ number ]],
  face_value = --[[ table ]],
  float_balance = --[[ table ]],
  fulfilment_by = --[[ string ]],
  fulfilment_parameters = --[[ table ]],
  personalisation = --[[ table ]],
  reference = --[[ string ]],
  sector = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalIssuePostEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DigitalOrderCardEntity

```lua
local digital_order_card = client:DigitalOrderCard(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `cost_value` | `table` | Yes |  |
| `delivery_method` | `string` | Yes |  |
| `face_value` | `table` | Yes |  |
| `float_balance` | `table` | Yes |  |
| `fulfilment_by` | `string` | Yes | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `table` | Yes | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `table` | Yes |  |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `tags` | `table` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:DigitalOrderCard():create({
  brand = --[[ string ]],
  client_request_id = --[[ string ]],
  cost_value = --[[ table ]],
  delivery_method = --[[ string ]],
  face_value = --[[ table ]],
  float_balance = --[[ table ]],
  fulfilment_by = --[[ string ]],
  fulfilment_parameters = --[[ table ]],
  personalisation = --[[ table ]],
  reference = --[[ string ]],
  sector = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalOrderCardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DigitalOrderStatusEntity

```lua
local digital_order_status = client:DigitalOrderStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode` | `table` | Yes | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `brand` | `string` | No | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `code` | `string` | No | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `cost_value` | `table` | Yes | Cost value of the gift card (only present when status is 'SUCCESS') |
| `discount` | `number` | No | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `table` | Yes | Face value of the gift card (only present when status is 'SUCCESS') |
| `pin` | `string` | No | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `security_code` | `string` | No | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `serial_number` | `string` | No | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `status` | `string` | Yes | The current status of the order |
| `url` | `string` | No | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:DigitalOrderStatus():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalOrderStatusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DigitalTopUpPostEntity

```lua
local digital_top_up_post = client:DigitalTopUpPost(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | Yes | Gift card code |
| `cost_value` | `table` | Yes |  |
| `discount` | `number` | Yes | The discount percentage used on this transaction |
| `face_value` | `table` | Yes |  |
| `float_balance` | `table` | Yes |  |
| `pin` | `string` | No | Gift card PIN. |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `table` | No | Optional meta data associated with the issuance. |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:DigitalTopUpPost():create({
  brand = --[[ string ]],
  client_request_id = --[[ string ]],
  code = --[[ string ]],
  cost_value = --[[ table ]],
  discount = --[[ number ]],
  face_value = --[[ table ]],
  float_balance = --[[ table ]],
  reference = --[[ string ]],
  sector = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalTopUpPostEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FloatEntity

```lua
local float = client:Float(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `floats` | `table` | Yes | Float balances grouped by currency code |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when the float data was last refreshed |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Float():create({
  floats = --[[ table ]],
  last_refreshed_at = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Float():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Float():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FloatEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhysicalGiftCardEntity

```lua
local physical_gift_card = client:PhysicalGiftCard(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | Yes | The long card number on the physical gift card you wish to cash out |
| `cost_value` | `table` | Yes |  |
| `discount` | `number` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `table` | Yes |  |
| `float_balance` | `table` | Yes |  |
| `fulfilled_at` | `string` | No | The date for which this this gift card was fulfilled. |
| `original_client_request_id` | `string` | Yes | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | No | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | No | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `table` | No | Optional meta data associated with the issuance. |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:PhysicalGiftCard():create({
  brand = --[[ string ]],
  client_request_id = --[[ string ]],
  code = --[[ string ]],
  cost_value = --[[ table ]],
  discount = --[[ number ]],
  face_value = --[[ table ]],
  float_balance = --[[ table ]],
  original_client_request_id = --[[ string ]],
  reference = --[[ string ]],
  sector = --[[ string ]],
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:PhysicalGiftCard():remove()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhysicalGiftCardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhysicalOrderCardEntity

```lua
local physical_order_card = client:PhysicalOrderCard(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `cost_value` | `table` | Yes | The amount you actually paid (once the discount has been taken into consideration) |
| `discount` | `number` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `table` | Yes | the face value amount of the gift card. |
| `float_balance` | `table` | Yes | Your remaining balance on the float used to make this transaction |
| `fulfilment_by` | `string` | Yes | When ordering a physical gift card, this must be set to `rewardcloud` |
| `fulfilment_parameters` | `table` | Yes |  |
| `personalisation` | `table` | Yes |  |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `shipping_method` | `string` | Yes | Shipping method identifier. |
| `tags` | `table` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:PhysicalOrderCard():create({
  brand = --[[ string ]],
  client_request_id = --[[ string ]],
  cost_value = --[[ table ]],
  discount = --[[ number ]],
  face_value = --[[ table ]],
  float_balance = --[[ table ]],
  fulfilment_by = --[[ string ]],
  fulfilment_parameters = --[[ table ]],
  personalisation = --[[ table ]],
  reference = --[[ string ]],
  sector = --[[ string ]],
  shipping_method = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhysicalOrderCardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhysicalOrderStatusEntity

```lua
local physical_order_status = client:PhysicalOrderStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `references` | `table` | Yes | Array of order references to check. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:PhysicalOrderStatus():create({
  references = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhysicalOrderStatusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PromotionEntity

```lua
local promotion = client:Promotion(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | `table` | Yes | Standard promotions grouped by brand slug. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Promotion():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PromotionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TemplateEntity

```lua
local template = client:Template(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | `table` | Yes | Object mapping brand slugs to their template variants and versions. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Template():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    debug = { active = true },
    idempotency = { active = true },
    metrics = { active = true },
    paging = { active = true },
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
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

