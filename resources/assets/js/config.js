/*
    Defines the API route we are using.
*/
var api_url = '';
var google_maps_js_api = 'AIzaSyC5Okcb4cpJv9pyJkQsuWRMCMKd2EbONUo';

switch( process.env.NODE_ENV ){
  case 'development':
    api_url = 'https://laravue.alex.vm/api/v1';
  break;
  case 'production':
    api_url = 'https://laravue.alex.vm/api/v1';
  break;
}

export const LARAVUE_CONFIG = {
  API_URL: api_url,
  GOOGLE_MAPS_JS_API: google_maps_js_api
}