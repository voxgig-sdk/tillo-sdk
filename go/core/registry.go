package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBrandEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewDgcEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewFloatEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

