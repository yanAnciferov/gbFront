<template>
 <div class="wrap">
     <audio id="main-player" ref="audio" :src="getCurrentSound.Url" autoplay controls></audio>
     <!-- <div>
        <audio-player :playing="getCurrentSound.IsPlaying" :sources="getCurrentSound.Url" :autoplay="true"></audio-player>
     </div> -->
 </div>
</template>

<script>

import { mapGetters } from 'vuex'
import AudioPlayer from '@/components/audio/testHowler.vue'

export default {
  name: 'Footer',
  components:{
      AudioPlayer
  },
  data () {
    return {
     
    }
  },
  computed:{
      ...mapGetters(["getCurrentSound"]),
      
  },
  mounted(){
      var pl = document.getElementById("main-player");
        console.dir(pl);
      pl.onpause = (el) =>{
          console.log("sfd");
          this.$store.commit("pause");
      };

      pl.onplay = (el) =>{
          console.log("sfd");
          this.$store.commit("play");
      };

      pl.canplay = (el) =>{
          console.log("can!");
          pl.load();
      };
      
  }
}
</script>

<style scoped>
.wrap{
    width: 100%;
    padding-top: .3em;
    background-color: white;
    box-sizing: border-box;
}
</style>
