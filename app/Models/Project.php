<?php

namespace App\Models;

use App\Observers\ProjectObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ObservedBy(ProjectObserver::class)]
class Project extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'uuid',
        'avatar',
    ];

    protected $with = ['resources'];

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function resources(): HasMany
    {
        return $this->hasMany(Resource::class);
    }
}
