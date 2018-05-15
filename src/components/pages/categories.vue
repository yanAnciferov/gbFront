<template>
  <!-- <div id="app">
    <Loader class="loader" v-if="$store.getters.isShowFullScreenLoader == true"/>
    <Header class="header"/>
    <Player v-if="$store.getters.showPlayer" class="player"/>
     <main>
       <router-view v-if="$store.getters.isShowFullScreenLoader == false" />
     </main>
  </div> -->
  <div class="category-main-wrap" id="categoriesPage">
    
   

    
    <div class="categories-wrapper">
        <div id="scene" class="bg">
            <img  data-depth="0.05" class="main-bg" src="@/assets/bg/fon1_Монтажная-область-1.png" alt="">
            <img data-depth="0.10" src="@/assets/bg/fon3_Монтажная-область-1.png" alt="">
            <img  data-depth="0.25" src="@/assets/bg/fon4_Монтажная область 1.png" alt="">
            <img data-depth="0.60" src="@/assets/bg/fon2_Монтажная область 1.png" alt="">
            <div class="filter"></div>
        </div> 
        <div class="categories c-wrapper">
            <div class="category" @click="catClick(item)" v-for="(item, index) in categories" :key='index'>
                <div :class="{'cat-bg': true, 'cat-active': select.indexOf(item) != -1}">
                    <img :src="item.ImageUrl" :alt="item.Name">
                </div>
                <div class="category-name">{{item.Name}}</div>
            </div>
        </div>
    </div>
    <transition name="oNext">
        <div v-if="seeNext" class="next-step" >
            <router-link to="result">
                <img src="@/assets/nextStep2.png" alt="">
            </router-link > 
        </div>
    </transition>
  </div>
</template>



<script>
import {mapActions, mapGetters} from "vuex"

import Parallax from 'parallax-js'

export default {
    name: 'App',
    components: {

    },
    data () {
        return {
            seeNext: false
        }
    },
    methods:{
        catClick(cat){
            this.$store.commit('toggleCategory', cat);
            this.$store.dispatch('search');
        }
    },
    created(){
        
        setTimeout(()=>{
            this.seeNext = true;                  
            var scene = document.getElementById('scene');
            var parallaxInstance = new Parallax(scene);
        }, 200)
    },
    computed:{
        ...mapGetters({
            categories: 'getCategories',
            select: 'getSelectedCategories'
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

.toNext-enter-active, .toNext-leave-active {
    transition: bottom .5s;
}
.toNext-leave, .toNext-enter-to /* .fade-leave-active до версии 2.1.8 */ {
    bottom: -1.3em;
}

.toNext-enter, .toNext-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    bottom: -5em;
}

.category{
    cursor: pointer;
    margin-bottom: 6em;
}

.cat-bg::before{
    content: ' ';
    background-color: white;
    border-radius: 50%;
    height: calc(8.5em - .5px);
    width: calc(8.5em );
    margin-bottom: 1em;
    display: block;
    z-index: -2;
    position: absolute;
    top: 2px;
    left: 3px;
}

.cat-bg{
    position: relative;
}


.cat-bg.cat-active:hover::before{
    background-color: #9d74b4;
     content: ' ';
     border-radius: 50%;
    height: calc(8.5em - .5px);
    width: calc(8.5em );
    margin-bottom: 1em;
    display: block;
    z-index: -2;
    position: absolute;
    top: 2px;
    left: 3px;
}

.cat-active::before{
    background-color: #ba98ce;
     content: ' ';
   border-radius: 50%;
    height: calc(8.5em - .5px);
    width: calc(8.5em );
    margin-bottom: 1em;
    display: block;
    z-index: -2;
    position: absolute;
   top: 2px;
    left: 3px;
}

.cat-bg:hover::before{
   content: ' ';
    border-radius: 50%;
    height: calc(8.5em - .5px);
    width: calc(8.5em );
    margin-bottom: 1em;
    display: block;
    z-index: -2;
    position: absolute;
    top: 2px;
    left: 3px;

    background-color: #c7c2c2;
}

.cat-bg img{
   margin-top: -.15em;
   margin-right: -1em;
   width: 100%;
}

.category-name{
    color: #3f1736;
    text-align: center;
    font-family: LifelsRU;
    font-weight: bold;
}

.next-step{
    width: 15em;
    position: fixed;
    bottom: -1.3em;
    right: .5em;
    cursor: pointer;

}


.category-main-wrap{
    height: calc(100vh - 10em);
    width: 100vw;
}

.next-step img{
    width: 100%;
}

body{
    padding: 0;
    margin: 0;
    overflow-y:hidden;
}

.bg{
    z-index: -10;
     position: absolute;
    top: -6em;
    left: -.8em;
    width: 101vw;
    max-height: 195vh;
    overflow: hidden;
}

.bg img{
    z-index: -10;
    width: 100%;
    margin-right: 1em;
}





.categories-wrapper{
    position: relative;
    width: 100vw;
    display: flex;
    justify-content: center;
}

.categories{
    height: calc(100vh - 3em);
    display: flex;
    flex-wrap: wrap;  

}

.wrapper{
    max-width: 1280px;
    margin: 0 auto;
}

.c-wrapper{
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-top: 2em;
   
}

.c-wrapper .category{
    width: 9em;
    height: 9em;
    margin: 2em 2.75em;

    
}

.category img{
    width: 100%;
}

.gamburger{
    width: 3em;
    
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
}

.phone{
    margin-top: .5em;
}





.left-menu{
    width: 3em;
    margin-left: 1em;
    flex-wrap: wrap;
    align-items: center;
}

.left-menu img{
    width: 100%;
}

.left-menu > div{
    margin: 1em 0;
}

.left-menu-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    padding-top: 10em;
}

.name a{
    text-decoration: none;
    color: #a688a8;
    font-weight: bold;
}

.filter{
    width: 200vw;
    height: 200vh;
    position: fixed;
    top: 0;
    background-color: rgba(255,255,255,.4);
}

 .categories-wrapper{
        margin-right: 3em;
    }
@media screen and (max-width: 1020px){
    .c-wrapper{
        max-width: 720px;
    }
}

@media screen and (max-width: 777px){
    .c-wrapper{
        max-width: 480px;
    }
}

@media screen and (max-width: 590px){
    .c-wrapper{
        max-width: 250px;
    }
}
</style>
