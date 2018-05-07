<template>
  <div id="app">
    <Header class="header"/>
    <LeftMenu class="menu"/>
     <transition :name="transitionName">
       <router-view class="router"/>
     </transition>
    <Loader v-if="loaded" class="load"/>
  </div>
</template>



<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import Player from '@/components/audio/Player'
import LoadWindow from '@/components/LoadWindow'
import LeftMenu from '@/components/leftMenu'

import {mapActions} from "vuex"

export default {
  name: 'App',
  components: {
    Header,
    // Footer,
    // Loader,
    // Player,
    Loader,
    LeftMenu
  }, 
 data(){
    return{
      transitionName: '',
      start: true,
      loaded: true
    }
  },
  methods:{
    // onScroll(){
    //   console.dir(footer);

    // }
  },
  beforeCreate(){
    // this.language = this.$store.getters.getLanguage;
        if(localStorage.getItem("tokenKey") !== null){
          this.$store.dispatch("getMyData");
        }
        // else{
        //   this.$store.commit("showFullScreenLoader", false);
        // }
      this.$store.dispatch('getCategories');
      this.$store.dispatch('loadCountries');
      setTimeout(() => {this.loaded = false}, 2000)

    },watch: {
       '$route' (to, from) {
         const toDepth = to.path.split('/').slice(-1)[0]
         const fromDepth = from.path.split('/').slice(-1)[0]
         console.log(fromDepth)
          if(toDepth == '')
            this.start = true;
          else this.start = false;

        //  if(fromDepth == "categories" && toDepth == "result")
        //    this.transitionName = 'slide-left'
        //     else if(fromDepth == "")
        //   this.transitionName = 'slide-left'
        //    else if(toDepth == "")
        //   this.transitionName = 'slide-right'
        //   else if(toDepth == "result" || toDepth == "categories")
        //     this.transitionName = 'slide-right'
       }
     }
}
</script>

<style >

html, body, #app{
  min-height: 100vh;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

.slide-left-leave-active,
.slide-left-enter-active {
  transition: .5s;
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-left-leave-to {
  transform: translate(-100%, 0);
}


.slide-right-leave-active,
.slide-right-enter-active {
  transition: .5s;
}
.slide-right-enter {
  transform: translate(-100%, 0);
}
.slide-right-leave-to {
  transform: translate(100%, 0);
}

.menu, .header{
  z-index: 5;
}

 .header{
   top: 1;
 }

.load{
  z-index: 999;
}



*::-webkit-scrollbar-track
{
    background-color: #F5F5F5;
    
}

*::-webkit-scrollbar
{
	width: 10px;
    background-color: #F5F5F5;
    
}

*::-webkit-scrollbar-thumb
{
	background-color: #555555;
    border: 2px solid #555555;
   
}
</style>
