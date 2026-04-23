<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class LandingPageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'hero_title'    => 'required|string|max:255',
            'hero_subtitle' => 'required|string|max:255',
            'cta_text'      => 'required|string|max:50',
            'footer_text'   => 'required|string|max:255',
        ];
    }
}
