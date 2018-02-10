<template>
 <div class="wrap">
     <audio :src="getCurrentSound" controls></audio>
 </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  data () {
    return {
     
    }
  },
  computed:{
      ...mapGetters(["getCurrentSound"])
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
