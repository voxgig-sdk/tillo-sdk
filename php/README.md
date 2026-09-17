# Tillo PHP SDK



The PHP SDK for the Tillo API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Brand()` — with named operations (`list`/`load`/`create`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/tillo-sdk/releases](https://github.com/voxgig-sdk/tillo-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'tillo_sdk.php';

$client = new TilloSDK([
    "apikey" => getenv("TILLO_APIKEY"),
]);
```

### 3. Load a brand

```php
try {
    // load() returns the ENTITY — call data_get() for the Brand record (throws on error).
    $brand = $client->Brand()->load();
    print_r($brand->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $promotion = $client->Promotion()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = TilloSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$promotion = $client->Promotion()->load();
print_r($promotion->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new TilloSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
TILLO_TEST_LIVE=TRUE
TILLO_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### TilloSDK

```php
require_once 'tillo_sdk.php';
$client = new TilloSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = TilloSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### TilloSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Brand` | `($data): BrandEntity` | Create a Brand entity instance. |
| `BrandTemplate` | `($data): BrandTemplateEntity` | Create a BrandTemplate entity instance. |
| `DigitalGiftCard` | `($data): DigitalGiftCardEntity` | Create a DigitalGiftCard entity instance. |
| `DigitalIssueDelete` | `($data): DigitalIssueDeleteEntity` | Create a DigitalIssueDelete entity instance. |
| `DigitalIssuePost` | `($data): DigitalIssuePostEntity` | Create a DigitalIssuePost entity instance. |
| `DigitalOrderCard` | `($data): DigitalOrderCardEntity` | Create a DigitalOrderCard entity instance. |
| `DigitalOrderStatus` | `($data): DigitalOrderStatusEntity` | Create a DigitalOrderStatus entity instance. |
| `DigitalTopUpPost` | `($data): DigitalTopUpPostEntity` | Create a DigitalTopUpPost entity instance. |
| `Float` | `($data): FloatEntity` | Create a Float entity instance. |
| `PhysicalGiftCard` | `($data): PhysicalGiftCardEntity` | Create a PhysicalGiftCard entity instance. |
| `PhysicalOrderCard` | `($data): PhysicalOrderCardEntity` | Create a PhysicalOrderCard entity instance. |
| `PhysicalOrderStatus` | `($data): PhysicalOrderStatusEntity` | Create a PhysicalOrderStatus entity instance. |
| `Promotion` | `($data): PromotionEntity` | Create a Promotion entity instance. |
| `Template` | `($data): TemplateEntity` | Create a Template entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$brand = $client->Brand();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brands` | `mixed` |  |
| `last_refreshed_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Brand record (throws on error).
$brand = $client->Brand()->load();
```


### BrandTemplate

Create an instance: `$brand_template = $client->BrandTemplate();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BrandTemplate record (throws on error).
$brand_template = $client->BrandTemplate()->load(["brand" => "brand"]);
```


### DigitalGiftCard

Create an instance: `$digital_gift_card = $client->DigitalGiftCard();`

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
| `data` | `array` |  |
| `face_value` | `array` |  |
| `message` | `string` |  |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | Gift card PIN. |
| `reference` | `string` | This is the `reference` you received when making the original issuance request. |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | The serial number is a required parameter for any Sainsburys brand |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DigitalGiftCard record (throws on error).
$digital_gift_card = $client->DigitalGiftCard()->load();
```

#### Example: Create

```php
$digital_gift_card = $client->DigitalGiftCard()->create([
    "brand" => null, // string
    "client_request_id" => null, // string
    "face_value" => null, // array
    "sector" => null, // string
]);
```


### DigitalIssueDelete

Create an instance: `$digital_issue_delete = $client->DigitalIssueDelete();`

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
| `face_value` | `array` |  |
| `float_balance` | `array` | Your remaining balance on the float used for this cancellation transaction. |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `reference` | `string` | Unique reference (UUID) for the cancellation transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `tags` | `array` | Optional meta data associated with the issuance. |

#### Example: Create

```php
$digital_issue_delete = $client->DigitalIssueDelete()->create([
    "brand" => null, // string
    "client_request_id" => null, // string
    "face_value" => null, // array
    "float_balance" => null, // array
    "original_client_request_id" => null, // string
    "reference" => null, // string
    "sector" => null, // string
]);
```


### DigitalIssuePost

Create an instance: `$digital_issue_post = $client->DigitalIssuePost();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `barcode` | `array` | Some brands provide a barcode alongside a code delivery. |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `code` | `string` | Gift card code (for code-delivery brands) |
| `cost_value` | `array` |  |
| `delivery_method` | `string` |  |
| `discount` | `float` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `array` |  |
| `float_balance` | `array` |  |
| `fulfilment_by` | `string` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `array` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `array` |  |
| `pin` | `string` | Gift card PIN (for code-delivery brands). |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `array` | Optional meta data associated with the issuance. |
| `url` | `string` | Gift card URL (for URL-delivery brands) |

#### Example: Create

```php
$digital_issue_post = $client->DigitalIssuePost()->create([
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


### DigitalOrderCard

Create an instance: `$digital_order_card = $client->DigitalOrderCard();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `cost_value` | `array` |  |
| `delivery_method` | `string` |  |
| `face_value` | `array` |  |
| `float_balance` | `array` |  |
| `fulfilment_by` | `string` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `array` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `array` |  |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `tags` | `array` | Optional meta data associated with the issuance. |

#### Example: Create

```php
$digital_order_card = $client->DigitalOrderCard()->create([
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


### DigitalOrderStatus

Create an instance: `$digital_order_status = $client->DigitalOrderStatus();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `barcode` | `array` | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `code` | `string` | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `cost_value` | `array` | Cost value of the gift card (only present when status is 'SUCCESS') |
| `discount` | `float` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `array` | Face value of the gift card (only present when status is 'SUCCESS') |
| `pin` | `string` | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `reference` | `string` | Unique reference for this transaction |
| `security_code` | `string` | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `serial_number` | `string` | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `status` | `string` | The current status of the order |
| `url` | `string` | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DigitalOrderStatus record (throws on error).
$digital_order_status = $client->DigitalOrderStatus()->load();
```


### DigitalTopUpPost

Create an instance: `$digital_top_up_post = $client->DigitalTopUpPost();`

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
| `cost_value` | `array` |  |
| `discount` | `float` | The discount percentage used on this transaction |
| `face_value` | `array` |  |
| `float_balance` | `array` |  |
| `pin` | `string` | Gift card PIN. |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `array` | Optional meta data associated with the issuance. |

#### Example: Create

```php
$digital_top_up_post = $client->DigitalTopUpPost()->create([
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


### Float

Create an instance: `$float = $client->Float();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `floats` | `array` | Float balances grouped by currency code |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when the float data was last refreshed |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Float record (throws on error).
$float = $client->Float()->load();
```

#### Example: List

```php
// list() returns an array of Float records (throws on error).
$floats = $client->Float()->list();
```

#### Example: Create

```php
$float = $client->Float()->create([
    "floats" => null, // array
    "last_refreshed_at" => null, // string
]);
```


### PhysicalGiftCard

Create an instance: `$physical_gift_card = $client->PhysicalGiftCard();`

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
| `cost_value` | `array` |  |
| `discount` | `float` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `array` |  |
| `float_balance` | `array` |  |
| `fulfilled_at` | `string` | The date for which this this gift card was fulfilled. |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `array` | Optional meta data associated with the issuance. |
| `url` | `string` | Gift card URL (for URL-delivery brands) |

#### Example: Create

```php
$physical_gift_card = $client->PhysicalGiftCard()->create([
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


### PhysicalOrderCard

Create an instance: `$physical_order_card = $client->PhysicalOrderCard();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `cost_value` | `array` | The amount you actually paid (once the discount has been taken into consideration) |
| `discount` | `float` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `array` | the face value amount of the gift card. |
| `float_balance` | `array` | Your remaining balance on the float used to make this transaction |
| `fulfilment_by` | `string` | When ordering a physical gift card, this must be set to `rewardcloud` |
| `fulfilment_parameters` | `array` |  |
| `personalisation` | `array` |  |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `shipping_method` | `string` | Shipping method identifier. |
| `tags` | `array` | Optional meta data associated with the issuance. |

#### Example: Create

```php
$physical_order_card = $client->PhysicalOrderCard()->create([
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


### PhysicalOrderStatus

Create an instance: `$physical_order_status = $client->PhysicalOrderStatus();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `references` | `array` | Array of order references to check. |

#### Example: Create

```php
$physical_order_status = $client->PhysicalOrderStatus()->create([
    "references" => null, // array
]);
```


### Promotion

Create an instance: `$promotion = $client->Promotion();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | `array` | Standard promotions grouped by brand slug. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Promotion record (throws on error).
$promotion = $client->Promotion()->load();
```


### Template

Create an instance: `$template = $client->Template();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | `array` | Object mapping brand slugs to their template variants and versions. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Template record (throws on error).
$template = $client->Template()->load();
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

Features are the extension mechanism. A feature is a PHP class
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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── tillo_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`tillo_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$promotion = $client->Promotion();
$promotion->load();

// $promotion->data_get() now returns the promotion data from the last load
// $promotion->match_get() returns the last match criteria
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
