# Tillo JavaScript SDK Reference

Complete API reference for the Tillo JavaScript SDK.


## TilloSDK

### Constructor

```ts
new TilloSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TilloSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = TilloSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `TilloSDK` instance in test mode.


### Instance Methods

#### `Brand(data?: object)`

Create a new `Brand` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BrandEntity` instance.

#### `BrandTemplate(data?: object)`

Create a new `BrandTemplate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BrandTemplateEntity` instance.

#### `DigitalGiftCard(data?: object)`

Create a new `DigitalGiftCard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DigitalGiftCardEntity` instance.

#### `DigitalIssueDelete(data?: object)`

Create a new `DigitalIssueDelete` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DigitalIssueDeleteEntity` instance.

#### `DigitalIssuePost(data?: object)`

Create a new `DigitalIssuePost` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DigitalIssuePostEntity` instance.

#### `DigitalOrderCard(data?: object)`

Create a new `DigitalOrderCard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DigitalOrderCardEntity` instance.

#### `DigitalOrderStatus(data?: object)`

Create a new `DigitalOrderStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DigitalOrderStatusEntity` instance.

#### `DigitalTopUpPost(data?: object)`

Create a new `DigitalTopUpPost` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DigitalTopUpPostEntity` instance.

#### `Float(data?: object)`

Create a new `Float` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FloatEntity` instance.

#### `PhysicalGiftCard(data?: object)`

Create a new `PhysicalGiftCard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhysicalGiftCardEntity` instance.

#### `PhysicalOrderCard(data?: object)`

Create a new `PhysicalOrderCard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhysicalOrderCardEntity` instance.

#### `PhysicalOrderStatus(data?: object)`

Create a new `PhysicalOrderStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhysicalOrderStatusEntity` instance.

#### `Promotion(data?: object)`

Create a new `Promotion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PromotionEntity` instance.

#### `Template(data?: object)`

Create a new `Template` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TemplateEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `TilloSDK.test()`.

**Returns:** `TilloSDK` instance in test mode.


---

## BrandEntity

```ts
const brand = client.Brand()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brands` | `*` | No |  |
| `last_refreshed_at` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Brand().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BrandEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BrandTemplateEntity

```ts
const brand_template = client.BrandTemplate()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BrandTemplate().load({ brand: 'brand' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BrandTemplateEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DigitalGiftCardEntity

```ts
const digital_gift_card = client.DigitalGiftCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | No | Gift card code |
| `data` | `Object` | No |  |
| `face_value` | `Object` | Yes |  |
| `message` | `string` | No |  |
| `original_client_request_id` | `string` | No | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | No | Gift card PIN. |
| `reference` | `string` | No | This is the `reference` you received when making the original issuance request. |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | No | The serial number is a required parameter for any Sainsburys brand |
| `status` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.DigitalGiftCard().create({
  brand: 'example_brand',
  client_request_id: 'example_client_request_id',
  face_value: {},
  sector: 'example_sector',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DigitalGiftCard().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DigitalGiftCardEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DigitalIssueDeleteEntity

```ts
const digital_issue_delete = client.DigitalIssueDelete()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `face_value` | `Object` | Yes |  |
| `float_balance` | `Object` | Yes | Your remaining balance on the float used for this cancellation transaction. |
| `original_client_request_id` | `string` | Yes | This field will be the `client_request_id` provided in the original transaction. |
| `reference` | `string` | Yes | Unique reference (UUID) for the cancellation transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `tags` | `Array` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.DigitalIssueDelete().create({
  brand: 'example_brand',
  client_request_id: 'example_client_request_id',
  face_value: {},
  float_balance: {},
  original_client_request_id: 'example_original_client_request_id',
  reference: 'example_reference',
  sector: 'example_sector',
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.DigitalIssueDelete().remove()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DigitalIssueDeleteEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DigitalIssuePostEntity

```ts
const digital_issue_post = client.DigitalIssuePost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode` | `Object` | Yes | Some brands provide a barcode alongside a code delivery. |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | No | Gift card code (for code-delivery brands) |
| `cost_value` | `Object` | Yes |  |
| `delivery_method` | `string` | Yes |  |
| `discount` | `number` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `Object` | Yes |  |
| `float_balance` | `Object` | Yes |  |
| `fulfilment_by` | `string` | Yes | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `Object` | Yes | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `Object` | Yes |  |
| `pin` | `string` | No | Gift card PIN (for code-delivery brands). |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | No | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `Array` | No | Optional meta data associated with the issuance. |
| `url` | `string` | No | Gift card URL (for URL-delivery brands) |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.DigitalIssuePost().create({
  barcode: {},
  brand: 'example_brand',
  client_request_id: 'example_client_request_id',
  cost_value: {},
  delivery_method: 'example_delivery_method',
  discount: 1,
  face_value: {},
  float_balance: {},
  fulfilment_by: 'example_fulfilment_by',
  fulfilment_parameters: {},
  personalisation: {},
  reference: 'example_reference',
  sector: 'example_sector',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DigitalIssuePostEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DigitalOrderCardEntity

```ts
const digital_order_card = client.DigitalOrderCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `cost_value` | `Object` | Yes |  |
| `delivery_method` | `string` | Yes |  |
| `face_value` | `Object` | Yes |  |
| `float_balance` | `Object` | Yes |  |
| `fulfilment_by` | `string` | Yes | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `Object` | Yes | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `Object` | Yes |  |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `tags` | `Array` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.DigitalOrderCard().create({
  brand: 'example_brand',
  client_request_id: 'example_client_request_id',
  cost_value: {},
  delivery_method: 'example_delivery_method',
  face_value: {},
  float_balance: {},
  fulfilment_by: 'example_fulfilment_by',
  fulfilment_parameters: {},
  personalisation: {},
  reference: 'example_reference',
  sector: 'example_sector',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DigitalOrderCardEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DigitalOrderStatusEntity

```ts
const digital_order_status = client.DigitalOrderStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode` | `Object` | Yes | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `brand` | `string` | No | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `code` | `string` | No | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `cost_value` | `Object` | Yes | Cost value of the gift card (only present when status is 'SUCCESS') |
| `discount` | `number` | No | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `Object` | Yes | Face value of the gift card (only present when status is 'SUCCESS') |
| `pin` | `string` | No | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `security_code` | `string` | No | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `serial_number` | `string` | No | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `status` | `string` | Yes | The current status of the order |
| `url` | `string` | No | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DigitalOrderStatus().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DigitalOrderStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DigitalTopUpPostEntity

```ts
const digital_top_up_post = client.DigitalTopUpPost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | Yes | Gift card code |
| `cost_value` | `Object` | Yes |  |
| `discount` | `number` | Yes | The discount percentage used on this transaction |
| `face_value` | `Object` | Yes |  |
| `float_balance` | `Object` | Yes |  |
| `pin` | `string` | No | Gift card PIN. |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `Array` | No | Optional meta data associated with the issuance. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.DigitalTopUpPost().create({
  brand: 'example_brand',
  client_request_id: 'example_client_request_id',
  code: 'example_code',
  cost_value: {},
  discount: 1,
  face_value: {},
  float_balance: {},
  reference: 'example_reference',
  sector: 'example_sector',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DigitalTopUpPostEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FloatEntity

```ts
const float = client.Float()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `floats` | `Object` | Yes | Float balances grouped by currency code |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when the float data was last refreshed |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Float().create({
  floats: {},
  last_refreshed_at: 'example_last_refreshed_at',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Float().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Float().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FloatEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhysicalGiftCardEntity

```ts
const physical_gift_card = client.PhysicalGiftCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `code` | `string` | Yes | The long card number on the physical gift card you wish to cash out |
| `cost_value` | `Object` | Yes |  |
| `discount` | `number` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `Object` | Yes |  |
| `float_balance` | `Object` | Yes |  |
| `fulfilled_at` | `string` | No | The date for which this this gift card was fulfilled. |
| `original_client_request_id` | `string` | Yes | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | No | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | No | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | No | Gift card serial number. |
| `tags` | `Array` | No | Optional meta data associated with the issuance. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PhysicalGiftCard().create({
  brand: 'example_brand',
  client_request_id: 'example_client_request_id',
  code: 'example_code',
  cost_value: {},
  discount: 1,
  face_value: {},
  float_balance: {},
  original_client_request_id: 'example_original_client_request_id',
  reference: 'example_reference',
  sector: 'example_sector',
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.PhysicalGiftCard().remove()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhysicalGiftCardEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhysicalOrderCardEntity

```ts
const physical_order_card = client.PhysicalOrderCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Yes | Unique identifier for this request. |
| `cost_value` | `Object` | Yes | The amount you actually paid (once the discount has been taken into consideration) |
| `discount` | `number` | Yes | The discount percentage used on this transaction |
| `expiration_date` | `string` | No | The expiration date for this gift card. |
| `face_value` | `Object` | Yes | the face value amount of the gift card. |
| `float_balance` | `Object` | Yes | Your remaining balance on the float used to make this transaction |
| `fulfilment_by` | `string` | Yes | When ordering a physical gift card, this must be set to `rewardcloud` |
| `fulfilment_parameters` | `Object` | Yes |  |
| `personalisation` | `Object` | Yes |  |
| `reference` | `string` | Yes | Unique reference for this transaction |
| `sector` | `string` | Yes | Must match one of the sectors configured for your buyer account. |
| `shipping_method` | `string` | Yes | Shipping method identifier. |
| `tags` | `Array` | No | Optional meta data associated with the issuance. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PhysicalOrderCard().create({
  brand: 'example_brand',
  client_request_id: 'example_client_request_id',
  cost_value: {},
  discount: 1,
  face_value: {},
  float_balance: {},
  fulfilment_by: 'example_fulfilment_by',
  fulfilment_parameters: {},
  personalisation: {},
  reference: 'example_reference',
  sector: 'example_sector',
  shipping_method: 'example_shipping_method',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhysicalOrderCardEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhysicalOrderStatusEntity

```ts
const physical_order_status = client.PhysicalOrderStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `references` | `Array` | Yes | Array of order references to check. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PhysicalOrderStatus().create({
  references: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhysicalOrderStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PromotionEntity

```ts
const promotion = client.Promotion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | `Object` | Yes | Standard promotions grouped by brand slug. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Promotion().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PromotionEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TemplateEntity

```ts
const template = client.Template()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_refreshed_at` | `string` | Yes | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | `Object` | Yes | Object mapping brand slugs to their template variants and versions. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Template().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TemplateEntity` instance with the same client and
options.

#### `client()`

Return the parent `TilloSDK` instance.

#### `entopts()`

Return a copy of the entity options.


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

```ts
const client = new TilloSDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

