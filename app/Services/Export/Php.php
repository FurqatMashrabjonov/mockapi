<?php

namespace App\Services\Export;

use App\Models\Project;
use App\Services\Export\Interfaces\ExportableInterface;
use App\Services\RestApiGenerator;

class Php implements ExportableInterface
{

    protected string $output = '';
    protected array $routes = [];
    protected string $endpoint = '';
    protected Project $project;
    protected string $extension = 'php';

    public function export(): static
    {
        $this->generate();

        return $this;
    }

    public function generate()
    {
        $this->output .= "<?php\n\n";
        $this->output .= "use Illuminate\Support\Facades\Http;\n\n";
        $this->output .= "\$url = '{$this->endpoint}';\n\n";
        $this->output .= "\$headers = [\n";
        $this->output .= "    'Accept' => 'application/json',\n";
        $this->output .= "    'Content-Type' => 'application/json',\n";
        $this->output .= "];\n\n";

        foreach ($this->routes as $key => $route) {
            //GET
            $this->output .= "// {$key} GET\n";
            $this->output .= "\$response = Http::withHeaders(\$headers)->get(\$url . '{$route[0]['route']}');\n";
            $this->output .= "print_r(\$response->json());\n\n";
            //POST with fields
            $this->output .= "// {$key} POST\n";
            $this->output .= "\$data = [\n";
            foreach ($route[1]['fields'] as $field) {
                $this->output .= "    '{$field['name']}' => '{$field['type']}',\n";
            }
            $this->output .= "];\n";
            $this->output .= "\$response = Http::withHeaders(\$headers)->post(\$url . '{$route[1]['route']}', \$data);\n";
            $this->output .= "print_r(\$response->json());\n\n";

            //PUT with fields
            $this->output .= "// {$key} PUT\n";
            $this->output .= "\$data = [\n";
            foreach ($route[2]['fields'] as $field) {
                $this->output .= "    '{$field['name']}' => '{$field['type']}',\n";
            }
            $this->output .= "];\n";
            $this->output .= "\$response = Http::withHeaders(\$headers)->put(\$url . '{$route[2]['route']}', \$data);\n";
            $this->output .= "print_r(\$response->json());\n\n";

            //DELETE
            $this->output .= "// {$key} DELETE\n";
            $this->output .= "\$response = Http::withHeaders(\$headers)->delete(\$url . '{$route[3]['route']}');\n";
            $this->output .= "print_r(\$response->json());\n\n";
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
