<template>
 <div class="wrap" v-if="user != undefined">
    <h2>{{user.name}} {{user.firstname}}</h2>
     <!-- <router-link  class="button" to="/allUser">Профиль пользователя</router-link> -->
 </div>
</template>

<script>

import {mapActions} from "vuex"
export default {
  name: 'userCard',
  props: {
      //user
  },
  data () {
    return {
     
    }
  }
 
}
</script>

<style scoped>
  .wrap{
    border: 1px solid black;
  }
</style>
