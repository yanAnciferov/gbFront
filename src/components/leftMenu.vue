 <template>
    <div class="left-menu-wrapper">
       <!-- <div class="left-bg">
           <img src="@/assets/leftbg.svg" alt="">
       </div> -->
        <div class="left-menu">
             <!-- <div class="bg">
                 <img src="@/assets/profil.png" alt="bg">
            </div> -->
            <div class="home item" v-if="auth">
                <router-link :to="login">
                    <img src="@/assets/leftMenu/home.svg" alt="">
                    <span class="title">Домой</span>
                </router-link>
            </div>
            <div class="search item">
                <router-link to="/categories">
                    <img src="@/assets/leftMenu/search.svg" alt="">
                    <span class="title">Поиск</span>
                </router-link>
            </div>
             <div class="setting item" v-if="auth">
                <router-link to="/settings">
                    <img src="@/assets/leftMenu/settings.svg" alt="">
                    <span class="title">Настройки</span>
                </router-link>
            </div>
            <div class="exit item" v-if="auth" @click='logOf()'>
                <img src="@/assets/leftMenu/enter.svg" alt="">
                <span class="title">Выход</span>
            </div>
             <div class="item" v-if="!auth">
                <router-link to="/registration">
                    <img src="@/assets/regestration.svg" alt="">
                    <span class="title">Регистрация</span>
                </router-link>
            </div>
            <div class="exit item" v-if="!auth">
                <router-link to="/login">
                    <img src="@/assets/leftMenu/enter.svg" alt="">
                    <span class="title">Вход</span>
                </router-link>
            </div>
            
        </div>
    </div>
 </template>

<script>



import {mapActions, mapGetters} from "vuex"

export default {
  name: 'Start',
  components: {

  }, 
 data(){
    return{
      transitionName: ''
    }
  },
  computed:{
      ...mapGetters({
          auth: 'isAuthenticated',
          login: 'getMyLogin'
      })
  },
  methods: {
      ...mapActions(["logOf"])
  }
}
</script>


<style scoped>


.left-bg{
    position: fixed;
    top: 0em;
    left: -2em;
    width: 25em;
    height: 50em;
}

.left-bg img{
    width: 50%;
    height: 70%;
}

.item{
    position: relative;
    height: 4em;
}

.title {
    font-family: lifelsRu;
    font-weight: bold;
    
    font-size: 1.5em;
    position: absolute;
    top: .5em;
    
    left: 2.5em;
    width: auto;
    color: #552152;
}

.title:hover {
    text-decoration: underline;
    color: #CC9C25;
}

a{
    text-decoration: none;
}

a:active, a:hover{
 color: white;
}

.bg{
    z-index: -10;
    position: absolute;
    top: -2em;
    left: 0;
    height: 19em;
    width: 6em;
}

.bg img{
    height: 100%;
    width: 100%;
    margin-left: -2em;
}

.left-menu{
    position: relative;
    width: 3em;
    margin-left: 1em;
    flex-wrap: wrap;
    align-items: center;
}

.exit{
    cursor: pointer;
}

.exit img{
    height: 90%;
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
    z-index: 105;

}
</style>
