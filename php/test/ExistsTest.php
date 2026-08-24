<?php
declare(strict_types=1);

// Tillo SDK exists test

require_once __DIR__ . '/../tillo_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = TilloSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
