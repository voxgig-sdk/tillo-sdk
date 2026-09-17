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
    brands: Any
    last_refreshed_at: str


class BrandLoadMatch(TypedDict, total=False):
    brand: str
    category: str
    country: str
    currency: str
    detail: bool


class BrandTemplate(TypedDict):
    pass


class BrandTemplateLoadMatchRequired(TypedDict):
    brand: str


class BrandTemplateLoadMatch(BrandTemplateLoadMatchRequired, total=False):
    template: str
    version: str


class DigitalGiftCardRequired(TypedDict):
    brand: str
    client_request_id: str
    face_value: dict
    sector: str


class DigitalGiftCard(DigitalGiftCardRequired, total=False):
    code: str
    data: dict
    message: str
    original_client_request_id: str
    pin: str
    reference: str
    serial_number: str
    status: str


class DigitalGiftCardLoadMatch(TypedDict, total=False):
    brand: str


class DigitalGiftCardCreateDataRequired(TypedDict):
    brand: str
    client_request_id: str
    face_value: dict
    sector: str


class DigitalGiftCardCreateData(DigitalGiftCardCreateDataRequired, total=False):
    code: str
    data: dict
    message: str
    original_client_request_id: str
    pin: str
    reference: str
    serial_number: str
    status: str


class DigitalIssueDeleteRequired(TypedDict):
    brand: str
    client_request_id: str
    face_value: dict
    float_balance: dict
    original_client_request_id: str
    reference: str
    sector: str


class DigitalIssueDelete(DigitalIssueDeleteRequired, total=False):
    tags: list


class DigitalIssueDeleteCreateDataRequired(TypedDict):
    brand: str
    client_request_id: str
    face_value: dict
    float_balance: dict
    original_client_request_id: str
    reference: str
    sector: str


class DigitalIssueDeleteCreateData(DigitalIssueDeleteCreateDataRequired, total=False):
    tags: list


class DigitalIssueDeleteRemoveMatch(TypedDict, total=False):
    brand: str
    client_request_id: str
    face_value: dict
    float_balance: dict
    original_client_request_id: str
    reference: str
    sector: str
    tags: list


class DigitalIssuePostRequired(TypedDict):
    barcode: dict
    brand: str
    client_request_id: str
    cost_value: dict
    delivery_method: str
    discount: float
    face_value: dict
    float_balance: dict
    fulfilment_by: str
    fulfilment_parameters: dict
    personalisation: dict
    reference: str
    sector: str


class DigitalIssuePost(DigitalIssuePostRequired, total=False):
    code: str
    expiration_date: str
    pin: str
    security_code: str
    serial_number: str
    tags: list
    url: str


class DigitalIssuePostCreateDataRequired(TypedDict):
    barcode: dict
    brand: str
    client_request_id: str
    cost_value: dict
    delivery_method: str
    discount: float
    face_value: dict
    float_balance: dict
    fulfilment_by: str
    fulfilment_parameters: dict
    personalisation: dict
    reference: str
    sector: str


class DigitalIssuePostCreateData(DigitalIssuePostCreateDataRequired, total=False):
    code: str
    expiration_date: str
    pin: str
    security_code: str
    serial_number: str
    tags: list
    url: str


class DigitalOrderCardRequired(TypedDict):
    brand: str
    client_request_id: str
    cost_value: dict
    delivery_method: str
    face_value: dict
    float_balance: dict
    fulfilment_by: str
    fulfilment_parameters: dict
    personalisation: dict
    reference: str
    sector: str


class DigitalOrderCard(DigitalOrderCardRequired, total=False):
    tags: list


class DigitalOrderCardCreateDataRequired(TypedDict):
    brand: str
    client_request_id: str
    cost_value: dict
    delivery_method: str
    face_value: dict
    float_balance: dict
    fulfilment_by: str
    fulfilment_parameters: dict
    personalisation: dict
    reference: str
    sector: str


class DigitalOrderCardCreateData(DigitalOrderCardCreateDataRequired, total=False):
    tags: list


class DigitalOrderStatusRequired(TypedDict):
    barcode: dict
    cost_value: dict
    face_value: dict
    reference: str
    status: str


class DigitalOrderStatus(DigitalOrderStatusRequired, total=False):
    brand: str
    code: str
    discount: float
    expiration_date: str
    pin: str
    security_code: str
    serial_number: str
    url: str


class DigitalOrderStatusLoadMatch(TypedDict, total=False):
    original_client_request_id: str
    reference: str


class DigitalTopUpPostRequired(TypedDict):
    brand: str
    client_request_id: str
    code: str
    cost_value: dict
    discount: float
    face_value: dict
    float_balance: dict
    reference: str
    sector: str


class DigitalTopUpPost(DigitalTopUpPostRequired, total=False):
    pin: str
    serial_number: str
    tags: list


class DigitalTopUpPostCreateDataRequired(TypedDict):
    brand: str
    client_request_id: str
    code: str
    cost_value: dict
    discount: float
    face_value: dict
    float_balance: dict
    reference: str
    sector: str


class DigitalTopUpPostCreateData(DigitalTopUpPostCreateDataRequired, total=False):
    pin: str
    serial_number: str
    tags: list


class Float(TypedDict):
    floats: dict
    last_refreshed_at: str


class FloatLoadMatch(TypedDict, total=False):
    currency: str


class FloatListMatch(TypedDict, total=False):
    currency: str
    end_date: str
    float: str
    payment_reference: str
    start_date: str
    status: str


class FloatCreateData(TypedDict):
    floats: dict
    last_refreshed_at: str


class PhysicalGiftCardRequired(TypedDict):
    brand: str
    client_request_id: str
    code: str
    cost_value: dict
    discount: float
    face_value: dict
    float_balance: dict
    original_client_request_id: str
    reference: str
    sector: str


class PhysicalGiftCard(PhysicalGiftCardRequired, total=False):
    expiration_date: str
    fulfilled_at: str
    pin: str
    security_code: str
    serial_number: str
    tags: list
    url: str


class PhysicalGiftCardCreateDataRequired(TypedDict):
    brand: str
    client_request_id: str
    code: str
    cost_value: dict
    discount: float
    face_value: dict
    float_balance: dict
    original_client_request_id: str
    reference: str
    sector: str


class PhysicalGiftCardCreateData(PhysicalGiftCardCreateDataRequired, total=False):
    expiration_date: str
    fulfilled_at: str
    pin: str
    security_code: str
    serial_number: str
    tags: list
    url: str


class PhysicalGiftCardRemoveMatch(TypedDict, total=False):
    brand: str
    client_request_id: str
    code: str
    cost_value: dict
    discount: float
    expiration_date: str
    face_value: dict
    float_balance: dict
    fulfilled_at: str
    original_client_request_id: str
    pin: str
    reference: str
    sector: str
    security_code: str
    serial_number: str
    tags: list
    url: str


class PhysicalOrderCardRequired(TypedDict):
    brand: str
    client_request_id: str
    cost_value: dict
    discount: float
    face_value: dict
    float_balance: dict
    fulfilment_by: str
    fulfilment_parameters: dict
    personalisation: dict
    reference: str
    sector: str
    shipping_method: str


class PhysicalOrderCard(PhysicalOrderCardRequired, total=False):
    expiration_date: str
    tags: list


class PhysicalOrderCardCreateDataRequired(TypedDict):
    brand: str
    client_request_id: str
    cost_value: dict
    discount: float
    face_value: dict
    float_balance: dict
    fulfilment_by: str
    fulfilment_parameters: dict
    personalisation: dict
    reference: str
    sector: str
    shipping_method: str


class PhysicalOrderCardCreateData(PhysicalOrderCardCreateDataRequired, total=False):
    expiration_date: str
    tags: list


class PhysicalOrderStatus(TypedDict):
    references: list


class PhysicalOrderStatusCreateData(TypedDict):
    references: list


class Promotion(TypedDict):
    last_refreshed_at: str
    standard: dict


class PromotionLoadMatch(TypedDict, total=False):
    last_refreshed_at: str
    standard: dict


class Template(TypedDict):
    last_refreshed_at: str
    templates: dict


class TemplateLoadMatch(TypedDict, total=False):
    brand: str
    template: str
