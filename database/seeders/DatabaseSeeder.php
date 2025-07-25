<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Seed test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Testing!23'
        ]);

        User::factory()->create([
            'name' => 'Another User',
            'email' => 'another@example.com',
            'password' => 'Testing!23'
        ]);

        // Seed books
        // $this->call(BookSeeder::class);

        // Seed perusals
        $this->call(PerusalSeeder::class);
    }
}
