<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class AppearanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'primary_color' => 'required|string|size:7',
            'accent_color'  => 'required|string|size:7',
            'font_family'   => 'required|string|max:50',
        ];
    }
}
