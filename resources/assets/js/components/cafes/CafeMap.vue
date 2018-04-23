<style lang="scss">
	div#cafe-map{
		width: 100%;
		height: 600px;
	}
</style>

<template>
	<div id="cafe-map">

	</div>
</template>

<script>
	export default {
		props: {
			'latitude': {
				type: Number,
				default: function() {
					return 10.769477;
				}
			},
			'longitude': {
				type: Number,
				default: function() {
					return 106.697647;
				}
			},
			'zoom': {
				type: Number,
				default: function() {
					return 10;
				}
			}
		},
		data() {
			return {
				markers: [],
				infoWindows: [],
				currentLocation: this.$store.getters.getCurrentLocation
			}
		},
		computed: {
			cafes() {
				return this.$store.getters.getCafes;
			}
		},
		watch: {
			cafes() {
				this.clearMarkers();
				this.buildMarkers();
			}
		},
		mounted() {
			this.map = new google.maps.Map(document.getElementById('cafe-map'), {
		        center: {lat: parseFloat(this.currentLocation.latitude), lng: parseFloat(this.currentLocation.longitude)},
		        zoom: this.zoom
		      });
			/**
			 * Clear and re-build the markers
			 */
			this.clearMarkers();
			this.buildMarkers();
		},
		methods: {
			buildMarkers() {
				this.markers = [];
				this.infoWindows = [];
				for (var i = 0; i < this.cafes.length; i++) {
					var marker = new google.maps.Marker({
						position: {
							lat: parseFloat(this.cafes[i].latitude),
							lng: parseFloat(this.cafes[i].longitude)
						},
						map: this.map,
						title: this.cafes[i].name,
						animation: google.maps.Animation.DROP
					});
					var contentString = '<div id="content">'+
				      '<div id="siteNotice">'+
				      '</div>'+
				      '<h1 id="firstHeading" class="firstHeading">'+this.cafes[i].name+'</h1>'+
				      '<div id="bodyContent">'+
				      '<p><b>'+this.cafes[i].name+'</b>' + this.cafes[i].address+
				      '</div>'+
				      '</div>';
				    var infoWindow = new google.maps.InfoWindow({
				     		content: contentString
				     		}
				     	);
				    this.infoWindows.push(infoWindow);
					this.markers.push(marker);
					this.openInfo(this.markers[i], this.infoWindows[i]);
				}
			},
			clearMarkers() {
				for (var i = 0; i< this.markers.length; i++) {
					this.markers[i].setMap(null);
				}
			},
			openInfo(marker, infoWindow){
			    google.maps.event.addListener(marker, 'click', function() {
			    	infoWindow.open(this.map, marker);
			    });
			}
		}
	}
</script>