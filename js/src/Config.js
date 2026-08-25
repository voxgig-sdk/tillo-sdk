
const { BaseFeature } = require('./feature/base/BaseFeature')
const { TestFeature } = require('./feature/test/TestFeature')



const FEATURE_CLASS = {
   test: TestFeature,

}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Tillo',
        slug: "tillo",
    version: "0.0.1",
    target: "js",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://app.tillo.io",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      brand: {
      },

      dgc: {
      },

      float: {
      },

    }
  }


  entity = {
    "brand": {
      "fields": [
        {
          "name": "currency",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "slug",
          "type": "`$STRING`"
        }
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
                "brands"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "dgc": {
      "fields": [
        {
          "name": "brand",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "client_request_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "delivery_method",
          "type": "`$STRING`"
        },
        {
          "name": "face_value",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "sector",
          "type": "`$STRING`"
        }
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
                "issue"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "name": "balance",
          "type": "`$NUMBER`"
        },
        {
          "name": "currency",
          "type": "`$STRING`"
        }
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
                "check-floats"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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

module.exports = {
  config
}

