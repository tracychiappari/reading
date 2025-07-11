<?php

namespace App\Http\Controllers;

use App\Http\Requests\Perusals\StorePerusalRequest;
use App\Http\Requests\Perusals\UpdatePerusalRequest;
use App\Models\Perusal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PerusalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Auth::user()->cannot('viewAny', Perusal::class)) {
            abort(403);
        }

        if ($request->status == 'in_progress') {
            $perusals = Auth::user()->perusals()->with('book')->reading()->latest()->get();
        } else if ($request->status == 'not_started') {
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

        return Inertia::render('perusals/create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePerusalRequest $request)
    {
        //
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
