import axios from "axios"
import router from '@/router/index'

var serverUrl = "http://localhost:65266";


const state = {
    searchModel: {
        FullName: ""
    },
    searchResult: []
}

const mutations = {
    setSearchResult(state, newResult){
        state.searchResult = newResult.map(element => {
            element.AvatarImage = serverUrl + element.AvatarImage;
            return element;
        });
    }
}

const actions = {
    search({commit, state}){
        var params = new URLSearchParams();
        params.append( "FullName", state.searchModel.FullName);
        axios.post(serverUrl + '/api/Account/Searcher', null, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params
        })
          .then(response => {
            console.log(response)
            commit('setSearchResult', response.data);
          })
          .catch(error => {
            console.log(error.response)
          })
    }
}


const getters = {
    getSearchModel(state){
        return state.searchModel;
    },
    getSearchResult(state){
        return state.searchResult;
    }
}


export default {
    state, 
    mutations,
    actions,
    getters
}