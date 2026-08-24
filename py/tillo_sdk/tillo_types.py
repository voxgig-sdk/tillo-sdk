# Typed models for the Tillo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Brand(TypedDict, total=False):
    currency: str
    name: str
    slug: str


class BrandListMatch(TypedDict, total=False):
    currency: str
    name: str
    slug: str


class DgcRequired(TypedDict):
    brand: str
    client_request_id: str
    face_value: dict


class Dgc(DgcRequired, total=False):
    delivery_method: str
    sector: str


class DgcCreateDataRequired(TypedDict):
    brand: str
    client_request_id: str
    face_value: dict


class DgcCreateData(DgcCreateDataRequired, total=False):
    delivery_method: str
    sector: str


class Float(TypedDict, total=False):
    balance: float
    currency: str


class FloatListMatch(TypedDict, total=False):
    balance: float
    currency: str
