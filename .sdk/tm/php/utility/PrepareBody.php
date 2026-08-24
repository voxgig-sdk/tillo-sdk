<?php
declare(strict_types=1);

// Tillo SDK utility: prepare_body

class TilloPrepareBody
{
    public static function call(TilloContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
