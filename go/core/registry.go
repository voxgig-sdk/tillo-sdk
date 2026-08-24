package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBrandEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewDgcEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

var NewFloatEntityFunc func(client *TilloSDK, entopts map[string]any) TilloEntity

