<template>
 <div class="wrap">
    <h2>{{user.Lastname}} {{user.Firstname}}</h2>
    <div class="image-wrapper">
        <div class="image-border">
            <img :src="user.AvatarImage" alt="avatar">
        </div>
    </div>
 </div>
</template>

<script>


export default {
  name: 'userInfo',
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
    max-width: 15em;
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
