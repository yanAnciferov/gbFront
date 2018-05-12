import axios from "axios"
import router from '@/router/index'

var serverUrl = "https://skitel.azurewebsites.net";

const state = {
    user: null,
    authenticated: false
}


const getters = {
    isAuthenticated: state => {return state.authenticated },
    getUser: state => { return state.user },
    getMyLogin: state => { return state.user.Login },
    isMyPage(state, login){
        if(state.authenticated == false)
            return false;
        return state.user.Login === login;
    }
}

const actions = {

    uploadAvatar ({commit, getters}) {
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

    getMyData({commit, getters}, isLogin){
            
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


    registration({commit, dispatch }, { firstname, lastname, birthdate, email, password, confirmPassword}){
        if(password == confirmPassword){
                
            var data = {
                "Cityid": 1,
                "Firstname": firstname,
                "Lastname": lastname,
                "BirthDate": birthdate,                    
                "Password": password,
                "ConfirmPassword": confirmPassword,
                "Email": email
                
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}