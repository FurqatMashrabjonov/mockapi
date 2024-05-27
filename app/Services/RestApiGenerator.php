<?php

namespace App\Services;

use App\DataTypes\ApiType;
use App\Models\Project;
use App\Models\Resource;

class RestApiGenerator
{

    public static function generate(Project $project): array
    {
        return self::getRoutes($project);
    }

    protected static function getResources(Project $project): array
    {
        return $project->resources()->whereNull('parent_id')->get()->toArray();
    }

    public static function getEndpoint(Project $project): string
    {
        return 'https://' . $project->uuid . '.' . config('app.domain');
    }


    public static function getRoute(array $resource, string $prefix = ''): array
    {
        return [
            (new ApiType(
                route: $prefix . '/' . $resource['name'],
                method: 'GET',
                parameters: [],
                headers: self::getHeaders()
            ))->toArray(),
            (new ApiType(
                route: $prefix . '/' . $resource['name'],
                method: 'POST',
                parameters: [],
                headers: self::getHeaders()
            ))->toArray(),
            (new ApiType(
                route: $prefix . '/' . $resource['name'] . '/:id',
                method: 'PUT',
                parameters: [],
                headers: self::getHeaders()
            ))->toArray(),
            (new ApiType(
                route: $prefix . '/' . $resource['name'] . '/:id',
                method: 'DELETE',
                parameters: [],
                headers: self::getHeaders()
            ))->toArray()
        ];
    }

    public static function getRoutes(Project $project): array
    {
        $resources = self::getResources($project);
        $routes = [];
        $queue = [];
        $visited = [];

        foreach ($resources as $resource) {
            $queue[] = [$resource, '']; // 1: resource, 2: parentPrefix
        }

        while (!empty($queue)) {
            [$resource, $parentPrefix] = array_shift($queue);
            if (in_array($resource['id'], $visited)) {
                break;
            }
            $visited[] = $resource['id'];
            $routes[$resource['name']][] = self::getRoute($resource, $parentPrefix);
            $children = $resource['children'];
            foreach ($children as $child) {
                if (!in_array($child, $visited)) {
                    $queue[] = [$child, $parentPrefix . '/' . $resource['name'] . '/:id'];
                }
            }
        }

        return $routes;
    }

    public static function getHeaders(): array
    {
        return [
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        ];
    }

    public static function postman(Project $project)
    {
        $resources = self::getResources($project);
        $postman = [
            'info' => [
                'name' => $project->name,
                '_postman_id' => $project->uuid,
                'description' => $project->description,
                'schema' => 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
            ],
            'item' => []
        ];

        foreach ($resources as $resource) {
            $item = [
                'name' => $resource['name'],
                'item' => []
            ];
            $children = $resource['children'];
            foreach ($children as $child) {
                $item['item'][] = [
                    'name' => $child['name'],
                    'request' => [
                        'method' => 'GET',
                        'header' => self::getHeaders(),
                        'url' => [
                            'raw' => self::getEndpoint($project) . '/' . $resource['name'] . '/' . $child['name'],
                            'host' => [
                                self::getEndpoint($project)
                            ],
                            'path' => [
                                $resource['name'],
                                $child['name']
                            ]
                        ]
                    ]
                ];
            }
            $postman['item'][] = $item;
        }

        return $postman;
    }
}
