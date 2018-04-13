<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cafe;
use Illuminate\Http\Request;

class CafesController extends Controller
{
    public function getCafes()
    {
        $cafes = Cafe::all();
        return response()->json($cafes);
    }

    public function getCafe($id)
    {
        $cafe = Cafe::findOrFail($id);
        return response()->json($cafe);
    }

    public function postNewCafe(Request $request)
    {
        $cafe = new Cafe();

        $cafe->name    = $request->name;
        $cafe->address = $request->address;
        $cafe->city    = $request->city;
        $cafe->state   = $request->state;
        $cafe->zip     = $request->zip;

        $cafe->save();

        return response()->json($cafe, 201);
    }
}
