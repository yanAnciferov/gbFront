<template>
  <div class="main-wrapper">
     <div class="bgr">
        <img src="@/assets/start-bg.png" alt="" class="bg1">
    </div>
    <div class="tutty">
        <img src="@/assets/tutty/tutty-start.png" alt="">
    </div>
    <div class="dialog">
        <router-link to="/categories">
            <img src="@/assets/start-dialog.png" alt="">
        </router-link>
    </div>
  </div>
</template>



<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import Player from '@/components/audio/Player'
import LoadWindow from '@/components/LoadWindow'

import {mapActions} from "vuex"

export default {
  name: 'Start',
  components: {

  }, 
 data(){
    return{
      transitionName: ''
    }
  }
}
</script>

<style scope>

body{
    overflow: hidden;
}

.main-wrapper{
    position: fixed;
    top: 0;
    left: 0;
}

.bgr{
    z-index: -1;
    width: 100vw;
    height: 100vh;
}

.bgr img{
    height: 100%;
    width: 100%;
}

.tutty{
    z-index: 1;
    position: absolute;
    bottom: 3em;
    right: 17em;
    height: 30em;
}

.tutty img{
    height: 100%;
}

.dialog{
    z-index: 5;
    position: absolute;
    bottom: 6em;
    left: 15em;
}

</style>
