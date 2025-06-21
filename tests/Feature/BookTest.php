<?php

use App\Models\User;

test('authenticated users can visit the book list', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/books')->assertOk();
});
