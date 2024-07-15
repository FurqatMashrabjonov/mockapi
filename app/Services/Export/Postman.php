<?php

namespace App\Services\Export;

use App\Models\Project;
use App\Services\Export\Interfaces\ExportableInterface;
use Illuminate\Support\Str;

class Postman implements ExportableInterface
{
    protected string $output = '';

    protected array $routes = [];

    protected string $endpoint = '';

    protected Project $project;

    protected string $extension = 'json';

    public function export(): static
    {
        $this->generate();

        return $this;
    }

    public function generate()
    {
        /*
         * postman collection export
         */

        $collection = [
            'info' => [
                'name' => $this->project->name.' API',
                '_postman_id' => Str::uuid(),
                'description' => '',
                'schema' => 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
            ],
            'item' => [],
        ];

        foreach ($this->routes as $resource => $methods) {
            $item = [
                'name' => $resource,
                'item' => [],
            ];
            foreach ($methods as $method) {
                $raw = [];
                foreach ($method['fields'] as $field) {
                    $raw[$field['name']] = $field['type'];
                }
                $raw = json_encode($raw, JSON_PRETTY_PRINT);
                $request = [
                    'name' => $resource,
                    'request' => [
                        'method' => $method['method'],
                        'header' => [],
                        'body' => [
                            'mode' => 'raw',
                            'raw' => in_array($method['method'], ['POST', 'PUT']) ? $raw : '',
                        ],
                        'url' => [
                            'raw' => $this->endpoint.$method['route'],
                            'host' => [
                                $this->endpoint,
                            ],
                            'path' => explode('/', $method['route']),
                        ],
                    ],
                ];
                foreach ($method['headers'] as $key => $value) {
                    $request['request']['header'][] = [
                        'key' => $key,
                        'value' => $value,
                    ];
                }
                $item['item'][] = $request;
            }
            $collection['item'][] = $item;
        }

        $this->output = json_encode($collection, JSON_PRETTY_PRINT);

        return $this;
    }

    public function project(Project $project)
    {
        $this->project = $project;
    }

    public function routes(array $routes): static
    {
        $this->routes = $routes;

        return $this;
    }

    public function endpoint(string $endpoint): static
    {
        $this->endpoint = $endpoint;

        return $this;
    }

    public function text(): string
    {
        return $this->output;
    }

    public function download() {}

    public function isDownloadable(): false
    {
        return false;
    }

    public function extension(): string
    {
        return $this->extension;
    }
}
