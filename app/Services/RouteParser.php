<?php

namespace App\Services;

use App\DataTypes\ResourceNode;
use Exception;

class RouteParser
{
    /**
     * @throws Exception
     */
    public static function parsePath(string $path): ResourceNode
    {
        $path = explode('/', $path);
        $root = new ResourceNode();
        $cur = &$root;
        while (count($path)) {
            $name = array_shift($path);
            $value = array_shift($path);
            $value = $value ?? 0;

            error_if(! preg_match('/^[a-zA-Z0-9]+$/', $name), 'Invalid path');
            error_if(! is_numeric($value), 'Invalid value');

            $cur->name = $name;
            $cur->id = $value;

            if (count($path) != 0) {
                $cur->children[] = new ResourceNode();
                $cur = &$cur->children[0];
            }
        }

        return $root;
    }

    public static function getActiveNode(ResourceNode $root): ResourceNode
    {
        if (! $root->hasChildren()) {
            return $root;
        }

        return self::getActiveNode($root->children[0]);
    }

    public static function getParentNode(ResourceNode $root): ?ResourceNode
    {
        $parent = null;
        $cur = $root;
        while ($cur->hasChildren()) {
            $parent = $cur;
            $cur = $cur->children[0];
        }

        return $parent;
    }
}
