-- Tillo SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Tillo",
      slug = "tillo",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["debug"] = {
        ["options"] = {
          ["active"] = false,
          ["max"] = 100,
          ["redact"] = {
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          },
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["onEntry"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["idempotency"] = {
        ["options"] = {
          ["active"] = false,
          ["header"] = "Idempotency-Key",
          ["methods"] = {
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          },
          ["ops"] = {
            "create",
            "update",
            "remove",
          },
        },
        ["optspec"] = {
          ["keygen"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["metrics"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["paging"] = {
        ["options"] = {
          ["active"] = false,
          ["afterVar"] = "after",
          ["cursorParam"] = "cursor",
          ["firstVar"] = "first",
          ["limitParam"] = "limit",
          ["pageParam"] = "page",
          ["startPage"] = 1,
        },
        ["optspec"] = {
          ["limit"] = "`$NUMBER`",
          ["ops"] = "`$LIST`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://sandbox.tillo.dev/api/v2",
      auth = {
        prefix = "",
        name = "API-Key",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["brand"] = {},
        ["brand_template"] = {},
        ["digital_gift_card"] = {},
        ["digital_issue_delete"] = {},
        ["digital_issue_post"] = {},
        ["digital_order_card"] = {},
        ["digital_order_status"] = {},
        ["digital_top_up_post"] = {},
        ["float"] = {},
        ["physical_gift_card"] = {},
        ["physical_order_card"] = {},
        ["physical_order_status"] = {},
        ["promotion"] = {},
        ["template"] = {},
      },
    },
    entity = {
      ["brand"] = {
        ["fields"] = {
          {
            ["name"] = "brands",
            ["title"] = "Brands",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "last_refreshed_at",
            ["title"] = "Last Refreshed At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
        },
        ["name"] = "brand",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/brands",
                ["segments"] = {
                  {
                    ["lit"] = "brands",
                  },
                },
                ["parts"] = {
                  "brands",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "brand",
                      ["orig"] = "brand",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "mock-brand",
                    },
                    {
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "food-and-drink",
                    },
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "GB",
                    },
                    {
                      ["name"] = "currency",
                      ["orig"] = "currency",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "GBP",
                    },
                    {
                      ["name"] = "detail",
                      ["orig"] = "detail",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                      ["example"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "brand",
                    "category",
                    "country",
                    "currency",
                    "detail",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["brand_template"] = {
        ["fields"] = {},
        ["name"] = "brand_template",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/template",
                ["segments"] = {
                  {
                    ["lit"] = "template",
                  },
                },
                ["parts"] = {
                  "template",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "brand",
                      ["orig"] = "brand",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "fixed-async-uk",
                    },
                    {
                      ["name"] = "template",
                      ["orig"] = "template",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "standard",
                    },
                    {
                      ["name"] = "version",
                      ["orig"] = "version",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "2024-01-15",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "brand",
                    "template",
                    "version",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["digital_gift_card"] = {
        ["fields"] = {
          {
            ["name"] = "brand",
            ["title"] = "Brand",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          },
          {
            ["name"] = "client_request_id",
            ["title"] = "Client Request Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique identifier for this request.",
          },
          {
            ["name"] = "code",
            ["title"] = "Code",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card code",
          },
          {
            ["name"] = "data",
            ["title"] = "Data",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "face_value",
            ["title"] = "Face Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "message",
            ["title"] = "Message",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "original_client_request_id",
            ["title"] = "Original Client Request Id",
            ["type"] = "`$STRING`",
            ["short"] = "This field will be the `client_request_id` provided in the original transaction.",
          },
          {
            ["name"] = "pin",
            ["title"] = "Pin",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card PIN.",
          },
          {
            ["name"] = "reference",
            ["title"] = "Reference",
            ["type"] = "`$STRING`",
            ["short"] = "This is the `reference` you received when making the original issuance request.",
            ["format"] = "uuid",
          },
          {
            ["name"] = "sector",
            ["title"] = "Sector",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Must match one of the sectors configured for your buyer account.",
          },
          {
            ["name"] = "serial_number",
            ["title"] = "Serial Number",
            ["type"] = "`$STRING`",
            ["short"] = "The serial number is a required parameter for any Sainsburys brand",
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "digital_gift_card",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/digital/check-balance",
                ["segments"] = {
                  {
                    ["lit"] = "digital",
                  },
                  {
                    ["lit"] = "check-balance",
                  },
                },
                ["parts"] = {
                  "digital",
                  "check-balance",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/check-stock",
                ["segments"] = {
                  {
                    ["lit"] = "check-stock",
                  },
                },
                ["parts"] = {
                  "check-stock",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "brand",
                      ["orig"] = "brand",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "example-brand",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "brand",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["digital_issue_delete"] = {
        ["fields"] = {
          {
            ["name"] = "brand",
            ["title"] = "Brand",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          },
          {
            ["name"] = "client_request_id",
            ["title"] = "Client Request Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique identifier for this request.",
          },
          {
            ["name"] = "face_value",
            ["title"] = "Face Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "float_balance",
            ["title"] = "Float Balance",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Your remaining balance on the float used for this cancellation transaction.",
          },
          {
            ["name"] = "original_client_request_id",
            ["title"] = "Original Client Request Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "This field will be the `client_request_id` provided in the original transaction.",
          },
          {
            ["name"] = "reference",
            ["title"] = "Reference",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique reference (UUID) for the cancellation transaction",
            ["format"] = "uuid",
          },
          {
            ["name"] = "sector",
            ["title"] = "Sector",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Must match one of the sectors configured for your buyer account.",
          },
          {
            ["name"] = "tags",
            ["title"] = "Tags",
            ["type"] = "`$ARRAY`",
            ["short"] = "Optional meta data associated with the issuance.",
          },
        },
        ["name"] = "digital_issue_delete",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/digital/reverse",
                ["segments"] = {
                  {
                    ["lit"] = "digital",
                  },
                  {
                    ["lit"] = "reverse",
                  },
                },
                ["parts"] = {
                  "digital",
                  "reverse",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/digital/issue",
                ["segments"] = {
                  {
                    ["lit"] = "digital",
                  },
                  {
                    ["lit"] = "issue",
                  },
                },
                ["parts"] = {
                  "digital",
                  "issue",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["digital_issue_post"] = {
        ["fields"] = {
          {
            ["name"] = "barcode",
            ["title"] = "Barcode",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Some brands provide a barcode alongside a code delivery.",
          },
          {
            ["name"] = "brand",
            ["title"] = "Brand",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          },
          {
            ["name"] = "client_request_id",
            ["title"] = "Client Request Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique identifier for this request.",
          },
          {
            ["name"] = "code",
            ["title"] = "Code",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card code (for code-delivery brands)",
          },
          {
            ["name"] = "cost_value",
            ["title"] = "Cost Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "delivery_method",
            ["title"] = "Delivery Method",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "discount",
            ["title"] = "Discount",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "The discount percentage used on this transaction",
            ["format"] = "float",
          },
          {
            ["name"] = "expiration_date",
            ["title"] = "Expiration Date",
            ["type"] = "`$STRING`",
            ["short"] = "The expiration date for this gift card.",
            ["format"] = "date-time",
          },
          {
            ["name"] = "face_value",
            ["title"] = "Face Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "float_balance",
            ["title"] = "Float Balance",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "fulfilment_by",
            ["title"] = "Fulfilment By",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.",
          },
          {
            ["name"] = "fulfilment_parameters",
            ["title"] = "Fulfilment Parameters",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf",
          },
          {
            ["name"] = "personalisation",
            ["title"] = "Personalisation",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "pin",
            ["title"] = "Pin",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card PIN (for code-delivery brands).",
          },
          {
            ["name"] = "reference",
            ["title"] = "Reference",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique reference for this transaction",
            ["format"] = "uuid",
          },
          {
            ["name"] = "sector",
            ["title"] = "Sector",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Must match one of the sectors configured for your buyer account.",
          },
          {
            ["name"] = "security_code",
            ["title"] = "Security Code",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card security code (for code-delivery brands).",
          },
          {
            ["name"] = "serial_number",
            ["title"] = "Serial Number",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card serial number.",
          },
          {
            ["name"] = "tags",
            ["title"] = "Tags",
            ["type"] = "`$ARRAY`",
            ["short"] = "Optional meta data associated with the issuance.",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card URL (for URL-delivery brands)",
            ["format"] = "uri",
          },
        },
        ["name"] = "digital_issue_post",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/digital/issue",
                ["segments"] = {
                  {
                    ["lit"] = "digital",
                  },
                  {
                    ["lit"] = "issue",
                  },
                },
                ["parts"] = {
                  "digital",
                  "issue",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["digital_order_card"] = {
        ["fields"] = {
          {
            ["name"] = "brand",
            ["title"] = "Brand",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          },
          {
            ["name"] = "client_request_id",
            ["title"] = "Client Request Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique identifier for this request.",
          },
          {
            ["name"] = "cost_value",
            ["title"] = "Cost Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "delivery_method",
            ["title"] = "Delivery Method",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "face_value",
            ["title"] = "Face Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "float_balance",
            ["title"] = "Float Balance",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "fulfilment_by",
            ["title"] = "Fulfilment By",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.",
          },
          {
            ["name"] = "fulfilment_parameters",
            ["title"] = "Fulfilment Parameters",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf",
          },
          {
            ["name"] = "personalisation",
            ["title"] = "Personalisation",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "reference",
            ["title"] = "Reference",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique reference for this transaction",
            ["format"] = "uuid",
          },
          {
            ["name"] = "sector",
            ["title"] = "Sector",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Must match one of the sectors configured for your buyer account.",
          },
          {
            ["name"] = "tags",
            ["title"] = "Tags",
            ["type"] = "`$ARRAY`",
            ["short"] = "Optional meta data associated with the issuance.",
          },
        },
        ["name"] = "digital_order_card",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/digital/order-card",
                ["segments"] = {
                  {
                    ["lit"] = "digital",
                  },
                  {
                    ["lit"] = "order-card",
                  },
                },
                ["parts"] = {
                  "digital",
                  "order-card",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["digital_order_status"] = {
        ["fields"] = {
          {
            ["name"] = "barcode",
            ["title"] = "Barcode",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS')",
          },
          {
            ["name"] = "brand",
            ["title"] = "Brand",
            ["type"] = "`$STRING`",
            ["short"] = "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          },
          {
            ["name"] = "code",
            ["title"] = "Code",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card code (for code-delivery brands, only present when status is 'SUCCESS')",
          },
          {
            ["name"] = "cost_value",
            ["title"] = "Cost Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Cost value of the gift card (only present when status is 'SUCCESS')",
          },
          {
            ["name"] = "discount",
            ["title"] = "Discount",
            ["type"] = "`$NUMBER`",
            ["short"] = "The discount percentage used on this transaction",
            ["format"] = "float",
          },
          {
            ["name"] = "expiration_date",
            ["title"] = "Expiration Date",
            ["type"] = "`$STRING`",
            ["short"] = "The expiration date for this gift card.",
            ["format"] = "date-time",
          },
          {
            ["name"] = "face_value",
            ["title"] = "Face Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Face value of the gift card (only present when status is 'SUCCESS')",
          },
          {
            ["name"] = "pin",
            ["title"] = "Pin",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)",
          },
          {
            ["name"] = "reference",
            ["title"] = "Reference",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique reference for this transaction",
            ["format"] = "uuid",
          },
          {
            ["name"] = "security_code",
            ["title"] = "Security Code",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card security code (only present when status is 'SUCCESS' and brand provides one)",
          },
          {
            ["name"] = "serial_number",
            ["title"] = "Serial Number",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)",
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The current status of the order",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS')",
            ["format"] = "uri",
          },
        },
        ["name"] = "digital_order_status",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/digital/order-status",
                ["segments"] = {
                  {
                    ["lit"] = "digital",
                  },
                  {
                    ["lit"] = "order-status",
                  },
                },
                ["parts"] = {
                  "digital",
                  "order-status",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "original_client_request_id",
                      ["orig"] = "original_client_request_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "req-12345-67890",
                    },
                    {
                      ["name"] = "reference",
                      ["orig"] = "reference",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "019ade93-d513-776b-92a2-b6323329b661",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "original_client_request_id",
                    "reference",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["digital_top_up_post"] = {
        ["fields"] = {
          {
            ["name"] = "brand",
            ["title"] = "Brand",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          },
          {
            ["name"] = "client_request_id",
            ["title"] = "Client Request Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique identifier for this request.",
          },
          {
            ["name"] = "code",
            ["title"] = "Code",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["op"] = {
              ["create"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Gift card code",
          },
          {
            ["name"] = "cost_value",
            ["title"] = "Cost Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "discount",
            ["title"] = "Discount",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "The discount percentage used on this transaction",
            ["format"] = "float",
          },
          {
            ["name"] = "face_value",
            ["title"] = "Face Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "float_balance",
            ["title"] = "Float Balance",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "pin",
            ["title"] = "Pin",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card PIN.",
          },
          {
            ["name"] = "reference",
            ["title"] = "Reference",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["op"] = {
              ["create"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Unique reference for this transaction",
            ["format"] = "uuid",
          },
          {
            ["name"] = "sector",
            ["title"] = "Sector",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Must match one of the sectors configured for your buyer account.",
          },
          {
            ["name"] = "serial_number",
            ["title"] = "Serial Number",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card serial number.",
          },
          {
            ["name"] = "tags",
            ["title"] = "Tags",
            ["type"] = "`$ARRAY`",
            ["short"] = "Optional meta data associated with the issuance.",
          },
        },
        ["name"] = "digital_top_up_post",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/digital/top-up",
                ["segments"] = {
                  {
                    ["lit"] = "digital",
                  },
                  {
                    ["lit"] = "top-up",
                  },
                },
                ["parts"] = {
                  "digital",
                  "top-up",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["float"] = {
        ["fields"] = {
          {
            ["name"] = "floats",
            ["title"] = "Floats",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Float balances grouped by currency code",
          },
          {
            ["name"] = "last_refreshed_at",
            ["title"] = "Last Refreshed At",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "ISO 8601 timestamp of when the float data was last refreshed",
            ["format"] = "date-time",
          },
        },
        ["name"] = "float",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/float/request-payment-transfer",
                ["segments"] = {
                  {
                    ["lit"] = "float",
                  },
                  {
                    ["lit"] = "request-payment-transfer",
                  },
                },
                ["parts"] = {
                  "float",
                  "request-payment-transfer",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = {
                    ["float"] = "`reqdata`",
                  },
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {
                  ["$action"] = "request_payment_transfer",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/float/transfer-requests",
                ["segments"] = {
                  {
                    ["lit"] = "float",
                  },
                  {
                    ["lit"] = "transfer-requests",
                  },
                },
                ["parts"] = {
                  "float",
                  "transfer-requests",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "currency",
                      ["orig"] = "currency",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "GBP",
                    },
                    {
                      ["name"] = "end_date",
                      ["orig"] = "end_date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "2025-10-16",
                    },
                    {
                      ["name"] = "float",
                      ["orig"] = "float",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "universal-float",
                    },
                    {
                      ["name"] = "payment_reference",
                      ["orig"] = "payment_reference",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "BUYER-PROVIDED-REF",
                    },
                    {
                      ["name"] = "start_date",
                      ["orig"] = "start_date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "2025-10-12",
                    },
                    {
                      ["name"] = "status",
                      ["orig"] = "status",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "pending",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "transfer_request",
                  ["exist"] = {
                    "currency",
                    "end_date",
                    "float",
                    "payment_reference",
                    "start_date",
                    "status",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/check-floats",
                ["segments"] = {
                  {
                    ["lit"] = "check-floats",
                  },
                },
                ["parts"] = {
                  "check-floats",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "currency",
                      ["orig"] = "currency",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "GBP",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "currency",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["physical_gift_card"] = {
        ["fields"] = {
          {
            ["name"] = "brand",
            ["title"] = "Brand",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          },
          {
            ["name"] = "client_request_id",
            ["title"] = "Client Request Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique identifier for this request.",
          },
          {
            ["name"] = "code",
            ["title"] = "Code",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["op"] = {
              ["create"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The long card number on the physical gift card you wish to cash out",
          },
          {
            ["name"] = "cost_value",
            ["title"] = "Cost Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "discount",
            ["title"] = "Discount",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "The discount percentage used on this transaction",
            ["format"] = "float",
          },
          {
            ["name"] = "expiration_date",
            ["title"] = "Expiration Date",
            ["type"] = "`$STRING`",
            ["short"] = "The expiration date for this gift card.",
            ["format"] = "date-time",
          },
          {
            ["name"] = "face_value",
            ["title"] = "Face Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "float_balance",
            ["title"] = "Float Balance",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "fulfilled_at",
            ["title"] = "Fulfilled At",
            ["type"] = "`$STRING`",
            ["short"] = "The date for which this this gift card was fulfilled.",
            ["format"] = "date-time",
          },
          {
            ["name"] = "original_client_request_id",
            ["title"] = "Original Client Request Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "This field will be the `client_request_id` provided in the original transaction.",
          },
          {
            ["name"] = "pin",
            ["title"] = "Pin",
            ["type"] = "`$STRING`",
            ["short"] = "The pin number (only applies to certain brands which provide pin) on the physical gift card",
          },
          {
            ["name"] = "reference",
            ["title"] = "Reference",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique reference for this transaction",
            ["format"] = "uuid",
          },
          {
            ["name"] = "sector",
            ["title"] = "Sector",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Must match one of the sectors configured for your buyer account.",
          },
          {
            ["name"] = "security_code",
            ["title"] = "Security Code",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card security code (for code-delivery brands).",
          },
          {
            ["name"] = "serial_number",
            ["title"] = "Serial Number",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card serial number.",
          },
          {
            ["name"] = "tags",
            ["title"] = "Tags",
            ["type"] = "`$ARRAY`",
            ["short"] = "Optional meta data associated with the issuance.",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["short"] = "Gift card URL (for URL-delivery brands)",
            ["format"] = "uri",
          },
        },
        ["name"] = "physical_gift_card",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/physical/activate",
                ["segments"] = {
                  {
                    ["lit"] = "physical",
                  },
                  {
                    ["lit"] = "activate",
                  },
                },
                ["parts"] = {
                  "physical",
                  "activate",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/physical/cash-out-original-transaction",
                ["segments"] = {
                  {
                    ["lit"] = "physical",
                  },
                  {
                    ["lit"] = "cash-out-original-transaction",
                  },
                },
                ["parts"] = {
                  "physical",
                  "cash-out-original-transaction",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/physical/check-balance",
                ["segments"] = {
                  {
                    ["lit"] = "physical",
                  },
                  {
                    ["lit"] = "check-balance",
                  },
                },
                ["parts"] = {
                  "physical",
                  "check-balance",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/physical/fulfil-order",
                ["segments"] = {
                  {
                    ["lit"] = "physical",
                  },
                  {
                    ["lit"] = "fulfil-order",
                  },
                },
                ["parts"] = {
                  "physical",
                  "fulfil-order",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/physical/top-up",
                ["segments"] = {
                  {
                    ["lit"] = "physical",
                  },
                  {
                    ["lit"] = "top-up",
                  },
                },
                ["parts"] = {
                  "physical",
                  "top-up",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/physical/activate",
                ["segments"] = {
                  {
                    ["lit"] = "physical",
                  },
                  {
                    ["lit"] = "activate",
                  },
                },
                ["parts"] = {
                  "physical",
                  "activate",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/physical/top-up",
                ["segments"] = {
                  {
                    ["lit"] = "physical",
                  },
                  {
                    ["lit"] = "top-up",
                  },
                },
                ["parts"] = {
                  "physical",
                  "top-up",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["physical_order_card"] = {
        ["fields"] = {
          {
            ["name"] = "brand",
            ["title"] = "Brand",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
          },
          {
            ["name"] = "client_request_id",
            ["title"] = "Client Request Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique identifier for this request.",
          },
          {
            ["name"] = "cost_value",
            ["title"] = "Cost Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "The amount you actually paid (once the discount has been taken into consideration)",
          },
          {
            ["name"] = "discount",
            ["title"] = "Discount",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "The discount percentage used on this transaction",
            ["format"] = "float",
          },
          {
            ["name"] = "expiration_date",
            ["title"] = "Expiration Date",
            ["type"] = "`$STRING`",
            ["short"] = "The expiration date for this gift card.",
            ["format"] = "date-time",
          },
          {
            ["name"] = "face_value",
            ["title"] = "Face Value",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "the face value amount of the gift card.",
          },
          {
            ["name"] = "float_balance",
            ["title"] = "Float Balance",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Your remaining balance on the float used to make this transaction",
          },
          {
            ["name"] = "fulfilment_by",
            ["title"] = "Fulfilment By",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "When ordering a physical gift card, this must be set to `rewardcloud`",
          },
          {
            ["name"] = "fulfilment_parameters",
            ["title"] = "Fulfilment Parameters",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "personalisation",
            ["title"] = "Personalisation",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "reference",
            ["title"] = "Reference",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Unique reference for this transaction",
            ["format"] = "uuid",
          },
          {
            ["name"] = "sector",
            ["title"] = "Sector",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Must match one of the sectors configured for your buyer account.",
          },
          {
            ["name"] = "shipping_method",
            ["title"] = "Shipping Method",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Shipping method identifier.",
          },
          {
            ["name"] = "tags",
            ["title"] = "Tags",
            ["type"] = "`$ARRAY`",
            ["short"] = "Optional meta data associated with the issuance.",
          },
        },
        ["name"] = "physical_order_card",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/physical/order-card",
                ["segments"] = {
                  {
                    ["lit"] = "physical",
                  },
                  {
                    ["lit"] = "order-card",
                  },
                },
                ["parts"] = {
                  "physical",
                  "order-card",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["physical_order_status"] = {
        ["fields"] = {
          {
            ["name"] = "references",
            ["title"] = "References",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Array of order references to check.",
          },
        },
        ["name"] = "physical_order_status",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/physical/order-status",
                ["segments"] = {
                  {
                    ["lit"] = "physical",
                  },
                  {
                    ["lit"] = "order-status",
                  },
                },
                ["parts"] = {
                  "physical",
                  "order-status",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["promotion"] = {
        ["fields"] = {
          {
            ["name"] = "last_refreshed_at",
            ["title"] = "Last Refreshed At",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "ISO 8601 timestamp of when promotion data was last refreshed.",
            ["format"] = "date-time",
          },
          {
            ["name"] = "standard",
            ["title"] = "Standard",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Standard promotions grouped by brand slug.",
          },
        },
        ["name"] = "promotion",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/promotions",
                ["segments"] = {
                  {
                    ["lit"] = "promotions",
                  },
                },
                ["parts"] = {
                  "promotions",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["template"] = {
        ["fields"] = {
          {
            ["name"] = "last_refreshed_at",
            ["title"] = "Last Refreshed At",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "ISO 8601 timestamp of when the template data was last refreshed",
            ["format"] = "date-time",
          },
          {
            ["name"] = "templates",
            ["title"] = "Templates",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Object mapping brand slugs to their template variants and versions.",
          },
        },
        ["name"] = "template",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/templates",
                ["segments"] = {
                  {
                    ["lit"] = "templates",
                  },
                },
                ["parts"] = {
                  "templates",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "brand",
                      ["orig"] = "brand",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "fixed-async-uk",
                    },
                    {
                      ["name"] = "template",
                      ["orig"] = "template",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "standard",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "brand",
                    "template",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
