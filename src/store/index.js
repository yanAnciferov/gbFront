import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import router from '../router/index'
//import user from "./modules/user"

Vue.use(Vuex);

var tokenKey = "tokenInfo";
var serverUrl = "http://localhost:65266";


const store = new Vuex.Store({
   
    state: {
        user: null,
        authenticated: false
    },

    mutations: {
       setUser(state, newUser){
        state.user = newUser;
       }
    },

    actions: {

        getMyData({commit}){
            var email = localStorage.getItem("username");
            var token = localStorage.getItem("tokenKey");
            //console.log(email);
            //console.log(token);
            var params = new URLSearchParams();
            params.append( "email", email);
            axios.get(serverUrl + '/api/Account/Get',{
                params:{"email": email,"origin":"*"},
                headers:{
                    
                    "Authorization": "Bearer " + token
                }
            })
            .then((res)=>{

                //console.log(res.data);
                commit("setUser", res.data);

            }).catch((err)=>{
                
                console.log(err);

            })
        },


        registration({commit, dispatch }, { firstname, lastname, birthdate, email, password, confirmPassword}){
            if(password == confirmPassword){
                    
                var data = {
                    "Firstname": firstname,
                    "Lastname": lastname,
                    "BirthDate": birthdate,                    
                    "Password": password,
                    "ConfirmPassword": confirmPassword,
                    "Email": email,
                    
                };
                

                axios.post(serverUrl + '/api/Account/Register',data)
                .then((res)=>{
                    console.log(res);
                    if(res.status == 200){
                        dispatch("getToken", { email, password} );
                    }
                        
                }).catch((err)=>{
                    console.log(err);
                })
            }else{
                console.log("error");
            }
        },

        getToken({commit }, {email, password}){
            

            var params = new URLSearchParams();
            params.append( "grant_type", 'password');
            params.append( "Username", email);
            params.append( "Password", password);
            
            axios({
                    method: 'post',
                    url: serverUrl + "/token",
                    data: params,    
                    headers: { 
                    "Content-Type": "application/x-www-form-urlencoded"
                    }
            }).then((res)=>{
             
                console.log(res);
                localStorage.setItem("tokenKey", res.data.access_token);
                localStorage.setItem("username", email);             
                this.state.authenticated = true;
                router.push("im");
            }).catch((err)=>{
                console.log(err);
            })
        
        },

        logOf({commit}){
            localStorage.removeItem("tokenKey");
            this.state.authenticated = false;
            router.push("login");
        },

        search({commit}){
            var securityStamp = sessionStorage.getItem("tokenInfo");
            console.log(securityStamp);
            var ID = "2903dfd7-3212-4682-8f75-3543ecde5182"


            axios.post(serverUrl + '/Account/GetUserInfoByID?ID=' + ID,{
                headers:{
                    "SecurityStamp": "AI0j2qzeuRniRlh1jvfm2waxk1W+VJmKbxRi1t03IsNClZ9eH7YETPbZCSHd3Y2mJg=="
                }
            })
            .then((res)=>{

                console.log(res);

            }).catch((err)=>{
                
                console.log(err);

            })
        }        
    },

    getters: {
        isAuthenticated: state => {return state.authenticated},
        getUser(state) {
            return state.user
        }
    }
    })

export default store