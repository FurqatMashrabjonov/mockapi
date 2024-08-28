<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;

class RelationController extends Controller
{
    public function connect(Request $request)
    {
        $data = $request->validate([
            'source' => ['required', 'string'],
            'destination' => ['nullable', 'string'],
        ]);

        $source = Resource::query()->where('id', $data['source'])->first();
        if (! $source) {
            return response()->json(['message' => 'Source not found'], 404);
        }
        if (! $data['destination']) {
            $source->parent_id = null;
        } else {
            $destination = Resource::query()->where('id', $data['destination'])->first();
            if ($destination) {

                $source->parent_id = $destination->id;
            } else {
                return response()->json(['message' => 'Destination not found'], 404);
            }
        }
        $source->data()->first()->update(['data' => []]);
        $source->save();

        return redirect()->back();
    }
}
