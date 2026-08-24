package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/tillo-sdk/go"
	"github.com/voxgig-sdk/tillo-sdk/go/core"

	vs "github.com/voxgig-sdk/tillo-sdk/go/utility/struct"
)

func TestDgcEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Dgc(nil)
		if ent == nil {
			t.Fatal("expected non-nil DgcEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := dgcBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "dgc." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set TILLO_TEST_DGC_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		dgcRef01Ent := client.Dgc(nil)
		dgcRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "dgc"}, setup.data), "dgc_ref01"))

		dgcRef01DataResult, err := dgcRef01Ent.Create(dgcRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		dgcRef01Data = core.ToMapAny(entityData(dgcRef01DataResult))
		if dgcRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func dgcBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "dgc", "DgcTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read dgc test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse dgc test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"dgc01", "dgc02", "dgc03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("TILLO_TEST_DGC_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TILLO_TEST_DGC_ENTID": idmap,
		"TILLO_TEST_LIVE":      "FALSE",
		"TILLO_TEST_EXPLAIN":   "FALSE",
		"TILLO_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["TILLO_TEST_DGC_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TILLO_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["TILLO_APIKEY"],
			},
			extra,
		})
		client = sdk.NewTilloSDK(core.ToMapAny(mergedOpts))
	}

	live := env["TILLO_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TILLO_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
