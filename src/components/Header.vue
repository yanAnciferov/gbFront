<template>
  <header>
      <div>
         <router-link 
           v-if="$store.getters.isAuthenticated == true" 
           class="button" 
           :to="getMyLogin"
         >Моя страница</router-link>
         <router-link
           class="button"
           to="/allUser"
          > Поиск</router-link>
           <router-link
           v-if="$store.getters.isAuthenticated == true"
           class="button"
           to="/settings"
          > Настройки</router-link>
      </div>
      <div class="login">
            <router-link v-if="$store.getters.isAuthenticated == false" class="button" to="/login">Войти</router-link>
            <router-link v-if="$store.getters.isAuthenticated == false" class="button" to="/registration">Регистрация</router-link>
            <button v-if="$store.getters.isAuthenticated == true" @click="logOf()" class="button">Выход</button>
      </div>
  </header>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
export default {
  name: 'Header',
  data () {
     return {
      
    }
  },
  methods:{
      ...mapActions(["logOf"]) 
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
