<style>

</style>

<template>
  <div id="cafes">
	<div class="row">
	  <div class="col-xs-12 col-md-12">
		<CafeMap></CafeMap>
	  </div>
	</div>
  </div>
</template>

<script>
	import CafeMap from '../components/cafes/CafeMap.vue';  
  export default {
	created() {
		this.$store.dispatch('loadCurrentLocation');
	},
	components: {
		CafeMap
	}
  }
</script>