 <template>
  <div>
    <!-- <span>Total duration: {{ duration }} seconds</span>
    <span>Progress: {{ (progress * 100) }}%</span> -->
    <div class="top">
      <div class="title">{{audio.Performer}} - {{audio.Title}}</div>
      
    </div>

    <div class="controls">
      <div class="btns">
        <button class="pp" @click="togglePlayback">
          <img v-if="playing" src="@/assets/player/pause.svg" alt="">
          <img v-if="!playing" src="@/assets/player/play1.svg" alt="">
        </button>
        <button @click="stop">
          <img src="@/assets/player/stop.svg" alt="">
        </button>
      </div>
      <div class="timebar">
        <div class="progress" :style="{ width: progress * 100 + '%' }"></div>
      </div>
      <div class="time" v-if="!playing">{{time}}</div>
      <div class="time" v-if="playing">{{progres}}</div>

      <div @click="onLike" :class="{likes: true, liked: audio.IsLicked}"> 
        <img src="@/assets/like.svg" alt=""> 
        <span>{{audio.CountLikes}}</span>
      </div>

      <div v-if="auth" class="delete">
        <button @click="deleteAudio(); $emit('delete')">X</button>
      </div>
    </div>
  </div>
</template>

<script>

import VueHowler from 'vue-howler'

export default {
  props:['audio','auth'],
  mixins: [VueHowler],
  computed:{
    time(){
      var sec = Math.floor(this.duration % 60);
      var secStr;
      if (sec < 10)
        secStr = "0" + sec;
      else secStr = sec;
      return  Math.floor(this.duration / 60) + ' : ' + secStr;
    },

    progres(){
      var p = this.progress;
      p = p * this.duration;

       var sec = Math.floor(p % 60);
      var secStr;
      if (sec < 10)
        secStr = "0" + sec;
      else secStr = sec;
      return Math.floor(p / 60) + ' : ' + secStr;

    }
  },
  methods:{
    onLike(){
      this.$store.dispatch("audioLike", this.audio);
    },
    deleteAudio(){
      this.$store.dispatch("deleteAudio", this.audio.Id)
    }
  }
}
</script>

<style scoped>
button{
  background-color: transparent;
  border: none;
  width: 2.5em;
  height: 2.5em;
  cursor: pointer;
  outline: NONE;
}

.controls{
  display: flex;
  align-items: center;
  width: 97%;
}

.delete button{ 
  color: white;
  font-family: LifelsRU;
  font-size: 1.2em;
  height: auto;
}

.delete button:hover{ 
  color: #552152;
}

.liked span{
  color: #552152;
}

.btns{
  display: flex;
  margin-right: 1em;
}

.pp{
}

.timebar{
  height: 3px;
  width: 100%;
  background-color: white;
}

.progress{
  width: 50%;
  height: 100%;
  background-color: #CC9C25;
}

button img{
  width: 100%;
  height: 100%;
}

.top{
  display: flex;
  justify-content: space-between;
}

.likes{
  color: white;
  font-family: slimamif;
  font-weight: bold;
  display: flex;
  cursor: pointer;
}

.likes img{
  width: 1.2em;
  height: 1.2em;
  margin-right: .6em;
}

.title{
  color: white;
  font-family: slimamif;
  font-weight: bold;
}

.time{
  margin-left: 1em;
  width: 5em;
  color: #CC9C25;
  font-family: slimamif;
  font-weight: bold;
}
</style>
