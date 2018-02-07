<template>
  <div id="app">
    <Loader v-if="$store.getters.isShowFullScreenLoader == true"/>
    <Header/>
    <router-view v-if="$store.getters.isShowFullScreenLoader == false" />
    <Footer/>
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

  color: #2c3e50;
  min-height: 100vh;

}

body, html{
  padding: 0;
  margin: 0;
}

Footer{
    bottom: 0;
    left: 0;
}
</style>
