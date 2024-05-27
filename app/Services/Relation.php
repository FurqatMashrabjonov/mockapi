<?php

namespace App\Services;

use App\DataTypes\ResourceNode;
use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class Relation
{
    public static function equalTree(?ResourceNode $userResource, ?ResourceNode $parsedPathResource): bool
    {
        return Str::startsWith(self::makeString($userResource), self::makeString($parsedPathResource));
    }

    public static function makeString(?ResourceNode $resource): string
    {
        if ($resource == null) {
            return '';
        }
        $result = $resource->name;
        foreach ($resource->children as $child) {
            $result .= ','.self::makeString($child);
        }

        return $result;
    }

    public static function getParentResourcesAsPath(Project $project): array
    {
        $paths = [];
        $resources = $project->resources()->get();
        foreach ($resources as $resource) {
            $current = $resource;
            $path = '';
            while ($current != null) {
                $path .= $current->name.'/0/';
                $current = $current->child()->first();
            }
            $paths[] = $path;
        }

        foreach ($paths as $key => $path) {
            $paths[$key] = substr($path, 0, -1);
        }

        return $paths;
    }

    public static function getParentResources(Project $project): Collection
    {
        return $project->resources()->whereNull('parent_id')->get();
    }
}
