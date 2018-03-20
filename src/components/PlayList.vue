<template>
    <div class="play-list">
        <div class="header-play-list">
            <div class="category">
                <img src="http://icons.iconarchive.com/icons/flat-icons.com/flat/512/Guitar-icon.png" alt="category-image">
                <span>{{category.Name}}</span>
            </div>
            <div  v-if="isMyPage" class="controlls">
                <button  @click="addClick()" class="pointer">Add</button>
            </div>
        </div>
        <div class="audio-list">
            <audio v-for="(item, index) in trackList" :src="item.Url" :key="index" controls></audio>
        </div>
        <addAudioWindow @close="showWindow = false" v-if="showWindow" :category='category'/>
    </div>


</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import axios from "axios"

var serverUrl = "http://localhost:65266";

import userInfo from "@/components/UserInfo"
import testAudio from "@/components/audio/TestAudioControl"
import addAudioWindow from "@/components/audio/AddAudioWindow"

export default {
  name: 'PlayList',
  props: ['category','isMyPage', 'user'],
  data () {
    return {
        showWindow: false,
        trackList: []
    }
  },
  components: {
      addAudioWindow
  },
  methods:{
     addClick(){
         this.showWindow = true;
     }
  },
  computed:{
     ...mapGetters(["getUser"])
      
  },
  created: function(){
       var params = new URLSearchParams();
        params.append( "iduser", this.user.Id);
        params.append( "categoryid", this.category.Id);
     axios.post(serverUrl + '/api/Tracks/AudioList', null, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + localStorage.getItem("tokenKey")
          },
          params
        })
          .then(response => {
            this.trackList = response.data.map(el => {
                 el.Url = serverUrl + el.Url
                 return el
             })
            console.log(this.trackList);
          })
          .catch(error => {
            console.log(error.response)
          })
  },
  beforeRouteUpdate(to, from, next){
    
  }
}
</script>

<style scoped>

.pointer{
    cursor: pointer;
}

.header-play-list{
    display: flex;
    justify-content: space-between;
}

.controlls{
    display: flex;
    align-items: center;
}

.category{
    width: 64px;
    height: 64px;
    margin-bottom: 1em;
    display: flex;
    align-items: center;
}

.category img{
    width: 100%;
    margin-right: 1em;
}

.audio-list{
    display: flex;
    flex-direction: column;
}

.play-list{
    width: 300px;
}
</style>
