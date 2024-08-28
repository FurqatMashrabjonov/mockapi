<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenerateWithAiRequest;
use App\Http\Requests\ResourceRequest;
use App\Models\Project;
use App\Models\Resource;
use App\Services\AiResourceGenerator;
use App\Services\FakeFiller;
use App\Services\Relation\EdgeGenerator;
use App\Services\Relation\NodeGenerator;
use Illuminate\Support\Facades\Log;

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
        $nodes = NodeGenerator::generate($project);
        $edges = EdgeGenerator::generate($project);

        return success_response([
            'resources' => $resources->toArray(),
            'nodes' => $nodes,
            'edges' => $edges,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createOrUpdate(Project $project, ResourceRequest $request)
    {
        $data = $request->validated();

        $data['fields'] = collect($data['fields'])->map(function ($field) {
            $field['type'] = $field['category'] . '.' . $field['type'];
            return $field;
        })->toArray();

        $this->createResource($data, $project);
    }

    public function createResource(array $data, Project $project)
    {
        if ($project->resources()->count() >= config('resources.max_resources', 5)) {
            return false;
        }

        $resource = $project->resources()->updateOrCreate([
            'name' => $data['name'],
            'project_id' => $project->id,
        ], $data);
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

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, Resource $resource)
    {
        $resource = $project->resources()->find($resource->id);
        if (! $resource) {
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
    public function destroy(Resource $resource)
    {
        $resource = Resource::find($resource->id);
        if (! $resource) {
            return error_response('Resource not found', 404);
        }

        $resource->delete();

        return redirect()->back();
    }
}
