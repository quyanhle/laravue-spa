<style>

</style>

<template>
  <div class="container-fluid" id="app-layout">
     <div class="row">
           <Navigation></Navigation>
     </div>
     <div class="row">
	         <router-view></router-view>
     </div>
  </div>
</template>

<script>
	import Navigation from '../components/global/Navigation.vue';
  export default {
  	components: {
  		Navigation
  	},
  	created() {
      this.$store.dispatch('loadCurrentLocation');
      this.$store.dispatch('loadCafes');
      this.$store.dispatch('loadUser');
  	}

  }
</script>