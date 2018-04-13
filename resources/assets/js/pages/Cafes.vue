<style>

</style>

<template>
  <div id="cafes">
  		<ul>
  			<li v-for="cafe in cafes">{{ cafe.name + ' ' +cafe.city}}</li>
  		</ul>
  </div>
</template>

<script>
  export default {
  	created() {
  		this.$store.dispatch('loadCafes');
  	},
  	computed: {
  		cafesLoadStatus(){
  			return this.$store.getters.getCafesLoadStatus;
  		},
  		cafes(){
  			return this.$store.getters.getCafes;
  		}
  	}
  }
</script>