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
        allUsersList: null,
        authenticated: false,
        currentUserPage: null
    },

    mutations: {
       setUser(state, newUser){
        state.user = newUser;
       },
       setUserFromLocalStorage(state){
        if(localStorage.getItem("tokenKey") !== null){
           state.authenticated = true;
          }
       },
       setAllUserList(state, allUsers){
        console.log(state.user );
       
        state.allUsersList = allUsers.map(element => {
            if(state.user == null || element.Login != state.user.Login){
                element.isAuthorize = false;
            }else element.isAuthorize = true;
            return element;
        });
       
       },
       setCurrentUserPage(state, currentUser){
        state.currentUserPage = currentUser;
       },
       setAuthenticatedState(state, isAuthenticated){
        state.authenticated = isAuthenticated;
       }
    },

    actions: {

        getUser({commit}, login){
            axios.get(serverUrl + '/api/Account/get/login',{
                params: {login}
            })
            .then((res)=>{
                console.log(res.data);
                commit("setCurrentUserPage", res.data)
            }).catch((err)=>{
                console.log(err);
                router.push("/404");
            })
        },

        getAllUsers({commit}){
            axios.get(serverUrl + '/api/Account/getAll')
            .then((res)=>{

                console.log(res.data);
                commit("setAllUserList", res.data);
            }).catch((err)=>{
                
                console.log(err);

            })
        },


        getMyData({commit}){
            var email = localStorage.getItem("username");
            var token = localStorage.getItem("tokenKey");
            var params = new URLSearchParams();
            params.append( "email", email);
            axios.get(serverUrl + '/api/Account/get/email',{
                params:{"email": email},
                headers:{
                    
                    "Authorization": "Bearer " + token
                }
            })
            .then((res)=>{
                commit("setUser", res.data);
                commit("setAuthenticatedState", true);
                
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
        },
        getAllUsersList(state){
            return state.allUsersList;
        },
        getCurrentPageUser(state) {
            return state.currentUserPage;
        },
        getMyLogin(state){
            return state.user.Login;
        }
    }
    })

export default store