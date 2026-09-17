<?php
declare(strict_types=1);

// Typed models for the Tillo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Brand entity data model. */
class Brand
{
    public mixed $brands = null;
    public ?string $last_refreshed_at = null;
}

/** Request payload for Brand#load. */
class BrandLoadMatch
{
    public ?string $brand = null;
    public ?string $category = null;
    public ?string $country = null;
    public ?string $currency = null;
    public ?bool $detail = null;
}

/** BrandTemplate entity data model. */
class BrandTemplate
{
}

/** Request payload for BrandTemplate#load. */
class BrandTemplateLoadMatch
{
    public string $brand;
    public ?string $template = null;
    public ?string $version = null;
}

/** DigitalGiftCard entity data model. */
class DigitalGiftCard
{
    public string $brand;
    public string $client_request_id;
    public ?string $code = null;
    public ?array $data = null;
    public array $face_value;
    public ?string $message = null;
    public ?string $original_client_request_id = null;
    public ?string $pin = null;
    public ?string $reference = null;
    public string $sector;
    public ?string $serial_number = null;
    public ?string $status = null;
}

/** Request payload for DigitalGiftCard#load. */
class DigitalGiftCardLoadMatch
{
    public ?string $brand = null;
}

/** Request payload for DigitalGiftCard#create. */
class DigitalGiftCardCreateData
{
    public string $brand;
    public string $client_request_id;
    public ?string $code = null;
    public ?array $data = null;
    public array $face_value;
    public ?string $message = null;
    public ?string $original_client_request_id = null;
    public ?string $pin = null;
    public ?string $reference = null;
    public string $sector;
    public ?string $serial_number = null;
    public ?string $status = null;
}

/** DigitalIssueDelete entity data model. */
class DigitalIssueDelete
{
    public string $brand;
    public string $client_request_id;
    public array $face_value;
    public array $float_balance;
    public string $original_client_request_id;
    public string $reference;
    public string $sector;
    public ?array $tags = null;
}

/** Request payload for DigitalIssueDelete#create. */
class DigitalIssueDeleteCreateData
{
    public string $brand;
    public string $client_request_id;
    public array $face_value;
    public array $float_balance;
    public string $original_client_request_id;
    public string $reference;
    public string $sector;
    public ?array $tags = null;
}

/** Request payload for DigitalIssueDelete#remove. */
class DigitalIssueDeleteRemoveMatch
{
    public ?string $brand = null;
    public ?string $client_request_id = null;
    public ?array $face_value = null;
    public ?array $float_balance = null;
    public ?string $original_client_request_id = null;
    public ?string $reference = null;
    public ?string $sector = null;
    public ?array $tags = null;
}

/** DigitalIssuePost entity data model. */
class DigitalIssuePost
{
    public array $barcode;
    public string $brand;
    public string $client_request_id;
    public ?string $code = null;
    public array $cost_value;
    public string $delivery_method;
    public float $discount;
    public ?string $expiration_date = null;
    public array $face_value;
    public array $float_balance;
    public string $fulfilment_by;
    public array $fulfilment_parameters;
    public array $personalisation;
    public ?string $pin = null;
    public string $reference;
    public string $sector;
    public ?string $security_code = null;
    public ?string $serial_number = null;
    public ?array $tags = null;
    public ?string $url = null;
}

/** Request payload for DigitalIssuePost#create. */
class DigitalIssuePostCreateData
{
    public array $barcode;
    public string $brand;
    public string $client_request_id;
    public ?string $code = null;
    public array $cost_value;
    public string $delivery_method;
    public float $discount;
    public ?string $expiration_date = null;
    public array $face_value;
    public array $float_balance;
    public string $fulfilment_by;
    public array $fulfilment_parameters;
    public array $personalisation;
    public ?string $pin = null;
    public string $reference;
    public string $sector;
    public ?string $security_code = null;
    public ?string $serial_number = null;
    public ?array $tags = null;
    public ?string $url = null;
}

/** DigitalOrderCard entity data model. */
class DigitalOrderCard
{
    public string $brand;
    public string $client_request_id;
    public array $cost_value;
    public string $delivery_method;
    public array $face_value;
    public array $float_balance;
    public string $fulfilment_by;
    public array $fulfilment_parameters;
    public array $personalisation;
    public string $reference;
    public string $sector;
    public ?array $tags = null;
}

/** Request payload for DigitalOrderCard#create. */
class DigitalOrderCardCreateData
{
    public string $brand;
    public string $client_request_id;
    public array $cost_value;
    public string $delivery_method;
    public array $face_value;
    public array $float_balance;
    public string $fulfilment_by;
    public array $fulfilment_parameters;
    public array $personalisation;
    public string $reference;
    public string $sector;
    public ?array $tags = null;
}

/** DigitalOrderStatus entity data model. */
class DigitalOrderStatus
{
    public array $barcode;
    public ?string $brand = null;
    public ?string $code = null;
    public array $cost_value;
    public ?float $discount = null;
    public ?string $expiration_date = null;
    public array $face_value;
    public ?string $pin = null;
    public string $reference;
    public ?string $security_code = null;
    public ?string $serial_number = null;
    public string $status;
    public ?string $url = null;
}

/** Request payload for DigitalOrderStatus#load. */
class DigitalOrderStatusLoadMatch
{
    public ?string $original_client_request_id = null;
    public ?string $reference = null;
}

/** DigitalTopUpPost entity data model. */
class DigitalTopUpPost
{
    public string $brand;
    public string $client_request_id;
    public string $code;
    public array $cost_value;
    public float $discount;
    public array $face_value;
    public array $float_balance;
    public ?string $pin = null;
    public string $reference;
    public string $sector;
    public ?string $serial_number = null;
    public ?array $tags = null;
}

/** Request payload for DigitalTopUpPost#create. */
class DigitalTopUpPostCreateData
{
    public string $brand;
    public string $client_request_id;
    public string $code;
    public array $cost_value;
    public float $discount;
    public array $face_value;
    public array $float_balance;
    public ?string $pin = null;
    public string $reference;
    public string $sector;
    public ?string $serial_number = null;
    public ?array $tags = null;
}

/** Float entity data model. */
class FloatType
{
    public array $floats;
    public string $last_refreshed_at;
}

/** Request payload for Float#load. */
class FloatLoadMatch
{
    public ?string $currency = null;
}

/** Request payload for Float#list. */
class FloatListMatch
{
    public ?string $currency = null;
    public ?string $end_date = null;
    public ?string $float = null;
    public ?string $payment_reference = null;
    public ?string $start_date = null;
    public ?string $status = null;
}

/** Request payload for Float#create. */
class FloatCreateData
{
    public array $floats;
    public string $last_refreshed_at;
}

/** PhysicalGiftCard entity data model. */
class PhysicalGiftCard
{
    public string $brand;
    public string $client_request_id;
    public string $code;
    public array $cost_value;
    public float $discount;
    public ?string $expiration_date = null;
    public array $face_value;
    public array $float_balance;
    public ?string $fulfilled_at = null;
    public string $original_client_request_id;
    public ?string $pin = null;
    public string $reference;
    public string $sector;
    public ?string $security_code = null;
    public ?string $serial_number = null;
    public ?array $tags = null;
    public ?string $url = null;
}

/** Request payload for PhysicalGiftCard#create. */
class PhysicalGiftCardCreateData
{
    public string $brand;
    public string $client_request_id;
    public string $code;
    public array $cost_value;
    public float $discount;
    public ?string $expiration_date = null;
    public array $face_value;
    public array $float_balance;
    public ?string $fulfilled_at = null;
    public string $original_client_request_id;
    public ?string $pin = null;
    public string $reference;
    public string $sector;
    public ?string $security_code = null;
    public ?string $serial_number = null;
    public ?array $tags = null;
    public ?string $url = null;
}

/** Request payload for PhysicalGiftCard#remove. */
class PhysicalGiftCardRemoveMatch
{
    public ?string $brand = null;
    public ?string $client_request_id = null;
    public ?string $code = null;
    public ?array $cost_value = null;
    public ?float $discount = null;
    public ?string $expiration_date = null;
    public ?array $face_value = null;
    public ?array $float_balance = null;
    public ?string $fulfilled_at = null;
    public ?string $original_client_request_id = null;
    public ?string $pin = null;
    public ?string $reference = null;
    public ?string $sector = null;
    public ?string $security_code = null;
    public ?string $serial_number = null;
    public ?array $tags = null;
    public ?string $url = null;
}

/** PhysicalOrderCard entity data model. */
class PhysicalOrderCard
{
    public string $brand;
    public string $client_request_id;
    public array $cost_value;
    public float $discount;
    public ?string $expiration_date = null;
    public array $face_value;
    public array $float_balance;
    public string $fulfilment_by;
    public array $fulfilment_parameters;
    public array $personalisation;
    public string $reference;
    public string $sector;
    public string $shipping_method;
    public ?array $tags = null;
}

/** Request payload for PhysicalOrderCard#create. */
class PhysicalOrderCardCreateData
{
    public string $brand;
    public string $client_request_id;
    public array $cost_value;
    public float $discount;
    public ?string $expiration_date = null;
    public array $face_value;
    public array $float_balance;
    public string $fulfilment_by;
    public array $fulfilment_parameters;
    public array $personalisation;
    public string $reference;
    public string $sector;
    public string $shipping_method;
    public ?array $tags = null;
}

/** PhysicalOrderStatus entity data model. */
class PhysicalOrderStatus
{
    public array $references;
}

/** Request payload for PhysicalOrderStatus#create. */
class PhysicalOrderStatusCreateData
{
    public array $references;
}

/** Promotion entity data model. */
class Promotion
{
    public string $last_refreshed_at;
    public array $standard;
}

/** Request payload for Promotion#load. */
class PromotionLoadMatch
{
    public ?string $last_refreshed_at = null;
    public ?array $standard = null;
}

/** Template entity data model. */
class Template
{
    public string $last_refreshed_at;
    public array $templates;
}

/** Request payload for Template#load. */
class TemplateLoadMatch
{
    public ?string $brand = null;
    public ?string $template = null;
}

