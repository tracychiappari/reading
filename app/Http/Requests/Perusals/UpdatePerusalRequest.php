<?php

namespace App\Http\Requests\Perusals;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePerusalRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['required','string','max:255'],
            'started_at' => ['date'],
            'finished_at' => ['date']
        ];
    }
}
