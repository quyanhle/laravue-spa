<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCafeRequest;
use App\Models\Cafe;
use App\Utilities\GoogleMaps;
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

    public function getCurrentLocation(Request $request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL            => 'http://api.ipstack.com/' . '14.161.22.110' . '?access_key=' . env('IP_GEO_KEY'),
            //use $request->ip() for client ip add
        ));
        $location = curl_exec($curl);
        curl_close($curl);
        echo $location;
    }
}
