<?php

namespace App\DataTypes;

use App\DataTypes\Interfaces\ArrayableInterface;

class ApiType implements ArrayableInterface
{
    public function __construct(
        public string $route,
        public string $method,
        public ?array $parameters = [],
        public ?array $headers = [],
        public ?array $fields = []
    ) {}

    public function toArray(): array
    {
        return [
            'route' => $this->route,
            'method' => $this->method,
            'parameters' => $this->parameters,
            'headers' => $this->headers,
            'fields' => $this->fields,
        ];
    }
}
