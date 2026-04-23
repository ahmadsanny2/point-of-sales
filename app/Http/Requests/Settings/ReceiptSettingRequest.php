<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class ReceiptSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'receipt_header' => 'required|string|max:255',
            'receipt_footer' => 'required|string|max:500',
            'invoice_prefix' => 'required|string|max:10',
            'show_logo'      => 'required|boolean',
        ];
    }
}
