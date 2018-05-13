/*
|-------------------------------------------------------------------------------
| VUEX modules/cafes.js
|-------------------------------------------------------------------------------
| The Vuex data store for the cafes
*/

import CafeAPI from '../api/cafe.js';

export const cafes = {
	state: {
		cafes: [],
		cafesLoadStatus: 0,

		cafe: {},
		cafeLoadStatus: 0,
		cafeAddStatus: 0,
		cafeUpdatedStatus: 0,
		currentLocation: {}
	},
	actions: {
		loadCafes( { commit } ){
			commit( 'setCafesLoadStatus', 1 );

      		CafeAPI.getCafes()
	        .then( function( response ){
	          commit( 'setCafes', response.data );
	          commit( 'setCafesLoadStatus', 2 );
	        })
	        .catch( function(){
	          commit( 'setCafes', [] );
	          commit( 'setCafesLoadStatus', 3 );
	        });
        },
        async loadCafe( { commit }, data ){
        	commit( 'setCafeLoadStatus', 1 );

	    await CafeAPI.getCafe( data.id )
	        .then( function( response ){
	          commit( 'setCafe', response.data );
	          commit( 'setCafeLoadStatus', 2 );
	        })
	        .catch( function(){
	          commit( 'setCafe', {} );
	          commit( 'setCafeLoadStatus', 3 );
	        });
        },
        addCafe( {commit, state, dispatch}, data){
        	commit ('setCafeAddedStatus', 1);
        	CafeAPI.postAddNewCafe(data.name, data.address, data.city, data.zip)
        		.then (function (response) {
        			commit('setCafeAddedStatus', 2);
        			dispatch('loadCafes');
        		})
        		.catch(function () {
        			commit('setCafeAddedStatus', 3);
        		});
        },
        updateCafe({commit, state, dispatch}, data) {
        	commit ('setCafeUpdatedStatus', 1);
        	CafeAPI.updateCafe(data.id, data.name, data.address, data.city, data.zip)
        		.then(function (response) {
        			commit('setCafeUpdatedStatus', 2);
        			dispatch('loadCafes');
        		})
        		.catch(function () {
        			commit('setCafeUpdatedStatus', 3);
        		});
        },
        loadCurrentLocation({commit}) {
        	CafeAPI.getLocation()
        		.then(function (response) {
        			commit('setCurrentLocation', response.data);
        			localStorage.setItem('thisLocation', JSON.stringify(response.data));
        		})
        		.catch(function() {
        			commit('setCurrentLocation', {});
        		});
        }
    },
    mutations: {
	    setCafesLoadStatus( state, status ){
	    	state.cafesLoadStatus = status;
	    },

	    setCafes( state, cafes ){
	    	state.cafes = cafes;
	    },

	    setCafeLoadStatus( state, status ){
	    	state.cafeLoadStatus = status;
	    },

	    setCafe( state, cafe ){
	    	state.cafe = cafe;
	    },
	    setCafeAddedStatus(state, status) {
	    	state.cafeAddStatus = status;
	    },
	    setCafeUpdatedStatus (state, status) {
	    	state.cafeUpdatedStatus = status;
	    },
	    setCurrentLocation(state, location) {
	    	state.currentLocation = location;
	    }
	},
	getters: {
		getCafesLoadStatus( state ){
	      return state.cafesLoadStatus;
	    },

	    getCafes( state ){
	      return state.cafes;
	    },

	    getCafeLoadStatus( state ){
	      return state.cafeLoadStatus;
	    },

	    getCafe( state ){
	      return state.cafe;
	    },
	    getCafeAddStatus(state){
	    	return state.cafeAddStatus;
	    },
	    getCafeUpdatedStatus(state) {
	    	return state.cafeUpdatedStatus;
	    },
	    getCurrentLocation(state) {
	    	return state.currentLocation;
	    }
	}
}