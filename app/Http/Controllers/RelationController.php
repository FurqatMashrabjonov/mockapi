<?php

namespace App\Http\Controllers;

use App\Http\Requests\RelationRequest;
use App\Models\Project;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RelationController extends Controller
{
    public function connect(array $data, Project $project)
    {
        $data = Validator::make($data, [
            'source' => ['required', 'string'],
            'destination' => ['nullable', 'string'],
        ])->validated();

        $source = Resource::query()->where('name', $data['source'])->first();
        if (!$source){
            return response()->json(['message' => 'Source not found'], 404);
        }
        if (!$data['destination']){
            $source->parent_id = null;
        }else {
            $destination = Resource::query()->where('name', $data['destination'])->first();
            if ($destination){
                $source->parent_id = $destination->id;
            }else{
                return response()->json(['message' => 'Destination not found'], 404);
            }
        }
        $source->data()->first()->update(['data' => []]);
        $source->save();
        return response()->json(['message' => 'Connected']);
    }
}
