# Tillo PHP SDK Reference

Complete API reference for the Tillo PHP SDK.


## TilloSDK

### Constructor

```php
require_once __DIR__ . '/tillo_sdk.php';

$client = new TilloSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TilloSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = TilloSDK::test();
```


### Instance Methods

#### `Brand($data = null)`

Create a new `BrandEntity` instance. Pass `null` for no initial data.

#### `BrandTemplate($data = null)`

Create a new `BrandTemplateEntity` instance. Pass `null` for no initial data.

#### `DigitalGiftCard($data = null)`

Create a new `DigitalGiftCardEntity` instance. Pass `null` for no initial data.

#### `DigitalIssueDelete($data = null)`

Create a new `DigitalIssueDeleteEntity` instance. Pass `null` for no initial data.

#### `DigitalIssuePost($data = null)`

Create a new `DigitalIssuePostEntity` instance. Pass `null` for no initial data.

#### `DigitalOrderCard($data = null)`

Create a new `DigitalOrderCardEntity` instance. Pass `null` for no initial data.

#### `DigitalOrderStatus($data = null)`

Create a new `DigitalOrderStatusEntity` instance. Pass `null` for no initial data.

#### `DigitalTopUpPost($data = null)`

Create a new `DigitalTopUpPostEntity` instance. Pass `null` for no initial data.

#### `Float($data = null)`

Create a new `FloatEntity` instance. Pass `null` for no initial data.

#### `PhysicalGiftCard($data = null)`

Create a new `PhysicalGiftCardEntity` instance. Pass `null` for no initial data.

#### `PhysicalOrderCard($data = null)`

Create a new `PhysicalOrderCardEntity` instance. Pass `null` for no initial data.

#### `PhysicalOrderStatus($data = null)`

Create a new `PhysicalOrderStatusEntity` instance. Pass `null` for no initial data.

#### `Promotion($data = null)`

Create a new `PromotionEntity` instance. Pass `null` for no initial data.

#### `Template($data = null)`

Create a new `TemplateEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): TilloUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BrandEntity

```php
$brand = $client->Brand();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brands` | `mixed` | No |  |
| `last_refreshed_at` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Brand()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BrandEntity`

Create a new `BrandEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BrandTemplateEntity

```php
$brand_template = $client->BrandTemplate();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->BrandTemplate()->load(["brand" => "brand"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BrandTemplateEntity`

Create a new `BrandTemplateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DigitalGiftCardEntity

```php
$digital_gift_card = $client->DigitalGiftCard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | No | Gift card code |
| `data` | `array` | No |  |
| `face_value` | `array` | Yes |  |
| `message` | `string` | No |  |
| `original_client_request_id` | `string` | No | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | No | Gift card PIN. |
| `reference` | `string` | No | This is the `reference` you received when making the original issuance request. |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | No | The serial number is a required parameter for any Sainsburys brand |
| `status` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->DigitalGiftCard()->create([
  "brand" => null, // string
  "client_request_id" => null, // string
  "face_value" => null, // array
  "sector" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->DigitalGiftCard()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DigitalGiftCardEntity`

Create a new `DigitalGiftCardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DigitalIssueDeleteEntity

```php
$digital_issue_delete = $client->DigitalIssueDelete();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `face_value` | `array` | Yes |  |
| `float_balance` | `array` | Yes | Your remaining balance on the float used for this cancellation transaction. |
| `original_client_request_id` | `string` | Yes | This field will be the `client_request_id` provided in the original transaction. |
| `reference` | `string` | Yes | Unique reference (UUID) for the cancellation transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `tags` | `array` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->DigitalIssueDelete()->create([
  "brand" => null, // string
  "client_request_id" => null, // string
  "face_value" => null, // array
  "float_balance" => null, // array
  "original_client_request_id" => null, // string
  "reference" => null, // string
  "sector" => null, // string
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->DigitalIssueDelete()->remove();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DigitalIssueDeleteEntity`

Create a new `DigitalIssueDeleteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DigitalIssuePostEntity

```php
$digital_issue_post = $client->DigitalIssuePost();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode` | `array` | Yes | Some brands provide a barcode alongside a code delivery. |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | No | Gift card code (for code-delivery brands) |
| `cost_value` | `array` | Yes |  |
| `delivery_method` | `string` | Yes |  |
| `discount` | `float` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `array` | Yes |  |
| `float_balance` | `array` | Yes |  |
| `fulfilment_by` | `string` | Yes | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `array` | Yes | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `array` | Yes |  |
| `pin` | `string` | No | Gift card PIN (for code-delivery brands). |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | No | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `array` | No | Optional meta data associated with the issuance. |
| `url` | `string` | No | Gift card URL (for URL-delivery brands) |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->DigitalIssuePost()->create([
  "barcode" => null, // array
  "brand" => null, // string
  "client_request_id" => null, // string
  "cost_value" => null, // array
  "delivery_method" => null, // string
  "discount" => null, // float
  "face_value" => null, // array
  "float_balance" => null, // array
  "fulfilment_by" => null, // string
  "fulfilment_parameters" => null, // array
  "personalisation" => null, // array
  "reference" => null, // string
  "sector" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DigitalIssuePostEntity`

Create a new `DigitalIssuePostEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DigitalOrderCardEntity

```php
$digital_order_card = $client->DigitalOrderCard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `cost_value` | `array` | Yes |  |
| `delivery_method` | `string` | Yes |  |
| `face_value` | `array` | Yes |  |
| `float_balance` | `array` | Yes |  |
| `fulfilment_by` | `string` | Yes | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `array` | Yes | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `array` | Yes |  |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `tags` | `array` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->DigitalOrderCard()->create([
  "brand" => null, // string
  "client_request_id" => null, // string
  "cost_value" => null, // array
  "delivery_method" => null, // string
  "face_value" => null, // array
  "float_balance" => null, // array
  "fulfilment_by" => null, // string
  "fulfilment_parameters" => null, // array
  "personalisation" => null, // array
  "reference" => null, // string
  "sector" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DigitalOrderCardEntity`

Create a new `DigitalOrderCardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DigitalOrderStatusEntity

```php
$digital_order_status = $client->DigitalOrderStatus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode` | `array` | Yes | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `brand` | `string` | No | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `code` | `string` | No | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `cost_value` | `array` | Yes | Cost value of the gift card (only present when status is 'SUCCESS') |
| `discount` | `float` | No | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `array` | Yes | Face value of the gift card (only present when status is 'SUCCESS') |
| `pin` | `string` | No | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `security_code` | `string` | No | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `serial_number` | `string` | No | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `status` | `string` | Yes | The current status of the order |
| `url` | `string` | No | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->DigitalOrderStatus()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DigitalOrderStatusEntity`

Create a new `DigitalOrderStatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DigitalTopUpPostEntity

```php
$digital_top_up_post = $client->DigitalTopUpPost();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | Yes | Gift card code |
| `cost_value` | `array` | Yes |  |
| `discount` | `float` | Yes | The discount percentage used on this transaction |
| `face_value` | `array` | Yes |  |
| `float_balance` | `array` | Yes |  |
| `pin` | `string` | No | Gift card PIN. |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `array` | No | Optional meta data associated with the issuance. |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->DigitalTopUpPost()->create([
  "brand" => null, // string
  "client_request_id" => null, // string
  "code" => null, // string
  "cost_value" => null, // array
  "discount" => null, // float
  "face_value" => null, // array
  "float_balance" => null, // array
  "reference" => null, // string
  "sector" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DigitalTopUpPostEntity`

Create a new `DigitalTopUpPostEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FloatEntity

```php
$float = $client->Float();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `floats` | `array` | Yes | Float balances grouped by currency code |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when the float data was last refreshed |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Float()->create([
  "floats" => null, // array
  "last_refreshed_at" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Float()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Float()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FloatEntity`

Create a new `FloatEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PhysicalGiftCardEntity

```php
$physical_gift_card = $client->PhysicalGiftCard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | Yes | The long card number on the physical gift card you wish to cash out |
| `cost_value` | `array` | Yes |  |
| `discount` | `float` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `array` | Yes |  |
| `float_balance` | `array` | Yes |  |
| `fulfilled_at` | `string` | No | The date for which this this gift card was fulfilled. |
| `original_client_request_id` | `string` | Yes | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | No | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | No | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `array` | No | Optional meta data associated with the issuance. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->PhysicalGiftCard()->create([
  "brand" => null, // string
  "client_request_id" => null, // string
  "code" => null, // string
  "cost_value" => null, // array
  "discount" => null, // float
  "face_value" => null, // array
  "float_balance" => null, // array
  "original_client_request_id" => null, // string
  "reference" => null, // string
  "sector" => null, // string
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->PhysicalGiftCard()->remove();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PhysicalGiftCardEntity`

Create a new `PhysicalGiftCardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PhysicalOrderCardEntity

```php
$physical_order_card = $client->PhysicalOrderCard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `cost_value` | `array` | Yes | The amount you actually paid (once the discount has been taken into consideration) |
| `discount` | `float` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `array` | Yes | the face value amount of the gift card. |
| `float_balance` | `array` | Yes | Your remaining balance on the float used to make this transaction |
| `fulfilment_by` | `string` | Yes | When ordering a physical gift card, this must be set to `rewardcloud` |
| `fulfilment_parameters` | `array` | Yes |  |
| `personalisation` | `array` | Yes |  |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `shipping_method` | `string` | Yes | Shipping method identifier. |
| `tags` | `array` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->PhysicalOrderCard()->create([
  "brand" => null, // string
  "client_request_id" => null, // string
  "cost_value" => null, // array
  "discount" => null, // float
  "face_value" => null, // array
  "float_balance" => null, // array
  "fulfilment_by" => null, // string
  "fulfilment_parameters" => null, // array
  "personalisation" => null, // array
  "reference" => null, // string
  "sector" => null, // string
  "shipping_method" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PhysicalOrderCardEntity`

Create a new `PhysicalOrderCardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PhysicalOrderStatusEntity

```php
$physical_order_status = $client->PhysicalOrderStatus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `references` | `array` | Yes | Array of order references to check. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->PhysicalOrderStatus()->create([
  "references" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PhysicalOrderStatusEntity`

Create a new `PhysicalOrderStatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PromotionEntity

```php
$promotion = $client->Promotion();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | `array` | Yes | Standard promotions grouped by brand slug. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Promotion()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PromotionEntity`

Create a new `PromotionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TemplateEntity

```php
$template = $client->Template();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | `array` | Yes | Object mapping brand slugs to their template variants and versions. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Template()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TemplateEntity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new TilloSDK([
  "feature" => [
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

