<template>
<div class="wrapp">
    <div id="scene" class="bg">
        <img class="mbg" data-depth="0.05" src="@/assets/fon1.png" alt="">
        <div class="filter"></div>
        <img data-depth="0.1" src="@/assets/fon2.png" alt="">        
        <img data-depth="0.2" src="@/assets/fon3.png" alt="">
        <form data-depth="0.1" v-if="!isReg"  @submit.prevent="go">
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

         <form data-depth="0.1" class="regestr" v-if="isReg" @submit.prevent="reg">
            <h2 class="hreg">Регестрация</h2>
            <div class="multy">
                <div class="form-element">
                    <label for="Name">Как вас зовут? <span v-if="nameValidation" class="bad">*</span>
                        <div v-if="!valid && subClick" class="regerror error">
                            Заполните все поля
                        </div>
                     </label> 
                    <input placeholder="Имя" v-model="registrationModel.firstname" type="text" name="Name">
                </div>
                <div class="form-element">
                    <label class="transparent"> 1</label>
                    <input placeholder="Фамилия" v-model="registrationModel.lastname"
                     type="text" name="LastName">
                </div>
            </div>
            <div class="form-element">
                <label for="email">Укажите вашу почту <span v-if="mailValidation" class="bad">*</span></label>
                <input v-model="registrationModel.email" @change="validateEmail" type="email" name="email">
            </div>
            <div class="form-element">
                <label for="Password">Придумайте пароль <span v-if="passValidation" class="bad">*</span></label>
                <input v-model="registrationModel.password" type="password" name="Password">
            </div>
            <div class="form-element">
                <label for="Password">Подтвердите пароль <span v-if="confirmPassValidation" class="bad">*</span></label>
                <input v-model="registrationModel.confirmPassword" type="password" name="Password">
            </div>
             <div class="form-element">
                <label>Укажите дату рождения <span v-if="dateValidation" class="bad">*</span></label>
                <div class="date">
                    <select v-model="registrationModel.year">
                        <option value="Год" disabled>Год</option>
                        <option v-for="(index) in years" :key="index">
                            {{index}}
                        </option>
                    </select>
                    <select v-model="registrationModel.month" v-on:change="sel">
                         <option value="Месяц" disabled>Месяц</option>
                         <option v-for="(index) in month" :key="index">
                            {{index}}
                        </option>
                    </select>
                    <select :disabled="registrationModel.month == 'Месяц'" v-model="registrationModel.day">
                         <option value="День" disabled>День</option>
                         <option v-for="(index) in days" :key="index">
                            {{index}}
                        </option>
                    </select>
                </div>
             </div>
             <div class="form-element">
                  <label>Где вы находитесь? <span v-if="geoValidation" class="bad">*</span></label>
                 <div class="geolocation">
                    <select class="select" :options="countries" v-model="selectedCountry" v-on:change="countryChange">
                        <option value="Страна" disabled>Страна</option>
                        <option  v-for="(index) in countries" :key="index.Name">
                            {{index.Name}}
                        </option>
                    </select>
                    <select class="select" :disabled='selectedCountry == "Страна"' v-model="registrationModel.city" v-on:change="sel">
                        <option value="Город" disabled>Город</option>
                        <option v-for="(index) in cities" :key="index.Name">
                            {{index.Name}}
                        </option>
                    </select>
                 </div>
                 
             </div>
            <div class="submit-wrapper">
                <button @click="subClick = true"  type="submit" class="submit regest">Регестрация</button>
                           
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


import {mapActions, mapGetters} from "vuex"
import axios from "axios"

import Parallax from 'parallax-js'

var serverUrl = "https://skitel.azurewebsites.net";
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
        registrationModel:{
            firstname: "",
            lastname: "",
            birthdate: "",
            email: "",
            password: "",
            confirmPassword: "",
            year: "Год",
            month: "Месяц",
            day: "День",
            city: "Город"
        },
        emailValidState: false,
        waiting: false,
        badLogin: false,
        registration: true,
        days: [],
        countries: [],
        cities: [],
        selectedCountry: 'Страна',
        subClick: false,
        isReg: false
    }
    
  },
  methods:{
      ...mapActions(["getToken"]),
      go(){
          this.waiting = true;
          this.getToken(this.logInModel);
      },
      sel(){
          this.days = this.getDays;
      },

        countryChange({commit, state}){
            var country = this.countries.find(item => item.Name ==  this.selectedCountry);
            var params = new URLSearchParams();
            console.log(country);
            params.append("countryId", country.Id)
            axios.get(serverUrl + '/api/City/CitiesInCountry/ToList', {
                params
            })
            .then(response => {
                this.cities = response.data;;
                console.log(this.cities);
            })
            .catch(error => {
                console.log(error);
            })
        },
        reg(){
            if(this.valid)
            {
                console.log("!!!")
                this.registrationModel.birthdate = new Date(this.registrationModel.year, 
                this.month.indexOf(this.registrationModel.month), this.registrationModel.day, 0, 0,0);
               this.registrationModel.city = this.cities.find(item => item.Name == this.registrationModel.city)
                this.$store.dispatch("registration", this.registrationModel);

            }else console.log("&&&")
                

        },
        validateEmail(){
         axios.get(serverUrl + '/api/Account/IsUserExists',{
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
  created(){

        axios.get(serverUrl + '/api/Country/ToList', {
           
        })
        .then(response => {
            this.countries = response.data;
        })
        .catch(error => {
            console.log(error);
        })

        this.isReg = this.$router.currentRoute.path != "/login"
        console.log(this.$router.currentRoute.path != "/login");

      setTimeout(() => {
        var scene = document.getElementById('scene');
        var parallaxInstance = new Parallax(scene);
        }, 500);
  },
  computed: {
      ...mapGetters({
          years: 'getYears',
          month: "getMonth",
      }),
      nameValidation(){
        return this.registrationModel.firstname.length < 3 || this.registrationModel.lastname.length < 3
      },
      passValidation(){
        return this.registrationModel.password.length < 6 
      },
      confirmPassValidation(){
        return this.registrationModel.confirmPassword != this.registrationModel.password; 
      },
      mailValidation(){
        var re = /\S+@\S+\.\S+/;
        return !re.test(this.registrationModel.email); 
      },
      dateValidation(){
        
        return  this.registrationModel.year == 'Год' || 
        this.registrationModel.month == "Месяц" ||
        this.registrationModel.day == 'День'
      },
      geoValidation(){
          return this.registrationModel.city == 'Город'
      },
      valid(){
          return !this.geoValidation && !this.nameValidation
           && !this.mailValidation && !this.passValidation
            && !this.confirmPassValidation && !this.dateValidation
      },
    //   isReg(){
    //       return this.$router.currentRoute.path !== "login"
    //   },
       getDays(){
        var year = this.registrationModel.year;
        var day = 30;
        var count = 1;
        var arr = [];
     
        switch(this.registrationModel.month) {
            case 'Январь': 
                day = 31;
            break;

            case 'Февраль': 
                if(year % 4 == 0)
                    day = 29;
                else day = 28;
            break;

            case 'Март': 
                day = 31;
            break;

            case 'Апрель':
                day = 30;
            break;

            case 'Май': 
                day = 31;
            break;

            case 'Июнь': 
                day = 30;
            break;

            case 'Июль':
                day = 31;
            break;

            case 'Август':
                day = 31;
            break;

            case 'Сентябрь': 
                day = 30;
            break;

            case 'Октябрь':
                day = 31;
            break;

            case 'Ноябрь': 
                day = 30;
            break;

            case 'Декабрь': 
                day = 31;
            break;

            }


            for(; day >= count; day--){
                arr.push(day);
            }
            return arr;
        }
    
  },

   watch: {
       '$route' (to, from) {
         const toDepth = to.path.split('/').slice(-1)[0]
         const fromDepth = from.path.split('/').slice(-1)[0]
         this.isReg = toDepth == 'registration'
         console.log(toDepth);
       }

   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.mbg{
     z-index: -11;
     margin-left: .3em;
}

.filter{
    position: fixed;
    background-color: #ffffff55;
    top: 0;
    left: 0;
    width: 200vw;
    height: 200vh;
    z-index: -10;
    
}

.regerror{
    position: relative;
    right: -16em;
    top: -.4em;
}

.bad{
    color: rgb(136, 36, 36);
}

.geolocation .select{

    width: 47.8%;
    border-radius: 7px;
    outline: none;
    background-color: white;
}


.geolocation .select:nth-child(2){
    margin-left: 1em;
}

.geolocation{
    display: flex;
}

.date{
    display: flex;

}
.date select{
    width: 33%;
    border-radius: 7px;
    outline: none;
}

.date select:nth-child(2){
    margin:  0 1EM;
}

.transparent{
    color: transparent;
}

.multy{
    display: flex;
}

.multy > div:first-child{
    margin-right: 1em;
}

#scene{
    z-index: 100;
}

.main-bg{
    margin-top: -2em;
    margin-left: -.3em;
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


input, option, select{
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

form.regestr{
    margin-top: 7em;
    margin-left: 24em;
    width: 23.9em;
}

.hreg{
    margin: .5em 0;
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

.regest{
    margin-top: 0;
}
</style>
