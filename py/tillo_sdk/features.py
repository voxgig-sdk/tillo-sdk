# Tillo SDK feature factory

from tillo_sdk.feature.base_feature import TilloBaseFeature
from tillo_sdk.feature.debug_feature import TilloDebugFeature
from tillo_sdk.feature.idempotency_feature import TilloIdempotencyFeature
from tillo_sdk.feature.metrics_feature import TilloMetricsFeature
from tillo_sdk.feature.paging_feature import TilloPagingFeature
from tillo_sdk.feature.ratelimit_feature import TilloRatelimitFeature
from tillo_sdk.feature.retry_feature import TilloRetryFeature
from tillo_sdk.feature.test_feature import TilloTestFeature
from tillo_sdk.feature.timeout_feature import TilloTimeoutFeature


_FEATURES = {
    "base": lambda: TilloBaseFeature(),
    "debug": lambda: TilloDebugFeature(),
    "idempotency": lambda: TilloIdempotencyFeature(),
    "metrics": lambda: TilloMetricsFeature(),
    "paging": lambda: TilloPagingFeature(),
    "ratelimit": lambda: TilloRatelimitFeature(),
    "retry": lambda: TilloRetryFeature(),
    "test": lambda: TilloTestFeature(),
    "timeout": lambda: TilloTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
