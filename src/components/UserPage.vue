<template>
 <div v-if="user != null" class="wrap">
     <h2>Это страница пользователя {{user.Firstname}} {{ user.Lastname}}!</h2>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from "vuex"
export default {
  name: 'Im',
  data () {
    return {
     
    }
  },
  methods:{
      ...mapActions(["getUser"]),
  },
  computed:{
      ...mapGetters({
        user: "getCurrentPageUser"
      })
      
  },
  created: function(){
      
      this.$store.dispatch("getUser", this.$route.params["login"]);
  }
}
</script>

<style scoped>

</style>
