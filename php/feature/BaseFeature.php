<?php
declare(strict_types=1);

// Tillo SDK base feature

class TilloBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TilloContext $ctx, array $options): void {}
    public function PostConstruct(TilloContext $ctx): void {}
    public function PostConstructEntity(TilloContext $ctx): void {}
    public function SetData(TilloContext $ctx): void {}
    public function GetData(TilloContext $ctx): void {}
    public function GetMatch(TilloContext $ctx): void {}
    public function SetMatch(TilloContext $ctx): void {}
    public function PrePoint(TilloContext $ctx): void {}
    public function PreSpec(TilloContext $ctx): void {}
    public function PreRequest(TilloContext $ctx): void {}
    public function PreResponse(TilloContext $ctx): void {}
    public function PreResult(TilloContext $ctx): void {}
    public function PreDone(TilloContext $ctx): void {}
    public function PreUnexpected(TilloContext $ctx): void {}
}
