<template>
  <div id="app">
    <Loader v-if="$store.getters.isShowFullScreenLoader == true"/>
    
    <Header class="header"/>
    <router-view v-if="$store.getters.isShowFullScreenLoader == false" />
    <Footer class="footer"/>
  </div>
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'

import {mapActions} from "vuex"

export default {
  name: 'App',
  components: {
    Header: Header,
    Footer: Footer,
    Loader: Loader
  },
  beforeCreate: function(){

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

}

body, html{
  padding: 0;
  margin: 0;
}

Footer{
    bottom: 0;
    left: 0;
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
</style>
