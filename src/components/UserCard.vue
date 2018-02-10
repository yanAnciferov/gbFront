<template>
 <div class="wrap" v-if="user != undefined">
    <div class="left-block">
      <div class="image-wrapper">
          <div class="image-border">
              <img :src="user.AvatarImage" alt="avatar">
          </div>
      </div>
      <div class="user-name">
        <router-link class="link" :to="user.Login">{{user.Firstname}} {{user.Lastname}} </router-link>
      </div>
    </div>
 </div>
</template>

<script>

import {mapActions} from "vuex"
export default {
  name: 'userCard',
  props:["user"] ,
  data () {
    return {
     
    }
  }
 
}
</script>

<style scoped>
  .wrap{
    box-shadow: 0px 2px 4px #888;
    padding: 1em;
    max-height: 10em;
    width: 100%;
    background-color: white;
  }

  .image-wrapper{
      width: 96px;
      height: 96px;
  }
  .image-wrapper img{
      width: 100%;
  }

  h2{
      font-size: 1.3em;
      font-weight: normal;
      margin: 0;
      margin-bottom: .7em; 
  }

  .image-border{
      border-radius: 50%;
      height: 100%;
      width: 100%;
      overflow: hidden;
  }
  .user-name{
    margin-left: 1em;
  }
  .left-block{
    display: flex;

  }

  .link{
    color: #222;
    text-decoration: none;
  }
  .link:hover{
    text-decoration: underline
  }
</style>
