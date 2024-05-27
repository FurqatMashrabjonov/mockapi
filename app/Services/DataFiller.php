<?php

namespace App\Services;

use App\DataTypes\ResourceNode;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DataFiller
{
    public static array $users = [];

    public static array $posts = [];

    public static array $comments = [];

    public static function fakeFiller(): void
    {
        $users_count = 10;
        $posts_count = 10;
        $comments_count = 10;

        self::$users = FakeFiller::fill([
            [
                'name' => 'name',
                'type' => 'person.title',
            ],
            [
                'name' => 'phone_number',
                'type' => 'phoneNumber.phoneNumber',
            ],
        ], $users_count);

        self::$posts = array_merge(
            FakeFiller::fill(
                fields: [
                    [
                        'name' => 'title',
                        'type' => 'text.title',
                    ],
                    [
                        'name' => 'content',
                        'type' => 'text.realText',
                    ],
                ],
                count: $posts_count,
                static_fields: ['user_id' => 1])
        );

        self::$comments = array_merge(
            FakeFiller::fill(
                fields: [
                    [
                        'name' => 'content',
                        'type' => 'text.realText',
                    ],
                ],
                count: $comments_count,
                static_fields: ['post_id' => 1])
        );
    }

    public static function getAllData(string $name): array
    {
        return match ($name) {
            'users' => self::$users,
            'posts' => self::$posts,
            'comments' => self::$comments,
            default => [],
        };
    }

    public static function fillData(ResourceNode $root): ?ResourceNode
    {

        self::fakeFiller();

        return self::fill($root);
    }

    public static function fill(?ResourceNode $root, ?string $parent = null, int $parent_id = 0): ?ResourceNode
    {
        if (is_null($root)) {
            return null;
        }

        if (Cache::has($root->name)) {
            $data = Cache::get($root->name);
        } else {
            $data = self::getAllData($root->name);
            Cache::put($root->name, $data, 60 * 60);
        }

        if (! $root->isGetAllData()) {
            $data = array_filter($data, fn ($item) => $item['id'] == $root->id);
        }

        Log::debug(json_encode(Cache::get($root->name)));

        if ($parent_id != 0) {
            $data = array_filter($data, fn ($item) => $item[Str::singular($parent).'_id'] == $parent_id);
        }

        $root->fillData($data);

        if ($root->hasChildren()) {

            foreach ($root->children as $child) {
                self::fill($child, $root->name, $root->id);
            }
        }

        return $root;
    }
}
