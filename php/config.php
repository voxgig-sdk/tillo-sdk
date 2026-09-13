<?php
declare(strict_types=1);

// Tillo SDK configuration

class TilloConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Tillo",
                "slug" => "tillo",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://app.tillo.io",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "brand" => [],
                    "dgc" => [],
                    "float" => [],
                ],
            ],
            "entity" => [
        'brand' => [
          'fields' => [
            [
              'name' => 'currency',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'slug',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'brand',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/brands',
                  'segments' => [
                    [
                      'lit' => 'brands',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'brands',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'dgc' => [
          'fields' => [
            [
              'name' => 'brand',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'client_request_id',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'delivery_method',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'face_value',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'sector',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'dgc',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/digital/issue',
                  'segments' => [
                    [
                      'lit' => 'digital',
                    ],
                    [
                      'lit' => 'issue',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'digital',
                    'issue',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'float' => [
          'fields' => [
            [
              'name' => 'balance',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'currency',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'float',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/check-floats',
                  'segments' => [
                    [
                      'lit' => 'check-floats',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'check-floats',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return TilloFeatures::make_feature($name);
    }
}
