<template>
 <div v-if="user != null" class="wrap">
     <userInfo :user="user" />
     <h2 v-if="isMyPage">Это ваша страница</h2>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from "vuex"

import userInfo from "@/components/UserInfo"

export default {
  name: 'UserPage',
  data () {
    return {
        isMyPage: false
    }
  },
  components: {
      userInfo
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
      
      
  },
  created: function(){
   
    this.isMyPage = this.isAuth && this.$route.params["login"] == this.myLogin;

    if(this.isMyPage){
        this.$store.dispatch("getMyData");
    }else{
        this.$store.dispatch("getUser", this.$route.params["login"]);
    }
      
  },
  beforeRouteUpdate(to, from, next){
      this.isMyPage = this.isAuth && to.params["login"] == this.myLogin
      if(this.isMyPage){
          this.$store.dispatch("getMyData");
      }else{
          this.$store.dispatch("getUser", this.$route.params["login"]);
      }
      next();
  }
}
</script>

<style scoped>
.wrap{
    padding-top: 2em;
}

.image-wrapper{
    max-width: 400px;
}

.image-wrapper img{
    max-width: 100%;
}
</style>
