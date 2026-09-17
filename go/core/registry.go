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

var NewBrandTemplateEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewDigitalGiftCardEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewDigitalIssueDeleteEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewDigitalIssuePostEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewDigitalOrderCardEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewDigitalOrderStatusEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewDigitalTopUpPostEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewFloatEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewPhysicalGiftCardEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewPhysicalOrderCardEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewPhysicalOrderStatusEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewPromotionEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewTemplateEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

