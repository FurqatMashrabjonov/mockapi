<?php

namespace App\Services\Relation;

use App\Models\Project;

class EdgeGenerator
{
    public static function generate(Project $project): array
    {
        $resources = $project->resources()->get()->toArray();
        /*
         * edges.push({
                    id: 'horizontal-' + resource.id.toString() + '-' + resource.parent_id.toString(),
                    source: resource.id.toString(),
                    animated: true,
                    type: 'smoothstep',
                    target: resource.parent_id.toString(),
                });
         */

        $edges = [];
        foreach ($resources as $resource) {
            if ($resource['parent_id']) {
                $edges[] = [
                    'id' => 'horizontal-'.$resource['id'].'-'.$resource['parent_id'],
                    'source' => (string) $resource['id'],
                    'animated' => false,
                    'type' => 'step',
                    'target' => (string) $resource['parent_id'],
                ];
            }
        }

        return $edges;
    }
}
