<template>
  <div class="main-wrapper" >
    
    <div id="scene">
       
        <div data-depth="0.05" class="bgr">
            <img src="@/assets/start/fon_start1.png" alt="" >
        </div>
       
         <div data-depth="0.2" class="bgr2">
            <img src="@/assets/start/fon_start2.png" alt="" >
        </div>

        <div data-depth="0.2" class="bgr2">
            <img src="@/assets/start/fon_start3.png" alt="" >
        </div>

        <div class="filter"></div>
        
         
        <div data-depth="0.25" class="tutty">
            <img :src="tutty" alt="">
        </div>
        <div data-depth="0.3" class="dialog"> 
            <router-link class="link" to="/categories">
                <img src="@/assets/start/fon_start4.png" alt="">
            </router-link>
        
        </div>
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


import Parallax from 'parallax-js'

export default {
  name: 'Start',
  components: {

  }, 
 data(){
    return{
      transitionName: '',
      tutty: "https://dataskitel.blob.core.windows.net/uipics/tutti2.png"
    }
  },
  created(){
      setTimeout(() => {
        var scene = document.getElementById('scene');
        var parallaxInstance = new Parallax(scene);
        }, 500);
  },
    beforeCreate(){
      setInterval(() => {
          this.tutty = 'https://dataskitel.blob.core.windows.net/uipics/tutti1.png'
      }, 1000)
      setInterval(() => {
          this.tutty = 'https://dataskitel.blob.core.windows.net/uipics/tutti2.png'
      }, 5000)    
    }
}
</script>

<style scoped>

.filter{
    width: 200vw;
    height: 200vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #ffffff3f;
}

.header{
    position: fixed;
}

.logo-wrap{
    height: 2em;
    position: fixed;
    z-index: 1000000;
    margin-left: 1em;
    margin-top: 1.85em;
}

.logo{
    height: 100%;
}

#scene{
    pointer-events: all  !important; 
}

.main-wrapper{
    position: fixed;
    top: 0;
    left: 0;
}

.bgr{
    z-index: -1;
    width: 110vw;
    height: 110vh;
    margin-left: -3em;
    margin-top: -2em;
    position: absolute;
}

.bgr img{
    height: 100%;
    width: 100%;
}

.bgr2{
    width: 90vw;
    height: 90vh;
    margin-left: 4em;
    margin-top: 1em;
    position: absolute;
}

.bgr3{
     width: 100vw;
    height: 100vh;
    margin-top: -2em;
    position: absolute;
}

.bgr2 img, .bgr3 img{
    width: 100%;
}

.tutty{
    z-index: 1;
    position: absolute;
    height: 45em;
    margin-top: 7em;
    margin-left: 15em;
}

.tutty img{
    height: 100%;
}


.dialog img{
    width: 100%;
}

.dialog{
    z-index: 10;
    bottom: 6em;
    left: 15em;
    margin-top: 7em;
    margin-left: 20em;
    position: fixed;
    width: 45em;
}

.link{
    z-index: 10;
   display: block;
   position: fixed;
   cursor: pointer;
}




</style>
