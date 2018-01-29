<template>
 <div v-if="user != null" class="wrap">
     <h2>Здравствуйте {{user.Firstname}} {{ user.Lastname}}!</h2>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {mapActions} from "vuex"
export default {
  name: 'Im',
  //user,
  data () {
    return {
     
    }
  },
  methods:{
      ...mapActions(["getMyData"]),
  },
  computed:{
      ...mapGetters({
        user: "getUser"
      })
      
  },
  created: function(){
      this.$store.dispatch("getMyData");
  }
}
</script>

<style scoped>

</style>
