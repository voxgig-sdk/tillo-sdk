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
    public ?string $currency = null;
    public ?string $name = null;
    public ?string $slug = null;
}

/** Request payload for Brand#list. */
class BrandListMatch
{
    public ?string $currency = null;
    public ?string $name = null;
    public ?string $slug = null;
}

/** Dgc entity data model. */
class Dgc
{
    public string $brand;
    public string $client_request_id;
    public ?string $delivery_method = null;
    public array $face_value;
    public ?string $sector = null;
}

/** Request payload for Dgc#create. */
class DgcCreateData
{
    public string $brand;
    public string $client_request_id;
    public ?string $delivery_method = null;
    public array $face_value;
    public ?string $sector = null;
}

/** Float entity data model. */
class FloatType
{
    public ?float $balance = null;
    public ?string $currency = null;
}

/** Request payload for Float#list. */
class FloatListMatch
{
    public ?float $balance = null;
    public ?string $currency = null;
}

