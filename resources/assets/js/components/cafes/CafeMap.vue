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
					return 10.790413;
				}
			},
			'longitude': {
				type: Number,
				default: function() {
					return 106.690914;
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
				markers: []
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
		        center: {lat: this.latitude, lng: this.longitude},
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
					this.markers.push(marker);
				}
			},
			clearMarkers() {
				for (var i = 0; i< this.markers.length; i++) {
					this.markers[i].setMap(null);
				}
			}
		}
	}
</script>