<template>
  <div class="wrapper">
    <h2>Регистрация</h2>
    <form @submit.prevent="registration(registrationModel)">
        <div class="form-element">
            <label>Как вас зовут?</label>
            <div class="input-container">
                <input 
                 type="firstname"
                name="FirstName"  
                v-model.lazy="registrationModel.firstname"
                placeholder="Имя"
                >
                <input 
                 type="lastname" 
                name="LastName"  
                v-model.lazy="registrationModel.lastname"
                placeholder="Фамилия"
                >
            </div>
        </div>
        <div class="form-element">
            <label for="Email">Укажите вашу почту </label>
            <input @change="validateEmail"  v-model.lazy="registrationModel.email" type="email" name="Email">
            <span v-if="emailValidState">Такая почта уже занята!</span>
        </div>
        <div  class="form-element">
            <label for="Password">Придумайте пароль</label>
            <input  min="6" v-model.lazy="registrationModel.password" type="password" name="Password">
        </div>
        <div class="form-element">
            <label for="ConfirmPassword">Подтвердите пароль</label>
            <input  min="6" v-model.lazy="registrationModel.confirmPassword" type="password" name="ConfirmPassword">
        </div>
        <div class="form-element">
            <label>Дата рождения</label>
            <div><input type="date" v-model.lazy="registrationModel.birthdate"></div>
            <!-- <div class="date">
                <input placeholder="день" type="text" name="day">
                <select name="month" id="month">
                    <option value="1">Январь</option>
                    <option value="2">Февраль</option>
                    <option value="3">Март</option>
                    <option value="4">Апрель</option>
                    <option value="5">Май</option>
                    <option value="6">Июнь</option>
                    <option value="7">Июль</option>
                    <option value="8">Август</option>
                    <option value="9">Сентябрь</option>
                    <option value="10">Октябрь</option>
                    <option value="11">Ноябрь</option>
                    <option value="12">Декабрь</option>
                </select>
                <input placeholder="год" type="text" name="year">
            </div> -->
        </div>
        <div class="form-element">
             <label>Страна</label>
            <select>
                <option value="1">Украина</option>
                <option value="2">Россия</option>
                <option value="3">Белорусь</option>
            </select>
        </div>
        <div class="submit-wrapper">
            <button  class="submit" type="submit">
                Регестрация
            </button>
        </div>
    </form>
  </div>
</template>

<script>

import {mapActions} from "vuex"
import axios from "axios"

export default {
  
  name: 'RegistrationPage',
  data () {
      
    return {
        registrationModel:{
            firstname: "",
            lastname: "",
            birthdate: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        emailValidState: false
    }
  }, 
  methods:{
      ...mapActions(["registration", "emailValid"]),
      validateEmail(){
         axios.get('http://localhost:65266/api/Account/IsUserExists',{
                params: {
                    "email": this.registrationModel.email
                }
            }).then(res => {
                console.log(res);
            }).catch(error =>{
                this.emailValidState = error.response.status !== 204;
            })
      }
  },
  computed: {
      isConfirmPassword() {
            return this.confirmPassword === this.password;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input[type='text'], input[type='password'], input[type='email']{
    border: none;
}


h2, h3, label{
    font-family: LifelsRU;
    font-weight: bold;
    color: #552152;
}
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

.submit:hover{
    color:#552152;
}


.submit{
    background-color: transparent;
    font-family: LifelsRU;
    border: none;
    color: white;
    font-size: 1.3em;
    margin: 0 .5em;
    cursor: pointer;
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
