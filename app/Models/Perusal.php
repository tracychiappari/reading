<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Perusal extends Model
{
    /** @use HasFactory<\Database\Factories\PerusalFactory> */
    use HasFactory;

    protected $fillable = [
        'book_id',
        'started_at',
        'finished_at',
        'status'
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, Book::class);
    }
}
