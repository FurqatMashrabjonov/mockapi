<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property mixed $data
 * @property mixed $fields
 */
class Resource extends Model
{

    protected $with = ['data', 'children'];

    protected $fillable = [
        'project_id',
        'name',
        'fields',
    ];

    protected $casts = [
        'fields' => 'array',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function data(): HasOne
    {
        return $this->hasOne(Data::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Resource::class, 'parent_id', 'id');
    }

    public function child(): HasOne
    {
        return $this->hasOne(Resource::class, 'parent_id', 'id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Resource::class, 'parent_id', 'id');
    }

}
