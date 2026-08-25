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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://app.tillo.io",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["brand"] = {},
        ["dgc"] = {},
        ["float"] = {},
      },
    },
    entity = {
      ["brand"] = {
        ["fields"] = {
          {
            ["name"] = "currency",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "slug",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "brand",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/brands",
                ["parts"] = {
                  "brands",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["dgc"] = {
        ["fields"] = {
          {
            ["name"] = "brand",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "client_request_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "delivery_method",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "face_value",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "sector",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "dgc",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/digital/issue",
                ["parts"] = {
                  "digital",
                  "issue",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
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
            ["name"] = "balance",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "currency",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "float",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/check-floats",
                ["parts"] = {
                  "check-floats",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
