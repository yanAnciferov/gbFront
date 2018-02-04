<template>
 <div class="wrap">
    <h2>Все пользователи сайта</h2>
     <div class="all-user-wrapper">
       <div class="card" v-for="(item,index) in listUsers" :key='index'>
          <router-link :to="getPath(index)"> 
            {{item.Firstname}} {{item.Lastname}}
          </router-link>
       </div>
       
     </div>
 </div>
</template>


<script>

import { mapGetters } from 'vuex'
import { mapActions } from "vuex"
import UserCard from './UserCard.vue'
export default {
  name: 'search',
  components: {
        "user-card": UserCard
  },
  data () {
    return {
     
    }
  }, 
  methods:{
      ...mapActions(["search"]),
      getPath(index){
        if(this.listUsers[index].isAuthorize == true)
          return "/im";
        return "/" + this.listUsers[index].Login;
      }
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
    padding: 1em;
  border: 1px solid black;
  margin-bottom: 1em;
  }

  .all-user-wrapper{
    padding: 1em;

  }
</style>
