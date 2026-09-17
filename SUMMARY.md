# Tillo API v2

This version of our API is intended to be an incremental improvement from v1, keeping core concepts the same so that the transition path is as straightforward as possible. To learn more about Tillo and our platform, visit [tillo.com](https://tillo.com). ## Authentication &amp; Signature Generation All API requests require HMAC-SHA256 signature authentication using the following headers: - `API-Key`: Your API key - `Signature`: HMAC-SHA256 signature of the request - `Timestamp`: Unix timestamp in milliseconds The signature is generated using a standard algorithm: concatenate components with hyphens, then compute HMAC-SHA256. **Signature Components (in order):** 1. **API Key** (always) 2. **HTTP Method** (always) 3. **Transaction Type** - derived from URL path without `/api/v2/` (always) 4. **Request Parameters** - only included if present in request (conditional) 5. **Timestamp** in milliseconds (always) **GET Request Format:** ``` &#123;API_KEY&#125;-&#123;HTTP_METHOD&#125;-&#123;TRANSACTION_TYPE&#125;-&#123;BRAND?&#125;-&#123;TIMESTAMP&#125; ``` - `TRANSACTION_TYPE`: Derived from URL path (for example, &quot;brands&quot;, &quot;check-stock&quot;) - `BRAND`: Only included if present as query parameter Examples - Without brand: `abc123-GET-brands-1533025425488` Examples - With brand: `abc123-GET-check-stock-mock-brand-1533025425488` **POST/PUT/DELETE Request Formats:** The API accepts two signature formats (both are valid): Simplified Format (recommended): ``` &#123;API_KEY&#125;-&#123;HTTP_METHOD&#125;-&#123;TRANSACTION_TYPE&#125;-&#123;CLIENT_REQUEST_ID&#125;-&#123;BRAND&#125;-&#123;TIMESTAMP&#125; ``` Full Format (also accepted): ``` &#123;API_KEY&#125;-&#123;HTTP_METHOD&#125;-&#123;TRANSACTION_TYPE&#125;-&#123;CLIENT_REQUEST_ID&#125;-&#123;BRAND&#125;-&#123;CURRENCY&#125;-&#123;AMOUNT&#125;-&#123;TIMESTAMP&#125; ``` Parameter Definitions: - `CLIENT_REQUEST_ID`: Unique 5-50 character alphanumeric string per request - `BRAND`: Brand slug from request body (optional - omit if not present) - `CURRENCY`: ISO currency code (optional - only in full format) - `AMOUNT`: Face value amount (optional - only in full format) **Important:** Parameters are only included if they exist in the request. Missing parameters are omitted entirely (not added as empty strings). Examples - Simplified: `abc123-POST-digital-issue-xyz789randomid123456789-amazon-1533025425488` Examples - Full format: `abc123-POST-digital-issue-xyz789randomid123456789-amazon-GBP-25.00-1533025425488` Examples - No optional params: `abc123-POST-float-request-payment-transfer-1533025425488` **Transaction Type Extraction:** Remove `/api/v2/` from the path and join remaining segments with hyphens: - `/api/v2/brands` → `brands` - `/api/v2/digital/issue` → `digital-issue` - `/api/v2/float/request-payment-transfer` → `float-request-payment-transfer` **Final Step:** Hash the concatenated string using HMAC-SHA256: ```javascript const signature = CryptoJS.HmacSHA256(signatureString, secretKey).toString(); ``` --- For additional information including authentication, managing credentials, and other details, please visit [https://tillo.tech/v2_docs/](https://tillo.tech/v2_docs/) For v1 documentation, visit [https://tillo.tech/v1/index.html](https://tillo.tech/v1/index.html) For error codes, visit [https://tillo.tech/error_codes/](https://tillo.tech/error_codes/)

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 14 entities and 24 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Brand](docs/api/brand.html)

Results: List of brands with optional filtering and detail.

SDK operations: `load`.

### [BrandTemplate](docs/api/brand_template.html)

Results: Template ZIP file download.

SDK operations: `load`.

### [DigitalGiftCard](docs/api/digital_gift_card.html)

Results: Successful response; Successfully retrieved stock levels.

SDK operations: `create`, `load`.

Key fields to recognise:

- `brand`: Brand identifier/slug (lowercase letters, numbers, hyphens only).
- `client_request_id`: Unique identifier for this request.
- `code`: Internal error code (3-digit string)
- `original_client_request_id`: This field will be the `client_request_id` provided in the original transaction.
- `pin`: Gift card PIN.

### [DigitalIssueDelete](docs/api/digital_issue_delete.html)

Results: Successful Response.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `brand`: Brand identifier/slug (lowercase letters, numbers, hyphens only).
- `client_request_id`: Unique identifier for this request.
- `float_balance`: Your remaining balance on the float used for this cancellation transaction. Only present when float balance information is available.
- `original_client_request_id`: This field will be the `client_request_id` provided in the original transaction.
- `reference`: Unique reference (UUID) for the cancellation transaction

### [DigitalIssuePost](docs/api/digital_issue_post.html)

Results: Standard Issue Digital Code.

SDK operations: `create`.

Key fields to recognise:

- `barcode`: Some brands provide a barcode alongside a code delivery. You can determine which brands return a barcode using the brand information endpoint
- `brand`: Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.
- `client_request_id`: Unique identifier for this request.
- `code`: Gift card code (for code-delivery brands)
- `discount`: The discount percentage used on this transaction

### [DigitalOrderCard](docs/api/digital_order_card.html)

Results: Card ordered successfully. The order is being processed asynchronously.

SDK operations: `create`.

Key fields to recognise:

- `brand`: Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.
- `client_request_id`: Unique identifier for this request.
- `fulfilment_by`: This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.
- `fulfilment_parameters`: Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf
- `reference`: Unique reference for this transaction

### [DigitalOrderStatus](docs/api/digital_order_status.html)

Results: Order status retrieved successfully.

SDK operations: `load`.

Key fields to recognise:

- `barcode`: Some brands provide a barcode alongside a code delivery (only present when status is &#39;SUCCESS&#39;)
- `brand`: Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.
- `code`: Gift card code (for code-delivery brands, only present when status is &#39;SUCCESS&#39;)
- `cost_value`: Cost value of the gift card (only present when status is &#39;SUCCESS&#39;)
- `discount`: The discount percentage used on this transaction

### [DigitalTopUpPost](docs/api/digital_top_up_post.html)

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `brand`: Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.
- `client_request_id`: Unique identifier for this request.
- `code`: Response code
- `discount`: The discount percentage used on this transaction
- `pin`: Gift card PIN. Required for certain brands. Must be between 3 and 20 characters when provided. Allowed characters: alphanumeric, underscore, hyphen.

### [Float](docs/api/float.html)

Results: Payment transfer request successfully registered; Successfully retrieved transfer requests; Successfully retrieved float balances.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `floats`: Float balances grouped by currency code
- `last_refreshed_at`: ISO 8601 timestamp of when the float data was last refreshed

### [PhysicalGiftCard](docs/api/physical_gift_card.html)

Results: Successful Response; Successful response.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `brand`: Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.
- `client_request_id`: Unique identifier for this request.
- `code`: Internal error code (3-digit string)
- `discount`: The discount percentage used on this transaction
- `expiration_date`: The expiration date for this gift card. This will only be present when the brand provides one.

### [PhysicalOrderCard](docs/api/physical_order_card.html)

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `brand`: Brand identifier/slug (lowercase letters, numbers, hyphens only). Must be a brand connected to your buyer account.
- `client_request_id`: Unique identifier for this request.
- `cost_value`: The amount you actually paid (once the discount has been taken into consideration)
- `discount`: The discount percentage used on this transaction
- `expiration_date`: The expiration date for this gift card. This will only be present when the brand provides one.

### [PhysicalOrderStatus](docs/api/physical_order_status.html)

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `references`: Array of order references to check.

### [Promotion](docs/api/promotion.html)

Results: List of standard promotions grouped by brand slug.

SDK operations: `load`.

Key fields to recognise:

- `last_refreshed_at`: ISO 8601 timestamp of when promotion data was last refreshed. This timestamp is always in UTC.
- `standard`: Standard promotions grouped by brand slug.

### [Template](docs/api/template.html)

Results: Successfully retrieved template list.

SDK operations: `load`.

Key fields to recognise:

- `last_refreshed_at`: ISO 8601 timestamp of when the template data was last refreshed
- `templates`: Object mapping brand slugs to their template variants and versions. Each brand slug maps to an object where keys are variant names (for example, &#39;standard&#39;) and values are version strings.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Brand](docs/api/brand.html) | `load` | `GET /brands` | Required |
| [BrandTemplate](docs/api/brand_template.html) | `load` | `GET /template` | Required |
| [DigitalGiftCard](docs/api/digital_gift_card.html) | `create` | `POST /digital/check-balance` | Required |
| [DigitalGiftCard](docs/api/digital_gift_card.html) | `load` | `GET /check-stock` | Required |
| [DigitalIssueDelete](docs/api/digital_issue_delete.html) | `create` | `POST /digital/reverse` | Required |
| [DigitalIssueDelete](docs/api/digital_issue_delete.html) | `remove` | `DELETE /digital/issue` | Required |
| [DigitalIssuePost](docs/api/digital_issue_post.html) | `create` | `POST /digital/issue` | Required |
| [DigitalOrderCard](docs/api/digital_order_card.html) | `create` | `POST /digital/order-card` | Required |
| [DigitalOrderStatus](docs/api/digital_order_status.html) | `load` | `GET /digital/order-status` | Required |
| [DigitalTopUpPost](docs/api/digital_top_up_post.html) | `create` | `POST /digital/top-up` | Required |
| [Float](docs/api/float.html) | `create` | `POST /float/request-payment-transfer` | Required |
| [Float](docs/api/float.html) | `list` | `GET /float/transfer-requests` | Required |
| [Float](docs/api/float.html) | `load` | `GET /check-floats` | Required |
| [PhysicalGiftCard](docs/api/physical_gift_card.html) | `create` | `POST /physical/activate` | Required |
| [PhysicalGiftCard](docs/api/physical_gift_card.html) | `create` | `POST /physical/cash-out-original-transaction` | Required |
| [PhysicalGiftCard](docs/api/physical_gift_card.html) | `create` | `POST /physical/check-balance` | Required |
| [PhysicalGiftCard](docs/api/physical_gift_card.html) | `create` | `POST /physical/fulfil-order` | Required |
| [PhysicalGiftCard](docs/api/physical_gift_card.html) | `create` | `POST /physical/top-up` | Required |
| [PhysicalGiftCard](docs/api/physical_gift_card.html) | `remove` | `DELETE /physical/activate` | Required |
| [PhysicalGiftCard](docs/api/physical_gift_card.html) | `remove` | `DELETE /physical/top-up` | Required |
| [PhysicalOrderCard](docs/api/physical_order_card.html) | `create` | `POST /physical/order-card` | Required |
| [PhysicalOrderStatus](docs/api/physical_order_status.html) | `create` | `POST /physical/order-status` | Required |
| [Promotion](docs/api/promotion.html) | `load` | `GET /promotions` | Required |
| [Template](docs/api/template.html) | `load` | `GET /templates` | Required |

## Connect to the API

- Sandbox: `https://sandbox.tillo.dev/api/v2`

The default credential is sent in the `API-Key` header.

Your API key

HMAC-SHA256 signature of the request

Unix timestamp in milliseconds

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `tillo_list`: List records for an entity. Supported entities: `float`.
- `tillo_load`: Load one record for an entity. Supported entities: `brand`, `brand_template`, `digital_gift_card`, `digital_order_status`, `float`, `promotion`, `template`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

