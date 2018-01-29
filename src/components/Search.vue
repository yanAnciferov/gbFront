<template>
 <div class="wrap">
     <h2>Поиск</h2>
     <input type="text">
     <button class="button" @click="search">Найти</button>
     <Aplayer>
    </Aplayer>
 </div>
</template>

<script>

// autoplay :music="{
//         title: 'Preparation',
//         author: 'Hans Zimmer/Richard Harvey',
//         url: 'https://www.computerhope.com/jargon/m/example.mp3',
//         lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
//       }"

import {mapActions} from "vuex"
import Aplayer from 'vue-aplayer'
export default {
  name: 'search',
  components: {
        "Aplayer": Aplayer
  },
  data () {
    return {
     
    }
  }, methods:{
      ...mapActions(["search"]),
  }
 
}
</script>

<style scoped>

</style>
