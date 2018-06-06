<style lang="css">
</style>

<template>
    <div>
        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
        </div>
        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <form>
              <legend>Edit Cafe Shop</legend>
            
              <div class="form-group">
                <label for="cafe-name">Name</label>
                <input type="text" class="form-control" id="cafe-name"  v-model="name" >
                <span class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}</span>
              </div>

              <div class="form-group">
                <label for="cafe-address">Address</label>
                <input type="text" class="form-control" id="cafe-address"  v-model="address" >
                <span class="validation" v-show="!validations.address.is_valid">{{ validations.address.text }}</span>
              </div>

              <div class="form-group">
                <label for="cafe-city">City</label>
                <input type="text" class="form-control" id="cafe-city"  v-model="city">
                <span class="validation" v-show="!validations.city.is_valid">{{ validations.city.text }}</span>
              </div>

              <div class="form-group">
                <label for="cafe-zip">Zip</label>
                <input type="text" class="form-control" id="cafe-zip" v-model="zip" >
                <span class="validation" v-show="!validations.zip.is_valid">{{ validations.zip.text }}</span>
              </div>
                
              <button type="submit" class="btn btn-primary" v-on:click="submit()">Submit</button>
            </form>
        
        </div>
        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
        </div>
    </div>
        
</template>

<script>
export default {
    async created() {
        await this.$store.dispatch('loadCafe', this.$route.params);
        this.id = this.getCafe.id;
        this.name = this.getCafe.name;
        this.address = this.getCafe.address;
        this.city = this.getCafe.city;
        this.zip = this.getCafe.zip;
    },

    data() {
        return {
            id: '',
            name: '',
            address: '',
            city: '',
            zip: '',
            validations : {
                name: {
                is_valid: true,
                text: '',
                },
                address: {
                is_valid: true,
                text: '',
                },
                city: {
                is_valid: true,
                text: '',
                },
                zip: {
                is_valid: true,
                text: '',
                }
            }
        }
    },
    computed: {
        getCafe() {
            return this.$store.getters.getCafe;
        }
    },
    methods: {
        validateCafe(){
            let validNewCafeForm = true;
            //validate name
            if (this.name.trim() == '') {
                validNewCafeForm = false;
                this.validations.name.is_valid = false;
                this.validations.name.text = 'Please enter a name for the new cafe!';
            }
            else {
                this.validations.name.is_valid = true;
                this.validations.name.text = '';
            }
            //validate address
            if (this.address.trim() == '') {
                validNewCafeForm = false;
                this.validations.address.is_valid = false;
                this.validations.address.text = 'Please enter an address for the new cafe!';
            }
            else {
                this.validations.address.is_valid = true;
                this.validations.address.text = '';
            }
            //validate city
            if (this.city.trim() == '') {
                validNewCafeForm = false;
                this.validations.city.is_valid = false;
                this.validations.city.text = 'Please enter a city for the new cafe!';
            }
            else {
                this.validations.city.is_valid = true;
                this.validations.city.text = '';
            }
            //validate zip
            if (this.zip.trim() == '') {
                validNewCafeForm = false;
                this.validations.zip.is_valid = false;
                this.validations.zip.text = 'Please enter a zip for the new cafe!';
            }
            else {
                this.validations.zip.is_valid = true;
                this.validations.zip.text = '';
            }
            return validNewCafeForm;
        },
        submit() {
            if (this.validateCafe()) {
                this.$store.dispatch('updateCafe', {
                    id: this.id,
                    name: this.name,
                    address: this.address,
                    city: this.city,
                    zip: this.zip,
                });
                this.$router.push({name: 'home'});
            }
        }
    }
}
</script>
