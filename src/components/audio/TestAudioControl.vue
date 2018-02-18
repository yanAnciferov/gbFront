<template>
 <div class="wrap" v-if="user != null">
    <h2>Аудиозаписи пользователя</h2>
     <addAudioWindow v-on:close="showAddWindow = false" v-if="showAddWindow" />
    <div class="audiolist-wrapper">
        <div v-if="list.length == 0 && isMyPage == false">
            <p>У это пользователя нет аудио</p>
        </div>
        <div v-if="list.length == 0 && isMyPage == true">
            <p>Вы не добавили ни одного аудио</p>
            <button v-on:click="showAddWindow = true">Добавить</button>
        </div>
        <div v-if="list.length !== 0">
             <button v-on:click="showAddWindow = true" class="button">Добавить</button>
            <audioControl
             v-for="(item,index) in list" 
             :key='index'
             :audio="item"
             v-on:delete="deleteAudio(item)"
            ></audioControl>
        </div>
    </div>
 </div>
</template>

<script>

import addAudioWindow from "@/components/audio/AddAudioWindow"
import audioControl from "@/components/audio/AudioControll"

import { mapActions,mapGetters } from "vuex"

export default {
  name: 'testAudio',
  components:{
      addAudioWindow,
      audioControl
  },
  props: ["user", "isMyPage"],
  data () {
    return {
      showAddWindow: false
    }
  },
  created(){
    this.$store.dispatch("getAudioList", this.user.Id);      
  },
  computed:{
      ...mapGetters({
           list: "getUserPageAudioList"
      })
  },
  methods:{
      deleteAudio(item){
           this.$store.dispatch("audioDelete", item.Id);
      }
  }
 
}
</script>

<style scoped>
  .wrap{
    box-shadow: 0px 2px 4px #888;
    padding: 1em;
    
    background-color: white;
  }

  .image-wrapper{
      width: 96px;
      height: 96px;
  }
  .image-wrapper img{
      width: 100%;
  }

  h2{
      font-size: 1.3em;
      font-weight: normal;
      margin: 0;
      margin-bottom: .7em; 
  }

  .image-border{
      border-radius: 50%;
      height: 100%;
      width: 100%;
      overflow: hidden;
  }

  .button{
      background-color: transparent;
      border: 1px solid black;
      border-radius: 5px;
  }
</style>
