<template>
<div class="wrapp">
    <div class="bg">
        <img src="@/assets/fon1.png" alt="">
    </div>
    <div class="form-bg">
        <img src="@/assets/fon2.png" alt="">
    </div>
  
  <form @submit.prevent="getToken(logInModel)">
      <h2>Вход</h2>
       <div class="form-element">
          <label for="Email">Логин</label> 
          <input v-model="logInModel.email" type="email" name="Email">
      </div>
       <div class="form-element">
          <label for="Password">Пароль</label>
          <input v-model="logInModel.password" type="password" name="Password">
       </div>
      <div class="submit-wrapper">
          <button type="submit" class="submit">Войти</button>
      </div>
  </form>
  <div class="tutty">
      <img src="@/assets/fon3.png" alt="">
  </div>
</div>
</template>

<script>


import {mapActions} from "vuex"
export default {
  
  name: 'LoginPage',
  data () {
    return {
       logInModel:{
            email: "",
            password: ""
        }
    }
    
  },
   methods:{
      ...mapActions(["getToken"]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  input{
      border: 2px solid #552152;
      padding: .2em;
      border-radius: 4px;
      outline: none;
      box-sizing: border-box;
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
    top: 12em;
    right: -12em;
    width: 80%;
}

.tutty img{
    width: 70%;
}

.bg{
    z-index: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -10;
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
    width: 30em;
    padding: 1.5em;
    position: relative;
}

.form-bg{
    position: absolute;
    top: 0;
    left: 6em;
    width: 1280px;
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
