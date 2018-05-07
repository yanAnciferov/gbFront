<template>
 <div v-if="user != null" class="up-wrap">
    <div class="mbg">
        <img src="@/assets/search-bg.png" alt="bgа" class="bg2">
        <img src="@/assets/search-bg2.png" alt="bg" class="bg1">
    </div>
   <div class="user-info">
       <div class="bg">
           <img src="@/assets/profil.png" alt="bg">
       </div>

        <div class="content">
            <div class="left">
                <avatar :image="user.AvatarImage"/>
                <div class="likes">
                    <img src="@/assets/like.svg" class="like" alt="like">
                    <span>12</span>
                </div>
            </div>
            <div class="right">
                <div class="name">
                    {{user.Lastname}} {{user.Firstname}}
                </div>
                <div class="location">
                    {{user.City.Country.Name}}, {{user.City.Name}}
                </div>
                <div class="phone">
                    +39428304567
                </div>
                <div v-if="user.SocNetworks != null" class="social">
                    <a v-if="user.SocNetworks.FaceBook != null" :href="user.SocNetworks.FaceBook">
                        <img src="@/assets/social/fb.svg" alt="fb">
                    </a>
                     <a v-if="user.SocNetworks.Instagram != null" :href="user.SocNetworks.Instagram">
                        <img src="@/assets/social/insta.svg" alt="fb">
                        
                    </a>
                     <a v-if="user.SocNetworks.iTunes != null" :href="user.SocNetworks.iTunes">
                        <img src="@/assets/social/itunes.svg" alt="fb">
                        
                    </a>
                     <a v-if="user.SocNetworks.SoundCloud != null" :href="user.SocNetworks.SoundCloud">
                        <img src="@/assets/social/soundcloud.svg" alt="fb">
                        
                    </a>
                     <a v-if="user.SocNetworks.YouTube != null" :href="user.SocNetworks.YouTube">
                        <img src="@/assets/social/youtube.svg" alt="fb">
                        
                    </a>
                </div>
                <div class="ganres">
                    <ul>
                        <li>
                            #rock
                        </li>
                         <li>
                            #classic
                        </li>
                         <li>
                            #pop
                        </li>
                         <li>
                            #hiphop
                        </li>
                    </ul>
                </div>
            </div>
        </div>
         <div class="bottom">
            <div class="about" v-if="user.About != null">
                {{user.About}}
            </div>
        </div>

   </div>


   <div class="play-content">
       <div class="bgp">
           <img src="@/assets/audio-bg.png" alt="bg">
       </div>
       <button class="btn add" @click="addWin = true" v-if="isMyPage">
           Добавить
       </button>
   </div>

   <addAudio @close='addWin = false' v-if="addWin"/>
 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import userInfo from "@/components/UserInfo"
import playList from "@/components/PlayList"
import testAudio from "@/components/audio/TestAudioControl"
import addAudio from "@/components/audio/AddAudioWindow"
import avatar from "@/components/Avatar"

export default {
  name: 'UserPage',
  data () {
    return {
        isMyPage: false,
        addWin: false
    }
  },
  components: {
      userInfo,
      testAudio,
      playList,
      addAudio,
      avatar
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

.ganres ul{
    list-style: none;
    color:#552152;
    font-family: slimamif;
    font-weight: bold;
    font-size: 1.4em;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
}

.ganres ul li{
    margin-right: .5em;
    margin-bottom: .5em;
}


a{
    text-decoration: none;
    color: rgb(199, 191, 191);
    display: flex;
    align-items: center;
    font-family: slimamif;
    font-weight: bold;
    font-size: 1em;
    margin-right: 1em;
    margin-top: .5em;
}

a span{
    margin-left: .4em;
}

.social img{
    width: 1.5em;
}


.social{
    display: flex;
    flex-wrap: wrap;
}


.like{
    width: 1em;
}

.mbg{
    z-index: -10;
    position: fixed;
    top: 0;
    left: 0;
}

.mbg img{
    z-index: -10;
    width: 100em;
}


.btn{
    background-color: transparent;
    font-family: LifelsRU;
    border: none;
    color: white;
    font-size: 1.3em;
    margin: 0 .5em;
    cursor: pointer;
}

.btn:hover{
    color:#552152;
}


.about{
    margin-left: 1em;
    color: rgb(194, 194, 194);
    font-family: slimamif;
    font-weight: bold;
    font-size: 1.2em;
    margin-top: .5em;
}

.user-info{
    width: 38em;
    height: 36em;
}

 .bg{
    width: 25em;
    height: 36em;
}

.play-content{
    position: relative;
    padding: 3em;
    box-sizing: border-box;
}

.play-content, .bgp{
    height: 36em;
    width: 100%;
}

.user-info{
    position: relative;
    padding: 1em;
    box-sizing: border-box;
    margin-right: 2em;
}


.bg, .bgp{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
}

.bg img, .bgp img{
    width: 100%;
    height: 100%;
}

.up-wrap{
    padding: 2em 7em;
    display: flex;
}

.content{
    display: flex;
}

.likes{
    text-align: center;
    color: rgb(194, 194, 194);
    font-family: slimamif;
    font-weight: bold;
    font-size: 1.2em;
    margin-top: .6em;
}

.name{
    font-family: LifelsRU;
    font-weight: bold;
    color: #552152;
    font-size: 1.5em;
    margin-top: 1em;
}

.location{
    color: rgb(194, 194, 194);
    font-family: slimamif;
    font-weight: bold;
    font-size: 1.2em;
    margin-top: .2em;
}

.phone{
    color: rgb(194, 194, 194);
    font-family: slimamif;
    font-weight: bold;
    font-size: 1em;
    margin-top: .2em;
}

.right{
    margin-left: .7em;
}

.result-avatar{
    width: 8em;
}


.circle{
    width: 7.3em;
    height: 7.3em;
  
    margin-top: 1em;
    margin-left: 1em;

    position: relative;
  
}

.circle-img{
    z-index: 2;
}

.avatar{
    z-index:-1;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    width: 7em;
    height: 7em;
    overflow: hidden;
    margin-top: .3em;
    margin-left: .15em;
}

.avatar img{
    width: 100%;
}

</style>
