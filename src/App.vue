<template>
  <div id="app">
    <Loader class="loader" v-if="$store.getters.isShowFullScreenLoader == true"/>
    <Header class="header"/>
    <Player class="player"/>
    <router-view v-if="$store.getters.isShowFullScreenLoader == false" />
    <Footer  class="footer"/>
  </div>
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import Player from '@/components/Player'
import LoadWindow from '@/components/LoadWindow'

import {mapActions} from "vuex"

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Loader,
    Player,
    LoadWindow
  },
  methods:{
    onScroll(){
      console.dir(footer);

    }
  },
  beforeCreate(){
       if(localStorage.getItem("tokenKey") !== null){
         this.$store.dispatch("getMyData");
       }else{
         this.$store.commit("showFullScreenLoader", false);
       }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 2em;
  padding-top: 4em;
  padding-bottom: 6em;
  color: #2c3e50;
  min-height: calc(100vh - 10em);
  position: relative;
  background-color: #fefefe;

}

body, html{
  padding: 0;
  margin: 0;
}

.loader{
  z-index: 999;
}


.header{
  position: fixed;
  top: 0;
  left: 0;
}

.footer{
  position: absolute;
  bottom: 0;
  left: 0;
}

.player{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  box-shadow: -1px 3px 10px black;
}
</style>
