import axios from "axios"
import router from '@/router/index'

var serverUrl = "https://skitel.azurewebsites.net";


const state = {
  
}

const mutations = {
    
}

const actions = {
    set({getters},param){
        param.stateModel.social = "Применение.."
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
              param.stateModel.social = "Изменения сохранены"
              console.log(response)
            })
            .catch(error => {
              param.stateModel.social = "Ошибка"
              console.log(error.response);
            })
    },

    drop({getters}, {socName, stateModel}){
      stateModel.social = "Применение.."
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
              stateModel.social = "Изменения сохранены"
              console.log(response)
            })
            .catch(error => {
              stateModel.social = "Ошибка"
              console.log(error.response);
            })
    },

    updateAbout({getters}, model){
        var params = new URLSearchParams();
        params.append("iduser", getters.getUser.Id);
        params.append("about", getters.getUser.About);
        model.about = "Применение..."
        axios.post(serverUrl + '/api/Account/SetAbout', null, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: "Bearer " + localStorage.getItem("tokenKey")
            },
            params
          })
            .then(response => {
              model.about = "Изменения сохранены"
              console.log(response)
            })
            .catch(error => {
              model.about = "Ошибка"
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
    }, 

    updateCity(){

    },

    setPhone({getters}, phone){
      var params = new URLSearchParams();
      params.append("iduser", getters.getUser.Id);
      params.append("phoneNumber", phone);

      axios.post(serverUrl + '/api/Account/dropPhoneNumber', null, {
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


    dropPhone({getters}){
      var params = new URLSearchParams();
      params.append("iduser", getters.getUser.Id);
      

      axios.post(serverUrl + '/api/Account/dropPhoneNumber', null, {
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





}


const getters = {
 
}


export default {
    state, 
    mutations,
    actions,
    getters
}