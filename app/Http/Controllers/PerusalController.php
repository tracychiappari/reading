<?php

namespace App\Http\Controllers;

use App\Http\Requests\Perusals\StorePerusalRequest;
use App\Http\Requests\Perusals\UpdatePerusalRequest;
use App\Models\Book;
use App\Models\Perusal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PerusalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->cannot('viewAny', Perusal::class)) {
            abort(403);
        }

        if (request()->status == 'in_progress') {
            $perusals = Auth::user()->perusals()->with('book')->reading()->latest()->get();
        } else if (request()->status == 'not_started') {
            $perusals = Auth::user()->perusals()->with('book')->pending()->latest()->get();
        } else {
            $perusals = Auth::user()->perusals()->with('book')->latest()->get();
        }

        return Inertia::render('perusals/index', [
            'perusals' => $perusals
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (Auth::user()->cannot('create', Perusal::class)) {
            abort(403);
        }

        $book_id = request()->book_id;
        if (!$book_id) {
            abort(403); // TODO: Change HTTP code?
        }

        $book = Book::find($book_id);
        if (!$book) {
            abort(403); // TODO: Change HTTP code?
        }

        return Inertia::render('perusals/create', [
            'book' => $book
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePerusalRequest $request)
    {
        if (Auth::user()->cannot('create', Perusal::class)) {
            abort(403);
        }

        // Get the validated data from the request
        $validated = $request->validated();

        $perusal = new Perusal;
        $perusal->status = $validated['status'];
        $perusal->started_at = $validated['started_at'];
        $perusal->finished_at = $validated['finished_at'];

        $book = Book::find($validated['book_id']);
        if (!$book) {
            abort(403);
        }
        $book->perusals()->save($perusal);

        // Redirect to the books index page with a success message
        return to_route('perusals.index')
            ->with('message', 'Perusal created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Perusal $perusal)
    {
        if (Auth::user()->cannot('view', $perusal)) {
            abort(403);
        }

        return Inertia::render('perusals/show', [
            'perusal' => $perusal,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Perusal $perusal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePerusalRequest $request, Perusal $perusal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Perusal $perusal)
    {
        //
    }
}
