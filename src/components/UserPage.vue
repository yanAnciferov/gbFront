<template>
 <div v-if="user != null" class="wrap">
     <div class="content-wrapper">
        <userInfo class="user-info" :user="user" />
        <!-- <testAudio class="audioPanel" :isMyPage="isMyPage" :user="user"/> -->
     </div>
     <h2 v-if="isMyPage">Это ваша страница</h2>
     <div class="play-lists-wrapper">
         <playList :isMyPage='isMyPage' :category='item' v-for="(item, index) in categories" :key='index' class="playList" />
         <addPlayList v-if="isMyPage" class="playList"/>
     </div>
 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import userInfo from "@/components/UserInfo"
import playList from "@/components/PlayList"
import testAudio from "@/components/audio/TestAudioControl"
import addPlayList from "@/components/AddPlayListControl"

export default {
  name: 'UserPage',
  data () {
    return {
        isMyPage: false
    }
  },
  components: {
      userInfo,
      testAudio,
      playList,
      addPlayList
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
        isAuth: "isAuthenticated",
        categories: "getUserCategory",
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

.play-lists-wrapper{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.playList{
    margin: 1em;
}

.user-info{
    width: 100%;
}
</style>
