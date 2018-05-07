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
     <div class="bg">
       <img src="@/assets/search-bg2.png" alt="" class="bg1">
        <img src="@/assets/search-bg.png" alt="" class="bg2">
    </div>
    
    
    <div class="categories-wrapper">
        <div class="categories c-wrapper">
            <div class="category" @click="catClick(item)" v-for="(item, index) in categories" :key='index'>
                <img :src="item.ImageUrl" :alt="item.Name">
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
            this.seeNext = true
        }, 500)
    },
    computed:{
        ...mapGetters({
            categories: 'getCategories'
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
}

.bg img{
    z-index: -10;
    width: 100em;
    position: fixed;
    top: 0;
    left: 0;
}


.categories-wrapper{
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
   
}

.c-wrapper .category{
    width: 9em;
    height: 9em;
    margin: 1.25em 2.75em;

    
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
