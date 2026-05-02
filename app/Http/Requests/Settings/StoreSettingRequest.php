<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class StoreSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:100',
            'tagline'     => 'nullable|string|max:255',
            'address'     => 'nullable|string|max:500',
            'phone'       => 'nullable|string|max:20',
            'email'       => 'nullable|email|max:100',
            'tax_percent' => 'required|numeric|min:0|max:100',
            'logo'        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1024',
            'remove_logo' => 'nullable|boolean',
            'show_logo'   => 'nullable|boolean',
        ];
    }
}
