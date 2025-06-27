<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Perusal>
 */
class PerusalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['not_started', 'in_progress', 'completed', 'abandoned']);
        $startedAt = $status !== 'not_started' ? $this->faker->dateTimeBetween('-1 year') : null;
        $finishedAt = in_array($status, ['completed', 'abandoned']) ? $this->faker->dateTimeBetween($startedAt) : null;

        return [
            'book_id' => Book::factory(),
            'started_at' => $startedAt,
            'finished_at' => $finishedAt,
            'status' => $status
        ];

    }
}
