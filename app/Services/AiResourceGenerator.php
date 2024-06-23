<?php

namespace App\Services;

use Gemini\Data\Content;
use Gemini\Enums\Role;
use Gemini\Laravel\Facades\Gemini;

class AiResourceGenerator
{
    public function generate(?string $projectName, ?string $projectDescription, array $resources): array
    {
        $chat = Gemini::chat()
            ->startChat(history: $this->getChatHistory());

        $resourcesString = '';

        foreach ($resources as $resource) {
            $resourcesString .= $resource['name'] ?? ', ';
        }

        $response = $chat->sendMessage('generate resource for an app named "'.$projectName.'",
         here are my resources that i already have '.$resourcesString.' dont repeat resources,
         resources fields should be unique and min 3 fields for each resource, feel free to add more fields if you want,
         little bit description about the app is "'.$projectDescription.'".
         the max number of resources is '.config('resources.max_resources', 5).', be careful about cycling resources relationship. ');
        $array = json_decode($response->text(), true);
        if ($array == null) {
            return [];
        } else {
            return $array;
        }
    }

    public function getChatHistory(): array
    {
        return [
            //generating responses as JSON object
            Content::parse(part: 'Generate all answers as a JSON object'),
            Content::parse(part: 'Ok', role: Role::MODEL),

            //available fields
            Content::parse(part: 'Available fields'),
            Content::parse(part: json_encode(FakeFiller::availableFields()), role: Role::MODEL),

            //Example resources
            Content::parse(part: 'Generate resource for an app named "Blog Post", little bit description about the app is "A simple blog post app".'),
            Content::parse(part: json_encode(
                [
                    'resources' => [
                        'users' => [
                            [
                                'name' => 'name',
                                'type' => 'person.name',
                            ],
                            [
                                'name' => 'email',
                                'type' => 'person.email',
                            ],
                            [
                                'name' => 'password',
                                'type' => 'string.password',
                            ],
                            [
                                'name' => 'avatar',
                                'type' => 'gravatar.url',
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                            [
                                'name' => 'updated_at',
                                'type' => 'date.recent',
                            ],
                        ],
                        'posts' => [
                            [
                                'name' => 'title',
                                'type' => 'text.title',
                            ],
                            [
                                'name' => 'content',
                                'type' => 'text.realText',
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                        ],
                        'comments' => [
                            [
                                'name' => 'content',
                                'type' => 'text.realText',
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                        ],
                    ],
                    'relations' => [
                        [
                            'destination' => 'users',
                            'source' => 'posts',
                        ],
                        [
                            'destination' => 'users',
                            'source' => 'comments',
                        ],
                        [
                            'destination' => 'posts',
                            'source' => 'comments',
                        ],
                    ],
                ]
            ), role: Role::MODEL),

            //second example about a project named "E-commerce", description "A simple e-commerce project"
            Content::parse(part: 'Generate resource for an app named "E-commerce", little bit description about the app is "A simple e-commerce project".'),
            Content::parse(part: json_encode(
                [
                    'resources' => [
                        'users' => [
                            [
                                'name' => 'name',
                                'type' => 'person.name',
                            ],
                            [
                                'name' => 'email',
                                'type' => 'person.email',
                            ],
                            [
                                'name' => 'password',
                                'type' => 'string.password',
                            ],
                            [
                                'name' => 'avatar',
                                'type' => 'gravatar.url',
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                            [
                                'name' => 'updated_at',
                                'type' => 'date.recent',
                            ],
                        ],
                        'products' => [
                            [
                                'name' => 'title',
                                'type' => 'text.title',
                            ],
                            [
                                'name' => 'description',
                                'type' => 'text.realText',
                            ],
                            [
                                'name' => 'price',
                                'type' => 'number.randomFloat',
                                'args' => [2, 0, 1000],
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                        ],
                        'orders' => [
                            [
                                'name' => 'total',
                                'type' => 'number.randomFloat',
                                'args' => [2, 0, 1000],
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                        ],
                    ],
                    'relations' => [
                        [
                            'destination' => 'users',
                            'source' => 'products',
                        ],
                        [
                            'destination' => 'users',
                            'source' => 'orders',
                        ],
                        [
                            'destination' => 'products',
                            'source' => 'orders',
                        ],
                    ],
                ]
            ), role: Role::MODEL),

            //third example about a project named "Social Media", description "A simple social media project"
            Content::parse(part: 'Generate resource for an app named "Social Media", little bit description about the app is "A simple social media project".'),
            Content::parse(part: json_encode(
                [
                    'resources' => [
                        'users' => [
                            [
                                'name' => 'name',
                                'type' => 'person.name',
                            ],
                            [
                                'name' => 'email',
                                'type' => 'person.email',
                            ],
                            [
                                'name' => 'password',
                                'type' => 'string.password',
                            ],
                            [
                                'name' => 'avatar',
                                'type' => 'gravatar.url',
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                            [
                                'name' => 'updated_at',
                                'type' => 'date.recent',
                            ],
                        ],
                        'posts' => [
                            [
                                'name' => 'content',
                                'type' => 'text.realText',
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                        ],
                        'comments' => [
                            [
                                'name' => 'content',
                                'type' => 'text.realText',
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                        ],
                    ],
                    'relations' => [
                        [
                            'destination' => 'users',
                            'source' => 'posts',
                        ],
                        [
                            'destination' => 'users',
                            'source' => 'comments',
                        ],
                        [
                            'destination' => 'posts',
                            'source' => 'comments',
                        ],
                    ],
                ]
            ), role: Role::MODEL),

            //fourth example about a project named "Task Manager", description "A simple task manager project"
            Content::parse(part: 'Generate resource for an app named "Task Manager", little bit description about the app is "A simple task manager project".'),
            Content::parse(part: json_encode(
                [
                    'resources' => [
                        'users' => [
                            [
                                'name' => 'name',
                                'type' => 'person.name',
                            ],
                            [
                                'name' => 'email',
                                'type' => 'person.email',
                            ],
                            [
                                'name' => 'password',
                                'type' => 'string.password',
                            ],
                            [
                                'name' => 'avatar',
                                'type' => 'gravatar.url',
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                            [
                                'name' => 'updated_at',
                                'type' => 'date.recent',
                            ],
                        ],
                        'tasks' => [
                            [
                                'name' => 'title',
                                'type' => 'text.title',
                            ],
                            [
                                'name' => 'description',
                                'type' => 'text.realText',
                            ],
                            [
                                'name' => 'status',
                                'type' => 'boolean.boolean',
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                        ],
                        'comments' => [
                            [
                                'name' => 'content',
                                'type' => 'text.realText',
                            ],
                            [
                                'name' => 'created_at',
                                'type' => 'date.recent',
                            ],
                        ],
                    ],
                    'relations' => [
                        [
                            'destination' => 'users',
                            'source' => 'tasks',
                        ],
                        [
                            'destination' => 'users',
                            'source' => 'comments',
                        ],
                        [
                            'destination' => 'tasks',
                            'source' => 'comments',
                        ],
                    ],
                ]
            ), role: Role::MODEL),
        ];
    }
}
