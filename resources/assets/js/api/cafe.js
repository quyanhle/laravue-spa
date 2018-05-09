/*
    Imports the Roast API URL from the config.
*/
import { LARAVUE_CONFIG } from '../config.js';

export default {
	/*
        GET     /api/v1/cafes
    */
    getCafes: function(){
        return axios.get( LARAVUE_CONFIG.API_URL + '/cafes' );
    },
    /*
	  GET   /api/v1/cafes/{cafeID}
	*/
	getCafe: function( cafeID ){
	  return axios.get( LARAVUE_CONFIG.API_URL + '/cafes/' + cafeID );
	},
	/*
	  POST  /api/v1/cafes
	*/
	postAddNewCafe: function( name, address, city, zip ){
	  	return axios.post( LARAVUE_CONFIG.API_URL + '/cafes',
		    {
		      name: name,
		      address: address,
		      city: city,
		      zip: zip
		    }
		)
	},

	updateCafe: function (id, name, address, city, zip) {
		return axios.post( LARAVUE_CONFIG.API_URL + '/cafes/' + id + '/update', 
			{
				id: id,
				name: name,
				address: address,
				city: city,
				zip: zip
			}
		)
	},
	/**
	 * GET /api/v1/location
	 */
	getLocation: function(){
		return axios.get(LARAVUE_CONFIG.API_URL + '/location');
	}
}