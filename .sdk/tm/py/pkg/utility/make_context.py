# Tillo SDK utility: make_context

from projectname_sdk.core.context import TilloContext


def make_context_util(ctxmap, basectx):
    return TilloContext(ctxmap, basectx)
