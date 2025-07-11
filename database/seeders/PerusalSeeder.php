<?php

namespace Database\Seeders;

use App\Models\Perusal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PerusalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Perusal::factory()->count(2)->create();
    }
}
