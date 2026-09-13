
const { BaseFeature } = require('./feature/base/BaseFeature')
const { TestFeature } = require('./feature/test/TestFeature')



const FEATURE_CLASS = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named requires above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
//
// Read by SecretsFeature through a DEFERRED require of this module: the
// requires above make the pair circular, and this file replaces
// module.exports at the end of its body, so anything reading the map at
// module load would get undefined. See tm/js/src/feature/secrets.
const FEATURE_PLUGINS = {
  
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
              "segments": [
                {
                  "lit": "brands"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
                "res": "`body`"
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
              "segments": [
                {
                  "lit": "check-floats"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
    }
  }
}


const config = new Config()

module.exports = {
  config,
  FEATURE_PLUGINS,
}

