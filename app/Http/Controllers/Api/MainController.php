<?php

namespace App\Http\Controllers\Api;

use App\DataTypes\ResourceNode;
use App\Http\Controllers\Controller;
use App\Models\Data;
use App\Models\Project;
use App\Services\Relation;
use App\Services\RouteParser;
use App\Services\Validator;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MainController extends Controller
{
    /**
     * @throws Exception
     */
    public function handler(string $project_uuid, string $path)
    {
        $project = Project::where('uuid', $project_uuid)->first();
        if (! $project) {
            return error_response('Project not found');
        }

        try {
            $root = RouteParser::parsePath($path);
        } catch (Exception $e) {
            return error_response($e->getMessage());
        }

        $relations = Relation::getParentResourcesAsPath($project);

        $correspondingRelation = false;
        foreach ($relations as $relation) {
            if (!Relation::equalTree(RouteParser::parsePath(stripslashes($relation)), $root)) {
                $correspondingRelation = true;
            }
        }

        if (! $correspondingRelation) {
            return error_response('Invalid path');
        }

        $dataModel = $project->resources()->where('name', RouteParser::getActiveNode($root)->name)
            ->first()
            ->data;

        return match (request()->method()) {
            'GET' => $this->get($root, $dataModel),
            'POST' => $this->post($project, $root, $dataModel),
            'PUT' => $this->put($project, $root, $dataModel),
            'DELETE' => $this->delete($project, $root, $dataModel),
            default => error_response('Method not allowed 🤚', 405)
        };

    }

    private function get(ResourceNode $root, Data $dataModel)
    {
        $data = $dataModel->data;

        $parentNode = RouteParser::getParentNode($root);

        if ($parentNode != null){
               $data = collect($data)->filter(function ($item) use ($parentNode) {
                return $item[Str::singular($parentNode->name) . '_id'] == $parentNode->id;
            })->values();
        }

        $activeNode = RouteParser::getActiveNode($root);

        if ($activeNode->id != 0)
            return success_response(collect($data)->filter(function ($item) use ($activeNode) {
                return $item['id'] == $activeNode->id;
            })->first() ?? []);

        //pagination
        if (request()->has('page') and request()->has('limit')) {
            $data = collect($dataModel->data)->forPage(request('page'), request('limit'))->values();
        }

        //sorting
        if (request()->has('sortBy')) {
            $order = (request()->has('order') and in_array(request('order'), ['asc', 'desc'])) ? request('order') : 'asc';
            Log::debug($order);
            $data = collect($data)->sortBy(request('sortBy'), SORT_REGULAR, $order == 'desc')->values();
        }

        //searching
        if (request()->has('search')) {
            $data = collect($data)->filter(function ($item) {
                if (request()->has('field')) {
                    return collect($item)->contains(request('field'), request('search'));
                } else {
                    return collect($item)->contains(request('search'));
                }
            })->values();
        }

        return success_response($data);
    }

    /**
     * @throws Exception
     */
    private function post(Project $project, ResourceNode $root, Data $dataModel)
    {

        $paths = Relation::getParentResourcesAsPath($project);

        $correctPath = false;
        foreach ($paths as $path) {
            if (Relation::equalTree(RouteParser::parsePath(stripslashes($path)), $root)) {
                $correctPath = true;
                break;
            }
        }

        if (! $correctPath) {
            return error_response('Invalid path');
        }

        $resource = $project->resources()->where('name', RouteParser::getActiveNode($root)->name)
            ->with('data')
            ->first();

        $fieldNames = [];
        foreach ($resource->fields as $field) {
            $fieldNames[] = $field['name'];
        }
        if (! Validator::equalFields($fieldNames, array_keys(request()->only($fieldNames)))) {
            return error_response('Invalid fields');
        }

        $data = $dataModel->data ?? [];
        $insert_data = array_merge(
            ['id' => count($dataModel->data) ? collect($dataModel->data)->max('id') + 1 : 1],
            request()->only($fieldNames));

        $parent = $resource->parent()->first();

        if ($parent){
            $parentRoot = RouteParser::getParentNode($root);
            if ($parentRoot == null){
                return error_response('Parent data is required');
            }else{
                $parentID = $parentRoot->id;
            }

            $insert_data[Str::singular($parent->name) . '_id'] = $parentID;
        }

        $data[] = $insert_data;

        $dataModel->update(['data' => $data]);

        return success_response($dataModel->data);
    }

    private function put(Project $project, ResourceNode $root, Data $dataModel)
    {
        $resource = $project->resources()->where('name', RouteParser::getActiveNode($root)->name)->first();
        $data = $dataModel->data ?? [];

        if (! $data) {
            return error_response('Data is empty', 404);
        }

        //update data with id from request
        $activeNode = RouteParser::getActiveNode($root);
        if ($activeNode->id == 0) {
            return error_response('ID is incorrect');
        }

        $currentData = collect($data)->filter(function ($item) use ($activeNode) {
            return $item['id'] == $activeNode->id;
        })->first();
        if (! $currentData) {
            return error_response('Data not found');
        }

        $fieldNames = [];
        foreach ($resource->fields as $field) {
            $fieldNames[] = $field['name'];
        }

        $data = collect($data)->map(function ($item) use ($activeNode, $fieldNames) {
            if ($item['id'] == $activeNode->id) {
                return array_merge($item, request()->only($fieldNames));
            }

            return $item;
        })->values()->toArray();

        $dataModel->update(['data' => $data]);

        //return updated data that id is equal to active node id
        return success_response(collect($data)->filter(function ($item) use ($activeNode) {
            return $item['id'] == $activeNode->id;
        })->first());

    }

    private function delete(Project $project, ResourceNode $root, Data $dataModel)
    {

        $data = $dataModel->data ?? [];
        if (! $data) {
            return error_response('Data is empty', 404);
        }

        $activeNode = RouteParser::getActiveNode($root);
        if ($activeNode->id == 0) {
            return error_response('ID is incorrect');
        }

        //if data with id does not exist return error
        $currentData = collect($data)->filter(function ($item) use ($activeNode) {
            return $item['id'] == $activeNode->id;
        })->first();
        if (! $currentData) {
            return error_response('Data not found');
        }

        $data = collect($data)->filter(function ($item) use ($activeNode) {
            return $item['id'] != $activeNode->id;
        })->values()->toArray();

        $dataModel->update(['data' => $data]);

        return response()->json(['message' => 'Data deleted successfully']);
    }
}
