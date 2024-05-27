<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed $data
 */
class Data extends Model
{
    use HasFactory;

    protected $fillable = ['data', 'resource_id'];

    protected $casts = [
        'data' => 'array',
    ];

    protected $visible = ['data', 'resource_id'];
}
