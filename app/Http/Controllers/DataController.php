<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Resource;
use App\Services\FakeFiller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DataController extends Controller
{
    /**
     * Generate Data
     * in the request should receive count
     */
    public function generate(Project $project, ?Resource $resource, Request $request)
    {
        Log::debug($resource->name);
        if (! $resource) {
            return error_response('Resource not found', 404);
        }
        $fields = $resource->fields;
        $count = $request->count;
        $resourceData = $resource->data;

        $parent = $resource->parent()->first();
        $parentIds = $parent ? collect($parent->data()->first()->data) : collect();
        $parentIds = $parentIds->map(function ($item) {
            return $item['id'] ?? null;
        });

        //checking for parents data count. if data count is 0 then return error
        if ($parent && $parentIds->count() == 0) {
            return error_response('Parent data should not be empty', 200);
        }

        //generate fake data using parentIds to static fields using all parent ids

        if (! $resourceData) {
            $resourceData = $resource->data()->create();
            $data = [];
            for ($i = 0; $i < $count; $i++) {
                $parentID = $i % $parentIds->count();
                $data = array_merge($data, FakeFiller::fill(
                    fields: $fields,
                    count: 1,
                    idStartsFrom: $i + 1,
                    static_fields: $parent ? [Str::singular($parent->name).'_id' => $parentIds[$parentID]] : []
                ));
            }

        } else {
            $data = $resourceData->data;
            if ($count > count($resourceData->data)) {

                $maxId = collect($resourceData->data)->max('id');
                for ($i = 0; $i < $count - count($resourceData->data); $i++) {
                    $parentID = $parentIds->count() == 0 ? null : $i % $parentIds->count();

                    $data = array_merge($data, FakeFiller::fill(
                        fields: $fields,
                        count: 1,
                        idStartsFrom: $maxId + $i + 1,
                        static_fields: $parent ? [Str::singular($parent->name).'_id' => $parentIds[$parentID]] : []
                    ));
                }
            } else {
                $data = array_slice($data, 0, $count);
            }
        }
        $resourceData->data = $data;
        $resourceData->save();

        return success_response($resourceData->only('data')['data']);
    }

    public function generateAll(Project $project): RedirectResponse|JsonResponse
    {
        if ($this->getResourcesCount($project) == 0) {
            return error_response('No resources found');
        }

        ini_set('memory_limit', '1024M'); // Increases the memory limit to 1024M for this script

        $project->resources()->chunk(200, function ($resources) use ($project) {
            foreach ($resources as $resource) {
                $this->generate($project, $resource, request()->merge(['count' => 50]));
            }
        });

        return redirect()->back();
    }

    public function resetAll(Project $project): RedirectResponse|JsonResponse
    {
        if ($this->getResourcesCount($project) == 0) {
            return error_response('No resources found');
        }

        $project->resources()->chunk(200, function ($resources) {
            Log::info($resources);
            foreach ($resources as $resource) {
                $resource->data()->update(['data' => []]);
            }
        });

        return redirect()->back();
    }

    public function getResourcesCount(Project $project): int
    {
        return $project->resources()->count();
    }
}
