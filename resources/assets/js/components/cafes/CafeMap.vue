<style lang="scss">
	@import '~@/abstracts/_variables.scss';
	div#cafe-map{
		width: 100%;
		height: 600px;
	}
	div#content{
		font-family: $font-family-sans-serif;
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
					return JSON.parse(localStorage.getItem('thisLocation')).latitude;
				}
			},
			'longitude': {
				type: Number,
				default: function() {
					return JSON.parse(localStorage.getItem('thisLocation')).longitude;
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
				currentInfoWindow: {}
			}
		},
		computed: {
			cafe() {
				return this.$store.getters.getCafe;
			},
			cafes() {
				return this.$store.getters.getCafes;
			},
			location() {
				return this.$store.getters.getCurrentLocation;
			}
		},
		watch: {
			cafes() {
				this.clearMarkers();
				this.buildMarkers();
			},
			cafe() {
				this.clearMarkers();
				this.buildMarkers();
			}
		},
		mounted() {
			let latitude = (this.location.latitude)? this.location.latitude : this.latitude;
			let longitude = (this.location.longitude)? this.location.longitude : this.longitude;
			this.map = new google.maps.Map(document.getElementById('cafe-map'), {
		        center: {lat: parseFloat(latitude), lng: parseFloat(longitude)},
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
				if (this.$route.fullPath == '/vue/cafes') {
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
				} else {
					this.markers = [];
					this.infoWindows = [];
					var marker = new google.maps.Marker({
							position: {
								lat: parseFloat(this.cafe.latitude),
								lng: parseFloat(this.cafe.longitude)
							},
							map: this.map,
							title: this.cafe.name,
							animation: google.maps.Animation.DROP
						});
					var contentString = '<div id="content">'+
				      '<div id="siteNotice">'+
				      '</div>'+
				      '<h1 id="firstHeading" class="firstHeading">'+this.cafe.name+'</h1>'+
				      '<div id="bodyContent">'+
				      '<p><b>'+this.cafe.name+'</b>' + this.cafe.address+
				      '</div>'+
				      '</div>';
				    var infoWindow = new google.maps.InfoWindow({
				     		content: contentString
				     		}
				     	);
				    this.infoWindows.push(infoWindow);
					this.markers.push(marker);
					this.openInfo(this.markers[0], this.infoWindows[0]);
				}
			},
			clearMarkers() {
				for (var i = 0; i< this.markers.length; i++) {
					this.markers[i].setMap(null);
				}
			},
			openInfo(marker, infoWindow){
			    marker.addListener('click', function() {
			    	if (this.currentInfoWindow != null) {
			    		this.currentInfoWindow.close();
			    	}
			    	infoWindow.open(this.map, marker);
			    	this.currentInfoWindow = {};
			    	this.currentInfoWindow = infoWindow;
			    });
			}
		}
	}
</script>