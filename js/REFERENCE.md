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

#### `Dgc(data?: object)`

Create a new `Dgc` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DgcEntity` instance.

#### `Float(data?: object)`

Create a new `Float` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FloatEntity` instance.

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
| `currency` | `string` | No |  |
| `name` | `string` | No |  |
| `slug` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Brand().list()
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

## DgcEntity

```ts
const dgc = client.Dgc()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | Yes |  |
| `client_request_id` | `string` | Yes |  |
| `delivery_method` | `string` | No |  |
| `face_value` | `Object` | Yes |  |
| `sector` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Dgc().create({
  brand: 'example_brand',
  client_request_id: 'example_client_request_id',
  face_value: {},
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

Create a new `DgcEntity` instance with the same client and
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
| `balance` | `number` | No |  |
| `currency` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Float().list()
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

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new TilloSDK({
  feature: {
    test: { active: true },
  }
})
```

