
import { BaseFeature } from './feature/base/BaseFeature'
import { DebugFeature } from './feature/debug/DebugFeature'
import { IdempotencyFeature } from './feature/idempotency/IdempotencyFeature'
import { MetricsFeature } from './feature/metrics/MetricsFeature'
import { PagingFeature } from './feature/paging/PagingFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Tillo',
        slug: "tillo",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     debug:     {
      "options": {
        "active": false,
        "max": 100,
        "redact": [
          "authorization",
          "cookie",
          "set-cookie",
          "api-key",
          "apikey",
          "x-api-key",
          "idempotency-key"
        ]
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "onEntry": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 idempotency:     {
      "options": {
        "active": false,
        "header": "Idempotency-Key",
        "methods": [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        "ops": [
          "create",
          "update",
          "remove"
        ]
      },
      "optspec": {
        "keygen": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
      "options": {
        "active": false,
        "afterVar": "after",
        "cursorParam": "cursor",
        "firstVar": "first",
        "limitParam": "limit",
        "pageParam": "page",
        "startPage": 1
      },
      "optspec": {
        "limit": "`$NUMBER`",
        "ops": "`$LIST`"
      },
      "strict": false,
      "transport": "none"
    },
 ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://sandbox.tillo.dev/api/v2",

    auth: {
      prefix: '',
      name: 'API-Key',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        brand: {
        },
  
        brand_template: {
        },
  
        digital_gift_card: {
        },
  
        digital_issue_delete: {
        },
  
        digital_issue_post: {
        },
  
        digital_order_card: {
        },
  
        digital_order_status: {
        },
  
        digital_top_up_post: {
        },
  
        float: {
        },
  
        physical_gift_card: {
        },
  
        physical_order_card: {
        },
  
        physical_order_status: {
        },
  
        promotion: {
        },
  
        template: {
        },
  
    }
  }


  entity = {
    "brand": {
      "fields": [
        {
          "name": "brands",
          "type": "`$ANY`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 0
          }
        },
        {
          "format": "date-time",
          "name": "last_refreshed_at",
          "type": "`$STRING`"
        }
      ],
      "name": "brand",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "mock-brand",
                    "kind": "query",
                    "name": "brand",
                    "orig": "brand",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "food-and-drink",
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "GB",
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "GBP",
                    "kind": "query",
                    "name": "currency",
                    "orig": "currency",
                    "type": "`$STRING`"
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "detail",
                    "orig": "detail",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/brands",
              "segments": [
                {
                  "lit": "brands"
                }
              ],
              "select": {
                "exist": [
                  "brand",
                  "category",
                  "country",
                  "currency",
                  "detail"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "brands"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "brand_template": {
      "fields": [],
      "name": "brand_template",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "fixed-async-uk",
                    "kind": "query",
                    "name": "brand",
                    "orig": "brand",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "standard",
                    "kind": "query",
                    "name": "template",
                    "orig": "template",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "2024-01-15",
                    "kind": "query",
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/template",
              "segments": [
                {
                  "lit": "template"
                }
              ],
              "select": {
                "exist": [
                  "brand",
                  "template",
                  "version"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "template"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "digital_gift_card": {
      "fields": [
        {
          "name": "brand",
          "req": true,
          "short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          "type": "`$STRING`"
        },
        {
          "name": "client_request_id",
          "req": true,
          "short": "Unique identifier for this request.",
          "type": "`$STRING`"
        },
        {
          "name": "code",
          "short": "Gift card code",
          "type": "`$STRING`"
        },
        {
          "name": "data",
          "type": "`$OBJECT`"
        },
        {
          "name": "face_value",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "message",
          "type": "`$STRING`"
        },
        {
          "name": "original_client_request_id",
          "short": "This field will be the `client_request_id` provided in the original transaction.",
          "type": "`$STRING`"
        },
        {
          "name": "pin",
          "short": "Gift card PIN.",
          "type": "`$STRING`"
        },
        {
          "format": "uuid",
          "name": "reference",
          "short": "This is the `reference` you received when making the original issuance request.",
          "type": "`$STRING`"
        },
        {
          "name": "sector",
          "req": true,
          "short": "Must match one of the sectors configured for your buyer account.",
          "type": "`$STRING`"
        },
        {
          "name": "serial_number",
          "short": "The serial number is a required parameter for any Sainsburys brand",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        }
      ],
      "name": "digital_gift_card",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/digital/check-balance",
              "segments": [
                {
                  "lit": "digital"
                },
                {
                  "lit": "check-balance"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "digital",
                "check-balance"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "example-brand",
                    "kind": "query",
                    "name": "brand",
                    "orig": "brand",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/check-stock",
              "segments": [
                {
                  "lit": "check-stock"
                }
              ],
              "select": {
                "exist": [
                  "brand"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "check-stock"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "digital_issue_delete": {
      "fields": [
        {
          "name": "brand",
          "req": true,
          "short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          "type": "`$STRING`"
        },
        {
          "name": "client_request_id",
          "req": true,
          "short": "Unique identifier for this request.",
          "type": "`$STRING`"
        },
        {
          "name": "face_value",
          "req": true,
          "type": "`$OBJECT`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 2
          }
        },
        {
          "name": "float_balance",
          "req": true,
          "short": "Your remaining balance on the float used for this cancellation transaction.",
          "type": "`$OBJECT`"
        },
        {
          "name": "original_client_request_id",
          "req": true,
          "short": "This field will be the `client_request_id` provided in the original transaction.",
          "type": "`$STRING`"
        },
        {
          "format": "uuid",
          "name": "reference",
          "req": true,
          "short": "Unique reference (UUID) for the cancellation transaction",
          "type": "`$STRING`"
        },
        {
          "name": "sector",
          "req": true,
          "short": "Must match one of the sectors configured for your buyer account.",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "short": "Optional meta data associated with the issuance.",
          "type": "`$ARRAY`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 1
          }
        }
      ],
      "name": "digital_issue_delete",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/digital/reverse",
              "segments": [
                {
                  "lit": "digital"
                },
                {
                  "lit": "reverse"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "digital",
                "reverse"
              ]
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "DELETE",
              "orig": "/digital/issue",
              "segments": [
                {
                  "lit": "digital"
                },
                {
                  "lit": "issue"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "digital",
                "issue"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "digital_issue_post": {
      "fields": [
        {
          "name": "barcode",
          "req": true,
          "short": "Some brands provide a barcode alongside a code delivery.",
          "type": "`$OBJECT`"
        },
        {
          "name": "brand",
          "req": true,
          "short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          "type": "`$STRING`"
        },
        {
          "name": "client_request_id",
          "req": true,
          "short": "Unique identifier for this request.",
          "type": "`$STRING`"
        },
        {
          "name": "code",
          "short": "Gift card code (for code-delivery brands)",
          "type": "`$STRING`"
        },
        {
          "name": "cost_value",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "delivery_method",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "discount",
          "req": true,
          "short": "The discount percentage used on this transaction",
          "type": "`$NUMBER`"
        },
        {
          "format": "date-time",
          "name": "expiration_date",
          "short": "The expiration date for this gift card.",
          "type": "`$STRING`"
        },
        {
          "name": "face_value",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "float_balance",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "fulfilment_by",
          "req": true,
          "short": "This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.",
          "type": "`$STRING`"
        },
        {
          "name": "fulfilment_parameters",
          "req": true,
          "short": "Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf",
          "type": "`$OBJECT`"
        },
        {
          "name": "personalisation",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "pin",
          "short": "Gift card PIN (for code-delivery brands).",
          "type": "`$STRING`"
        },
        {
          "format": "uuid",
          "name": "reference",
          "req": true,
          "short": "Unique reference for this transaction",
          "type": "`$STRING`"
        },
        {
          "name": "sector",
          "req": true,
          "short": "Must match one of the sectors configured for your buyer account.",
          "type": "`$STRING`"
        },
        {
          "name": "security_code",
          "short": "Gift card security code (for code-delivery brands).",
          "type": "`$STRING`"
        },
        {
          "name": "serial_number",
          "short": "Gift card serial number.",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "short": "Optional meta data associated with the issuance.",
          "type": "`$ARRAY`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 1
          }
        },
        {
          "format": "uri",
          "name": "url",
          "short": "Gift card URL (for URL-delivery brands)",
          "type": "`$STRING`"
        }
      ],
      "name": "digital_issue_post",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/digital/issue",
              "segments": [
                {
                  "lit": "digital"
                },
                {
                  "lit": "issue"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "digital",
                "issue"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "digital_order_card": {
      "fields": [
        {
          "name": "brand",
          "req": true,
          "short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          "type": "`$STRING`"
        },
        {
          "name": "client_request_id",
          "req": true,
          "short": "Unique identifier for this request.",
          "type": "`$STRING`"
        },
        {
          "name": "cost_value",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "delivery_method",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "face_value",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "float_balance",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "fulfilment_by",
          "req": true,
          "short": "This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.",
          "type": "`$STRING`"
        },
        {
          "name": "fulfilment_parameters",
          "req": true,
          "short": "Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf",
          "type": "`$OBJECT`"
        },
        {
          "name": "personalisation",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "format": "uuid",
          "name": "reference",
          "req": true,
          "short": "Unique reference for this transaction",
          "type": "`$STRING`"
        },
        {
          "name": "sector",
          "req": true,
          "short": "Must match one of the sectors configured for your buyer account.",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "short": "Optional meta data associated with the issuance.",
          "type": "`$ARRAY`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 1
          }
        }
      ],
      "name": "digital_order_card",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/digital/order-card",
              "segments": [
                {
                  "lit": "digital"
                },
                {
                  "lit": "order-card"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "digital",
                "order-card"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "digital_order_status": {
      "fields": [
        {
          "name": "barcode",
          "req": true,
          "short": "Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS')",
          "type": "`$OBJECT`"
        },
        {
          "name": "brand",
          "short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          "type": "`$STRING`"
        },
        {
          "name": "code",
          "short": "Gift card code (for code-delivery brands, only present when status is 'SUCCESS')",
          "type": "`$STRING`"
        },
        {
          "name": "cost_value",
          "req": true,
          "short": "Cost value of the gift card (only present when status is 'SUCCESS')",
          "type": "`$OBJECT`"
        },
        {
          "format": "float",
          "name": "discount",
          "short": "The discount percentage used on this transaction",
          "type": "`$NUMBER`"
        },
        {
          "format": "date-time",
          "name": "expiration_date",
          "short": "The expiration date for this gift card.",
          "type": "`$STRING`"
        },
        {
          "name": "face_value",
          "req": true,
          "short": "Face value of the gift card (only present when status is 'SUCCESS')",
          "type": "`$OBJECT`"
        },
        {
          "name": "pin",
          "short": "Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)",
          "type": "`$STRING`"
        },
        {
          "format": "uuid",
          "name": "reference",
          "req": true,
          "short": "Unique reference for this transaction",
          "type": "`$STRING`"
        },
        {
          "name": "security_code",
          "short": "Gift card security code (only present when status is 'SUCCESS' and brand provides one)",
          "type": "`$STRING`"
        },
        {
          "name": "serial_number",
          "short": "Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "req": true,
          "short": "The current status of the order",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "url",
          "short": "Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS')",
          "type": "`$STRING`"
        }
      ],
      "name": "digital_order_status",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "req-12345-67890",
                    "kind": "query",
                    "name": "original_client_request_id",
                    "orig": "original_client_request_id",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "019ade93-d513-776b-92a2-b6323329b661",
                    "kind": "query",
                    "name": "reference",
                    "orig": "reference",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/digital/order-status",
              "segments": [
                {
                  "lit": "digital"
                },
                {
                  "lit": "order-status"
                }
              ],
              "select": {
                "exist": [
                  "original_client_request_id",
                  "reference"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "digital",
                "order-status"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "digital_top_up_post": {
      "fields": [
        {
          "name": "brand",
          "req": true,
          "short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          "type": "`$STRING`"
        },
        {
          "name": "client_request_id",
          "req": true,
          "short": "Unique identifier for this request.",
          "type": "`$STRING`"
        },
        {
          "name": "code",
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "req": true,
          "short": "Gift card code",
          "type": "`$STRING`"
        },
        {
          "name": "cost_value",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "format": "float",
          "name": "discount",
          "req": true,
          "short": "The discount percentage used on this transaction",
          "type": "`$NUMBER`"
        },
        {
          "name": "face_value",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "float_balance",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "pin",
          "short": "Gift card PIN.",
          "type": "`$STRING`"
        },
        {
          "format": "uuid",
          "name": "reference",
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "req": true,
          "short": "Unique reference for this transaction",
          "type": "`$STRING`"
        },
        {
          "name": "sector",
          "req": true,
          "short": "Must match one of the sectors configured for your buyer account.",
          "type": "`$STRING`"
        },
        {
          "name": "serial_number",
          "short": "Gift card serial number.",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "short": "Optional meta data associated with the issuance.",
          "type": "`$ARRAY`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 1
          }
        }
      ],
      "name": "digital_top_up_post",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/digital/top-up",
              "segments": [
                {
                  "lit": "digital"
                },
                {
                  "lit": "top-up"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "digital",
                "top-up"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "float": {
      "fields": [
        {
          "name": "floats",
          "req": true,
          "short": "Float balances grouped by currency code",
          "type": "`$OBJECT`"
        },
        {
          "format": "date-time",
          "name": "last_refreshed_at",
          "req": true,
          "short": "ISO 8601 timestamp of when the float data was last refreshed",
          "type": "`$STRING`"
        }
      ],
      "name": "float",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/float/request-payment-transfer",
              "segments": [
                {
                  "lit": "float"
                },
                {
                  "lit": "request-payment-transfer"
                }
              ],
              "select": {
                "$action": "request_payment_transfer"
              },
              "transform": {
                "req": {
                  "float": "`reqdata`"
                },
                "res": "`body.data`"
              },
              "parts": [
                "float",
                "request-payment-transfer"
              ]
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "GBP",
                    "kind": "query",
                    "name": "currency",
                    "orig": "currency",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "2025-10-16",
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "universal-float",
                    "kind": "query",
                    "name": "float",
                    "orig": "float",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "BUYER-PROVIDED-REF",
                    "kind": "query",
                    "name": "payment_reference",
                    "orig": "payment_reference",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "2025-10-12",
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "pending",
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/float/transfer-requests",
              "segments": [
                {
                  "lit": "float"
                },
                {
                  "lit": "transfer-requests"
                }
              ],
              "select": {
                "$action": "transfer_request",
                "exist": [
                  "currency",
                  "end_date",
                  "float",
                  "payment_reference",
                  "start_date",
                  "status"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "float",
                "transfer-requests"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "GBP",
                    "kind": "query",
                    "name": "currency",
                    "orig": "currency",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/check-floats",
              "segments": [
                {
                  "lit": "check-floats"
                }
              ],
              "select": {
                "exist": [
                  "currency"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "check-floats"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "physical_gift_card": {
      "fields": [
        {
          "name": "brand",
          "req": true,
          "short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          "type": "`$STRING`"
        },
        {
          "name": "client_request_id",
          "req": true,
          "short": "Unique identifier for this request.",
          "type": "`$STRING`"
        },
        {
          "name": "code",
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "req": true,
          "short": "The long card number on the physical gift card you wish to cash out",
          "type": "`$STRING`"
        },
        {
          "name": "cost_value",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "format": "float",
          "name": "discount",
          "req": true,
          "short": "The discount percentage used on this transaction",
          "type": "`$NUMBER`"
        },
        {
          "format": "date-time",
          "name": "expiration_date",
          "short": "The expiration date for this gift card.",
          "type": "`$STRING`"
        },
        {
          "name": "face_value",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "float_balance",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "format": "date-time",
          "name": "fulfilled_at",
          "short": "The date for which this this gift card was fulfilled.",
          "type": "`$STRING`"
        },
        {
          "name": "original_client_request_id",
          "req": true,
          "short": "This field will be the `client_request_id` provided in the original transaction.",
          "type": "`$STRING`"
        },
        {
          "name": "pin",
          "short": "The pin number (only applies to certain brands which provide pin) on the physical gift card",
          "type": "`$STRING`"
        },
        {
          "format": "uuid",
          "name": "reference",
          "req": true,
          "short": "Unique reference for this transaction",
          "type": "`$STRING`"
        },
        {
          "name": "sector",
          "req": true,
          "short": "Must match one of the sectors configured for your buyer account.",
          "type": "`$STRING`"
        },
        {
          "name": "security_code",
          "short": "Gift card security code (for code-delivery brands).",
          "type": "`$STRING`"
        },
        {
          "name": "serial_number",
          "short": "Gift card serial number.",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "short": "Optional meta data associated with the issuance.",
          "type": "`$ARRAY`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 1
          }
        },
        {
          "format": "uri",
          "name": "url",
          "short": "Gift card URL (for URL-delivery brands)",
          "type": "`$STRING`"
        }
      ],
      "name": "physical_gift_card",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/physical/activate",
              "segments": [
                {
                  "lit": "physical"
                },
                {
                  "lit": "activate"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "physical",
                "activate"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/physical/cash-out-original-transaction",
              "segments": [
                {
                  "lit": "physical"
                },
                {
                  "lit": "cash-out-original-transaction"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "physical",
                "cash-out-original-transaction"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/physical/check-balance",
              "segments": [
                {
                  "lit": "physical"
                },
                {
                  "lit": "check-balance"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "physical",
                "check-balance"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/physical/fulfil-order",
              "segments": [
                {
                  "lit": "physical"
                },
                {
                  "lit": "fulfil-order"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "physical",
                "fulfil-order"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/physical/top-up",
              "segments": [
                {
                  "lit": "physical"
                },
                {
                  "lit": "top-up"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "physical",
                "top-up"
              ]
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "DELETE",
              "orig": "/physical/activate",
              "segments": [
                {
                  "lit": "physical"
                },
                {
                  "lit": "activate"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "physical",
                "activate"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "DELETE",
              "orig": "/physical/top-up",
              "segments": [
                {
                  "lit": "physical"
                },
                {
                  "lit": "top-up"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "physical",
                "top-up"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "physical_order_card": {
      "fields": [
        {
          "name": "brand",
          "req": true,
          "short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          "type": "`$STRING`"
        },
        {
          "name": "client_request_id",
          "req": true,
          "short": "Unique identifier for this request.",
          "type": "`$STRING`"
        },
        {
          "name": "cost_value",
          "req": true,
          "short": "The amount you actually paid (once the discount has been taken into consideration)",
          "type": "`$OBJECT`"
        },
        {
          "format": "float",
          "name": "discount",
          "req": true,
          "short": "The discount percentage used on this transaction",
          "type": "`$NUMBER`"
        },
        {
          "format": "date-time",
          "name": "expiration_date",
          "short": "The expiration date for this gift card.",
          "type": "`$STRING`"
        },
        {
          "name": "face_value",
          "req": true,
          "short": "the face value amount of the gift card.",
          "type": "`$OBJECT`"
        },
        {
          "name": "float_balance",
          "req": true,
          "short": "Your remaining balance on the float used to make this transaction",
          "type": "`$OBJECT`"
        },
        {
          "name": "fulfilment_by",
          "req": true,
          "short": "When ordering a physical gift card, this must be set to `rewardcloud`",
          "type": "`$STRING`"
        },
        {
          "name": "fulfilment_parameters",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "personalisation",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "format": "uuid",
          "name": "reference",
          "req": true,
          "short": "Unique reference for this transaction",
          "type": "`$STRING`"
        },
        {
          "name": "sector",
          "req": true,
          "short": "Must match one of the sectors configured for your buyer account.",
          "type": "`$STRING`"
        },
        {
          "name": "shipping_method",
          "req": true,
          "short": "Shipping method identifier.",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "short": "Optional meta data associated with the issuance.",
          "type": "`$ARRAY`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 1
          }
        }
      ],
      "name": "physical_order_card",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/physical/order-card",
              "segments": [
                {
                  "lit": "physical"
                },
                {
                  "lit": "order-card"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "physical",
                "order-card"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "physical_order_status": {
      "fields": [
        {
          "name": "references",
          "req": true,
          "short": "Array of order references to check.",
          "type": "`$ARRAY`"
        }
      ],
      "name": "physical_order_status",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/physical/order-status",
              "segments": [
                {
                  "lit": "physical"
                },
                {
                  "lit": "order-status"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "physical",
                "order-status"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "promotion": {
      "fields": [
        {
          "format": "date-time",
          "name": "last_refreshed_at",
          "req": true,
          "short": "ISO 8601 timestamp of when promotion data was last refreshed.",
          "type": "`$STRING`"
        },
        {
          "name": "standard",
          "req": true,
          "short": "Standard promotions grouped by brand slug.",
          "type": "`$OBJECT`"
        }
      ],
      "name": "promotion",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/promotions",
              "segments": [
                {
                  "lit": "promotions"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "promotions"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "template": {
      "fields": [
        {
          "format": "date-time",
          "name": "last_refreshed_at",
          "req": true,
          "short": "ISO 8601 timestamp of when the template data was last refreshed",
          "type": "`$STRING`"
        },
        {
          "name": "templates",
          "req": true,
          "short": "Object mapping brand slugs to their template variants and versions.",
          "type": "`$OBJECT`"
        }
      ],
      "name": "template",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "fixed-async-uk",
                    "kind": "query",
                    "name": "brand",
                    "orig": "brand",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "standard",
                    "kind": "query",
                    "name": "template",
                    "orig": "template",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/templates",
              "segments": [
                {
                  "lit": "templates"
                }
              ],
              "select": {
                "exist": [
                  "brand",
                  "template"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "templates"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

