<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    /** @use HasFactory<\Database\Factories\BookFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'author',
        'cover'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function perusals(): HasMany
    {
        return $this->hasMany(Perusal::class);
    }
}
