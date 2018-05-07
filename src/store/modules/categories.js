import axios from "axios"
import router from '@/router/index'

var serverUrl = "https://skitel.azurewebsites.net";


const state = {
   categoriesList: [],
   userCategory: [],
   selectedCategories: []
}

const mutations = {
    setCategoriesList(state, list){
        state.categoriesList = list;
    },

    setUserCategory(state, list){
        state.userCategory = list
    },

    toggleCategory(state, selectedCategory){
        var index = state.selectedCategories.indexOf(selectedCategory);
        if (index > -1) {
            state.selectedCategories.splice(index, 1);
        }else{
            state.selectedCategories.push(selectedCategory);
        }
    }
   
}

const actions = {

    bindCategory({commit, getters}, idList){
        console.log(idList);
        var params = new URLSearchParams();
        params.append("iduser", getters.getUser.Id);
        params.append("categories", idList);
        
        var token = localStorage.getItem("tokenKey");
        axios.post(serverUrl + '/api/Category/BindUser', null, {
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

    deleteCategory({commit, getters}, idCategory){
        var params = new URLSearchParams();
        params.append( "idcategory", idCategory);
        
        var token = localStorage.getItem("tokenKey");
        axios.post(serverUrl + '/api/Category/Delete', null, {
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

    addNewCategory({commit, getters}, categoryName){
        var params = new URLSearchParams();
        params.append( "name", categoryName);
        var token = localStorage.getItem("tokenKey");
        axios.post(serverUrl + '/api/Category/Add', null, {
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


    getCategories({commit}){
        var token = localStorage.getItem("tokenKey");
        axios.get(serverUrl + '/api/Category/ToList', {
            headers: {
              "Authorization": "Bearer " + token
            }
          })
            .then(response => {
                commit("setCategoriesList", response.data);
            })
            .catch(error => {
              console.log(error);
            })
    }

}


const getters = {
    getCategories(state) {
        return state.categoriesList;
    },
    getUserCategory(state){
        return state.userCategory;
    },
    getSelectedCategories(state){
        return state.selectedCategories;
    }
}


export default {
    state, 
    mutations,
    actions,
    getters
}