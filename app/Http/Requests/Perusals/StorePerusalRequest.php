<?php

namespace App\Http\Requests\Perusals;

use Illuminate\Foundation\Http\FormRequest;

class StorePerusalRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'book_id' => ['required','integer'],
            'status' => ['required','string','max:255'],
            'started_at' => ['date'],
            'finished_at' => ['date']
        ];
    }
}
