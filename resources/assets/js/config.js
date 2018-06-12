/*
    Defines the API route we are using.
*/
var api_url = '';
var google_maps_js_api = 'AIzaSyChULvzGwFu_-g8cuyNtKegW6xsD0nJ_sc';

switch( process.env.NODE_ENV ){
  case 'development':
    api_url = 'https://laravue.vm/api/v1';
  break;
  case 'production':
    api_url = 'https://laravue.vm/api/v1';
  break;
}

export const LARAVUE_CONFIG = {
  API_URL: api_url,
  GOOGLE_MAPS_JS_API: google_maps_js_api
}