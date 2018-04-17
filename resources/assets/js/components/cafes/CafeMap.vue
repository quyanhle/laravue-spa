<style lang="scss">
	div#cafe-map{
		width: 100%;
		height: 400px;
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
					return 10.790413
				}
			},
			'longitude': {
				type: Number,
				default: function() {
					return 106.690914
				}
			},
			'zoom': {
				type: Number,
				default: function() {
					return 4
				}
			}
		},
		data() {
			return {

			}
		},
		mounted() {
			this.map = new google.maps.Map(document.getElementById('cafe-map'), {
		        center: {lat: this.latitude, lng: this.longitude},
		        zoom: this.zoom
		      });
		}
	}
</script>