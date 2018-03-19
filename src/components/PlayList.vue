<template>
    <div class="play-list">
        <div class="header-play-list">
            <div class="category">
                <img src="http://icons.iconarchive.com/icons/flat-icons.com/flat/512/Guitar-icon.png" alt="category-image">
                <span>{{category.Name}}</span>
            </div>
            <div  v-if="isMyPage" class="controlls">
                <button>Add</button>
            </div>
        </div>
        <div class="audio-list">
            <audio src="" controls></audio>
            <audio src="" controls></audio>
            <audio src="" controls></audio>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import userInfo from "@/components/UserInfo"
import testAudio from "@/components/audio/TestAudioControl"

export default {
  name: 'PlayList',
  props: ['category','isMyPage'],
  data () {
    return {
        
    }
  },
  components: {
      
  },
  methods:{
     
  },
  computed:{
     
      
  },
  created: function(){
    
  },
  beforeRouteUpdate(to, from, next){
    
  }
}
</script>

<style scoped>

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
</style>
