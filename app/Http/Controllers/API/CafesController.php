<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCafeRequest;
use App\Models\Cafe;
use App\Utilities\GoogleMaps;

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

    public function postNewCafe(StoreCafeRequest $request)
    {
        $cafe = new Cafe();

        $cafe->name    = $request->name;
        $cafe->address = $request->address;
        $cafe->city    = $request->city;
        $cafe->zip     = $request->zip;

        $coordinates     = GoogleMaps::geocodeAddress($request->address, $request->city, $request->zip);
        $cafe->latitude  = $coordinates['lat'];
        $cafe->longitude = $coordinates['lng'];

        $cafe->save();

        return response()->json($cafe, 201);
    }
}
