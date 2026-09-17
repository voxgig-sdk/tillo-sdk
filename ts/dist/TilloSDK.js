"use strict";
// Tillo Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.TilloSDK = exports.TilloEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const BrandEntity_1 = require("./entity/BrandEntity");
const BrandTemplateEntity_1 = require("./entity/BrandTemplateEntity");
const DigitalGiftCardEntity_1 = require("./entity/DigitalGiftCardEntity");
const DigitalIssueDeleteEntity_1 = require("./entity/DigitalIssueDeleteEntity");
const DigitalIssuePostEntity_1 = require("./entity/DigitalIssuePostEntity");
const DigitalOrderCardEntity_1 = require("./entity/DigitalOrderCardEntity");
const DigitalOrderStatusEntity_1 = require("./entity/DigitalOrderStatusEntity");
const DigitalTopUpPostEntity_1 = require("./entity/DigitalTopUpPostEntity");
const FloatEntity_1 = require("./entity/FloatEntity");
const PhysicalGiftCardEntity_1 = require("./entity/PhysicalGiftCardEntity");
const PhysicalOrderCardEntity_1 = require("./entity/PhysicalOrderCardEntity");
const PhysicalOrderStatusEntity_1 = require("./entity/PhysicalOrderStatusEntity");
const PromotionEntity_1 = require("./entity/PromotionEntity");
const TemplateEntity_1 = require("./entity/TemplateEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const TilloEntityBase_1 = require("./TilloEntityBase");
Object.defineProperty(exports, "TilloEntityBase", { enumerable: true, get: function () { return TilloEntityBase_1.TilloEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class TilloSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        // Build spec directly from SDK options + user-provided fetch args.
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        // Merge user-provided headers over SDK defaults.
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // Apply SDK auth (apikey, auth prefix, etc.)
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('TilloSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path `direct` uses, with the
    // one thing raw `direct` cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report a
    // failed query as ok.
    //
    // NOTE: like `direct`, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('TilloSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('TilloSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Brand().list()` / `client.Brand().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Brand(entopts) {
        const self = this;
        return new BrandEntity_1.BrandEntity(self, entopts);
    }
    // Entity access: `client.BrandTemplate().list()` / `client.BrandTemplate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrandTemplate(entopts) {
        const self = this;
        return new BrandTemplateEntity_1.BrandTemplateEntity(self, entopts);
    }
    // Entity access: `client.DigitalGiftCard().list()` / `client.DigitalGiftCard().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DigitalGiftCard(entopts) {
        const self = this;
        return new DigitalGiftCardEntity_1.DigitalGiftCardEntity(self, entopts);
    }
    // Entity access: `client.DigitalIssueDelete().list()` / `client.DigitalIssueDelete().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DigitalIssueDelete(entopts) {
        const self = this;
        return new DigitalIssueDeleteEntity_1.DigitalIssueDeleteEntity(self, entopts);
    }
    // Entity access: `client.DigitalIssuePost().list()` / `client.DigitalIssuePost().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DigitalIssuePost(entopts) {
        const self = this;
        return new DigitalIssuePostEntity_1.DigitalIssuePostEntity(self, entopts);
    }
    // Entity access: `client.DigitalOrderCard().list()` / `client.DigitalOrderCard().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DigitalOrderCard(entopts) {
        const self = this;
        return new DigitalOrderCardEntity_1.DigitalOrderCardEntity(self, entopts);
    }
    // Entity access: `client.DigitalOrderStatus().list()` / `client.DigitalOrderStatus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DigitalOrderStatus(entopts) {
        const self = this;
        return new DigitalOrderStatusEntity_1.DigitalOrderStatusEntity(self, entopts);
    }
    // Entity access: `client.DigitalTopUpPost().list()` / `client.DigitalTopUpPost().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DigitalTopUpPost(entopts) {
        const self = this;
        return new DigitalTopUpPostEntity_1.DigitalTopUpPostEntity(self, entopts);
    }
    // Entity access: `client.Float().list()` / `client.Float().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Float(entopts) {
        const self = this;
        return new FloatEntity_1.FloatEntity(self, entopts);
    }
    // Entity access: `client.PhysicalGiftCard().list()` / `client.PhysicalGiftCard().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PhysicalGiftCard(entopts) {
        const self = this;
        return new PhysicalGiftCardEntity_1.PhysicalGiftCardEntity(self, entopts);
    }
    // Entity access: `client.PhysicalOrderCard().list()` / `client.PhysicalOrderCard().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PhysicalOrderCard(entopts) {
        const self = this;
        return new PhysicalOrderCardEntity_1.PhysicalOrderCardEntity(self, entopts);
    }
    // Entity access: `client.PhysicalOrderStatus().list()` / `client.PhysicalOrderStatus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PhysicalOrderStatus(entopts) {
        const self = this;
        return new PhysicalOrderStatusEntity_1.PhysicalOrderStatusEntity(self, entopts);
    }
    // Entity access: `client.Promotion().list()` / `client.Promotion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Promotion(entopts) {
        const self = this;
        return new PromotionEntity_1.PromotionEntity(self, entopts);
    }
    // Entity access: `client.Template().list()` / `client.Template().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Template(entopts) {
        const self = this;
        return new TemplateEntity_1.TemplateEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new TilloSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return TilloSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Tillo' };
    }
    toString() {
        return 'Tillo ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.TilloSDK = TilloSDK;
const SDK = TilloSDK;
exports.SDK = SDK;
//# sourceMappingURL=TilloSDK.js.map