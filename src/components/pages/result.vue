<template>
  <div class="result-main-wrap">
    <div class="mbg" id="scene" >
        <img data-depth="0.05" src="@/assets/bg2/fon3.png" alt="bg">
        <img data-depth="0.15" src="@/assets/bg2/fon2.png" alt="bg">
        <img data-depth="0.2" src="@/assets/bg2/fon1.png" alt="bg3">
        <div class="filter"></div>
    </div>
       <div class="result-info">
            <div class="result-info-content">
                Результаты поиска - <span class="count-result">найдено {{users.length}} {{wordPeople}}</span>
            </div>
        </div>
        <div class="result-content-wrapper">
            
            <div class="result-v2" v-if="users.length != 0">
                <div v-for="(item, index) in users" :key='index' class="user-result" @click="selectedItem = item">
                    <div class="result-bg">
                        <img src="@/assets/prof_mini-04.png" alt="">
                    </div>
                    <div class="result-avatar">
                        <Avatar :image="item.AvatarImage" />
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
                            <ul>
                                 <li @click="genreClick(item)" v-for="(item, index) in item.Genres" v-if='index < 2' :key='item.Name'>
                                    {{item.Name}}
                                </li>
                            </ul>
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
import Avatar from "@/components/Avatar"
import Parallax from 'parallax-js'

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
    Avatar
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
        }),
        wordPeople(){
            var num = this.users.length % 10;
            if(num == 2 || num % 10 == 3 || num % 10 == 4)
                return "человека";
            else return "человек"
        }
    },
    created(){
        setTimeout(()=>{                
            var scene = document.getElementById('scene');
            var parallaxInstance = new Parallax(scene);
        }, 1000)
    }
}
</script>

<style scoped>

.filter{
    position: fixed;
    top: 0;
    left: 0;
    width: 200vw;
    height: 200vh;
    background-color: #ffffff5f;
}

.count-result{
    color: #552152;
    font-family: slimamif;
}

.result-info-content{
    font-family: LifelsRU;
    color: white;
    font-weight: bold;
    font-size: 1.3em;
    color: #552152;
}

.result-info-bg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    
}

.result-info-bg img{
    width: 100%;
    height: 100%;
}

.result-info{
    position: relative;
    height: 1em;
    width: calc(100% - 16em);
    margin: 0 15em;
    margin-bottom: 2em;
}

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


.mbg{
    z-index: -10;
    position: fixed;
    top: -5em;
    left: -1em;
}

.mbg img{
    z-index: -10;
    width: 100em;
}



.result-main-wrap{
    padding-top: 4em;
}


body{
    padding: 0;
    margin: 0;
    overflow-x: hidden;
}

.resCategory::before{
    content: ' ';
    background-color: white;
    border-radius: 50%;
    height: calc(2.3em - 1px);
    width: 2.2em;
    margin-bottom: 1em;
    display: block;
    z-index: -1;
    position: absolute;
    top: 2px;
    left: 3px;
}

.resCategory {
    position: relative;
    width: 2.5em;
    height: 2.5em;
}

.resCategory img{
    width: 100%;
    height: 100%;
}

.result-categories{
    
    margin-bottom: .7em;
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


.bg3{
    
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
    height: 10em;
    display: flex;
    margin: 0 .5em;
    margin-bottom: 1em;
    
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
    height: 100%;
    z-index: -5;
}

.result-bg img{
    width: 100%;
    height: 100%;
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
    padding: 1em;
}

.result-content .name{
    margin-bottom: .3em;
    color:#DC9E02;
    font-size: 1.3em;
    font-family: LifelsRU;
    font-weight: bold;
}

.result-content .location{
    color: #969595;
    font-family: slimamif;
    font-weight: bold;
}

.location{
    margin-top: -.3em;
    margin-bottom: .7em;
}

.ganre ul li{
    list-style: none;
    margin-right: .5em;
    color:#DC9E02;
}

.ganre ul{
    display: flex;
    color: #969595;
    padding: 0;
    margin: 0;
    font-family: slimamif;
    font-weight: bold;
    flex-wrap: wrap;
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
    padding: 0 14em;
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


.name a:hover{
    text-decoration: underline;
}
.name a{
    text-decoration: none;
    color:#DC9E02;
    font-weight: bold;
}

.logo{
    height: 4em;
}

</style>
