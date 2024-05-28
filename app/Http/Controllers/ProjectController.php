<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Services\FakeFiller;
use App\Services\Relation\EdgeGenerator;
use App\Services\Relation\NodeGenerator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Sowren\SvgAvatarGenerator\Enums\FontWeight;
use Sowren\SvgAvatarGenerator\Facades\Svg;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::query()
            ->where('user_id', auth()->id())
            ->get()
            ->map(function ($project) {
                return array_merge($project->toArray(), [
                    'created_at_human' => $project->created_at->diffForHumans(),
                ]);
            });

        return Inertia::render('Dashboard', [
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $project = Project::create(array_merge(
            [
                'user_id' => auth()->id(),
                'uuid' => uniqid(Str::slug($request->name) . '-')
            ],
            $request->validated()
        ));

        return redirect(route('projects.show', ['project' => $project], absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $fields = FakeFiller::availableFields();
        return Inertia::render('Projects/Project', [
            'project' => $project,
            'fields' => $fields,
            'maxFields' => 10,
            'edges' => EdgeGenerator::generate($project),
            'nodes' => NodeGenerator::generate($project),
        ]);
    }

    public function showApi(Project $project)
    {
        return success_response($project->toArray());
    }

    /**
     * Update the specified resource in storage.
     */
    //    public function update(ProjectRequest $request, Project $project)
    //    {
    //        $project->update($request->validated());
    //        return success_response($project->toArray());
    //    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return success_response([]);
    }
}
