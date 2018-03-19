<template>
 <div class="wrap">
    <h2>Страница поиска</h2>
    <div class="seach-panel">
      <input type="text" v-model="searchModel.FullName"> <button @click='start'>найти</button>
    </div>
     <div class="all-user-wrapper">
       <UserCard class="card" :user="item" v-for="(item,index) in result" :key='index'/>
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
      start(){
        this.$store.dispatch("search");
      }
  },
  created: function(){
      this.$store.dispatch("getAllUsers");
  },
  computed:{
      ...mapGetters({
        listUsers: "getAllUsersList",
        searchModel: "getSearchModel",
        result: "getSearchResult"
      })
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
