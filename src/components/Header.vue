<template>
  <header>
      <div>
         
         <router-link
           class="button"
           to="/allUser"
            v-lang.header.search
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
                 <div class="account-menu" v-if="$store.getters.isAuthenticated == true">
                    <div  v-on:click="menuVisible = !menuVisible">
                        <img class="account-menu-avatar" :src="getUser.AvatarImage" alt="avatar">
                    </div>
                    <div v-if="menuVisible" class="closeMenu" @click="menuVisible = false"></div>
                    <div class="menu" v-if="menuVisible" >
                      <div class="menu-button-wrapper">
                        <button @click="menuVisible = false; goHome()" class="button"  v-lang.header.myPage></button>
                      </div>
                        <div class="menu-button-wrapper">
                        <button @click="menuVisible = false; settings()" class="button"  v-lang.header.settings></button>
                      </div>
                      <div class="menu-button-wrapper">
                        <button @click="menuVisible = false; logOf()" class="button"  v-lang.header.logout></button>
                      </div>
                    </div>
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
       menuVisible: false
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
      }
  },
  computed:{
    ...mapGetters(["getMyLogin", "getUser"]),
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
  outline: none;
}

.button:hover{
  color: white;
}

.login > .button{
  margin: 0 .5em;
}

.account-menu{
  border-radius: 50%;
  overflow: hidden;
  width: 32px;
  height: 32px;
  margin-right: 3em;
}

.account-menu > div{
}

.account-menu-avatar{
  width: 100%;
  cursor: pointer;
}

.menu{
  position: absolute;
  right: 3em;
  background-color: #fff;
  border: 1px solid #555;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #333;
  width: 7em;
  padding: 5px 0;
}

.menu-button-wrapper > button{
    color: #333;
    width: 100%;
    margin: 0;
    padding: 5px;
}

.menu-button-wrapper > button:hover{
    background-color: #555;
    color: white;
}

.closeMenu{
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
</style>
