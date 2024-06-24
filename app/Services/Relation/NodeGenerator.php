<?php

namespace App\Services\Relation;

use App\Models\Project;
use App\Services\RestApiGenerator;

class NodeGenerator
{
    public static array $restApiDocs = [];

    public static function generate(Project $project): array
    {
        $nodes = collect($project->resources)->where('parent_id', null)->toArray();
        self::$restApiDocs = RestApiGenerator::generate($project);

        return self::generateRecursive($nodes);
    }

    public static function generateRecursive(array $nodes, $visited = [], $x = -100, $y = 50): array
    {
        $result = [];
        foreach ($nodes as $node) {
            if (in_array((string) $node['id'], $visited)) {
                continue;
            }
            $visited[] = (string) $node['id'];
            $result[] = [
                'id' => (string) $node['id'],
                'data' => [
                    'resource' => $node,
                    'rest_api_doc' => self::$restApiDocs[$node['name']] ?? null,
                ],
                'position' => ['x' => $x, 'y' => $y],
                //                'sourcePosition' => 'right',
                //                'targetPosition' => 'right',
                'type' => 'textUpdater',
                'dragging' => false,
                'dragHandle' => 'dragHandle',
            ];
            $y += 60;
            $children = self::generateRecursive($node['children'], $visited, $x + 150, $y);
            foreach ($children as $child) {
                $result[] = $child;
            }
        }

        return $result;
    }
}
