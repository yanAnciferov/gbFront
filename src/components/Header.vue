<template>
  <header class="header">
        <div class='left-s'>
            <router-link to="/">
                <img class="logo" src="@/assets/logo-02.svg" alt="">
            </router-link>

            <div class="search-input">
                <input on:keyup.13="searchEnter" v-model="getSearchModel.FullName" placeholder="Поиск..." type="text">
                <button class="search-btn" @click="searchEnter">
                    <img src="@/assets/leftMenu/search.svg" alt="Искать">
                </button>
            </div>
        </div>

        <div v-if="showSerach" class='right-s'>
            <div class="selectedCategories">
                <div class="selectedCategory" @click="catClick(item)"
                 v-for="(item, index) in getSelectedCategories" :key='index'>
                    <img :src="item.ImageUrl" :alt="item.Name">
                </div>
            </div>

             <div class="selectedGenres">
                <div class="selectedGenre" @click="genWinClick(item)"
                 v-for="(item, index) in getSelectedGenres" :key='index'>
                    {{item.Name}}
                </div>
            </div>
            <div class="selectionGenres" @click="genrePick = true">
                <span>#жанры</span> 
                <img class="arrow" src="@/assets/cursor.svg" alt="">
                <div v-if="genrePick" class="genresWindow">
                    <ul>
                        <li @click="genWinClick(item)" v-for="(item, index) in getGenres" :key='index'>
                            {{item.Name}}
                        </li>
                    </ul>
                </div>
            </div>
            
            <div v-if="genrePick" @click="genrePick = false" class="geo-bg"></div>

            <div :class="{geolocation: true, 'active-geo': geoPick}" @click="geoPick = true">
                <div class="selectCountry" @click="countryWin = true; cityWin = false">
                    <span v-if="getSelectedCountry != null">
                        {{getSelectedCountry.Name}},
                    </span>
                    <span v-else>Страна, </span>
                    <span v-if="getSelectedCity != null">
                        {{getSelectedCity.Name}}
                    </span>
                    <span v-else>Город</span>
                    <img class="arrow" src="@/assets/cursor.svg" alt="">
                </div>
            </div>

            <div class="window" v-if="geoPick">
                <div class="window-geo" v-if='countryWin'>
                    <div class="location-wrapper">
                        <ul>
                            <div>Страны</div>
                            <li>Страна</li>
                            <li @click="countryClick(item)" 
                                v-for="(item, index) in getCountryList" :key='index'
                                :class="{ active: item.isSelected }"
                            >
                                {{item.Name}}
                            </li>
                        </ul>
                        <ul class="cityul">
                            <div>Города</div>
                            <li>Город</li>
                            <li @click="cityClick(item)"
                                 v-for="(item, index) in getCityList" :key='index'
                                 :class="{ active: item.isSelected }">
                                {{item.Name}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="window-geo" v-if='cityWin'>
                    
                </div>
                <div class="geo-bg" @click="geoPick = false; countryWin = false; cityWin = false"></div>
            </div>
        </div>
  </header>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
export default {
  name: 'Header',
  data () {
     return {
       lang: this.language,
       menuVisible: false,
       geoPick: false,
       genrePick: false,
       cityWin: false,
       countryWin: false
    }
  },
  methods:{
      ...mapActions(["logOf","search"]),
      selectChanged(){
       this.$store.commit("setLanguage", this.language)
      },
      goHome(){
        this.$router.push(this.getMyLogin);
      },
      settings(){
        this.$router.push("settings");
      },
      catClick(cat){
        this.$store.commit('toggleCategory', cat);
        this.$store.dispatch('search');
      },
      countryClick(country){
           this.$store.dispatch('changeCountry', country),
           this.$store.commit('setCountry', country)
      },
      cityClick(city){
           this.$store.dispatch('setCity', city)
      },
      searchEnter(){
          this.$store.dispatch('search');
          this.$router.push('result');
      },
      genWinClick(gen){
          this.$store.commit('toggleGenre', gen);
      }
  },
  computed:{
    ...mapGetters([
        "getMyLogin", 
        "getUser", 
        'getSelectedCategories',
        'getCountryList',
        'getCityList',
        'getSelectedCity',
        'getSelectedCountry',
        'getSearchModel',
        'getGenres',
        'getSelectedGenres'
        ]),
    getUrl(){
      return "/" + this.getMyLogin;
    },
    
  },
  watch: {
      isSelectedCity(City){
        if(City == null || this.getSelectedCity)
            return false;
        else{
            return City.Id == this.getSelectedCity.Id
        }
    }, isSelectedCountry(Country){
        if(Country == null || this.getSelectedCountry)
            return false;
        else{
            return Country.Id == this.getSelectedCountry.Id
        }
    }
  },
  props:["showSerach"]
 
}
</script>


<style scoped>

header{
    z-index: 105;
}

.selectionGenres{
    cursor: pointer;
        color:#5B4069;
    font-family: LifelsRU;
    font-weight: bold;
    font-size: 1.5em;
    position: relative;
}

.selectionGenres:hover{
    text-decoration: underline;
}
.genresWindow{
    background-color: #fff;
    z-index: 165;
    border-radius: 7px;
    max-height: 15em;
    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute;
    top: 1.5em;
    right: 0;
    font-size: .7em;
}

.search-btn{
    border: none;
    background-color: transparent;
    outline: none;
    width: 2em;
    height: 2em;
    position: relative;
    left: -2.4em;
    top: .2em;
    cursor: pointer;
}

.selectedGenres{
    display: flex;
    max-width: 20em;
    overflow-y: hidden;
}





.selectedGenre{
    margin: 0 .5em;  
    color:#5B4069;
    font-family: LifelsRU;
    font-weight: bold;
    font-size: 1.5em;
    cursor: pointer;
}

.selectedGenre:hover{
    text-decoration: underline;
}

.search-btn img{
    width: 100%;
}

.search-input{
    margin-left: 3em;
    
}

input[type='text']{
    font-family: slimamif;
    font-weight: bold;
    font-size: 1em;

    border: none;
    outline: none;
    padding: .3em .6em;
    padding-right: 2em;
    border-radius: 6px;
    width: 11em;
}

@font-face {
    font-family: LifelsRU; /* Имя шрифта */
    src: url('../fonts/LifeIsStrangeRU.ttf'); /* Путь к файлу со шрифтом */
}

@font-face {
    font-family: slimamif; /* Имя шрифта */
    src: url('../fonts/slimamif.ttf'); /* Путь к файлу со шрифтом */
}

.arrow{
    width: 1.2em;
}

.cityul{
    width: 150px;
}

.active{
    color:rgb(205, 158, 228);
}

.location-wrapper{
    display: flex;
}

li{
    list-style: none;
    padding: 10px;
    cursor: pointer;
    box-sizing: border-box;
    color:#5B4069;
    font-family: LifelsRU;
    font-weight: bold;
}

li:hover{
    color:rgb(205, 158, 228);
}

ul div{
    text-align: center;
    color: rgb(126, 87, 146);
    font-family: LifelsRU;

}

ul{
    width: 100px;
    padding: 0;
    margin: 0;
}

.geo-bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #333333cc;
    z-index: 164;
    
}

.window-geo{
    position: absolute;
    width: 15em;
    top: 4em;
    right: 2em;
    background-color: #fff;
    border-radius: .4em;
    z-index: 165;

}

.cityul{
    max-height: 20em;
    
    overflow-y: scroll;
}

.header{
    box-sizing: border-box;
   
    background-color: transparent;
    width: 100vw;
    padding: 0 2em;
    padding-left: 1em;
    
    padding-top: 1em;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 155;
    height: 4em;
}


.selectedCategory:hover::before{
    content: ' ';
    background-color: rgba(255, 255, 255, 0.719);
    border-radius: 50%;
    height: calc(2.7em + 1px);
    width: 2.7em;
    margin-bottom: 1em;
    display: block;
    z-index: -2;
    position: absolute;
    top: 2px;
    left: 2px;
}

.selectedCategory::before{
    content: ' ';
    background-color: white;
    border-radius: 50%;
    height: calc(2.7em + 1px);
    width: 2.7em;
    margin-bottom: 1em;
    display: block;
    z-index: -3;
    position: absolute;
    top: 2px;
    left: 2px;
}

.selectedCategory{
    position: relative;
    width: 3em;
    margin: 0 .5em;
    cursor: pointer;
}

.selectedCategory img{
    width: 100%;
}

.geolocation{
    display: flex;
    z-index: 165;
    cursor: pointer;
    min-width: 15em;
}



.selectCity:hover, .selectCountry:hover{
    text-decoration: underline;
}

.selectedCategories{
    display: flex;
}


.right-s{
    display: flex;
    align-items: center;
}

.left-s{
    display: flex;
    align-items: center;
}

.search-panel{
    margin-left: 4em;
}

.search-panel input{
    background-color: #cccccccc;
    padding: .5em 1em;
    border: none;
    outline: none;
    width: 20em;
    border-radius: 15px;
}
.logo{
    height: 2em;
    margin-left: 3.2em;
}

.geolocation{
    font-family: LifelsRU;
}


.selectCity, .selectCountry{
    color:#5B4069;
    font-size: 1.5em;
    margin-left: 1em;
    font-weight: bold;
}

.selectedCategory{
    width: 3em;
    margin: 0 .5em;
}

.geolocation{
    display: flex;
}

.active-geo .selectCity, .active-geo .selectCountry{
    color: white;
}

.active-geo .arrow{
    display: none;
}

.selectedCategories{
    display: flex;
}

</style>
