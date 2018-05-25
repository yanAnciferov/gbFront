import axios from "axios"
import router from '@/router/index'

var serverUrl = "https://skitel.azurewebsites.net";

const state = {
    user: null,
    authenticated: false,
    prevIsResult: false
}


const getters = {
    isAuthenticated: state => {return state.authenticated },
    getUser: state => { return state.user },
    getMyLogin: state => { return state.user.Login },
    isMyPage(state){
        return state.authenticated && state.user.Login == state.currentUserPage.Login;
    },
    prevIsResult(state){
        return state.prevIsResult
    }
}

const actions = {

    uploadAvatar ({commit, getters, dispatch}, model) {
        var s = this
        
        var imagefile = document.querySelector('#file');
        const data = new FormData();
        data.append('upload', imagefile.files[0]);

        var params = new URLSearchParams();
        var email = localStorage.getItem("username");
        params.append("email", email);
        axios.post(serverUrl + '/api/Account/setAvatar', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + localStorage.getItem("tokenKey")
          },
          params
        })
          .then(response => {
            console.log(response)
            
            dispatch("getMyData");
          })
          .catch(error => {
            console.log(error.response)
            
          })
      },

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

    getMyData({commit, getters, dispatch}, isLogin){
            
        commit("setCurrentUserPage", null);
        var email = localStorage.getItem("username");
        var token = localStorage.getItem("tokenKey");
        var params = new URLSearchParams();
        params.append( "email", email);
        axios.get(serverUrl + '/api/Account/get/email',{
            params,
            headers:{
                "Authorization": "Bearer " + token
            }
        })
        .then((res)=>{
            console.log(res.data);
            commit("setUser", res.data);
            commit("setAuthenticatedState", true);
            commit("showFullScreenLoader", false);
            commit("setCurrentUserPage", res.data);
            commit("setUserCategory", res.data.Categories);
            console.log(res.data);
            dispatch("getAudioList", res.data.Id);
            if(isLogin == true)
                router.push(res.data.Login);

        }).catch((err)=>{
            
            console.log(err);
            commit("setUser", null);
            commit("setAuthenticatedState", false);
            commit("showFullScreenLoader", false);
            commit("setUserCategory", null);
            var email = localStorage.removeItem("username");
            var token = localStorage.removeItem("tokenKey");

        })
    },


    registration({commit, dispatch },model){
        
            console.log(model);
            var data = {
                "Cityid": model.city.Id,
                "Firstname": model.firstname,
                "Lastname": model.lastname,
                "BirthDate": model.birthdate,                    
                "Password": model.password,
                "ConfirmPassword": model.confirmPassword,
                "Email": model.email
                
            };
            var email = model.email;
            var password = model.password

            axios.post(serverUrl + '/api/Account/Register',data)
            .then((res)=>{
                console.log(res);
                model.stopWait();
                if(res.status == 200){
                    dispatch("getToken", { email, password} );
                }
                    
            }).catch((err)=>{
                console.log(err);
                model.stopWait(400);
            })
        
    },

    getToken({commit, dispatch }, model){
        

        var params = new URLSearchParams();
        params.append( "grant_type", 'password');
        params.append( "Username", model.email);
        params.append( "Password", model.password);
        
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
            localStorage.setItem("username", model.email);
            commit("showFullScreenLoader", true);
            dispatch("getMyData", true);
            model.stopWait();
        }).catch((err)=>{
            console.dir(err);
            model.stopWait(400);
        })
    
    },

    logOf({commit}){
        localStorage.removeItem("tokenKey");
        commit("setAuthenticatedState", false);
        commit("setUser", null);
        router.push("login");
    }  
}

const mutations = {
    setUser(state, newUser){
        state.user = newUser;
    },

    setAuthenticatedState(state, isAuthenticated){
        state.authenticated = isAuthenticated;
    },

    setUserFromLocalStorage(state){
    if(localStorage.getItem("tokenKey") !== null){
        state.authenticated = true;
        }
    },

    setPrevState(state, newState){
        state.prevIsResult = newState;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}