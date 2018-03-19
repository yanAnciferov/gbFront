import axios from "axios"
import router from '@/router/index'

var serverUrl = "http://localhost:65266";


const state = {
   loadState: "none",
   userPageAudioList: [],
   categoriesList: []
}

const mutations = {

    setLoadState(state, newState){
        state.loadState = newState;
    },

    setUserPageAudioList(state, audioList){
        state.userPageAudioList = audioList
        .map(element => {
          
            element.Url = serverUrl + element.Url;
            if(element.ImageCover == null){
                element.ImageCover = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfvwpWlQPbOy0hMDI5-jJ8iyIXhBT_hZEKD7SkK3JdggKQDk3okQ";
            }
            element.IsPlaying = false;
            console.log(element);
           return element;
        });
        
    },


    setCategoriesList(state, list){
        state.categoriesList = list;
    },

    removeTrack(state, idTrack){
        state.userPageAudioList = state.userPageAudioList.filter(value => {
            return value.Id != idTrack;
        })
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
    },

    loadAudio ({commit, getters}, model) {
        var s = this;
        commit("setLoadState", "loading");
        const data = new FormData(document.getElementById('uploadForm'));
        var audioFile = document.querySelector('#audio');
        data.append('upload', audioFile.files[0]);
        var params = new URLSearchParams();
        console.log(getters.getMyLogin);
        var email = localStorage.getItem("username");
        params.append( "email", email);
        params.append( "performer", model.performer);
        params.append( "tittle", model.tittle);
        axios.post(serverUrl + '/api/Tracks/Add', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
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

      getAudioList({dispatch, getters}, id){
          console.log(getters.isAuthenticated);
          if(getters.isAuthenticated){
            dispatch("getAudioListAuth", id);
          }else{
            dispatch("getAudioListAnonym", id);
          }
      },

      getAudioListAuth({commit, getters}, id){
        var params = new URLSearchParams();
        params.append("iduser", id);
        params.append("idAuth", getters.getUser.Id);
        var token = localStorage.getItem("tokenKey");
        axios.post(serverUrl + '/api/Tracks/AudioListAuth', null, {
            headers:{
                 "Content-Type":"application/x-www-form-urlencoded",
                 "Authorization": "Bearer " + token
            },
            params
        })
        .then(response => {
            //commit("setUserPageAudioList", response.data);
        })
        .catch(error => {
            console.log(error.response)
        })
      },

      getAudioListAnonym({commit, getters}, id){
        var params = new URLSearchParams();
        params.append("iduser", id);

        axios.post(serverUrl + '/api/Tracks/AudioList', null, {
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            params
        })
        .then(response => {
            commit("setUserPageAudioList",response.data);
        })
        .catch(error => {
            console.log(error.response)
        })
      },

      audioLike({getters}, audio){
          if(getters.isAuthenticated){
            if(audio.IsLiked)
                audio.CountLikes--;
            else   
                audio.CountLikes++;
            audio.IsLiked = !audio.IsLiked;
            var params = new URLSearchParams();
            params.append("idUser", getters.getUser.Id);
            params.append("idTrack", audio.Id);
            axios.post(serverUrl + '/api/Tracks/Like', null, {
                params
            })
              .then(response => {
                  console.log(response);
              })
              .catch(error => {
                console.log(error.response)
              })
          }
      },


      audioDelete({commit, getters},idTrack){
        if(getters.isAuthenticated){
            var params = new URLSearchParams();
            params.append("idTrack", idTrack);
            axios.post(serverUrl + '/api/Tracks/Delete', null, {
                params
            })
              .then(response => {
                  commit("removeTrack", idTrack);
              })
              .catch(error => {
                console.log(error.response)
              })
          }
      }
}

const getters = {
    getLoadState(state){
        return state.loadState;
    },
    getUserPageAudioList(state){
        return state.userPageAudioList;
    },
    getCategories(state) {
        return state.categoriesList;
    }
}

export default {
    state, 
    mutations,
    actions,
    getters
}