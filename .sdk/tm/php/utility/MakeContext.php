<?php
declare(strict_types=1);

// Tillo SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TilloMakeContext
{
    public static function call(array $ctxmap, ?TilloContext $basectx): TilloContext
    {
        return new TilloContext($ctxmap, $basectx);
    }
}
