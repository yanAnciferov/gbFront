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

    // bindCategory({commit, getters}, idList){
    //     console.log(idList);
    //     var params = new URLSearchParams();
    //     params.append("iduser", getters.getUser.Id);
    //     params.append("categories", idList);
        
    //     var token = localStorage.getItem("tokenKey");
    //     axios.post(serverUrl + '/api/Category/BindUser', null, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //           "Authorization": "Bearer " + token
    //         },
    //         params
    //       })
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         console.log(error.response)
    //     })
    // },

    // deleteCategory({commit, getters}, idCategory){
    //     var params = new URLSearchParams();
    //     params.append( "idcategory", idCategory);
        
    //     var token = localStorage.getItem("tokenKey");
    //     axios.post(serverUrl + '/api/Category/Delete', null, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //           "Authorization": "Bearer " + token
    //         },
    //         params
    //       })
    //         .then(response => {
    //           console.log(response)
    //         })
    //         .catch(error => {
    //           console.log(error.response)
    //         })
    // },

    // addNewCategory({commit, getters}, categoryName){
    //     var params = new URLSearchParams();
    //     params.append( "name", categoryName);
    //     var token = localStorage.getItem("tokenKey");
    //     axios.post(serverUrl + '/api/Category/Add', null, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //           "Authorization": "Bearer " + token
    //         },
    //         params
    //       })
    //         .then(response => {
    //           console.log(response)
    //         })
    //         .catch(error => {
    //           console.log(error.response)
    //         })
    // },


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