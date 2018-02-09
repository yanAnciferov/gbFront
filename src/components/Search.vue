<template>
 <div class="wrap">
    <h2>Все пользователи сайта</h2>
     <div class="all-user-wrapper">
       <UserCard class="card" :user="item" v-for="(item,index) in listUsers" :key='index'/>
     </div>
 </div>
</template>


<script>

import { mapGetters } from 'vuex'
import { mapActions } from "vuex"
import UserCard from '@/components/UserCard'
export default {
  name: 'search',
  components: {
      UserCard
  },
  data () {
    return {
     
    }
  }, 
  methods:{
      ...mapActions(["search"])
  },
  created: function(){
      this.$store.dispatch("getAllUsers");
  },
  computed:{
      ...mapGetters({
        listUsers: "getAllUsersList"
      }),
     
      
  },
 
}
</script>

<style scoped>
  .card{
    margin-bottom: 1em;
  }

  .all-user-wrapper{
    padding: 1em;

  }
</style>
