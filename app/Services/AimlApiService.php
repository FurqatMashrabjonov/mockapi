<?php

namespace App\Services;

use Gemini\Data\Content;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class AimlApiService
{
    /**
     * @throws ConnectionException
     */
    public function generate(?string $projectName, ?string $projectDescription, array $resources): object
    {
        $endpoint = 'https://api.aimlapi.com/chat/completions';
        $token = 'afebb4dcdd98497a9d457f0bd9b903ff';
        $data = [
            'model' => 'gpt-3.5-turbo',
            'messages' => $this->getChatHistory(),
            'max_tokens' => 512,
            'stream' => false,
        ];

        $resourcesString = '';

        foreach ($resources as $resource) {
            $resourcesString .= $resource['name'] ?? ', ';
        }

        $prompt = 'generate resource for an app named "'.$projectName.'",
         here are my resources that i already have '.$resourcesString.' dont repeat resources,
         resources fields should be unique and min 3 fields for each resource, feel free to add more fields if you want,
         little bit description about the app is "'.$projectDescription.'".
         the max number of resources is '.config('resources.max_resources', 5).', be careful about cycling resources relationship. ';

        $data['messages'][] = [
            'role' => 'user',
            'content' => $prompt,
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token,
            'Content-Type' => 'application/json',
        ])->post($endpoint, $data);

        //        return $response['choices'][0]['message']['content'];
        return $response->object();
    }

    public function getChatHistory(): array
    {
        return [
            [
                'role' => 'user',
                'content' => 'Generate all answers as a JSON object',
            ],
            [
                'role' => 'model',
                'content' => 'Ok',
            ],
            [
                'role' => 'user',
                'content' => 'available fields',
            ],
            [
                'role' => 'model',
                'content' => json_encode(FakeFiller::availableFields()),
            ],
            [
                'role' => 'user',
                'content' => 'Generate resource for an app named "Blog Post", little bit description about the app is "A simple blog post app".',
            ],
            [
                'role' => 'model',
                'content' => json_encode(
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
                ),
            ],
            [
                'role' => 'user',
                'content' => 'Generate resource for an app named "E-commerce", little bit description about the app is "A simple e-commerce project".',
            ],
            [
                'role' => 'model',
                'content' => json_encode(
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
                ),
            ],
            [
                'role' => 'user',
                'content' => 'Generate resource for an app named "Social Media", little bit description about the app is "A simple social media project".',
            ],
            [
                'role' => 'model',
                'content' => json_encode(
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
                ),
            ],
            [
                'role' => 'user',
                'content' => 'Generate resource for an app named "Task Manager", little bit description about the app is "A simple task manager project".',
            ],
            [
                'role' => 'model',
                'content' => json_encode(
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
                ),
            ],
        ];
    }
}
