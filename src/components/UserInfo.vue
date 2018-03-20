<template>
 <div class="wrap" v-if="user != null">
    <h2>{{user.Lastname}} {{user.Firstname}}</h2>
    <Avatar :image="user.AvatarImage" />
    <div class="location" v-if="user.City != null">
      {{user.City.Country.Name}},
      {{user.City.Name}}
    </div>

    <div v-if="user.About != null" class="about">
      <h5>Обо мне</h5>
      <p>{{user.About}}</p>
    </div>
 </div>
</template>

<script>


import Avatar from "@/components/Avatar"

export default {
  name: 'userInfo',
  components:{
    Avatar
  },
  props: ["user"],
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
    max-width: 100%;
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
</style>
