<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'password' => ['required', 'confirmed', 'string', 'min:8', 'max:255'],
            'email' => ['required', 'max:255', 'unique:users'],

        ];
    }
}
