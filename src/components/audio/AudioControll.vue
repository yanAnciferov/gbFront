<template>
 <div class="wrap">
   <div class="main-wrapper">
    <div 
    v-bind:class="{'image-wrapper': true, 'playing': audio.IsPlaying, 'paused': !audio.IsPlaying }" 
    v-on:click="onPlay">
        <img :src="audio.ImageCover" alt="Image Cover">
        <img src="@/assets/pause.svg" class="pause " alt="pause">
        <img src="@/assets/play.svg" class="play" alt="play">
    </div>
    <div class="audio-content-wrapper">
      <div class="player-wrapper">
          <span>{{audio.Performer}} - {{audio.Title}} </span>
      </div>
      <div class="audio-controlls">
          <button v-on:click="onLike" v-bind:class="{likes: true, youlike: audio.IsLiked}">
            like {{audio.CountLikes}}
          </button>
          <button v-on:click="$emit('delete')" class="likes">
            delete
          </button>
      </div>
    </div>
   </div>
 
 </div>
</template>

<script>

import addAudioWindow from "@/components/audio/AddAudioWindow"
import { mapActions,mapGetters } from "vuex"

export default {
  name: 'audio-control',
  components:{
      addAudioWindow
  },
  props: ["audio"],
  data () {
    return {
    }
  },
  methods:{
    onLike(){
      this.$store.dispatch("audioLike", this.audio);
    },
    onPlay(){
      this.$store.commit("setSoundToPlayer", this.audio);
    }
  },
  computed:{
      ...mapGetters({
           list: "getUserPageAudioList"
      })
  }
 
}
</script>

<style scoped>
  .wrap{
    box-shadow: none;
  }
  .image-wrapper{
    height: 4em;
    width: 4em;
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }

  

  .image-wrapper img{
    width: 100%;
  }

  .pause, .play{
      display: none;
      position: absolute;
      top: 1em;
      left: 0;
      
      height: 2em;
      width: 2em;
  }

  .playing .pause{
      display: block;
  }

   .paused:hover .play{
     display: block;
   }

  .likes{
    border-radius: 6px;
    border: 1px solid gray;
    background: transparent;
    cursor: pointer;
    outline: none;
  }

  .youlike{
    border: 1px solid orangered;
    color: orangered;
  }
  .main-wrapper{
    display: flex;
  }

  .audio-content-wrapper{
    margin-left: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  
</style>
