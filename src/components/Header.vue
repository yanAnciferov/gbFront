<template>
  <header>
      <div>
         <router-link 
           v-if="$store.getters.isAuthenticated == true" 
           class="button" 
           :to="getMyLogin"
           v-lang.header.myPage
         ></router-link>
         <router-link
           class="button"
           to="/allUser"
            v-lang.header.search
          ></router-link>
           <router-link
           v-if="$store.getters.isAuthenticated == true"
           class="button"
           to="/settings"
            v-lang.header.settings
          ></router-link>
          <select v-model="language"  @change="selectChanged">
            <option value="en" >English</option>
            <option value="ru">Русский</option>
          </select>
      </div>
      <div class="login">
            <router-link 
            v-if="$store.getters.isAuthenticated == false" 
            class="button" to="/login"
             v-lang.header.login ></router-link>
            <router-link v-if="$store.getters.isAuthenticated == false" class="button" to="/registration"  v-lang.header.registration></router-link>
            <button v-if="$store.getters.isAuthenticated == true" @click="logOf()" class="button"  v-lang.header.logout></button>
      </div>
  </header>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
export default {
  name: 'Header',
  data () {
     return {
       lang: this.language
    }
  },
  methods:{
      ...mapActions(["logOf"]),
      selectChanged(){
       this.$store.commit("setLanguage", this.language)
      }
  },
  computed:{
    ...mapGetters(["getMyLogin"]),
    getUrl(){
      return "/" + this.getMyLogin;
    }
  }
 
}
</script>


<style scoped>
header{
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 1em;
    width: 100%;
    box-shadow: black 0px 0px 10px;
    background-color: #333;
}

.button{
  margin: 0 1em;
  border: none;
  background-color: transparent;
  color: #aaa;
  text-transform: none;
  text-decoration: none;
  cursor: pointer;
}

.button:hover{
  color: white;
}

.login > .button{
  margin: 0 .5em;
}
</style>
