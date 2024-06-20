<?php

namespace App\Services\Export;

use App\Models\Project;
use App\Services\Export\Interfaces\ExportableInterface;
use App\Services\RestApiGenerator;

class Json implements ExportableInterface
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
        $this->output = json_encode($this->routes, JSON_PRETTY_PRINT);
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

    public function download()
    {

    }

    public function isDownloadable(): false
    {
        return false;
    }

    public function extension(): string
    {
        return $this->extension;
    }
}
