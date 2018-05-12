<template>
<div class="wrapp">
    <div id="scene" class="bg">
        <img data-depth="0.05" src="@/assets/fon1.png" alt="">
        <img data-depth="0.1" src="@/assets/fon2.png" alt="">        
        <img data-depth="0.2" src="@/assets/fon3.png" alt="">
        <form data-depth="0.1"  @submit.prevent="go">
            <h2>Вход</h2>
            <div class="form-element">
                <label for="Email">Логин</label> 
                <input v-model="logInModel.email" type="email" name="Email">
            </div>
            <div class="form-element">
                <label for="Password">Пароль</label>
                <input v-model="logInModel.password" type="password" name="Password">
            </div>
            <div class="error" v-if="badLogin">
                Не верный логин или пароль
            </div>
            <div class="submit-wrapper">
                <button type="submit" class="submit">Войти</button>
            </div>
        </form>
    </div>

    
    

 

    <div class="load-bg" v-if="waiting == true">
        <div class="loading" >
            <div class="result-bg">
                <img src="@/assets/prof_mini-04.png" alt="">
            </div>
            <div class="text">
                Загрузка...
            </div>
        </div>
    </div>

</div>
</template>

<script>


import {mapActions} from "vuex"


import Parallax from 'parallax-js'
export default {
  
  name: 'LoginPage',
  data () {
    return {
       logInModel:{
            email: "",
            password: "",
            stopWait: (code) =>
            {
                this.waiting = false;
                if(code == 400)
                    this.badLogin = true;
            }
        },
        waiting: false,
        badLogin: false
    }
    
  },
   methods:{
      ...mapActions(["getToken"]),
      go(){
          this.waiting = true;
          this.getToken(this.logInModel);
      }
  },  
  created(){
      setTimeout(() => {
        var scene = document.getElementById('scene');
        var parallaxInstance = new Parallax(scene);
        }, 500);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

#scene{
    z-index: 100;
}

.main-bg{
    margin-top: -2em;
    margin-left: -.5em;
    width: 102vw;
}

.error{
    color: darkred;
    font-family: slimamif;
    font-weight: bold;
    margin: -.7em 0;
}

.load-bg{
    position: fixed;
    top: 0;
    left: 0;
    background-color: #aaa9a9c7;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}


.result-bg{
    z-index: -10;
    position: absolute;
    top: 0;
    left: 0; 
    height: 7em;
    width: 20em;
    

}

.text{
    color: white; 
    font-family: slimamif;
    font-weight: bold;
    font-size: 1.4em;

}

.result-bg img{
    width: 100%;
}

.loading{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 7em;
    width: 20em;
    margin-top: -8em;
    
}


input{
    border: none;
    padding: .2em;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    font-family: LifelsRU;
    font-size: 1em;
}


h2{
    font-family: LifelsRU;
    font-weight: bold;
    color: #552152;
    z-index: 100;
}


label{
    font-family: LifelsRU;
    font-weight: bold;
    color: #552152;
}

.tutty{
    z-index: 0;
    position: absolute;
    margin-left: 7em;
    margin-top: 5em;
    width: 90%;
}

.tutty img{
    width: 90%;
}

.bg{
    z-index: 0;
    position: fixed;
    margin-top: 2em;
    z-index: -10;
    overflow: hidden;
}

.bg img{
    width: 100%;
}


.wrapper{
    padding: 2em 0;
}

form{
    z-index: 100;
    margin: 2em auto;
    width: 20em;
    padding: 1.5em;
    position: relative;
    margin-left: 27em;
    margin-top: 15em;
    pointer-events: all  !important; 
}


.form-bg{
    position: absolute;
    
    left: 0em;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding-top: 2em;
    box-sizing: border-box;
}

.form-bg img{
    width: 100%;
}

h2{
    text-align: center;
}

.form-element{
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
}

.img{
    width: 100%;
    margin-right: 2em;
}


input{
    padding: .4em;
}

.submit{
  margin-top: 1em;
  padding: .5em 1em ; 
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
  font-family: LifelsRU;
  color: white;
  font-size: 1.4em;
  outline: none;
  
}

.submit:hover{
    color:#552152;
}

label{
    font-weight: bold;
    text-align: left;
    margin-bottom: .5em;
}

.input-container{
    margin: 0;
    display: flex;
}

.input-container > *{
    flex-grow: 1;
}

.input-container > *:first-child{
    margin-right: 1em;
}

select{
     padding: .4em;
}

.submit-wrapper{
    text-align: center;
}
</style>
