<?php

namespace App\Services\Export;

use App\Models\Project;
use App\Services\Export\Interfaces\ExportableInterface;

class Javascript implements ExportableInterface
{
    protected string $output = '';

    protected array $routes = [];

    protected string $endpoint = '';

    protected Project $project;

    protected string $extension = 'js';

    public function export(): static
    {
        $this->generate();

        return $this;
    }

    public function generate()
    {
        $this->output .= "const url = '{$this->endpoint}';\n\n";
        $this->output .= "const headers = {\n";
        $this->output .= "    'Accept': 'application/json',\n";
        $this->output .= "    'Content-Type': 'application/json',\n";
        $this->output .= "};\n\n";

        foreach ($this->routes as $key => $route) {
            //GET
            $this->output .= "// {$key} GET\n";
            $this->output .= "fetch(url + '{$route[0]['route']}', { method: 'GET', headers })\n";
            $this->output .= "    .then(response => response.json())\n";
            $this->output .= "    .then(data => console.log(data));\n\n";
            //POST with fields
            $this->output .= "// {$key} POST\n";
            $this->output .= "const data = {\n";
            foreach ($route[1]['fields'] as $field) {
                $this->output .= "    '{$field['name']}': '{$field['type']}',\n";
            }
            $this->output .= "};\n";
            $this->output .= "fetch(url + '{$route[1]['route']}', { method: 'POST', headers, body: JSON.stringify(data) })\n";
            $this->output .= "    .then(response => response.json())\n";
            $this->output .= "    .then(data => console.log(data));\n\n";

            //PUT with fields
            $this->output .= "// {$key} PUT\n";
            $this->output .= "const data = {\n";
            foreach ($route[2]['fields'] as $field) {
                $this->output .= "    '{$field['name']}': '{$field['type']}',\n";
            }
            $this->output .= "};\n";
            $this->output .= "fetch(url + '{$route[2]['route']}', { method: 'PUT', headers, body: JSON.stringify(data) })\n";
            $this->output .= "    .then(response => response.json())\n";
            $this->output .= "    .then(data => console.log(data));\n\n";

            //DELETE
            $this->output .= "// {$key} DELETE\n";
            $this->output .= "fetch(url + '{$route[3]['route']}', { method: 'DELETE', headers })\n";
            $this->output .= "    .then(response => response.json())\n";
            $this->output .= "    .then(data => console.log(data));\n\n";
        }

        return $this;
    }

    public function project(Project $project): static
    {
        $this->project = $project;

        return $this;
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
