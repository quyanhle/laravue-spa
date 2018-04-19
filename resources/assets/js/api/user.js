/*
    Imports the Roast API URL from the config.
*/
import { LARAVUE_CONFIG } from '../config.js';

export default {
	/*
        GET     /api/v1/cafes
    */
    getUsers: function(){
        return axios.get( LARAVUE_CONFIG.API_URL + '/users' );
    },
    /*
	  GET   /api/v1/cafes/{cafeID}
	*/
	getUser: function( userID ){
	  return axios.get( LARAVUE_CONFIG.API_URL + '/users/' + userID );
	},
}