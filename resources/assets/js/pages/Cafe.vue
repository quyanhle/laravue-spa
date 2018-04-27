<style lang="scss">

</style>

<template>
  <div id="cafe">
  		<div id="cafe-info">
            <h3>Cafe Shop</h3>
            <ul>
                <li>{{cafe.name}}</li>
                <li>{{cafe.address}}</li>
            </ul>
  		</div>
  		<div id="map">
            <CafeMap></CafeMap>
  		</div>

  </div>
</template>

<script>
	import CafeMap from '../components/cafes/CafeMap';
  export default {
        created() {
            this.$store.dispatch('loadCafe', this.$route.params);
        },
  		components: {
  			CafeMap
  		},
        computed: {
            cafe() {
                return this.$store.getters.getCafe;
            }
        }
  }
</script>