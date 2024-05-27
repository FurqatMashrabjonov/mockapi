<?php

namespace App\DataTypes;

use App\DataTypes\Interfaces\ArrayableInterface;

class ResourceNode implements ArrayableInterface
{
    public string $name;

    public int $id;

    public array $children = [];

    public array $fields = [];

    public array $data = [];

    public function __construct($name = '', $id = 0, $children = [], $fields = [], $data = [])
    {
        $this->name = $name;
        $this->id = $id;
        $this->children = $children;
        $this->fields = $fields;
        $this->data = $data;
    }

    public function hasChildren(): bool
    {
        return count($this->children) > 0;
    }

    public function isGetAllData(): bool
    {
        return $this->id == 0;
    }

    public function fillData(array $data): void
    {
        foreach ($data as $item) {
            $this->data[] = $item;
        }
    }

    public function toArray(): array
    {
        return $this->data;
    }
}
