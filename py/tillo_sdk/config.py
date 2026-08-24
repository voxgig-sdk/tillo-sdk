# Tillo SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Tillo",
            "slug": "tillo",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://app.tillo.io",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "brand": {},
                "dgc": {},
                "float": {},
            },
        },
        "entity": {
      "brand": {
        "fields": [
          {
            "name": "currency",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "slug",
            "type": "`$STRING`",
          },
        ],
        "name": "brand",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/brands",
                "parts": [
                  "brands",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dgc": {
        "fields": [
          {
            "name": "brand",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "client_request_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "delivery_method",
            "type": "`$STRING`",
          },
          {
            "name": "face_value",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "sector",
            "type": "`$STRING`",
          },
        ],
        "name": "dgc",
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
                "parts": [
                  "digital",
                  "issue",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "float": {
        "fields": [
          {
            "name": "balance",
            "type": "`$NUMBER`",
          },
          {
            "name": "currency",
            "type": "`$STRING`",
          },
        ],
        "name": "float",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/check-floats",
                "parts": [
                  "check-floats",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
