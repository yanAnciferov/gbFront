<template>
 <div v-if="user != null" class="wrap">
     <h2>Это страница пользователя {{user.Firstname}} {{ user.Lastname}}!</h2>
     <div class="image-wrapper">
         <img :src="AvatarURL" alt="avatar">
     </div>
     <h2 v-if="isMyPage">Это ваша страница</h2>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from "vuex"
export default {
  name: 'UserPage',
  data () {
    return {
        isMyPage: false
    }
  },
  methods:{
      ...mapActions(["getUser", "getMyData"]),
  },
  computed:{
      ...mapGetters({
        user: "getCurrentPageUser",
        myPage: "isMyPage",
        myLogin: "getMyLogin",
        isAuth: "isAuthenticated"
      }),
      AvatarURL(){
          if(this.user.AvatarImage !== null)
            return this.user.AvatarImage;
          else return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfvwpWlQPbOy0hMDI5-jJ8iyIXhBT_hZEKD7SkK3JdggKQDk3okQ";
      }
      
  },
  created: function(){
      this.isMyPage = this.$route.params["login"] == this.myLogin;
    if(this.isAuth && this.isMyPage){
        this.$store.dispatch("getMyData");
    }else{
        this.$store.dispatch("getUser", this.$route.params["login"]);
    }
      
  },
  beforeRouteUpdate(to, from, next){
      this.isMyPage = to.params["login"] == this.myLogin
      if(this.isAuth && this.isMyPage){
          this.$store.dispatch("getMyData");
      }else{
          this.$store.dispatch("getUser", this.$route.params["login"]);
      }
      next();
  }
}
</script>

<style scoped>
.image-wrapper{
    max-width: 400px;
}

.image-wrapper img{
    max-width: 100%;
}
</style>
