# Tillo Lua SDK



The Lua SDK for the Tillo API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Brand()` — each with the same small set of operations (`list`, `load`, `create`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/tillo-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("tillo_sdk")

local client = sdk.new({
  apikey = os.getenv("TILLO_APIKEY"),
})
```

### 3. Load a brand

```lua
local brand, err = client:Brand():load()
if err then error(err) end
print(brand)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local promotion, err = client:Promotion():load()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Promotion():load()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### TilloSDK

```lua
local sdk = require("tillo_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### TilloSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Brand` | `(data) -> BrandEntity` | Create a Brand entity instance. |
| `BrandTemplate` | `(data) -> BrandTemplateEntity` | Create a BrandTemplate entity instance. |
| `DigitalGiftCard` | `(data) -> DigitalGiftCardEntity` | Create a DigitalGiftCard entity instance. |
| `DigitalIssueDelete` | `(data) -> DigitalIssueDeleteEntity` | Create a DigitalIssueDelete entity instance. |
| `DigitalIssuePost` | `(data) -> DigitalIssuePostEntity` | Create a DigitalIssuePost entity instance. |
| `DigitalOrderCard` | `(data) -> DigitalOrderCardEntity` | Create a DigitalOrderCard entity instance. |
| `DigitalOrderStatus` | `(data) -> DigitalOrderStatusEntity` | Create a DigitalOrderStatus entity instance. |
| `DigitalTopUpPost` | `(data) -> DigitalTopUpPostEntity` | Create a DigitalTopUpPost entity instance. |
| `Float` | `(data) -> FloatEntity` | Create a Float entity instance. |
| `PhysicalGiftCard` | `(data) -> PhysicalGiftCardEntity` | Create a PhysicalGiftCard entity instance. |
| `PhysicalOrderCard` | `(data) -> PhysicalOrderCardEntity` | Create a PhysicalOrderCard entity instance. |
| `PhysicalOrderStatus` | `(data) -> PhysicalOrderStatusEntity` | Create a PhysicalOrderStatus entity instance. |
| `Promotion` | `(data) -> PromotionEntity` | Create a Promotion entity instance. |
| `Template` | `(data) -> TemplateEntity` | Create a Template entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local brand, err = client:Brand():load()
    if err then error(err) end
    -- brand is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Brand

| Field | Description |
| --- | --- |
| `brands` |  |
| `last_refreshed_at` |  |

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
| `brand` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | Unique identifier for this request. |
| `code` | Gift card code |
| `data` |  |
| `face_value` |  |
| `message` |  |
| `original_client_request_id` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | Gift card PIN. |
| `reference` | This is the `reference` you received when making the original issuance request. |
| `sector` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | The serial number is a required parameter for any Sainsburys brand |
| `status` |  |

Operations: Create, Load.

API path: `/digital/check-balance`

#### DigitalIssueDelete

| Field | Description |
| --- | --- |
| `brand` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | Unique identifier for this request. |
| `face_value` |  |
| `float_balance` | Your remaining balance on the float used for this cancellation transaction. |
| `original_client_request_id` | This field will be the `client_request_id` provided in the original transaction. |
| `reference` | Unique reference (UUID) for the cancellation transaction |
| `sector` | Must match one of the sectors configured for your buyer account. |
| `tags` | Optional meta data associated with the issuance. |

Operations: Create, Remove.

API path: `/digital/reverse`

#### DigitalIssuePost

| Field | Description |
| --- | --- |
| `barcode` | Some brands provide a barcode alongside a code delivery. |
| `brand` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | Unique identifier for this request. |
| `code` | Gift card code (for code-delivery brands) |
| `cost_value` |  |
| `delivery_method` |  |
| `discount` | The discount percentage used on this transaction |
| `expiration_date` | The expiration date for this gift card. |
| `face_value` |  |
| `float_balance` |  |
| `fulfilment_by` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` |  |
| `pin` | Gift card PIN (for code-delivery brands). |
| `reference` | Unique reference for this transaction |
| `sector` | Must match one of the sectors configured for your buyer account. |
| `security_code` | Gift card security code (for code-delivery brands). |
| `serial_number` | Gift card serial number. |
| `tags` | Optional meta data associated with the issuance. |
| `url` | Gift card URL (for URL-delivery brands) |

Operations: Create.

API path: `/digital/issue`

#### DigitalOrderCard

| Field | Description |
| --- | --- |
| `brand` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | Unique identifier for this request. |
| `cost_value` |  |
| `delivery_method` |  |
| `face_value` |  |
| `float_balance` |  |
| `fulfilment_by` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` |  |
| `reference` | Unique reference for this transaction |
| `sector` | Must match one of the sectors configured for your buyer account. |
| `tags` | Optional meta data associated with the issuance. |

Operations: Create.

API path: `/digital/order-card`

#### DigitalOrderStatus

| Field | Description |
| --- | --- |
| `barcode` | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `brand` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `code` | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `cost_value` | Cost value of the gift card (only present when status is 'SUCCESS') |
| `discount` | The discount percentage used on this transaction |
| `expiration_date` | The expiration date for this gift card. |
| `face_value` | Face value of the gift card (only present when status is 'SUCCESS') |
| `pin` | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `reference` | Unique reference for this transaction |
| `security_code` | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `serial_number` | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `status` | The current status of the order |
| `url` | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

Operations: Load.

API path: `/digital/order-status`

#### DigitalTopUpPost

| Field | Description |
| --- | --- |
| `brand` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | Unique identifier for this request. |
| `code` | Gift card code |
| `cost_value` |  |
| `discount` | The discount percentage used on this transaction |
| `face_value` |  |
| `float_balance` |  |
| `pin` | Gift card PIN. |
| `reference` | Unique reference for this transaction |
| `sector` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | Gift card serial number. |
| `tags` | Optional meta data associated with the issuance. |

Operations: Create.

API path: `/digital/top-up`

#### Float

| Field | Description |
| --- | --- |
| `floats` | Float balances grouped by currency code |
| `last_refreshed_at` | ISO 8601 timestamp of when the float data was last refreshed |

Operations: Create, List, Load.

API path: `/float/request-payment-transfer`

#### PhysicalGiftCard

| Field | Description |
| --- | --- |
| `brand` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | Unique identifier for this request. |
| `code` | The long card number on the physical gift card you wish to cash out |
| `cost_value` |  |
| `discount` | The discount percentage used on this transaction |
| `expiration_date` | The expiration date for this gift card. |
| `face_value` |  |
| `float_balance` |  |
| `fulfilled_at` | The date for which this this gift card was fulfilled. |
| `original_client_request_id` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `reference` | Unique reference for this transaction |
| `sector` | Must match one of the sectors configured for your buyer account. |
| `security_code` | Gift card security code (for code-delivery brands). |
| `serial_number` | Gift card serial number. |
| `tags` | Optional meta data associated with the issuance. |
| `url` | Gift card URL (for URL-delivery brands) |

Operations: Create, Remove.

API path: `/physical/activate`

#### PhysicalOrderCard

| Field | Description |
| --- | --- |
| `brand` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | Unique identifier for this request. |
| `cost_value` | The amount you actually paid (once the discount has been taken into consideration) |
| `discount` | The discount percentage used on this transaction |
| `expiration_date` | The expiration date for this gift card. |
| `face_value` | the face value amount of the gift card. |
| `float_balance` | Your remaining balance on the float used to make this transaction |
| `fulfilment_by` | When ordering a physical gift card, this must be set to `rewardcloud` |
| `fulfilment_parameters` |  |
| `personalisation` |  |
| `reference` | Unique reference for this transaction |
| `sector` | Must match one of the sectors configured for your buyer account. |
| `shipping_method` | Shipping method identifier. |
| `tags` | Optional meta data associated with the issuance. |

Operations: Create.

API path: `/physical/order-card`

#### PhysicalOrderStatus

| Field | Description |
| --- | --- |
| `references` | Array of order references to check. |

Operations: Create.

API path: `/physical/order-status`

#### Promotion

| Field | Description |
| --- | --- |
| `last_refreshed_at` | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | Standard promotions grouped by brand slug. |

Operations: Load.

API path: `/promotions`

#### Template

| Field | Description |
| --- | --- |
| `last_refreshed_at` | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | Object mapping brand slugs to their template variants and versions. |

Operations: Load.

API path: `/templates`



## Entities


### Brand

Create an instance: `local brand = client:Brand(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brands` | `any` |  |
| `last_refreshed_at` | `string` |  |

#### Example: Load

```lua
local brand, err = client:Brand():load()
```


### BrandTemplate

Create an instance: `local brand_template = client:BrandTemplate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local brand_template, err = client:BrandTemplate():load({ brand = "brand" })
```


### DigitalGiftCard

Create an instance: `local digital_gift_card = client:DigitalGiftCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `code` | `string` | Gift card code |
| `data` | `table` |  |
| `face_value` | `table` |  |
| `message` | `string` |  |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | Gift card PIN. |
| `reference` | `string` | This is the `reference` you received when making the original issuance request. |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | The serial number is a required parameter for any Sainsburys brand |
| `status` | `string` |  |

#### Example: Load

```lua
local digital_gift_card, err = client:DigitalGiftCard():load()
```

#### Example: Create

```lua
local digital_gift_card, err = client:DigitalGiftCard():create({
  brand = "example_brand", -- string
  client_request_id = "example_client_request_id", -- string
  face_value = {}, -- table
  sector = "example_sector", -- string
})
```


### DigitalIssueDelete

Create an instance: `local digital_issue_delete = client:DigitalIssueDelete(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `face_value` | `table` |  |
| `float_balance` | `table` | Your remaining balance on the float used for this cancellation transaction. |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `reference` | `string` | Unique reference (UUID) for the cancellation transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `tags` | `table` | Optional meta data associated with the issuance. |

#### Example: Create

```lua
local digital_issue_delete, err = client:DigitalIssueDelete():create({
  brand = "example_brand", -- string
  client_request_id = "example_client_request_id", -- string
  face_value = {}, -- table
  float_balance = {}, -- table
  original_client_request_id = "example_original_client_request_id", -- string
  reference = "example_reference", -- string
  sector = "example_sector", -- string
})
```


### DigitalIssuePost

Create an instance: `local digital_issue_post = client:DigitalIssuePost(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `barcode` | `table` | Some brands provide a barcode alongside a code delivery. |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `code` | `string` | Gift card code (for code-delivery brands) |
| `cost_value` | `table` |  |
| `delivery_method` | `string` |  |
| `discount` | `number` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `table` |  |
| `float_balance` | `table` |  |
| `fulfilment_by` | `string` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `table` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `table` |  |
| `pin` | `string` | Gift card PIN (for code-delivery brands). |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `table` | Optional meta data associated with the issuance. |
| `url` | `string` | Gift card URL (for URL-delivery brands) |

#### Example: Create

```lua
local digital_issue_post, err = client:DigitalIssuePost():create({
  barcode = {}, -- table
  brand = "example_brand", -- string
  client_request_id = "example_client_request_id", -- string
  cost_value = {}, -- table
  delivery_method = "example_delivery_method", -- string
  discount = 1, -- number
  face_value = {}, -- table
  float_balance = {}, -- table
  fulfilment_by = "example_fulfilment_by", -- string
  fulfilment_parameters = {}, -- table
  personalisation = {}, -- table
  reference = "example_reference", -- string
  sector = "example_sector", -- string
})
```


### DigitalOrderCard

Create an instance: `local digital_order_card = client:DigitalOrderCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `cost_value` | `table` |  |
| `delivery_method` | `string` |  |
| `face_value` | `table` |  |
| `float_balance` | `table` |  |
| `fulfilment_by` | `string` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `table` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `table` |  |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `tags` | `table` | Optional meta data associated with the issuance. |

#### Example: Create

```lua
local digital_order_card, err = client:DigitalOrderCard():create({
  brand = "example_brand", -- string
  client_request_id = "example_client_request_id", -- string
  cost_value = {}, -- table
  delivery_method = "example_delivery_method", -- string
  face_value = {}, -- table
  float_balance = {}, -- table
  fulfilment_by = "example_fulfilment_by", -- string
  fulfilment_parameters = {}, -- table
  personalisation = {}, -- table
  reference = "example_reference", -- string
  sector = "example_sector", -- string
})
```


### DigitalOrderStatus

Create an instance: `local digital_order_status = client:DigitalOrderStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `barcode` | `table` | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `code` | `string` | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `cost_value` | `table` | Cost value of the gift card (only present when status is 'SUCCESS') |
| `discount` | `number` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `table` | Face value of the gift card (only present when status is 'SUCCESS') |
| `pin` | `string` | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `reference` | `string` | Unique reference for this transaction |
| `security_code` | `string` | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `serial_number` | `string` | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `status` | `string` | The current status of the order |
| `url` | `string` | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

#### Example: Load

```lua
local digital_order_status, err = client:DigitalOrderStatus():load()
```


### DigitalTopUpPost

Create an instance: `local digital_top_up_post = client:DigitalTopUpPost(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `code` | `string` | Gift card code |
| `cost_value` | `table` |  |
| `discount` | `number` | The discount percentage used on this transaction |
| `face_value` | `table` |  |
| `float_balance` | `table` |  |
| `pin` | `string` | Gift card PIN. |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `table` | Optional meta data associated with the issuance. |

#### Example: Create

```lua
local digital_top_up_post, err = client:DigitalTopUpPost():create({
  brand = "example_brand", -- string
  client_request_id = "example_client_request_id", -- string
  code = "example_code", -- string
  cost_value = {}, -- table
  discount = 1, -- number
  face_value = {}, -- table
  float_balance = {}, -- table
  reference = "example_reference", -- string
  sector = "example_sector", -- string
})
```


### Float

Create an instance: `local float = client:Float(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `floats` | `table` | Float balances grouped by currency code |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when the float data was last refreshed |

#### Example: Load

```lua
local float, err = client:Float():load()
```

#### Example: List

```lua
local floats, err = client:Float():list()
```

#### Example: Create

```lua
local float, err = client:Float():create({
  floats = {}, -- table
  last_refreshed_at = "example_last_refreshed_at", -- string
})
```


### PhysicalGiftCard

Create an instance: `local physical_gift_card = client:PhysicalGiftCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `code` | `string` | The long card number on the physical gift card you wish to cash out |
| `cost_value` | `table` |  |
| `discount` | `number` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `table` |  |
| `float_balance` | `table` |  |
| `fulfilled_at` | `string` | The date for which this this gift card was fulfilled. |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `table` | Optional meta data associated with the issuance. |
| `url` | `string` | Gift card URL (for URL-delivery brands) |

#### Example: Create

```lua
local physical_gift_card, err = client:PhysicalGiftCard():create({
  brand = "example_brand", -- string
  client_request_id = "example_client_request_id", -- string
  code = "example_code", -- string
  cost_value = {}, -- table
  discount = 1, -- number
  face_value = {}, -- table
  float_balance = {}, -- table
  original_client_request_id = "example_original_client_request_id", -- string
  reference = "example_reference", -- string
  sector = "example_sector", -- string
})
```


### PhysicalOrderCard

Create an instance: `local physical_order_card = client:PhysicalOrderCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `cost_value` | `table` | The amount you actually paid (once the discount has been taken into consideration) |
| `discount` | `number` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `table` | the face value amount of the gift card. |
| `float_balance` | `table` | Your remaining balance on the float used to make this transaction |
| `fulfilment_by` | `string` | When ordering a physical gift card, this must be set to `rewardcloud` |
| `fulfilment_parameters` | `table` |  |
| `personalisation` | `table` |  |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `shipping_method` | `string` | Shipping method identifier. |
| `tags` | `table` | Optional meta data associated with the issuance. |

#### Example: Create

```lua
local physical_order_card, err = client:PhysicalOrderCard():create({
  brand = "example_brand", -- string
  client_request_id = "example_client_request_id", -- string
  cost_value = {}, -- table
  discount = 1, -- number
  face_value = {}, -- table
  float_balance = {}, -- table
  fulfilment_by = "example_fulfilment_by", -- string
  fulfilment_parameters = {}, -- table
  personalisation = {}, -- table
  reference = "example_reference", -- string
  sector = "example_sector", -- string
  shipping_method = "example_shipping_method", -- string
})
```


### PhysicalOrderStatus

Create an instance: `local physical_order_status = client:PhysicalOrderStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `references` | `table` | Array of order references to check. |

#### Example: Create

```lua
local physical_order_status, err = client:PhysicalOrderStatus():create({
  references = {}, -- table
})
```


### Promotion

Create an instance: `local promotion = client:Promotion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | `table` | Standard promotions grouped by brand slug. |

#### Example: Load

```lua
local promotion, err = client:Promotion():load()
```


### Template

Create an instance: `local template = client:Template(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | `table` | Object mapping brand slugs to their template variants and versions. |

#### Example: Load

```lua
local template, err = client:Template():load()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

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

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── tillo_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`tillo_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local promotion = client:Promotion()
promotion:load()

-- promotion:data_get() now returns the promotion data from the last load
-- promotion:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
