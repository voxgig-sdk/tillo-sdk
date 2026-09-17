# Tillo Python SDK Reference

Complete API reference for the Tillo Python SDK.


## TilloSDK

### Constructor

```python
from tillo_sdk import TilloSDK

client = TilloSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TilloSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = TilloSDK.test()
```


### Instance Methods

#### `Brand(data=None)`

Create a new `BrandEntity` instance. Pass `None` for no initial data.

#### `BrandTemplate(data=None)`

Create a new `BrandTemplateEntity` instance. Pass `None` for no initial data.

#### `DigitalGiftCard(data=None)`

Create a new `DigitalGiftCardEntity` instance. Pass `None` for no initial data.

#### `DigitalIssueDelete(data=None)`

Create a new `DigitalIssueDeleteEntity` instance. Pass `None` for no initial data.

#### `DigitalIssuePost(data=None)`

Create a new `DigitalIssuePostEntity` instance. Pass `None` for no initial data.

#### `DigitalOrderCard(data=None)`

Create a new `DigitalOrderCardEntity` instance. Pass `None` for no initial data.

#### `DigitalOrderStatus(data=None)`

Create a new `DigitalOrderStatusEntity` instance. Pass `None` for no initial data.

#### `DigitalTopUpPost(data=None)`

Create a new `DigitalTopUpPostEntity` instance. Pass `None` for no initial data.

#### `Float(data=None)`

Create a new `FloatEntity` instance. Pass `None` for no initial data.

#### `PhysicalGiftCard(data=None)`

Create a new `PhysicalGiftCardEntity` instance. Pass `None` for no initial data.

#### `PhysicalOrderCard(data=None)`

Create a new `PhysicalOrderCardEntity` instance. Pass `None` for no initial data.

#### `PhysicalOrderStatus(data=None)`

Create a new `PhysicalOrderStatusEntity` instance. Pass `None` for no initial data.

#### `Promotion(data=None)`

Create a new `PromotionEntity` instance. Pass `None` for no initial data.

#### `Template(data=None)`

Create a new `TemplateEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BrandEntity

```python
brand = client.Brand()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brands` | `Any` | No |  |
| `last_refreshed_at` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Brand().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrandEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BrandTemplateEntity

```python
brand_template = client.BrandTemplate()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.BrandTemplate().load({"brand": "brand"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrandTemplateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DigitalGiftCardEntity

```python
digital_gift_card = client.DigitalGiftCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `str` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Yes | Unique identifier for this request. |
| `code` | `str` | No | Gift card code |
| `data` | `dict` | No |  |
| `face_value` | `dict` | Yes |  |
| `message` | `str` | No |  |
| `original_client_request_id` | `str` | No | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `str` | No | Gift card PIN. |
| `reference` | `str` | No | This is the `reference` you received when making the original issuance request. |
| `sector` | `str` | Yes | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `str` | No | The serial number is a required parameter for any Sainsburys brand |
| `status` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.DigitalGiftCard().create({
    "brand": "example_brand",  # str
    "client_request_id": "example_client_request_id",  # str
    "face_value": {},  # dict
    "sector": "example_sector",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DigitalGiftCard().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalGiftCardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DigitalIssueDeleteEntity

```python
digital_issue_delete = client.DigitalIssueDelete()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `str` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Yes | Unique identifier for this request. |
| `face_value` | `dict` | Yes |  |
| `float_balance` | `dict` | Yes | Your remaining balance on the float used for this cancellation transaction. |
| `original_client_request_id` | `str` | Yes | This field will be the `client_request_id` provided in the original transaction. |
| `reference` | `str` | Yes | Unique reference (UUID) for the cancellation transaction |
| `sector` | `str` | Yes | Must match one of the sectors configured for your buyer account. |
| `tags` | `list` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.DigitalIssueDelete().create({
    "brand": "example_brand",  # str
    "client_request_id": "example_client_request_id",  # str
    "face_value": {},  # dict
    "float_balance": {},  # dict
    "original_client_request_id": "example_original_client_request_id",  # str
    "reference": "example_reference",  # str
    "sector": "example_sector",  # str
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.DigitalIssueDelete().remove()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalIssueDeleteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DigitalIssuePostEntity

```python
digital_issue_post = client.DigitalIssuePost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode` | `dict` | Yes | Some brands provide a barcode alongside a code delivery. |
| `brand` | `str` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Yes | Unique identifier for this request. |
| `code` | `str` | No | Gift card code (for code-delivery brands) |
| `cost_value` | `dict` | Yes |  |
| `delivery_method` | `str` | Yes |  |
| `discount` | `float` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `str` | No | The expiration date for this gift card. |
| `face_value` | `dict` | Yes |  |
| `float_balance` | `dict` | Yes |  |
| `fulfilment_by` | `str` | Yes | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `dict` | Yes | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `dict` | Yes |  |
| `pin` | `str` | No | Gift card PIN (for code-delivery brands). |
| `reference` | `str` | Yes | Unique reference for this transaction |
| `sector` | `str` | Yes | Must match one of the sectors configured for your buyer account. |
| `security_code` | `str` | No | Gift card security code (for code-delivery brands). |
| `serial_number` | `str` | No | Gift card serial number. |
| `tags` | `list` | No | Optional meta data associated with the issuance. |
| `url` | `str` | No | Gift card URL (for URL-delivery brands) |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.DigitalIssuePost().create({
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

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalIssuePostEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DigitalOrderCardEntity

```python
digital_order_card = client.DigitalOrderCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `str` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Yes | Unique identifier for this request. |
| `cost_value` | `dict` | Yes |  |
| `delivery_method` | `str` | Yes |  |
| `face_value` | `dict` | Yes |  |
| `float_balance` | `dict` | Yes |  |
| `fulfilment_by` | `str` | Yes | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `dict` | Yes | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `dict` | Yes |  |
| `reference` | `str` | Yes | Unique reference for this transaction |
| `sector` | `str` | Yes | Must match one of the sectors configured for your buyer account. |
| `tags` | `list` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.DigitalOrderCard().create({
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

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalOrderCardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DigitalOrderStatusEntity

```python
digital_order_status = client.DigitalOrderStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode` | `dict` | Yes | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `brand` | `str` | No | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `code` | `str` | No | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `cost_value` | `dict` | Yes | Cost value of the gift card (only present when status is 'SUCCESS') |
| `discount` | `float` | No | The discount percentage used on this transaction |
| `expiration_date` | `str` | No | The expiration date for this gift card. |
| `face_value` | `dict` | Yes | Face value of the gift card (only present when status is 'SUCCESS') |
| `pin` | `str` | No | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `reference` | `str` | Yes | Unique reference for this transaction |
| `security_code` | `str` | No | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `serial_number` | `str` | No | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `status` | `str` | Yes | The current status of the order |
| `url` | `str` | No | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DigitalOrderStatus().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalOrderStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DigitalTopUpPostEntity

```python
digital_top_up_post = client.DigitalTopUpPost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `str` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Yes | Unique identifier for this request. |
| `code` | `str` | Yes | Gift card code |
| `cost_value` | `dict` | Yes |  |
| `discount` | `float` | Yes | The discount percentage used on this transaction |
| `face_value` | `dict` | Yes |  |
| `float_balance` | `dict` | Yes |  |
| `pin` | `str` | No | Gift card PIN. |
| `reference` | `str` | Yes | Unique reference for this transaction |
| `sector` | `str` | Yes | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `str` | No | Gift card serial number. |
| `tags` | `list` | No | Optional meta data associated with the issuance. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.DigitalTopUpPost().create({
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

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalTopUpPostEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FloatEntity

```python
float = client.Float()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `floats` | `dict` | Yes | Float balances grouped by currency code |
| `last_refreshed_at` | `str` | Yes | ISO 8601 timestamp of when the float data was last refreshed |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Float().create({
    "floats": {},  # dict
    "last_refreshed_at": "example_last_refreshed_at",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Float().list()
for float in results:
    print(float)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Float().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FloatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PhysicalGiftCardEntity

```python
physical_gift_card = client.PhysicalGiftCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `str` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Yes | Unique identifier for this request. |
| `code` | `str` | Yes | The long card number on the physical gift card you wish to cash out |
| `cost_value` | `dict` | Yes |  |
| `discount` | `float` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `str` | No | The expiration date for this gift card. |
| `face_value` | `dict` | Yes |  |
| `float_balance` | `dict` | Yes |  |
| `fulfilled_at` | `str` | No | The date for which this this gift card was fulfilled. |
| `original_client_request_id` | `str` | Yes | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `str` | No | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `reference` | `str` | Yes | Unique reference for this transaction |
| `sector` | `str` | Yes | Must match one of the sectors configured for your buyer account. |
| `security_code` | `str` | No | Gift card security code (for code-delivery brands). |
| `serial_number` | `str` | No | Gift card serial number. |
| `tags` | `list` | No | Optional meta data associated with the issuance. |
| `url` | `str` | No | Gift card URL (for URL-delivery brands) |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PhysicalGiftCard().create({
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

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.PhysicalGiftCard().remove()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhysicalGiftCardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PhysicalOrderCardEntity

```python
physical_order_card = client.PhysicalOrderCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `str` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `str` | Yes | Unique identifier for this request. |
| `cost_value` | `dict` | Yes | The amount you actually paid (once the discount has been taken into consideration) |
| `discount` | `float` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `str` | No | The expiration date for this gift card. |
| `face_value` | `dict` | Yes | the face value amount of the gift card. |
| `float_balance` | `dict` | Yes | Your remaining balance on the float used to make this transaction |
| `fulfilment_by` | `str` | Yes | When ordering a physical gift card, this must be set to `rewardcloud` |
| `fulfilment_parameters` | `dict` | Yes |  |
| `personalisation` | `dict` | Yes |  |
| `reference` | `str` | Yes | Unique reference for this transaction |
| `sector` | `str` | Yes | Must match one of the sectors configured for your buyer account. |
| `shipping_method` | `str` | Yes | Shipping method identifier. |
| `tags` | `list` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PhysicalOrderCard().create({
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

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhysicalOrderCardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PhysicalOrderStatusEntity

```python
physical_order_status = client.PhysicalOrderStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `references` | `list` | Yes | Array of order references to check. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PhysicalOrderStatus().create({
    "references": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhysicalOrderStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PromotionEntity

```python
promotion = client.Promotion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_refreshed_at` | `str` | Yes | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | `dict` | Yes | Standard promotions grouped by brand slug. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Promotion().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PromotionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TemplateEntity

```python
template = client.Template()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_refreshed_at` | `str` | Yes | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | `dict` | Yes | Object mapping brand slugs to their template variants and versions. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Template().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = TilloSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

