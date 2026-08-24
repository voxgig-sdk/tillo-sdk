<?php
declare(strict_types=1);

// Tillo SDK utility: result_headers

class TilloResultHeaders
{
    public static function call(TilloContext $ctx): ?TilloResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
