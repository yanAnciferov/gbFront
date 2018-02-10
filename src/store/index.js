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
        currentUserPage: null,
        showFullScreenLoader: true,
        showPlayer: false,
        isPlay: false,
        currentTrack: null
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
       
            state.allUsersList = allUsers
            .map(element => {
                if(element.AvatarImage != null){
                    element.AvatarImage = serverUrl + element.AvatarImage;
                } else element.AvatarImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfvwpWlQPbOy0hMDI5-jJ8iyIXhBT_hZEKD7SkK3JdggKQDk3okQ";
      
                return element;
            });
       
       },

       setCurrentUserPage(state, currentUser){ 
        if(currentUser == null){
            state.currentUserPage = null
            return;
        }
        if(currentUser.AvatarImage != null)
            currentUser.AvatarImage = serverUrl + currentUser.AvatarImage;
        else currentUser.AvatarImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfvwpWlQPbOy0hMDI5-jJ8iyIXhBT_hZEKD7SkK3JdggKQDk3okQ";
        state.currentUserPage = currentUser;

       },

       setAuthenticatedState(state, isAuthenticated){
        state.authenticated = isAuthenticated;
       },

       showFullScreenLoader(state, isDuring){
        state.showFullScreenLoader = isDuring;
       },

       addSoundToQueue(state, soud){
        state.soundQueue.push(soud);
       },

       setSoundToPlayer(state, soud){
        state.currentTrack = soud;
       }
    },

    actions: {
        emailValid({commit, getters}, email){
            axios.get(serverUrl + '/api/Account/IsUserExists',{
                params: {email}
            }).then(res => {
                console.log(res);
            }).catch(error =>{
                if(error.response.status == 404){
                    return true;
                }else{
                    return false;
                }
            })
        },

        uploadFiles ({commit, getters}, loadWindowState) {
            showLoadWindow = true;
            var s = this
            const data = new FormData(document.getElementById('uploadForm'));
            var imagefile = document.querySelector('#file');
            data.append('upload', imagefile.files[0]);
            var params = new URLSearchParams();
            console.log(getters.getMyLogin);
            var email = localStorage.getItem("username");
            params.append( "email", email);
            axios.post(serverUrl + '/api/Account/setAvatar', data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              params
            })
              .then(response => {
                console.log(response)
                loadWindowState = false;
              })
              .catch(error => {
                console.log(error.response)
                loadWindowState = false;
              })
          },

        getUser({commit}, login){
            commit("setCurrentUserPage", null);
            axios.get(serverUrl + '/api/Account/get/login',{
                params: {login}
            })
            .then((res)=>{
                commit("setCurrentUserPage", res.data)
            }).catch((err)=>{
                console.log(err);
                router.replace("/404");
            })
        },

        getAllUsers({commit}){
            axios.get(serverUrl + '/api/Account/getAll')
            .then((res)=>{
                commit("setAllUserList", res.data);
            }).catch((err)=>{
                
                console.log(err);

            })
        },

        
        getMyData({commit, getters}){
            
            commit("setCurrentUserPage", null);
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
                commit("showFullScreenLoader", false);
                commit("setCurrentUserPage", res.data);
                router.push(res.data.Login);

            }).catch((err)=>{
                
                console.log(err);
                commit("setUser", null);
                commit("setAuthenticatedState", false);
                commit("showFullScreenLoader", false);
                var email = localStorage.removeItem("username");
                var token = localStorage.removeItem("tokenKey");

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

        getToken({commit, dispatch }, {email, password}){
            

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
                commit("showFullScreenLoader", true);
                dispatch("getMyData");
            }).catch((err)=>{
                console.log(err);
            })
        
        },

        logOf({commit}){
            localStorage.removeItem("tokenKey");
            this.state.authenticated = false;
            this.state.user = null;
            router.push("login");
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
        },

        isShowFullScreenLoader(state){
            return state.showFullScreenLoader;
        },

        isMyPage(state, login){
            if(state.authenticated == false)
                return false;
            return state.user.Login === login;
        },

        showPlayer(state){
            return state.showPlayer;
        },

        getCurrentSound(state){
            return state.currentTrack;
        }
    }
})

export default store