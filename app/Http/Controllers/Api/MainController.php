<?php

namespace App\Http\Controllers\Api;

use App\DataTypes\ResourceNode;
use App\Enums\ErrorMessagesEnum;
use App\Exceptions\ErrorResponseException;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\RouteParser;
use App\Traits\MainTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class MainController extends Controller
{
    use MainTrait;

    protected Project $project;

    protected ResourceNode $root;

    protected ResourceNode $activeNode;

    protected ?ResourceNode $parentNode;

    protected Collection $data;

    protected string $path;

    /**
     * @throws Exception
     */
    public function handler(string $project_uuid, string $path)
    {
        $project = $this->getProject($project_uuid);

        $root = RouteParser::parsePath($path);

        $this->validatePath($project, $path);

        $dataModel = $this->getActiveNodeResource($project, $root)->data;

        $method = request()->method();
        error_if(! in_array($method, ['GET', 'POST', 'PUT', 'DELETE']), ErrorMessagesEnum::METHOD_NOT_ALLOWED->value);

        $this->project = $project;
        $this->root = $root;
        $this->path = $path;
        $this->data = collect($dataModel->data ?? []);
        $this->activeNode = RouteParser::getActiveNode($root);
        $this->parentNode = RouteParser::getParentNode($root);

        return $this->{strtolower($method)}();
    }

    private function get(): JsonResponse
    {
        $data = $this->data;
        if ($this->parentNode != null) {
            $data = $data->where(Str::singular($this->parentNode->name).'_id', $this->parentNode->id)->values();
        }

        if (! $this->isGetAllData($this->activeNode)) {
            return json_response($data->where('id', $this->activeNode->id)->first() ?? []);
        }

        return json_response($this->afterFilter($data)->toArray());
    }

    /**
     * @throws Exception
     */
    private function post()
    {

        $this->validatePath($this->project, $this->path);

        $resource = $this->getActiveNodeResource($this->project, $this->root);

        $fieldNames = collect($resource->fields)->pluck('name')->toArray();

        error_if(! $this->equalFields($fieldNames, array_keys(request()->only($fieldNames))), ErrorMessagesEnum::INVALID_PATH->value);

        $insert_data = array_merge(['id' => count($this->data) ? collect($this->data)->max('id') + 1 : 1], request()->only($fieldNames));

        $parent = $resource->parent()->first();

        if ($parent) {
            $parentRoot = RouteParser::getParentNode($this->root);
            error_if(is_null($parentRoot), 'Parent data is required');
            $insert_data[Str::singular($parent->name).'_id'] = $parentRoot->id;
        }
        $this->data[] = $insert_data;

        $resource->data()->update(['data' => $this->data]);

        return json_response($insert_data);
    }

    /**
     * @throws ErrorResponseException
     */
    private function put()
    {
        $resource = $this->getActiveNodeResource($this->project, $this->root);

        error_if(empty($this->data), ErrorMessagesEnum::DATA_IS_EMPTY->value);
        error_if($this->activeNode->id == 0, ErrorMessagesEnum::ID_IS_INCORRECT->value);

        $currentData = $this->data->where('id', $this->activeNode->id)->first();

        error_if(is_null($currentData), ErrorMessagesEnum::DATA_NOT_FOUND->value);

        $fieldNames = collect($resource->fields)->pluck('name')->toArray();

        $currentData = array_merge($currentData, request()->only($fieldNames));
        $this->data = $this->data->map(function ($item) use ($currentData) {
            return $item['id'] == $currentData['id'] ? $currentData : $item;
        });

        $resource->data()->update(['data' => $this->data]);

        return json_response($currentData);
    }

    /**
     * @throws ErrorResponseException
     */
    private function delete()
    {
        error_if($this->activeNode->id == 0, ErrorMessagesEnum::ID_IS_INCORRECT->value);

        $currentData = $this->data->where('id', $this->activeNode->id)->first();

        error_if(is_null($currentData), ErrorMessagesEnum::DATA_NOT_FOUND->value);

        $this->data = $this->data->where('id', '!=', $this->activeNode->id)->values();

        $resource = $this->getActiveNodeResource($this->project, $this->root);

        $resource->data()->update(['data' => $this->data]);

        return json_response($currentData);
    }
}
