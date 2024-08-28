<?php

namespace App\Http\Requests;

use App\Services\FakeFiller;
use Illuminate\Foundation\Http\FormRequest;

class ResourceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'regex:/^[a-zA-Z0-9_]+$/'],
            'fields' => ['required', 'array'],
            'fields.*.name' => ['required', 'regex:/^[a-zA-Z0-9_]+$/'],
            'fields.*.category' => ['required', 'in:'.implode(',', FakeFiller::getAvailableFieldsCategories())],
            'fields.*.type' => ['required', 'in:'.implode(',', FakeFiller::getAvailableFieldsTypes())],
        ];
    }
}
