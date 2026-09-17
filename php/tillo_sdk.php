<?php
declare(strict_types=1);

// Tillo SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class TilloSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new TilloUtility();
        $this->_utility = $utility;

        $config = TilloConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = TilloHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = TilloHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!TilloFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, TilloFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return TilloUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = TilloHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = TilloHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = TilloHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new TilloSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new TilloError($op . "_allow",
                "TilloSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = TilloHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = TilloHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new TilloError("graphql_error",
                "TilloSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_brand = null;

    // Canonical facade: $client->Brand()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->brand()
    // resolves here too.
    public function Brand($data = null)
    {
        require_once __DIR__ . '/entity/brand_entity.php';
        if ($data === null) {
            if ($this->_brand === null) {
                $this->_brand = new BrandEntity($this, null);
            }
            return $this->_brand;
        }
        return new BrandEntity($this, $data);
    }


    private $_brand_template = null;

    // Canonical facade: $client->BrandTemplate()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->brand_template()
    // resolves here too.
    public function BrandTemplate($data = null)
    {
        require_once __DIR__ . '/entity/brand_template_entity.php';
        if ($data === null) {
            if ($this->_brand_template === null) {
                $this->_brand_template = new BrandTemplateEntity($this, null);
            }
            return $this->_brand_template;
        }
        return new BrandTemplateEntity($this, $data);
    }


    private $_digital_gift_card = null;

    // Canonical facade: $client->DigitalGiftCard()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->digital_gift_card()
    // resolves here too.
    public function DigitalGiftCard($data = null)
    {
        require_once __DIR__ . '/entity/digital_gift_card_entity.php';
        if ($data === null) {
            if ($this->_digital_gift_card === null) {
                $this->_digital_gift_card = new DigitalGiftCardEntity($this, null);
            }
            return $this->_digital_gift_card;
        }
        return new DigitalGiftCardEntity($this, $data);
    }


    private $_digital_issue_delete = null;

    // Canonical facade: $client->DigitalIssueDelete()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->digital_issue_delete()
    // resolves here too.
    public function DigitalIssueDelete($data = null)
    {
        require_once __DIR__ . '/entity/digital_issue_delete_entity.php';
        if ($data === null) {
            if ($this->_digital_issue_delete === null) {
                $this->_digital_issue_delete = new DigitalIssueDeleteEntity($this, null);
            }
            return $this->_digital_issue_delete;
        }
        return new DigitalIssueDeleteEntity($this, $data);
    }


    private $_digital_issue_post = null;

    // Canonical facade: $client->DigitalIssuePost()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->digital_issue_post()
    // resolves here too.
    public function DigitalIssuePost($data = null)
    {
        require_once __DIR__ . '/entity/digital_issue_post_entity.php';
        if ($data === null) {
            if ($this->_digital_issue_post === null) {
                $this->_digital_issue_post = new DigitalIssuePostEntity($this, null);
            }
            return $this->_digital_issue_post;
        }
        return new DigitalIssuePostEntity($this, $data);
    }


    private $_digital_order_card = null;

    // Canonical facade: $client->DigitalOrderCard()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->digital_order_card()
    // resolves here too.
    public function DigitalOrderCard($data = null)
    {
        require_once __DIR__ . '/entity/digital_order_card_entity.php';
        if ($data === null) {
            if ($this->_digital_order_card === null) {
                $this->_digital_order_card = new DigitalOrderCardEntity($this, null);
            }
            return $this->_digital_order_card;
        }
        return new DigitalOrderCardEntity($this, $data);
    }


    private $_digital_order_status = null;

    // Canonical facade: $client->DigitalOrderStatus()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->digital_order_status()
    // resolves here too.
    public function DigitalOrderStatus($data = null)
    {
        require_once __DIR__ . '/entity/digital_order_status_entity.php';
        if ($data === null) {
            if ($this->_digital_order_status === null) {
                $this->_digital_order_status = new DigitalOrderStatusEntity($this, null);
            }
            return $this->_digital_order_status;
        }
        return new DigitalOrderStatusEntity($this, $data);
    }


    private $_digital_top_up_post = null;

    // Canonical facade: $client->DigitalTopUpPost()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->digital_top_up_post()
    // resolves here too.
    public function DigitalTopUpPost($data = null)
    {
        require_once __DIR__ . '/entity/digital_top_up_post_entity.php';
        if ($data === null) {
            if ($this->_digital_top_up_post === null) {
                $this->_digital_top_up_post = new DigitalTopUpPostEntity($this, null);
            }
            return $this->_digital_top_up_post;
        }
        return new DigitalTopUpPostEntity($this, $data);
    }


    private $_float = null;

    // Canonical facade: $client->Float()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->float()
    // resolves here too.
    public function Float($data = null)
    {
        require_once __DIR__ . '/entity/float_entity.php';
        if ($data === null) {
            if ($this->_float === null) {
                $this->_float = new FloatEntity($this, null);
            }
            return $this->_float;
        }
        return new FloatEntity($this, $data);
    }


    private $_physical_gift_card = null;

    // Canonical facade: $client->PhysicalGiftCard()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->physical_gift_card()
    // resolves here too.
    public function PhysicalGiftCard($data = null)
    {
        require_once __DIR__ . '/entity/physical_gift_card_entity.php';
        if ($data === null) {
            if ($this->_physical_gift_card === null) {
                $this->_physical_gift_card = new PhysicalGiftCardEntity($this, null);
            }
            return $this->_physical_gift_card;
        }
        return new PhysicalGiftCardEntity($this, $data);
    }


    private $_physical_order_card = null;

    // Canonical facade: $client->PhysicalOrderCard()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->physical_order_card()
    // resolves here too.
    public function PhysicalOrderCard($data = null)
    {
        require_once __DIR__ . '/entity/physical_order_card_entity.php';
        if ($data === null) {
            if ($this->_physical_order_card === null) {
                $this->_physical_order_card = new PhysicalOrderCardEntity($this, null);
            }
            return $this->_physical_order_card;
        }
        return new PhysicalOrderCardEntity($this, $data);
    }


    private $_physical_order_status = null;

    // Canonical facade: $client->PhysicalOrderStatus()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->physical_order_status()
    // resolves here too.
    public function PhysicalOrderStatus($data = null)
    {
        require_once __DIR__ . '/entity/physical_order_status_entity.php';
        if ($data === null) {
            if ($this->_physical_order_status === null) {
                $this->_physical_order_status = new PhysicalOrderStatusEntity($this, null);
            }
            return $this->_physical_order_status;
        }
        return new PhysicalOrderStatusEntity($this, $data);
    }


    private $_promotion = null;

    // Canonical facade: $client->Promotion()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->promotion()
    // resolves here too.
    public function Promotion($data = null)
    {
        require_once __DIR__ . '/entity/promotion_entity.php';
        if ($data === null) {
            if ($this->_promotion === null) {
                $this->_promotion = new PromotionEntity($this, null);
            }
            return $this->_promotion;
        }
        return new PromotionEntity($this, $data);
    }


    private $_template = null;

    // Canonical facade: $client->Template()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->template()
    // resolves here too.
    public function Template($data = null)
    {
        require_once __DIR__ . '/entity/template_entity.php';
        if ($data === null) {
            if ($this->_template === null) {
                $this->_template = new TemplateEntity($this, null);
            }
            return $this->_template;
        }
        return new TemplateEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new TilloSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
