<template>
 <div v-if="user != null" class="wrap">
     <div class="content-wrapper">
        <userInfo :user="user" />
        <testAudio class="audioPanel" :isMyPage="isMyPage" :user="user"/>
     </div>
     <h2 v-if="isMyPage">Это ваша страница</h2>
 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import userInfo from "@/components/UserInfo"
import testAudio from "@/components/audio/TestAudioControl"

export default {
  name: 'UserPage',
  data () {
    return {
        isMyPage: false
    }
  },
  components: {
      userInfo,
      testAudio
  },
  methods:{
      ...mapActions(["getUser", "getMyData",]),
      startPlay(){
          this.$store.commit("setSoundToPlayer", "http://localhost:65266/Images/wakeup.mp3");
      }
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

.content-wrapper{
    display: flex;
}

.audioPanel{
    
    flex-grow: 1;
    margin-left: 2em;
}
</style>
