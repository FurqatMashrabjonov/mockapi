<?php

namespace App\Services;

use Bluemmb\Faker\PicsumPhotosProvider;
use Faker\Factory;
use Ottaviano\Faker\Gravatar;

class FakeFiller
{
    /*
     * $fields are array that consists of key value array
     * $fields contains ['field name' => 'field type']
     */
    public static function fill(array $fields, int $count = 100, int $idStartsFrom = 1, array $static_fields = []): array
    {
        $faker = Factory::create();
        $faker->addProvider(new PicsumPhotosProvider($faker));
        $faker->addProvider(new Gravatar($faker));
        $availableFields = self::availableFields();
        $data = [];

        for ($i = 0; $i < $count; $i++) {
            $tmp = [];
            array_map(function ($field) use ($faker, $availableFields, &$tmp, $idStartsFrom) {
                $fieldParts = explode('.', $field['type']);
                $fieldType = $fieldParts[0];
                $fieldMethod = $fieldParts[1];
                if (array_key_exists($fieldType, $availableFields)) {
                    if (array_key_exists($fieldMethod, $availableFields[$fieldType])) {
                        $method = $availableFields[$fieldType][$fieldMethod][0];
                        $args = $availableFields[$fieldType][$fieldMethod][1];
                        $tmp['id'] = $idStartsFrom;
                        $tmp[$field['name']] = $faker->$method(...$args);
                    }
                }
            }, $fields);
            $tmp = array_merge($static_fields, $tmp);
            $data[] = $tmp;
            $idStartsFrom++;
        }

        return $data;
    }

    public static function availableFields(): array
    {
        //key is the field name and value is the method name of the faker and third parameter is the arguments

        return [
            /*
             * Standard faker fields
             */
            'number' => [],
            'string' => [],
            'date' => [],
            'boolean' => [],
            'object' => [],
            'array' => [],

            /*
             * available in https://fakerphp.github.io/formatters/
             */
            'address' => [
                'city' => ['city', []],
                'state' => ['state', []],
                'country' => ['country', []],
                'postcode' => ['postcode', []],
                'streetAddress' => ['streetAddress', []],
                'latitude' => ['latitude', []],
                'longitude' => ['longitude', []],
                'secondaryAddress' => ['secondaryAddress', []],
                'stateAbbr' => ['stateAbbr', []],
                'citySuffix' => ['citySuffix', []],
                'streetSuffix' => ['streetSuffix', []],
                'buildingNumber' => ['buildingNumber', []],
                'streetName' => ['streetName', []],
                'address' => ['address', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
             */
            'person' => [
                'title' => ['title', []],
                'titleMale' => ['titleMale', []],
                'titleFemale' => ['titleFemale', []],
                'suffix' => ['suffix', []],
                'name' => ['name', []],
                'firstName' => ['firstName', []],
                'firstNameMale' => ['firstNameMale', []],
                'firstNameFemale' => ['firstNameFemale', []],
                'lastName' => ['lastName', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
             */
            'phoneNumber' => [
                'phoneNumber' => ['phoneNumber', []],
                'phoneNumberWithExtension' => ['phoneNumberWithExtension', []],
                'tollFreePhoneNumber' => ['tollFreePhoneNumber', []],
                'e164PhoneNumber' => ['e164PhoneNumber', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
             */

            'company' => [
                'catchPhrase' => ['catchPhrase', []],
                'bs' => ['bs', []],
                'company' => ['company', []],
                'companySuffix' => ['companySuffix', []],
                'jobTitle' => ['jobTitle', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */

            'text' => [
                'title' => ['text', []],
                'realText' => ['realText', [200, 2]],
                'realTextBetween' => ['realTextBetween', [160, 200, 2]],
            ],
        ];
    }

    public static function getAvailableFieldsAs1DArray(): array
    {
        $availableFields = [];
        foreach (self::availableFields() as $fieldType => $fields) {
            if (count($fields) == 0) {
                $availableFields[] = $fieldType;
                continue;
            }
            foreach ($fields as $fieldName => $field) {
                $availableFields[] = $fieldType . '.' . $fieldName;
            }
        }

        return $availableFields;
    }

    public static function getFieldsToFrontend(): array
    {
        $fields = [];
        foreach (self::availableFields() as $key => $availableField) {
            if (count($availableField) > 0){
                foreach ($availableField as $field => $value){
                    $fields['fakerPHP'][] = $key . '.' . $field;
                }
            }else{
                $fields[$key] = [];
            }
        }
        return $fields;
    }
}
