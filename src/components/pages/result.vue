<template>
  <div class="result-main-wrap">
    <div class="bg">
        <img src="@/assets/search-bg2.png" alt="bg" class="bg1">
        <img src="@/assets/search-bg.png" alt="bgа" class="bg2">
    </div>
       
        <div class="result-content-wrapper">
            <div class="result-v2">
                <div v-for="(item, index) in users" :key='index' class="user-result" @click="selectedItem = item">
                    <div class="result-bg">
                        <img src="@/assets/prof_mini-04.png" alt="">
                    </div>
                    <div class="result-avatar">
                        <div class="circle">
                            <img class="circle-img" src="@/assets/frame-05.svg" alt="">
                            <div class="avatar">
                                <img :src="item.AvatarImage" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="result-content">
                        <div class="name">
                            <router-link :to="item.Login">
                                {{item.Firstname}} {{item.Lastname}}
                            </router-link>
                        </div>
                        <div class="location">
                            {{item.City.Country.Name}}, {{item.City.Name}}
                        </div>
                        <div  class="result-categories">
                            <div v-for="(cat, index) in item.Categories" :key='index' class="resCategory">
                                <img :src="cat.ImageUrl" :alt="cat.Name">
                            </div>
                          
                        </div>
                        <div class="ganre">
                            
                        </div>
                    </div>
                </div>
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

import {mapActions, mapGetters} from "vuex"

export default {
  name: 'App',
  data () {
    return {
        selectedItem: null,
        tutty: 'https://dataskitel.blob.core.windows.net/uipics/tutty-open.png',
       
    }
  },
  components: {
    // Header,
    // Footer,
    // Loader,
    // Player,
    // LoadWindow
  },
  methods:{
     onSelected(selectedItem){
        
    }
  },
  beforeCreate(){
      setInterval(() => {
          this.tutty = 'https://dataskitel.blob.core.windows.net/uipics/tutty-close.png'
      }, 5000)
      setInterval(() => {
          this.tutty = 'https://dataskitel.blob.core.windows.net/uipics/tutty-open.png'
      }, 6000)

      
      this.$store.dispatch('search');
    
    },
    computed: {
        ...mapGetters({
            users: 'getSearchResult'
        })
    }
}
</script>

<style scoped>

@font-face {
    font-family: Adigiana; /* Имя шрифта */
    src: url('/src/fonts/Adigiana 2.ttf'); /* Путь к файлу со шрифтом */
}

@font-face {
    font-family: LifelsRU; /* Имя шрифта */
    src: url('../../fonts/LifeIsStrangeRU.ttf'); /* Путь к файлу со шрифтом */
}

@font-face {
    font-family: slimamif; /* Имя шрифта */
    src: url('../../fonts/slimamif.ttf'); /* Путь к файлу со шрифтом */
}

.result-main-wrap{
    padding-top: 4em;
}


body{
    padding: 0;
    margin: 0;
    overflow-x: hidden;
}


.resCategory {
    width: 3em;
    height: 3em;
}

.resCategory img{
    width: 100%;
    height: 100%;
}

.result-categories{
    display: flex;
    width: 100%;
}

.bg{
    z-index: -10;
}

.bg img{
    z-index: -10;
    width: 100em;
    position: fixed;
    top: 0;
    left: 0;
}






.wrapper{
    max-width: 1280px;
    margin: 0 auto;
}

.c-wrapper{
    max-width: 1080px;
    margin: 0 auto;
}

.category{
    width: 15em;
    height: 15em;
}

.category img{
    width: 100%;
}

.gamburger{
    width: 3em;
    
}

.selectCity, .selectCountry{
    color: white;
    font-size: 1.5em;
    margin-left: 1em;
}

.selectedCategory{
    width: 3em;
}

.geolocation{
    display: flex;
}


.selectedCategories{
    display: flex;
}


.search-panel{
    margin-left: 2em;
}

.search-panel input{
    background-color: #cccccccc;
    padding: .5em 1em;
    border: none;
    outline: none;
    width: 20em;
    border-radius: 15px;
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

.user-result{
    position: relative;
    width: 25em;
    height: 7em;
    display: flex;
    margin: 0 .5em;
    margin-bottom: 5em;
    
}

.result{
    margin-top: 3em;
    margin-left: 8em;
}

.result-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -5;
}

.result-bg img{
    width: 100%;
}

.result-categories{
    display: flex;
}

.result-categories .selectedCategory{
    width: 3em;
}

.result-avatar{
    width: 8em;
}

.result-content{
    padding: .5em;
}

.result-content .name{
    margin-bottom: .3em;
    color: #a688a8;
    font-size: 1.3em;
    font-family: LifelsRU;
    font-weight: bold;
}

.result-content .location{
    color: #969595;
    font-family: slimamif;
    font-weight: bold;
}

.ganre ul li{
    list-style: none;
    margin-right: .5em;
}

.ganre ul{
    display: flex;
    color: #969595;
    padding: 0;
    margin: 0;
    font-family: slimamif;
    font-weight: bold;
}

.circle{
    width: 7.3em;
    height: 7.3em;
  
    margin-top: 1em;
    margin-left: 1em;

    position: relative;
  
}

.circle-img{
    z-index: 2;
}

.avatar{
    z-index:-1;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    width: 7em;
    height: 7em;
    overflow: hidden;
    margin-top: .3em;
    margin-left: .15em;
}

.avatar img{
    width: 100%;
}

.result{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    height: 600px;
}


.tutty-result{
    width: 15em;
    position: absolute;
    z-index: -6;
    top: -8em;
    left: -8em;
}

.tutty-result img{
    width: 100%;
}

.first-column{
    display: flex;
    flex-direction: column;
}

.result-v2{
    margin-top: 3em;
    padding: 0 8em;
    padding-right: 0;
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
}


.profile{
    position: relative;
    width: 400px;
    height: 550px;
    margin-top: 3em;
    margin-left: 3em;
    padding: 1em;
    box-sizing: border-box;
    right: 0em;
}


.fade-enter-active, .fade-leave-active {
  transition: right .5s;
}
.fade-leave, .fade-enter-to /* .fade-leave-active до версии 2.1.8 */ {
    right: 0em;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    right: -40em;
}


.profile .profile-bg{
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
}

.profile-bg{
    z-index: -1;
}

.profile-bg img{
    width: 100%;
    height: 100%;
    z-index: -1;
}

.profile-info{
    z-index: 1;
}

.result-content-wrapper{
    max-width: 100vw;
    display: flex;
}

.profile-content{
    display: flex;
}

.profile-categories{
    display: flex;
    justify-content: center;
}

.profile-categories .selectedCategory{
    width: 3em;
}

.profileGanre li{
    color: darkmagenta;
}

.profileGanre ul{
    justify-content: space-around;
}

.profile-name{
    color: darkmagenta;
    font-size: 1.5em;
    font-family: LifelsRU;
}

.profile-info{
    margin-top: 1em;
    margin-left: 1em;
    font-family: slimamif;
    color: white;
    font-weight: bold;
}

.phone{
    margin-top: .5em;
    color: white;
    margin-bottom: .4em;
}


.geolocation{
    font-family: LifelsRU;
}




.name a{
    text-decoration: none;
    color: #a688a8;
    font-weight: bold;
}

.logo{
    height: 4em;
}

</style>
