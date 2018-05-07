import axios from "axios"
import router from '@/router/index'

var serverUrl = "https://skitel.azurewebsites.net";


const state = {
  
}

const mutations = {
    
}

const actions = {
    set({getters},param){

        var params = new URLSearchParams();
        var email = localStorage.getItem("username");
        params.append("iduser", getters.getUser.Id);
        params.append("value", param.newLink);

        axios.post(serverUrl + '/api/SocialNetworks/Set/' + param.socName, null, {
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
              console.log(error.response);
            })
    },

    drop({getters}, socName){
        var params = new URLSearchParams();
        params.append("iduser", getters.getUser.Id);

        axios.post(serverUrl + '/api/SocialNetworks/Drop/' + socName, null, {
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
              console.log(error.response);
            })
    },

    updateAbout({getters}, text){
        var params = new URLSearchParams();
        params.append("iduser", getters.getUser.Id);
        params.append("about", text);

        axios.post(serverUrl + '/api/Account/SetAbout', null, {
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
              console.log(error.response);
            })
    },

    updateFirstName({getters}, newName){
        var params = new URLSearchParams();
        params.append("iduser", getters.getUser.Id);
        params.append("firstname", newName);

        axios.post(serverUrl + '/api/Account/ChangeFirstname', null, {
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
              console.log(error.response);
            })
    },

    updateLastName({getters}, newName){
        var params = new URLSearchParams();
        params.append("iduser", getters.getUser.Id);
        params.append("lastname", newName);

        axios.post(serverUrl + '/api/Account/ChangeLastname', null, {
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
              console.log(error.response);
            })
    }



}


const getters = {
 
}


export default {
    state, 
    mutations,
    actions,
    getters
}