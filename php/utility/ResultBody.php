<?php
declare(strict_types=1);

// Tillo SDK utility: result_body

class TilloResultBody
{
    public static function call(TilloContext $ctx): ?TilloResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
