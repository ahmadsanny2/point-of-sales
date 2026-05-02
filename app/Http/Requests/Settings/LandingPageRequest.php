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
            'hero_badge'        => 'nullable|string|max:255',
            'hero_title'        => 'required|string|max:255',
            'hero_subtitle'     => 'required|string',
            'hero_cta_text'     => 'required|string|max:50',
            
            'features_title'    => 'required|string|max:255',
            'features_subtitle' => 'required|string|max:255',
            'features_description' => 'nullable|string',
            
            'stats_title'       => 'required|string|max:255',
            
            'how_it_works_title' => 'required|string|max:255',
            'how_it_works_subtitle' => 'required|string|max:255',
            
            'pricing_title'     => 'required|string|max:255',
            'pricing_subtitle'  => 'required|string|max:255',
            'pricing_description'=> 'nullable|string',
            
            'testimonials_title' => 'required|string|max:255',
            'testimonials_subtitle' => 'required|string|max:255',
            
            'cta_banner_title'  => 'required|string|max:255',
            'cta_banner_subtitle' => 'required|string',
            'cta_banner_primary_text' => 'required|string|max:255',
            'cta_banner_secondary_text' => 'required|string|max:255',
            
            'footer_description'=> 'nullable|string',
            'footer_text'       => 'required|string|max:255',
        ];
    }
}
