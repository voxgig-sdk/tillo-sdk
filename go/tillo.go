package voxgigtillosdk

import (
	"github.com/voxgig-sdk/tillo-sdk/go/core"
	"github.com/voxgig-sdk/tillo-sdk/go/entity"
	"github.com/voxgig-sdk/tillo-sdk/go/feature"
	_ "github.com/voxgig-sdk/tillo-sdk/go/utility"
)

// Type aliases preserve external API.
type TilloSDK = core.TilloSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TilloEntity = core.TilloEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TilloError = core.TilloError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBrandEntityFunc = func(client *core.TilloSDK, entopts map[string]any) core.TilloEntity {
		return entity.NewBrandEntity(client, entopts)
	}
	core.NewDgcEntityFunc = func(client *core.TilloSDK, entopts map[string]any) core.TilloEntity {
		return entity.NewDgcEntity(client, entopts)
	}
	core.NewFloatEntityFunc = func(client *core.TilloSDK, entopts map[string]any) core.TilloEntity {
		return entity.NewFloatEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTilloSDK = core.NewTilloSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewTilloSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *TilloSDK  { return NewTilloSDK(nil) }
func Test() *TilloSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
