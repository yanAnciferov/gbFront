import axios from "axios"
import router from '@/router/index'

var serverUrl = "https://skitel.azurewebsites.net";


const state = {
   genresList: [],
   userGenres: [],
   selectedGenres: []
}

const mutations = {
    setGenresList(state, list){
        state.genresList = list;
    },

    // setUserGenres(state, list){
    //     state.userGenres = list
    // },

    toggleGenre(state, selectedGenre){
        console.log(selectedGenre);
        var index = state.selectedGenres.indexOf(selectedGenre);
        if (index > -1) {
            state.selectedGenres.splice(index, 1);
        }else{
            state.selectedGenres.push(selectedGenre);
        }
    }
   
}

const actions = {

    bindGenres({commit, getters}, idGenre){
        console.log(idGenre);
        var params = new URLSearchParams();
        params.append("iduser", getters.getUser.Id);
        params.append("idGenre", idGenre);
        
        var token = localStorage.getItem("tokenKey");
        axios.post(serverUrl + '/api/Genres/Bind', null, {
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": "Bearer " + token
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

    unBindGenres({commit, getters}, idGenre){
        console.log(idGenre);
        var params = new URLSearchParams();
        params.append("iduser", getters.getUser.Id);
        params.append("idGenre", idGenre);
        
        var token = localStorage.getItem("tokenKey");
        axios.post(serverUrl + '/api/Genres/UnBind', null, {
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": "Bearer " + token
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

    getGenres({commit}){
        var token = localStorage.getItem("tokenKey");
        axios.get(serverUrl + '/api/Genres/GetAll', {
            headers: {
              "Authorization": "Bearer " + token
            }
        })
        .then(response => {
            console.log(response.data)
            commit("setGenresList", response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

}


const getters = {
    getGenres(state) {
        return state.genresList;
    },
    // getUserCategory(state){
    //     return state.userCategory;
    // },
    getSelectedGenres(state){
        return state.selectedGenres;
    }
}


export default {
    state, 
    mutations,
    actions,
    getters
}