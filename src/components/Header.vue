<template>
  <header>
      <div>
         <router-link v-if="$store.state.authenticated == true" class="button" :to="getMyLogin">Моя страница</router-link>
         <router-link v-if="$store.state.authenticated == true" class="button" to="/allUser"> Поиск</router-link>
           
      </div>
      <div class="login">
            <router-link v-if="$store.state.authenticated == false" class="button" to="/login">Войти</router-link>
            <router-link v-if="$store.state.authenticated == false" class="button" to="/registration">Регистрация</router-link>
            <button v-if="$store.state.authenticated == true" @click="logOf()" class="button">Выход</button>
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
    padding: 1.5em;
    width: 100%;
    border-bottom: 1px solid black;
}

.button{
    margin-top: 1em;
  padding: .5em 1em ; 
  border: none;
  background-color: rgb(24, 62, 187);
  color: white;
  text-transform: none;
  text-decoration: none;
}

.login > .button{
  margin: 0 .5em;
}
</style>
