# Tillo TypeScript SDK



The TypeScript SDK for the Tillo API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Brand()` — each with a small set of operations (`list`, `load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/tillo-sdk/releases](https://github.com/voxgig-sdk/tillo-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { TilloSDK } from '@voxgig-sdk/tillo'

const client = new TilloSDK({
  apikey: process.env.TILLO_APIKEY,
})
```

### 3. Load a brand

`load()` returns the entity directly and throws on failure:

```ts
try {
  const brand = await client.Brand().load()
  console.log(brand)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const promotion = await client.Promotion().load()
  console.log(promotion)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = TilloSDK.test()

const promotion = await client.Promotion().load()
// promotion is the entity, populated with mock response data
// — call promotion.data() for the record itself
console.log(promotion)
```

You can also use the instance method:

```ts
const client = new TilloSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Promotion()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new TilloSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### TilloSDK

#### Constructor

```ts
new TilloSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Brand(data?)` | `BrandEntity` | Create a Brand entity instance. |
| `BrandTemplate(data?)` | `BrandTemplateEntity` | Create a BrandTemplate entity instance. |
| `DigitalGiftCard(data?)` | `DigitalGiftCardEntity` | Create a DigitalGiftCard entity instance. |
| `DigitalIssueDelete(data?)` | `DigitalIssueDeleteEntity` | Create a DigitalIssueDelete entity instance. |
| `DigitalIssuePost(data?)` | `DigitalIssuePostEntity` | Create a DigitalIssuePost entity instance. |
| `DigitalOrderCard(data?)` | `DigitalOrderCardEntity` | Create a DigitalOrderCard entity instance. |
| `DigitalOrderStatus(data?)` | `DigitalOrderStatusEntity` | Create a DigitalOrderStatus entity instance. |
| `DigitalTopUpPost(data?)` | `DigitalTopUpPostEntity` | Create a DigitalTopUpPost entity instance. |
| `Float(data?)` | `FloatEntity` | Create a Float entity instance. |
| `PhysicalGiftCard(data?)` | `PhysicalGiftCardEntity` | Create a PhysicalGiftCard entity instance. |
| `PhysicalOrderCard(data?)` | `PhysicalOrderCardEntity` | Create a PhysicalOrderCard entity instance. |
| `PhysicalOrderStatus(data?)` | `PhysicalOrderStatusEntity` | Create a PhysicalOrderStatus entity instance. |
| `Promotion(data?)` | `PromotionEntity` | Create a Promotion entity instance. |
| `Template(data?)` | `TemplateEntity` | Create a Template entity instance. |
| `tester(testopts?, sdkopts?)` | `TilloSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `TilloSDK.test(testopts?, sdkopts?)` | `TilloSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): TilloSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Brand

| Field | Description |
| --- | --- |
| `brands` |  |
| `last_refreshed_at` |  |

Operations: load.

API path: `/brands`

#### BrandTemplate

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: create, load.

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

Operations: create, remove.

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

Operations: create.

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

Operations: create.

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

Operations: load.

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

Operations: create.

API path: `/digital/top-up`

#### Float

| Field | Description |
| --- | --- |
| `floats` | Float balances grouped by currency code |
| `last_refreshed_at` | ISO 8601 timestamp of when the float data was last refreshed |

Operations: create, list, load.

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

Operations: create, remove.

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

Operations: create.

API path: `/physical/order-card`

#### PhysicalOrderStatus

| Field | Description |
| --- | --- |
| `references` | Array of order references to check. |

Operations: create.

API path: `/physical/order-status`

#### Promotion

| Field | Description |
| --- | --- |
| `last_refreshed_at` | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | Standard promotions grouped by brand slug. |

Operations: load.

API path: `/promotions`

#### Template

| Field | Description |
| --- | --- |
| `last_refreshed_at` | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | Object mapping brand slugs to their template variants and versions. |

Operations: load.

API path: `/templates`



## Entities


### Brand

Create an instance: `const brand = client.Brand()`

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

```ts
const brand = await client.Brand().load()
```


### BrandTemplate

Create an instance: `const brand_template = client.BrandTemplate()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const brand_template = await client.BrandTemplate().load({ brand: 'brand' })
```


### DigitalGiftCard

Create an instance: `const digital_gift_card = client.DigitalGiftCard()`

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
| `data` | `Record<string, any>` |  |
| `face_value` | `Record<string, any>` |  |
| `message` | `string` |  |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | Gift card PIN. |
| `reference` | `string` | This is the `reference` you received when making the original issuance request. |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | The serial number is a required parameter for any Sainsburys brand |
| `status` | `string` |  |

#### Example: Load

```ts
const digital_gift_card = await client.DigitalGiftCard().load()
```

#### Example: Create

```ts
const digital_gift_card = await client.DigitalGiftCard().create({
  brand: 'example_brand',
  client_request_id: 'example_client_request_id',
  face_value: {},
  sector: 'example_sector',
})
```


### DigitalIssueDelete

Create an instance: `const digital_issue_delete = client.DigitalIssueDelete()`

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
| `face_value` | `Record<string, any>` |  |
| `float_balance` | `Record<string, any>` | Your remaining balance on the float used for this cancellation transaction. |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `reference` | `string` | Unique reference (UUID) for the cancellation transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `tags` | `any[]` | Optional meta data associated with the issuance. |

#### Example: Create

```ts
const digital_issue_delete = await client.DigitalIssueDelete().create({
  brand: 'example_brand',
  client_request_id: 'example_client_request_id',
  face_value: {},
  float_balance: {},
  original_client_request_id: 'example_original_client_request_id',
  reference: 'example_reference',
  sector: 'example_sector',
})
```


### DigitalIssuePost

Create an instance: `const digital_issue_post = client.DigitalIssuePost()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `barcode` | `Record<string, any>` | Some brands provide a barcode alongside a code delivery. |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `code` | `string` | Gift card code (for code-delivery brands) |
| `cost_value` | `Record<string, any>` |  |
| `delivery_method` | `string` |  |
| `discount` | `number` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `Record<string, any>` |  |
| `float_balance` | `Record<string, any>` |  |
| `fulfilment_by` | `string` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `Record<string, any>` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `Record<string, any>` |  |
| `pin` | `string` | Gift card PIN (for code-delivery brands). |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `any[]` | Optional meta data associated with the issuance. |
| `url` | `string` | Gift card URL (for URL-delivery brands) |

#### Example: Create

```ts
const digital_issue_post = await client.DigitalIssuePost().create({
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


### DigitalOrderCard

Create an instance: `const digital_order_card = client.DigitalOrderCard()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `cost_value` | `Record<string, any>` |  |
| `delivery_method` | `string` |  |
| `face_value` | `Record<string, any>` |  |
| `float_balance` | `Record<string, any>` |  |
| `fulfilment_by` | `string` | This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued. |
| `fulfilment_parameters` | `Record<string, any>` | Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf |
| `personalisation` | `Record<string, any>` |  |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `tags` | `any[]` | Optional meta data associated with the issuance. |

#### Example: Create

```ts
const digital_order_card = await client.DigitalOrderCard().create({
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


### DigitalOrderStatus

Create an instance: `const digital_order_status = client.DigitalOrderStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `barcode` | `Record<string, any>` | Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS') |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `code` | `string` | Gift card code (for code-delivery brands, only present when status is 'SUCCESS') |
| `cost_value` | `Record<string, any>` | Cost value of the gift card (only present when status is 'SUCCESS') |
| `discount` | `number` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `Record<string, any>` | Face value of the gift card (only present when status is 'SUCCESS') |
| `pin` | `string` | Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `reference` | `string` | Unique reference for this transaction |
| `security_code` | `string` | Gift card security code (only present when status is 'SUCCESS' and brand provides one) |
| `serial_number` | `string` | Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one) |
| `status` | `string` | The current status of the order |
| `url` | `string` | Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS') |

#### Example: Load

```ts
const digital_order_status = await client.DigitalOrderStatus().load()
```


### DigitalTopUpPost

Create an instance: `const digital_top_up_post = client.DigitalTopUpPost()`

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
| `cost_value` | `Record<string, any>` |  |
| `discount` | `number` | The discount percentage used on this transaction |
| `face_value` | `Record<string, any>` |  |
| `float_balance` | `Record<string, any>` |  |
| `pin` | `string` | Gift card PIN. |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `any[]` | Optional meta data associated with the issuance. |

#### Example: Create

```ts
const digital_top_up_post = await client.DigitalTopUpPost().create({
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


### Float

Create an instance: `const float = client.Float()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `floats` | `Record<string, any>` | Float balances grouped by currency code |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when the float data was last refreshed |

#### Example: Load

```ts
const float = await client.Float().load()
```

#### Example: List

```ts
const floats = await client.Float().list()
```

#### Example: Create

```ts
const float = await client.Float().create({
  floats: {},
  last_refreshed_at: 'example_last_refreshed_at',
})
```


### PhysicalGiftCard

Create an instance: `const physical_gift_card = client.PhysicalGiftCard()`

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
| `cost_value` | `Record<string, any>` |  |
| `discount` | `number` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `Record<string, any>` |  |
| `float_balance` | `Record<string, any>` |  |
| `fulfilled_at` | `string` | The date for which this this gift card was fulfilled. |
| `original_client_request_id` | `string` | This field will be the `client_request_id` provided in the original transaction. |
| `pin` | `string` | The pin number (only applies to certain brands which provide pin) on the physical gift card |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `security_code` | `string` | Gift card security code (for code-delivery brands). |
| `serial_number` | `string` | Gift card serial number. |
| `tags` | `any[]` | Optional meta data associated with the issuance. |
| `url` | `string` | Gift card URL (for URL-delivery brands) |

#### Example: Create

```ts
const physical_gift_card = await client.PhysicalGiftCard().create({
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


### PhysicalOrderCard

Create an instance: `const physical_order_card = client.PhysicalOrderCard()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `brand` | `string` | Brand identifier/slug (lowercase letters, numbers, hyphens only). |
| `client_request_id` | `string` | Unique identifier for this request. |
| `cost_value` | `Record<string, any>` | The amount you actually paid (once the discount has been taken into consideration) |
| `discount` | `number` | The discount percentage used on this transaction |
| `expiration_date` | `string` | The expiration date for this gift card. |
| `face_value` | `Record<string, any>` | the face value amount of the gift card. |
| `float_balance` | `Record<string, any>` | Your remaining balance on the float used to make this transaction |
| `fulfilment_by` | `string` | When ordering a physical gift card, this must be set to `rewardcloud` |
| `fulfilment_parameters` | `Record<string, any>` |  |
| `personalisation` | `Record<string, any>` |  |
| `reference` | `string` | Unique reference for this transaction |
| `sector` | `string` | Must match one of the sectors configured for your buyer account. |
| `shipping_method` | `string` | Shipping method identifier. |
| `tags` | `any[]` | Optional meta data associated with the issuance. |

#### Example: Create

```ts
const physical_order_card = await client.PhysicalOrderCard().create({
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


### PhysicalOrderStatus

Create an instance: `const physical_order_status = client.PhysicalOrderStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `references` | `any[]` | Array of order references to check. |

#### Example: Create

```ts
const physical_order_status = await client.PhysicalOrderStatus().create({
  references: [],
})
```


### Promotion

Create an instance: `const promotion = client.Promotion()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when promotion data was last refreshed. |
| `standard` | `Record<string, any>` | Standard promotions grouped by brand slug. |

#### Example: Load

```ts
const promotion = await client.Promotion().load()
```


### Template

Create an instance: `const template = client.Template()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_refreshed_at` | `string` | ISO 8601 timestamp of when the template data was last refreshed |
| `templates` | `Record<string, any>` | Object mapping brand slugs to their template variants and versions. |

#### Example: Load

```ts
const template = await client.Template().load()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

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

### Module structure

```
tillo/
├── src/
│   ├── TilloSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { TilloSDK } from '@voxgig-sdk/tillo'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const promotion = client.Promotion()
await promotion.load()

// promotion.data() now returns the promotion data from the last `load`
// promotion.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
