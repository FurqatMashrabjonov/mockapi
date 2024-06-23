<?php

namespace App\Services\Export;

use App\Models\Project;
use App\Services\Export\Interfaces\ExportableInterface;

class Jetbrains implements ExportableInterface
{
    protected string $output = '';

    protected array $routes = [];

    protected string $endpoint = '';

    protected Project $project;

    protected string $extension = 'http';

    public function export(): static
    {
        $this->generate();

        return $this;
    }

    public function generate()
    {
        $this->output .= "#{$this->endpoint}\n";

        foreach ($this->routes as $key => $route) {
            foreach ($route as $r) {
                $this->output .= "{$r['method']} {$this->endpoint}{$r['route']}\n";
                $this->output .= "Content-Type: application/json\n";
                $this->output .= "Accept: application/json\n\n";
                if (isset($r['fields'])) {
                    $this->output .= "\n";
                    $this->output .= "###\n";
                    $this->output .= "\n";
                    $this->output .= json_encode($r['fields'], JSON_PRETTY_PRINT);
                    $this->output .= "\n\n";
                }
            }
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

    public function download()
    {
        return response()->download($this->output, $this->project->uuid.'.http');
        //DO not export from here
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
