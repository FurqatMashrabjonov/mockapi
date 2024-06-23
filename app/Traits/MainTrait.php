<?php

namespace App\Traits;

use App\DataTypes\ResourceNode;
use App\Exceptions\ErrorResponseException;
use App\Models\Project;
use App\Services\Relation;
use App\Services\RouteParser;
use App\Services\Validator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

trait MainTrait
{
    /**
     * @throws ErrorResponseException
     */
    private function getProject(string $project_uuid): Project
    {
        $project = Project::where('uuid', $project_uuid)->first();
        error_if(! $project, 'Project not found', 404);

        return $project;
    }

    /**
     * @throws ErrorResponseException
     */
    private function validatePath(Project $project, string $path): ResourceNode
    {
        $root = RouteParser::parsePath($path);
        $relations = Relation::getParentResourcesAsPath($project);

        $correspondingRelation = false;
        foreach ($relations as $relation) {
            if (Relation::equalTree(RouteParser::parsePath(stripslashes($relation)), $root)) {
                $correspondingRelation = true;
            }
        }

        error_if(! $correspondingRelation, 'Invalid path');

        return $root;
    }

    public function isGetAllData(ResourceNode $node): bool
    {
        return $node->id == 0;
    }

    public function afterFilter(Collection $data)
    {
        //pagination
        if (request()->has('page') and request()->has('limit')) {
            $data = $data->forPage(request('page'), request('limit'));
        }

        //sorting
        if (request()->has('sortBy')) {
            $order = (request()->has('order') and in_array(request('order'), ['asc', 'desc'])) ? request('order') : 'asc';
            $data = $data->sortBy(request('sortBy'), SORT_REGULAR, $order == 'desc');
        }

        //searching
        if (request()->has('search')) {
            $data = $data->filter(function ($item) {
                if (request()->has('field')) {
                    return collect($item)->contains(request('field'), request('search'));
                } else {
                    return collect($item)->contains(request('search'));
                }
            });
        }

        return $data->values();
    }

    public function getActiveNodeResource(Project $project, ResourceNode $root): Model
    {
        return $project->resources()->where('name', RouteParser::getActiveNode($root)->name)
            ->first();
    }

    public function equalFields(array $fields1, array $fields2): bool
    {
        return Validator::equalFields($fields1, $fields2);
    }

}
