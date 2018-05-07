import axios from "axios"
import router from '@/router/index'
import Vue from 'Vue'

var serverUrl = "https://skitel.azurewebsites.net";


const state = {
    allUsersList: null,
    currentUserPage: null
}

const mutations = {
 
    setLanguage({state}, newLang){
        localStorage.setItem("lang", newLang);
    },

   setAllUserList(state, allUsers){
   
        state.allUsersList = allUsers;
   
   },

   setCurrentUserPage(state, currentUser){ 
    if(currentUser == null){
        state.currentUserPage = null
        return;
    }


    state.currentUserPage = currentUser;
   }
}

const actions = {
    getUser({commit}, login){
        commit("setCurrentUserPage", null);
        axios.get(serverUrl + '/api/Account/get/login',{
            params: {login}
        })
        .then((res)=>{
            commit("setCurrentUserPage", res.data);
            commit("setUserCategory", res.data.Categories);
        }).catch((err)=>{
            console.log(err);
            router.replace("/404");
        })
    },

    getAllUsers({commit}){
        
        var token = localStorage.getItem("tokenKey");
        axios.get(serverUrl + '/api/Account/getAll', {
            headers:{
                "Authorization": "Bearer " + token
            }
        })
        .then((res)=>{
            commit("setAllUserList", res.data);
        }).catch((err)=>{
            
            console.log(err);

        })
    }
}

const getters = {
  
    getAllUsersList(state){
        return state.allUsersList;
    },
    getCurrentPageUser(state) {
        return state.currentUserPage;
    },
    getLanguage(){
        return localStorage.getItem("lang");
    }

}


export default {
    state, 
    mutations,
    actions,
    getters
}