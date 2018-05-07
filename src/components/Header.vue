<template>
  <header class="header">
        <div class='left-s'>
            <img class="logo" src="@/assets/logo-02.svg" alt="">
        </div>

        <div class='right-s'>
            <div class="selectedCategories">
                <div class="selectedCategory" @click="catClick(item)"
                 v-for="(item, index) in getSelectedCategories" :key='index'>
                    <img :src="item.ImageUrl" :alt="item.Name">
                </div>
            </div>

            <div class="geolocation" @click="geoPick = true">
                <div class="selectCountry" @click="countryWin = true; cityWin = false">
                    <span v-if="getSelectedCountry != null">
                        {{getSelectedCountry.Name}},
                    </span>
                    <span v-else>Страна, </span>
                    <span v-if="getSelectedCity != null">
                        {{getSelectedCity.Name}}
                    </span>
                    <span v-else>Город</span>
                </div>
            </div>

            <div class="window" v-if="geoPick">
                <div class="window-geo" v-if='countryWin'>
                    <div class="location-wrapper">
                        <ul>
                            <li @click="countryClick(item)" 
                                v-for="(item, index) in getCountryList" :key='index'
                                :class="{ active: item.isSelected }"
                            >
                                {{item.Name}}
                            </li>
                        </ul>
                        <ul>
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
       cityWin: false,
       countryWin: false
    }
  },
  methods:{
      ...mapActions(["logOf"]),
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
        'getSelectedCountry'
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
  }
 
}
</script>


<style scoped>



@font-face {
    font-family: LifelsRU; /* Имя шрифта */
    src: url('../fonts/LifeIsStrangeRU.ttf'); /* Путь к файлу со шрифтом */
}

@font-face {
    font-family: slimamif; /* Имя шрифта */
    src: url('../fonts/slimamif.ttf'); /* Путь к файлу со шрифтом */
}



.active{
    
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
    background-color: beige;
}

ul{
    widows: 100px;
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
    z-index: 15;
    
}

.window-geo{
    position: absolute;
    width: 12em;
    top: 4em;
    right: 2em;
    background-color: #fff;
    border-radius: .4em;
    z-index: 16;

}

.header{
    box-sizing: border-box;
   
    background-color: transparent;
    width: 100vw;
    padding: 0 2em;
    
    padding-top: .6em;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
}

.selectedCategory{
    width: 3em;
    margin: 0 .5em;
    cursor: pointer;
}

.selectedCategory img{
    width: 100%;
}

.geolocation{
    display: flex;
    z-index: 16;
    cursor: pointer;
}



.selectCity:hover, .selectCountry:hover{
    text-decoration: underline;
    color: white;
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
.logo{
    height: 4em;
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


.selectedCategories{
    display: flex;
}

</style>
