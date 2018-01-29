<template>
<div class="wrapp">
  <h2>Вход</h2>
  <form @submit.prevent="getToken(logInModel)">
       <div class="form-element">
          <label for="Email">Логин</label> 
          <input v-model="logInModel.email" type="email" name="Email">
      </div>
       <div class="form-element">
          <label for="Password">Пароль</label>
          <input v-model="logInModel.password" type="password" name="Password">
       </div>
      <div class="submit-wrapper">
          <input type="submit" value="Войти" class="submit">
      </div>
  </form>
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
.wrapper{
    padding: 2em 0;
}

form{
    margin: 2em auto;
    background-color: #ccc;
    width: 30em;
    padding: 1.5em;
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
  background-color: rgb(24, 62, 187);
  color: white;
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
