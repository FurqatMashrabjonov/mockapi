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
                'text' => ['text', []],
                'title' => ['text', []],
                'realText' => ['realText', [200, 2]],
                'realTextBetween' => ['realTextBetween', [160, 200, 2]],
                'words' => ['word', []],
                'sentence' => ['sentence', []],
                'paragraph' => ['paragraph', []],
                'randomLetter' => ['randomLetter', []]
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'digit' => [
                'randomDigit' => ['randomDigit', []],
                'randomDigitNotNull' => ['randomDigitNotNull'],
                'randomNumber' => ['randomNumber', [2]],
                'randomFloat' => ['randomFloat', [2, 100]],
                'numberBetween' => ['numberBetween', [1, 100]],
                'numerify' => ['numerify', ['##-###']],
                'lexify' => ['lexify', ['??-??']],
                'bothify' => ['bothify', ['##-??']],
                'asciify' => ['asciify', ['user-****']],
                'regexify' => ['regexify', ['/[A-Z]{2}[0-9]{3}/']],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'dateAndTime' => [
                'unixTime' => ['unixTime', []],
                'dateTime' => ['dateTime', []],
                'dateTimeAD' => ['dateTimeAD', []],
                'iso8601' => ['iso8601', []],
                'date' => ['date', []],
                'time' => ['time', []],
                'dateTimeBetween' => ['dateTimeBetween', ['now', '+1 week']],
                'dateTimeInInterval' => ['dateTimeInInterval', ['+1 week', 'now']],
                'dateTimeThisCentury' => ['dateTimeThisCentury', []],
                'dateTimeThisDecade' => ['dateTimeThisDecade', []],
                'dateTimeThisYear' => ['dateTimeThisYear', []],
                'dateTimeThisMonth' => ['dateTimeThisMonth', []],
                'amPm' => ['amPm', []],
                'dayOfMonth' => ['dayOfMonth', []],
                'dayOfWeek' => ['dayOfWeek', []],
                'month' => ['month', []],
                'monthName' => ['monthName', []],
                'year' => ['year', []],
                'century' => ['century', []],
                'timezone' => ['timezone', []]
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'internet' => [
                'email' => ['email', []],
                'safeEmail' => ['safeEmail', []],
                'freeEmail' => ['freeEmail', []],
                'companyEmail' => ['companyEmail', []],
                'freeEmailDomain' => ['freeEmailDomain', []],
                'safeEmailDomain' => ['safeEmailDomain', []],
                'userName' => ['userName', []],
                'password' => ['password', []],
                'domainName' => ['domainName', []],
                'domainWord' => ['domainWord', []],
                'tld' => ['tld', []],
                'url' => ['url', []],
                'slug' => ['slug', []],
                'ipv4' => ['ipv4', []],
                'ipv6' => ['ipv6', []],
                'localIpv4' => ['localIpv4', []],
                'macAddress' => ['macAddress', []],
                'userAgent' => ['userAgent', []],
                'chrome' => ['chrome', []],
                'firefox' => ['firefox', []],
                'safari' => ['safari', []],
                'opera' => ['opera', []],
                'internetExplorer' => ['internetExplorer', []],
                'windowsPlatformToken' => ['windowsPlatformToken', []],
                'macPlatformToken' => ['macPlatformToken', []],
                'linuxPlatformToken' => ['linuxPlatformToken', []],
                'uuid' => ['uuid', []],
                'mimeType' => ['mimeType', []],
                'filePath' => ['filePath', []],
                'fileExtension' => ['fileExtension', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'userAgent' => [
                'userAgent' => ['userAgent', []],
                'chrome' => ['chrome', []],
                'firefox' => ['firefox', []],
                'safari' => ['safari', []],
                'opera' => ['opera', []],
                'internetExplorer' => ['internetExplorer', []],
                'msedge' => ['msedge', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'creditCard' => [
                'creditCardType' => ['creditCardType', []],
                'creditCardNumber' => ['creditCardNumber', []],
                'creditCardExpirationDate' => ['creditCardExpirationDate', []],
                'creditCardExpirationDateString' => ['creditCardExpirationDateString', []],
                'creditCardDetails' => ['creditCardDetails', []],
                'iban' => ['iban', []],
                'swiftBicNumber' => ['swiftBicNumber', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'color' => [
                'hexColor' => ['hexColor', []],
                'safeHexColor' => ['safeHexColor', []],
                'rgbColor' => ['rgbColor', []],
                'rgbCssColor' => ['rgbCssColor', []],
                'safeColorName' => ['safeColorName', []],
                'colorName' => ['colorName', []],
                'hlsColor' => ['hlsColor', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'file' => [
                'mimeType' => ['mimeTypes', []],
                'fileExtension' => ['fileExtension', []],
                'file' => ['file', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'uuid' => [
                'uuid' => ['uuid', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'barcode' => [
                'ean13' => ['ean13', []],
                'ean8' => ['ean8', []],
                'isbn13' => ['isbn13', []],
                'isbn10' => ['isbn10', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'miscellaneous' => [
                'boolean' => ['boolean', []],
                'md5' => ['md5', []],
                'sha1' => ['sha1', []],
                'sha256' => ['sha256', []],
                'locale' => ['locale', []],
                'countryISOAlpha3' => ['countryISOAlpha3', []],
                'languageCode' => ['languageCode', []],
                'currencyCode' => ['currencyCode', []],
                'emoji' => ['emoji', []],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'html' => [
                'randomHtml' => ['randomHtml', [2, 3]],
            ],

            /*
             * available in https://fakerphp.github.io/formatters/
            */
            'version' => [
                'semver' => ['semver', []],
            ]
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
            if (count($availableField) > 0) {
                foreach ($availableField as $field => $value) {
                    $fields['fakerPHP'][] = $key . '.' . $field;
                }
            } else {
                $fields[$key] = [];
            }
        }
        return $fields;
    }
}
