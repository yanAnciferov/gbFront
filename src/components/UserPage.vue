<template>
 <div v-if="user != null" class="up-wrap">
    <div class="mbg" id="scene" >
        <img data-depth="0.1" src="@/assets/bg-profil/fon_profili1.png" alt="bg">
        <img data-depth="0.2" src="@/assets/bg-profil/fon_profili2.png" alt="bg">
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
                    <span>{{likes}}</span>
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
       <div class="music">
            <div class="tracks">
                <div class="track" v-for="(item, index) in trackForShow" :key="index">
                    <howler preload :audio='item' :sources='[item.Url]' ></howler>
                </div>
            </div>
            <div class="categories">
                <div :class="{category: true, active: selectedCat.indexOf(item) != -1}" @click="catClick(item)"
                 v-for="(item, index) in user.Categories" :key='index'>
                    <img :src="item.ImageUrl" :alt="item.Name">
                </div>
            </div>
       </div>
      
   </div>

   <addAudio @close='addWin = false; getAudioList(user.Id)' v-if="addWin"/>
 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import userInfo from "@/components/UserInfo"
import playList from "@/components/PlayList"
import audioControll from "@/components/audio/AudioControll"
import addAudio from "@/components/audio/AddAudioWindow"
import avatar from "@/components/Avatar"

import howler from "@/components/audio/testHowler"
import Parallax from 'parallax-js'

export default {
  name: 'UserPage',
  data () {
    return {
        addWin: false,
        selectedCat: []
    }
  },
  components: {
      userInfo,
      audioControll,
      playList,
      addAudio,
      avatar,
      howler
  },
  methods:{
      ...mapActions(["getUser", "getMyData",'getAudioList']),
      startPlay(){
          this.$store.commit("setSoundToPlayer", "http://localhost:65266/Images/wakeup.mp3");
      },
      updateAudio(){
          this.getAudioList(this.user.Id);
      },
      catClick(item){
          var index = this.selectedCat.indexOf(item);
          if(index == -1){
              this.selectedCat.push(item)
          }else this.selectedCat.splice(index, 1)
      }
  },
  computed:{
      ...mapGetters({
        user: "getCurrentPageUser",
        myPage: "isMyPage",
        myLogin: "getMyLogin",
        isAuth: "isAuthenticated",
        categories: "getUserCategory",
        audios: "getUserPageAudioList"
      }),
      likes(){
          var sumLikes = 0;

          this.audios.forEach((item) => {
              sumLikes += item.CountLikes
          })
          return sumLikes;
      },
      trackForShow(){
          if(this.selectedCat.length == 0){
              console.log("!");
             return this.audios

          }
          else {
              var ids = this.selectedCat.map((cat) => {return cat.Id})
              var res = this.audios.filter(audio => { 
                 return ids.indexOf(audio.CategoryId) !== -1;
              });
              return res;
          }
      }
      
  },

  beforeCreate(){
      
  },
  created: function(){
    this.isMyPage = this.isAuth && this.$route.params["login"] == this.myLogin;

    if(this.isMyPage){
        this.$store.dispatch("getMyData");
    }else{
        this.$store.dispatch("getUser", this.$route.params["login"]);
    }

    setTimeout(() => {
        var scene = document.getElementById('scene');
        var parallaxInstance = new Parallax(scene);
        this.getAudioList(this.user.Id);
    }, 500);

    
      
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


.category.active:hover::before{
     content: ' ';
    background-color: #ac7ec7;
    border-radius: 50%;
    height: calc(2.7em - 1px);
    width: 2.7em;
    margin-bottom: 1em;
    display: block;
    z-index: -1;
    position: absolute;
    top: 3px;
    left: 2px;
}

.category.active::before{
     content: ' ';
    background-color: #ba98ce;
    border-radius: 50%;
    height: calc(2.7em - 1px);
    width: 2.7em;
    margin-bottom: 1em;
    display: block;
    z-index: -1;
    position: absolute;
    top: 3px;
    left: 2px;
}

.category:hover::before{
    content: ' ';
    background-color: rgba(255, 255, 255, 0.719);
    border-radius: 50%;
    height: calc(2.7em - 1px);
    width: 2.7em;
    margin-bottom: 1em;
    display: block;
    z-index: -2;
    position: absolute;
    top: 3px;
    left: 2px;
}

.category::before{
    content: ' ';
    background-color: white;
    border-radius: 50%;
    height: calc(2.7em - 1px);
    width: 2.7em;
    margin-bottom: 1em;
    display: block;
    z-index: -3;
    position: absolute;
    top: 3px;
    left: 2px;
}



.track{
    margin: 1em 0;
}

.tracks{
    flex-grow: 1;
}

.categories{
    width: 3em;
}

.category{
    position: relative;
    cursor: pointer;
}

.categories img{
    width: 100%;
}

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

.music{
    display: flex;
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
    top: -1em;
    left: -1em;
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
    max-width: 57vw;
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
