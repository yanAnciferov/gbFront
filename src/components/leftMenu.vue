 <template>
    <div class="left-menu-wrapper">
       
        <div class="left-menu">
             <div class="bg">
                 <img src="@/assets/profil.png" alt="bg">
            </div>
            <div class="home" v-if="auth">
                <router-link :to="login">
                    <img src="@/assets/home.png" alt="">
                </router-link>
            </div>
            <div class="search">
                <router-link to="/categories">
                    <img src="@/assets/search.svg" alt="">
                </router-link>
            </div>
            <div class="exit" v-if="auth" @click='logOf()'>
                <img src="@/assets/exit.svg" alt="">
            </div>
            <div class="login" v-if="!auth">
                <router-link to="/login">
                    <img src="@/assets/exit.svg" alt="">
                </router-link>
            </div>
             <div class="setting" v-if="auth">
                <router-link to="/settings">
                    <img src="@/assets/exit.svg" alt="">
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
</style>
