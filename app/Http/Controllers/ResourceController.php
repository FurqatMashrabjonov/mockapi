<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenerateWithAiRequest;
use App\Http\Requests\ResourceRequest;
use App\Models\Project;
use App\Models\Resource;
use App\Services\AiResourceGenerator;
use App\Services\FakeFiller;
use Illuminate\Support\Facades\Log;
use phpDocumentor\Reflection\Types\Collection;
use phpDocumentor\Reflection\Types\False_;

class ResourceController extends Controller
{
    protected RelationController $relationController;

    public function __construct()
    {
        $this->relationController = new RelationController();
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Project $project)
    {
        $resources = $project->resources()->get();

        return success_response($resources->toArray());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Project $project, ResourceRequest $request)
    {
        $this->createResource($request->validated(), $project);
    }

    public function createResource(array $data, Project $project)
    {
        if ($project->resources()->where('name', $data['name'])->exists() ||
            $project->resources()->count() >= config('resources.max_resources', 5)) {
            return false;
        }

        foreach ($data['fields'] as $key => $field) {
            if ($field['name'] === 'id') {
                unset($data['fields'][$key]);
            }
        }

        $resource = $project->resources()->create($data);
        $resource->data()->create();
        return $resource;
    }

    public function generateWithAI(GenerateWithAiRequest $request)
    {
        $project = Project::where('uuid', $request->input('project_uuid'))->with('resources')->first();

        $ai = new AiResourceGenerator();
        $response = $ai->generate($project->name, $request->input('resource_description', ''), $project->resources->toArray());
        $resources = $response['resources'] ?? [];
        $relations = $response['relations'] ?? [];
        try {
            foreach ($resources as $key => $resource) {
                $data = ['name' => $key, 'fields' => $resource ?? []];
                $this->createResource($data, $project);
            }

            foreach ($relations as $relation) {
                $data = [
                    'project_uuid' => $project->uuid,
                    'source' => $relation['source'],
                    'destination' => $relation['destination'],
                ];
                $this->relationController->connect($data, $project);
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', 'Failed to generate resources');
        }
//        return redirect(route('projects.show', ['project' => $project], absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, Resource $resource)
    {
        $resource = $project->resources()->find($resource->id);
        if (!$resource) {
            return error_response('Resource not found', 404);
        }

        return success_response($resource->toArray());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ResourceRequest $request, Resource $resource)
    {
        $resource->update($request->validated());

        return success_response($resource->toArray());
    }

    public function fields()
    {
        return success_response(FakeFiller::getFieldsToFrontend());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, Resource $resource)
    {
        $resource = $project->resources()->find($resource->id);
        if (!$resource) {
            return error_response('Resource not found', 404);
        }

        $resource->delete();

        return success_response([]);
    }
}
