/*
    Imports the Roast API URL from the config.
*/
import { LARAVUE_CONFIG } from '../config.js';

export default {
	/*
        GET     /api/v1/users
    */
    getUsers: function(){
        return axios.get( LARAVUE_CONFIG.API_URL + '/users' );
    },
    /*
	  GET   /api/v1/cafes/user
	*/
	getUser: function(){
	  return axios.get( LARAVUE_CONFIG.API_URL + '/user');
	},
}