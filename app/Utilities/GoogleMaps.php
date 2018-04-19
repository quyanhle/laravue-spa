<?php

namespace App\Utilities;

use GuzzleHttp\Client;

class GoogleMaps
{

    /*
    Geocodes an addres so we can get the latitude and longitude
     */
    public static function geocodeAddress($address, $city, $zip)
    {
        /**
         * Builds the URL and request to the Google Maps API
         */
        $url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($address . ' ' . $city . ', ' . $zip) . '&key=' . env('GOOGLE_MAPS_KEY');

        /**
         * Creates a Guzzle client to make the Google Maps request.
         */
        $client = new Client();

        /**
         * Send a Get request to the Google Maps API and get the body of the response.
         */
        $geocodeResponse = $client->get($url)->getBody();

        /**
         * JSON decode the response
         */
        $geocodeData = json_decode($geocodeResponse);

        /**
         * Initialize the response for the GeoCode Location
         */

        $coordinates['lat'] = null;
        $coordinates['lng'] = null;

        if (!empty($geocodeData) && $geocodeData->status != 'ZERO_RESULTS' && isset($geocodeData->results) && isset($geocodeData->results[0])) {
            $coordinates['lat'] = $geocodeData->results[0]->geometry->location->lat;
            $coordinates['lng'] = $geocodeData->results[0]->geometry->location->lng;
        }

        return $coordinates;
    }
}
