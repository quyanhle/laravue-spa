/*
|-------------------------------------------------------------------------------
| VUEX modules/cafes.js
|-------------------------------------------------------------------------------
| The Vuex data store for the cafes
*/

import UserAPI from '../api/user.js';

export const users = {
	state: {
		users: [],
		usersLoadStatus: 0,

		user: {},
		userLoadStatus: 0
	},
	actions: {
		loadUsers( { commit } ){
			commit( 'setUsersLoadStatus', 1 );

      		UserAPI.getUsers()
	        .then( function( response ){
	          commit( 'setUsers', response.data );
	          commit( 'setUsersLoadStatus', 2 );
	        })
	        .catch( function(){
	          commit( 'setUsers', [] );
	          commit( 'setUsersLoadStatus', 3 );
	        });
        },
        loadUser( { commit }, data ){
        	commit( 'setUserLoadStatus', 1 );

	      UserAPI.getUser( data.id )
	        .then( function( response ){
	          commit( 'setUser', response.data );
	          commit( 'setUserLoadStatus', 2 );
	        })
	        .catch( function(){
	          commit( 'setUser', {} );
	          commit( 'setUserLoadStatus', 3 );
	        });
        }
    },
    mutations: {
	    setUsersLoadStatus( state, status ){
	    	state.userLoadStatus = status;
	    },

	    setUsers( state, users ){
	    	state.users = users;
	    },

	    setUserLoadStatus( state, status ){
	    	state.userLoadStatus = status;
	    },

	    setUser( state, user ){
	    	state.user = user;
	    }
	},
	getters: {
		getUsersLoadStatus( state ){
	      return state.usersLoadStatus;
	    },

	    getUsers( state ){
	      return state.users;
	    },

	    getUserLoadStatus( state ){
	      return state.userLoadStatus;
	    },

	    getUser( state ){
	      return state.user;
	    }
	}
}