package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Tillo",
			"slug": "tillo",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://sandbox.tillo.dev/api/v2",
			"auth": map[string]any{
				"prefix": "",
				"name": "API-Key",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"brand": map[string]any{},
				"brand_template": map[string]any{},
				"digital_gift_card": map[string]any{},
				"digital_issue_delete": map[string]any{},
				"digital_issue_post": map[string]any{},
				"digital_order_card": map[string]any{},
				"digital_order_status": map[string]any{},
				"digital_top_up_post": map[string]any{},
				"float": map[string]any{},
				"physical_gift_card": map[string]any{},
				"physical_order_card": map[string]any{},
				"physical_order_status": map[string]any{},
				"promotion": map[string]any{},
				"template": map[string]any{},
			},
		},
		"entity": map[string]any{
			"brand": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "brands",
						"type": "`$ANY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"format": "date-time",
						"name": "last_refreshed_at",
						"type": "`$STRING`",
					},
				},
				"name": "brand",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "mock-brand",
											"kind": "query",
											"name": "brand",
											"orig": "brand",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "food-and-drink",
											"kind": "query",
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "GB",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "GBP",
											"kind": "query",
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": true,
											"kind": "query",
											"name": "detail",
											"orig": "detail",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/brands",
								"segments": []any{
									map[string]any{
										"lit": "brands",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"brand",
										"category",
										"country",
										"currency",
										"detail",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"brands",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"brand_template": map[string]any{
				"fields": []any{},
				"name": "brand_template",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "fixed-async-uk",
											"kind": "query",
											"name": "brand",
											"orig": "brand",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "standard",
											"kind": "query",
											"name": "template",
											"orig": "template",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2024-01-15",
											"kind": "query",
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/template",
								"segments": []any{
									map[string]any{
										"lit": "template",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"brand",
										"template",
										"version",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"template",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"digital_gift_card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "brand",
						"req": true,
						"short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "client_request_id",
						"req": true,
						"short": "Unique identifier for this request.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"short": "Gift card code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "face_value",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "original_client_request_id",
						"short": "This field will be the `client_request_id` provided in the original transaction.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pin",
						"short": "Gift card PIN.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "reference",
						"short": "This is the `reference` you received when making the original issuance request.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sector",
						"req": true,
						"short": "Must match one of the sectors configured for your buyer account.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "serial_number",
						"short": "The serial number is a required parameter for any Sainsburys brand",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"name": "digital_gift_card",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/digital/check-balance",
								"segments": []any{
									map[string]any{
										"lit": "digital",
									},
									map[string]any{
										"lit": "check-balance",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"digital",
									"check-balance",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "example-brand",
											"kind": "query",
											"name": "brand",
											"orig": "brand",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/check-stock",
								"segments": []any{
									map[string]any{
										"lit": "check-stock",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"brand",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"check-stock",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"digital_issue_delete": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "brand",
						"req": true,
						"short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "client_request_id",
						"req": true,
						"short": "Unique identifier for this request.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "face_value",
						"req": true,
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 2,
						},
					},
					map[string]any{
						"name": "float_balance",
						"req": true,
						"short": "Your remaining balance on the float used for this cancellation transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "original_client_request_id",
						"req": true,
						"short": "This field will be the `client_request_id` provided in the original transaction.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "reference",
						"req": true,
						"short": "Unique reference (UUID) for the cancellation transaction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sector",
						"req": true,
						"short": "Must match one of the sectors configured for your buyer account.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"short": "Optional meta data associated with the issuance.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 1,
						},
					},
				},
				"name": "digital_issue_delete",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/digital/reverse",
								"segments": []any{
									map[string]any{
										"lit": "digital",
									},
									map[string]any{
										"lit": "reverse",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"digital",
									"reverse",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "DELETE",
								"orig": "/digital/issue",
								"segments": []any{
									map[string]any{
										"lit": "digital",
									},
									map[string]any{
										"lit": "issue",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"digital",
									"issue",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"digital_issue_post": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "barcode",
						"req": true,
						"short": "Some brands provide a barcode alongside a code delivery.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "brand",
						"req": true,
						"short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "client_request_id",
						"req": true,
						"short": "Unique identifier for this request.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"short": "Gift card code (for code-delivery brands)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_value",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "delivery_method",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "float",
						"name": "discount",
						"req": true,
						"short": "The discount percentage used on this transaction",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "expiration_date",
						"short": "The expiration date for this gift card.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "face_value",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "float_balance",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "fulfilment_by",
						"req": true,
						"short": "This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fulfilment_parameters",
						"req": true,
						"short": "Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "personalisation",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "pin",
						"short": "Gift card PIN (for code-delivery brands).",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "reference",
						"req": true,
						"short": "Unique reference for this transaction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sector",
						"req": true,
						"short": "Must match one of the sectors configured for your buyer account.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "security_code",
						"short": "Gift card security code (for code-delivery brands).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "serial_number",
						"short": "Gift card serial number.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"short": "Optional meta data associated with the issuance.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 1,
						},
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "Gift card URL (for URL-delivery brands)",
						"type": "`$STRING`",
					},
				},
				"name": "digital_issue_post",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/digital/issue",
								"segments": []any{
									map[string]any{
										"lit": "digital",
									},
									map[string]any{
										"lit": "issue",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"digital",
									"issue",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"digital_order_card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "brand",
						"req": true,
						"short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "client_request_id",
						"req": true,
						"short": "Unique identifier for this request.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_value",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "delivery_method",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "face_value",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "float_balance",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "fulfilment_by",
						"req": true,
						"short": "This parameter dictates who will be responsible for sending out the confirmation email once a gift card has been issued.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fulfilment_parameters",
						"req": true,
						"short": "Fulfilment parameters are required when you want Tillo to send the issuance email on your behalf",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "personalisation",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "uuid",
						"name": "reference",
						"req": true,
						"short": "Unique reference for this transaction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sector",
						"req": true,
						"short": "Must match one of the sectors configured for your buyer account.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"short": "Optional meta data associated with the issuance.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 1,
						},
					},
				},
				"name": "digital_order_card",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/digital/order-card",
								"segments": []any{
									map[string]any{
										"lit": "digital",
									},
									map[string]any{
										"lit": "order-card",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"digital",
									"order-card",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"digital_order_status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "barcode",
						"req": true,
						"short": "Some brands provide a barcode alongside a code delivery (only present when status is 'SUCCESS')",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "brand",
						"short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"short": "Gift card code (for code-delivery brands, only present when status is 'SUCCESS')",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_value",
						"req": true,
						"short": "Cost value of the gift card (only present when status is 'SUCCESS')",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "float",
						"name": "discount",
						"short": "The discount percentage used on this transaction",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "expiration_date",
						"short": "The expiration date for this gift card.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "face_value",
						"req": true,
						"short": "Face value of the gift card (only present when status is 'SUCCESS')",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "pin",
						"short": "Gift card PIN (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "reference",
						"req": true,
						"short": "Unique reference for this transaction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "security_code",
						"short": "Gift card security code (only present when status is 'SUCCESS' and brand provides one)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "serial_number",
						"short": "Gift card serial number (for code-delivery brands, only present when status is 'SUCCESS' and brand provides one)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "The current status of the order",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "Gift card URL (for URL-delivery brands, only present when status is 'SUCCESS')",
						"type": "`$STRING`",
					},
				},
				"name": "digital_order_status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "req-12345-67890",
											"kind": "query",
											"name": "original_client_request_id",
											"orig": "original_client_request_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "019ade93-d513-776b-92a2-b6323329b661",
											"kind": "query",
											"name": "reference",
											"orig": "reference",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/digital/order-status",
								"segments": []any{
									map[string]any{
										"lit": "digital",
									},
									map[string]any{
										"lit": "order-status",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"original_client_request_id",
										"reference",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"digital",
									"order-status",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"digital_top_up_post": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "brand",
						"req": true,
						"short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "client_request_id",
						"req": true,
						"short": "Unique identifier for this request.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "Gift card code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_value",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "float",
						"name": "discount",
						"req": true,
						"short": "The discount percentage used on this transaction",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "face_value",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "float_balance",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "pin",
						"short": "Gift card PIN.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "reference",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "Unique reference for this transaction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sector",
						"req": true,
						"short": "Must match one of the sectors configured for your buyer account.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "serial_number",
						"short": "Gift card serial number.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"short": "Optional meta data associated with the issuance.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 1,
						},
					},
				},
				"name": "digital_top_up_post",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/digital/top-up",
								"segments": []any{
									map[string]any{
										"lit": "digital",
									},
									map[string]any{
										"lit": "top-up",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"digital",
									"top-up",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"float": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "floats",
						"req": true,
						"short": "Float balances grouped by currency code",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date-time",
						"name": "last_refreshed_at",
						"req": true,
						"short": "ISO 8601 timestamp of when the float data was last refreshed",
						"type": "`$STRING`",
					},
				},
				"name": "float",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/float/request-payment-transfer",
								"segments": []any{
									map[string]any{
										"lit": "float",
									},
									map[string]any{
										"lit": "request-payment-transfer",
									},
								},
								"select": map[string]any{
									"$action": "request_payment_transfer",
								},
								"transform": map[string]any{
									"req": map[string]any{
										"float": "`reqdata`",
									},
									"res": "`body.data`",
								},
								"parts": []any{
									"float",
									"request-payment-transfer",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "GBP",
											"kind": "query",
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2025-10-16",
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "universal-float",
											"kind": "query",
											"name": "float",
											"orig": "float",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "BUYER-PROVIDED-REF",
											"kind": "query",
											"name": "payment_reference",
											"orig": "payment_reference",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2025-10-12",
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "pending",
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/float/transfer-requests",
								"segments": []any{
									map[string]any{
										"lit": "float",
									},
									map[string]any{
										"lit": "transfer-requests",
									},
								},
								"select": map[string]any{
									"$action": "transfer_request",
									"exist": []any{
										"currency",
										"end_date",
										"float",
										"payment_reference",
										"start_date",
										"status",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"float",
									"transfer-requests",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "GBP",
											"kind": "query",
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/check-floats",
								"segments": []any{
									map[string]any{
										"lit": "check-floats",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"currency",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"check-floats",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"physical_gift_card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "brand",
						"req": true,
						"short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "client_request_id",
						"req": true,
						"short": "Unique identifier for this request.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "The long card number on the physical gift card you wish to cash out",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_value",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "float",
						"name": "discount",
						"req": true,
						"short": "The discount percentage used on this transaction",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "expiration_date",
						"short": "The expiration date for this gift card.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "face_value",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "float_balance",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date-time",
						"name": "fulfilled_at",
						"short": "The date for which this this gift card was fulfilled.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "original_client_request_id",
						"req": true,
						"short": "This field will be the `client_request_id` provided in the original transaction.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pin",
						"short": "The pin number (only applies to certain brands which provide pin) on the physical gift card",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "reference",
						"req": true,
						"short": "Unique reference for this transaction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sector",
						"req": true,
						"short": "Must match one of the sectors configured for your buyer account.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "security_code",
						"short": "Gift card security code (for code-delivery brands).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "serial_number",
						"short": "Gift card serial number.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"short": "Optional meta data associated with the issuance.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 1,
						},
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "Gift card URL (for URL-delivery brands)",
						"type": "`$STRING`",
					},
				},
				"name": "physical_gift_card",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/physical/activate",
								"segments": []any{
									map[string]any{
										"lit": "physical",
									},
									map[string]any{
										"lit": "activate",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"physical",
									"activate",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/physical/cash-out-original-transaction",
								"segments": []any{
									map[string]any{
										"lit": "physical",
									},
									map[string]any{
										"lit": "cash-out-original-transaction",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"physical",
									"cash-out-original-transaction",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/physical/check-balance",
								"segments": []any{
									map[string]any{
										"lit": "physical",
									},
									map[string]any{
										"lit": "check-balance",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"physical",
									"check-balance",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/physical/fulfil-order",
								"segments": []any{
									map[string]any{
										"lit": "physical",
									},
									map[string]any{
										"lit": "fulfil-order",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"physical",
									"fulfil-order",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/physical/top-up",
								"segments": []any{
									map[string]any{
										"lit": "physical",
									},
									map[string]any{
										"lit": "top-up",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"physical",
									"top-up",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "DELETE",
								"orig": "/physical/activate",
								"segments": []any{
									map[string]any{
										"lit": "physical",
									},
									map[string]any{
										"lit": "activate",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"physical",
									"activate",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "DELETE",
								"orig": "/physical/top-up",
								"segments": []any{
									map[string]any{
										"lit": "physical",
									},
									map[string]any{
										"lit": "top-up",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"physical",
									"top-up",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"physical_order_card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "brand",
						"req": true,
						"short": "Brand identifier/slug (lowercase letters, numbers, hyphens only).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "client_request_id",
						"req": true,
						"short": "Unique identifier for this request.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cost_value",
						"req": true,
						"short": "The amount you actually paid (once the discount has been taken into consideration)",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "float",
						"name": "discount",
						"req": true,
						"short": "The discount percentage used on this transaction",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "expiration_date",
						"short": "The expiration date for this gift card.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "face_value",
						"req": true,
						"short": "the face value amount of the gift card.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "float_balance",
						"req": true,
						"short": "Your remaining balance on the float used to make this transaction",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "fulfilment_by",
						"req": true,
						"short": "When ordering a physical gift card, this must be set to `rewardcloud`",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fulfilment_parameters",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "personalisation",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "uuid",
						"name": "reference",
						"req": true,
						"short": "Unique reference for this transaction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sector",
						"req": true,
						"short": "Must match one of the sectors configured for your buyer account.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shipping_method",
						"req": true,
						"short": "Shipping method identifier.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"short": "Optional meta data associated with the issuance.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 1,
						},
					},
				},
				"name": "physical_order_card",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/physical/order-card",
								"segments": []any{
									map[string]any{
										"lit": "physical",
									},
									map[string]any{
										"lit": "order-card",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"physical",
									"order-card",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"physical_order_status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "references",
						"req": true,
						"short": "Array of order references to check.",
						"type": "`$ARRAY`",
					},
				},
				"name": "physical_order_status",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/physical/order-status",
								"segments": []any{
									map[string]any{
										"lit": "physical",
									},
									map[string]any{
										"lit": "order-status",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"physical",
									"order-status",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"promotion": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "last_refreshed_at",
						"req": true,
						"short": "ISO 8601 timestamp of when promotion data was last refreshed.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "standard",
						"req": true,
						"short": "Standard promotions grouped by brand slug.",
						"type": "`$OBJECT`",
					},
				},
				"name": "promotion",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/promotions",
								"segments": []any{
									map[string]any{
										"lit": "promotions",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"promotions",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"template": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "last_refreshed_at",
						"req": true,
						"short": "ISO 8601 timestamp of when the template data was last refreshed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "templates",
						"req": true,
						"short": "Object mapping brand slugs to their template variants and versions.",
						"type": "`$OBJECT`",
					},
				},
				"name": "template",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "fixed-async-uk",
											"kind": "query",
											"name": "brand",
											"orig": "brand",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "standard",
											"kind": "query",
											"name": "template",
											"orig": "template",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/templates",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"brand",
										"template",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"templates",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
