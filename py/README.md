# Tillo Python SDK



The Python SDK for the Tillo API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Brand()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/tillo-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from tillo_sdk import TilloSDK

client = TilloSDK({
    "apikey": os.environ.get("TILLO_APIKEY"),
})
```

### 3. Load a brand

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    brand = client.Brand().load()
    print(brand)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    promotion = client.Promotion().load()
    print(promotion)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = TilloSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
promotion = client.Promotion().load()
# promotion contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = TilloSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### TilloSDK

```python
from tillo_sdk import TilloSDK

client = TilloSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = TilloSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### TilloSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `brand = client.Brand()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brands` | `Any` |  |
| `last_refreshed_at` | `str` |  |

#### Example: Load

```python
brand = client.Brand().load()
```


### BrandTemplate

Create an instance: `brand_template = client.BrandTemplate()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
brand_template = client.BrandTemplate().load({"brand": "brand"})
```


### DigitalGiftCard

Create an instance: `digital_gift_card = client.DigitalGiftCard()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `str` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Unique identifier for this request. |
| `code` | `str` | Gift card code |
| `data` | `dict` |  |
| `face_value` | `dict` |  |
| `message` | `str` |  |
| `original_client_request_id` | `str` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `str` | Gift card PIN. |
| `reference` | `str` | This is the `reference` you received when making the original issuance request. |
| `sector` | `str` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `str` | The serial number is a required parameter for any Sainsburys brand |
| `status` | `str` |  |

#### Example: Load

```python
digital_gift_card = client.DigitalGiftCard().load()
```

#### Example: Create

```python
digital_gift_card = client.DigitalGiftCard().create({
    "brand": "example_brand",  # str
    "client_request_id": "example_client_request_id",  # str
    "face_value": {},  # dict
    "sector": "example_sector",  # str
})
```


### DigitalIssueDelete

Create an instance: `digital_issue_delete = client.DigitalIssueDelete()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `str` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Unique identifier for this request. |
| `face_value` | `dict` |  |
| `float_balance` | `dict` | Your remaining balance on the float used for this cancellation transaction. |
| `original_client_request_id` | `str` | This field will be the `client_request_id` provided in the original transaction. |
| `reference` | `str` | Unique reference (UUID) for the cancellation transaction |
| `sector` | `str` | Must match one of the sectors configured for your buyer account. |
| `tags` | `list` | Optional meta data associated with the issuance. |

#### Example: Create

```python
digital_issue_delete = client.DigitalIssueDelete().create({
    "brand": "example_brand",  # str
    "client_request_id": "example_client_request_id",  # str
    "face_value": {},  # dict
    "float_balance": {},  # dict
    "original_client_request_id": "example_original_client_request_id",  # str
    "reference": "example_reference",  # str
    "sector": "example_sector",  # str
})
```


### DigitalIssuePost

Create an instance: `digital_issue_post = client.DigitalIssuePost()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `barcode` | `dict` | Some brands provide a barcode alongside a code delivery. |
| `brand` | `str` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Unique identifier for this request. |
| `code` | `str` | Gift card code (for code-delivery brands) |
| `cost_value` | `dict` |  |
| `delivery_method` | `str` |  |
| `discount` | `float` | The discount percentage used on this transaction |
| `expiration_date` | `str` | The expiration date for this gift card. |
| `face_value` | `dict` |  |
| `float_balance` | `dict` |  |
| `fulfilment_by` | `str` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `dict` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `dict` |  |
| `pin` | `str` | Gift card PIN (for code-delivery brands). |
| `reference` | `str` | Unique reference for this transaction |
| `sector` | `str` | Must match one of the sectors configured for your buyer account. |
| `security_code` | `str` | Gift card security code (for code-delivery brands). |
| `serial_number` | `str` | Gift card serial number. |
| `tags` | `list` | Optional meta data associated with the issuance. |
| `url` | `str` | Gift card URL (for URL-delivery brands) |

#### Example: Create

```python
digital_issue_post = client.DigitalIssuePost().create({
    "barcode": {},  # dict
    "brand": "example_brand",  # str
    "client_request_id": "example_client_request_id",  # str
    "cost_value": {},  # dict
    "delivery_method": "example_delivery_method",  # str
    "discount": 1,  # float
    "face_value": {},  # dict
    "float_balance": {},  # dict
    "fulfilment_by": "example_fulfilment_by",  # str
    "fulfilment_parameters": {},  # dict
    "personalisation": {},  # dict
    "reference": "example_reference",  # str
    "sector": "example_sector",  # str
})
```


### DigitalOrderCard

Create an instance: `digital_order_card = client.DigitalOrderCard()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `str` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Unique identifier for this request. |
| `cost_value` | `dict` |  |
| `delivery_method` | `str` |  |
| `face_value` | `dict` |  |
| `float_balance` | `dict` |  |
| `fulfilment_by` | `str` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `dict` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `dict` |  |
| `reference` | `str` | Unique reference for this transaction |
| `sector` | `str` | Must match one of the sectors configured for your buyer account. |
| `tags` | `list` | Optional meta data associated with the issuance. |

#### Example: Create

```python
digital_order_card = client.DigitalOrderCard().create({
    "brand": "example_brand",  # str
    "client_request_id": "example_client_request_id",  # str
    "cost_value": {},  # dict
    "delivery_method": "example_delivery_method",  # str
    "face_value": {},  # dict
    "float_balance": {},  # dict
    "fulfilment_by": "example_fulfilment_by",  # str
    "fulfilment_parameters": {},  # dict
    "personalisation": {},  # dict
    "reference": "example_reference",  # str
    "sector": "example_sector",  # str
})
```


### DigitalOrderStatus

Create an instance: `digital_order_status = client.DigitalOrderStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `barcode` | `dict` | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `brand` | `str` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `code` | `str` | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `cost_value` | `dict` | Cost value of the gift card (only present when status is 'SUCCESS') |
| `discount` | `float` | The discount percentage used on this transaction |
| `expiration_date` | `str` | The expiration date for this gift card. |
| `face_value` | `dict` | Face value of the gift card (only present when status is 'SUCCESS') |
| `pin` | `str` | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `reference` | `str` | Unique reference for this transaction |
| `security_code` | `str` | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `serial_number` | `str` | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `status` | `str` | The current status of the order |
| `url` | `str` | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

#### Example: Load

```python
digital_order_status = client.DigitalOrderStatus().load()
```


### DigitalTopUpPost

Create an instance: `digital_top_up_post = client.DigitalTopUpPost()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `str` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Unique identifier for this request. |
| `code` | `str` | Gift card code |
| `cost_value` | `dict` |  |
| `discount` | `float` | The discount percentage used on this transaction |
| `face_value` | `dict` |  |
| `float_balance` | `dict` |  |
| `pin` | `str` | Gift card PIN. |
| `reference` | `str` | Unique reference for this transaction |
| `sector` | `str` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `str` | Gift card serial number. |
| `tags` | `list` | Optional meta data associated with the issuance. |

#### Example: Create

```python
digital_top_up_post = client.DigitalTopUpPost().create({
    "brand": "example_brand",  # str
    "client_request_id": "example_client_request_id",  # str
    "code": "example_code",  # str
    "cost_value": {},  # dict
    "discount": 1,  # float
    "face_value": {},  # dict
    "float_balance": {},  # dict
    "reference": "example_reference",  # str
    "sector": "example_sector",  # str
})
```


### Float

Create an instance: `float = client.Float()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `floats` | `dict` | Float balances grouped by currency code |
| `last_refreshed_at` | `str` | ISO 8601 timestamp of when the float data was last refreshed |

#### Example: Load

```python
float = client.Float().load()
```

#### Example: List

```python
floats = client.Float().list()
```

#### Example: Create

```python
float = client.Float().create({
    "floats": {},  # dict
    "last_refreshed_at": "example_last_refreshed_at",  # str
})
```


### PhysicalGiftCard

Create an instance: `physical_gift_card = client.PhysicalGiftCard()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `str` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Unique identifier for this request. |
| `code` | `str` | The long card number on the physical gift card you wish to cash out |
| `cost_value` | `dict` |  |
| `discount` | `float` | The discount percentage used on this transaction |
| `expiration_date` | `str` | The expiration date for this gift card. |
| `face_value` | `dict` |  |
| `float_balance` | `dict` |  |
| `fulfilled_at` | `str` | The date for which this this gift card was fulfilled. |
| `original_client_request_id` | `str` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `str` | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `reference` | `str` | Unique reference for this transaction |
| `sector` | `str` | Must match one of the sectors configured for your buyer account. |
| `security_code` | `str` | Gift card security code (for code-delivery brands). |
| `serial_number` | `str` | Gift card serial number. |
| `tags` | `list` | Optional meta data associated with the issuance. |
| `url` | `str` | Gift card URL (for URL-delivery brands) |

#### Example: Create

```python
physical_gift_card = client.PhysicalGiftCard().create({
    "brand": "example_brand",  # str
    "client_request_id": "example_client_request_id",  # str
    "code": "example_code",  # str
    "cost_value": {},  # dict
    "discount": 1,  # float
    "face_value": {},  # dict
    "float_balance": {},  # dict
    "original_client_request_id": "example_original_client_request_id",  # str
    "reference": "example_reference",  # str
    "sector": "example_sector",  # str
})
```


### PhysicalOrderCard

Create an instance: `physical_order_card = client.PhysicalOrderCard()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `str` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Unique identifier for this request. |
| `cost_value` | `dict` | The amount you actually paid (once the discount has been taken into consideration) |
| `discount` | `float` | The discount percentage used on this transaction |
| `expiration_date` | `str` | The expiration date for this gift card. |
| `face_value` | `dict` | the face value amount of the gift card. |
| `float_balance` | `dict` | Your remaining balance on the float used to make this transaction |
| `fulfilment_by` | `str` | When ordering a physical gift card, this must be set to `rewardcloud` |
| `fulfilment_parameters` | `dict` |  |
| `personalisation` | `dict` |  |
| `reference` | `str` | Unique reference for this transaction |
| `sector` | `str` | Must match one of the sectors configured for your buyer account. |
| `shipping_method` | `str` | Shipping method identifier. |
| `tags` | `list` | Optional meta data associated with the issuance. |

#### Example: Create

```python
physical_order_card = client.PhysicalOrderCard().create({
    "brand": "example_brand",  # str
    "client_request_id": "example_client_request_id",  # str
    "cost_value": {},  # dict
    "discount": 1,  # float
    "face_value": {},  # dict
    "float_balance": {},  # dict
    "fulfilment_by": "example_fulfilment_by",  # str
    "fulfilment_parameters": {},  # dict
    "personalisation": {},  # dict
    "reference": "example_reference",  # str
    "sector": "example_sector",  # str
    "shipping_method": "example_shipping_method",  # str
})
```


### PhysicalOrderStatus

Create an instance: `physical_order_status = client.PhysicalOrderStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `references` | `list` | Array of order references to check. |

#### Example: Create

```python
physical_order_status = client.PhysicalOrderStatus().create({
    "references": [],  # list
})
```


### Promotion

Create an instance: `promotion = client.Promotion()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_refreshed_at` | `str` | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | `dict` | Standard promotions grouped by brand slug. |

#### Example: Load

```python
promotion = client.Promotion().load()
```


### Template

Create an instance: `template = client.Template()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_refreshed_at` | `str` | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | `dict` | Object mapping brand slugs to their template variants and versions. |

#### Example: Load

```python
template = client.Template().load()
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── tillo_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`tillo_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
promotion = client.Promotion()
promotion.load()

# promotion.data_get() now returns the promotion data from the last load
# promotion.match_get() returns the last match criteria
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
