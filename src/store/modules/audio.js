import axios from "axios"
import router from '@/router/index'

var serverUrl = "https://skitel.azurewebsites.net";


const state = {
   loadState: "none",
   userPageAudioList: []
}

const mutations = {

    setLoadState(state, newState){
        state.loadState = newState;
    },

    setUserPageAudioList(state, audioList){
        state.userPageAudioList = audioList
        .map(element => {
          
           
            if(element.ImageCover == null){
                element.ImageCover = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfvwpWlQPbOy0hMDI5-jJ8iyIXhBT_hZEKD7SkK3JdggKQDk3okQ";
            }
            element.IsPlaying = false;
           return element;
        });
        
    },


    removeTrack(state, idTrack){
        state.userPageAudioList = state.userPageAudioList.filter(value => {
            return value.Id != idTrack;
        })
    }
}

const actions = {



    loadAudio ({commit, getters}, model) {
        var s = this;

        var audioFile = document.querySelector('#file');
        
        const data = new FormData(document.getElementById('uploadForm'));
       
        data.append('upload', audioFile.files[0]);
    
        var params = new URLSearchParams();
        var email = localStorage.getItem("username");
        params.append( "email", email);
        params.append( "idcat", model.category.Id);
        params.append( "performer", model.performer);
        params.append( "tittle", model.tittle);
        
        axios.post(serverUrl + '/api/Tracks/Add', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + localStorage.getItem("tokenKey")
          },
          params
        })
          .then(response => {
            model.callback('Загрузка прошла успешно!');
            console.log(response)
          })
          .catch(error => {
            console.log(error.response);
            model.callback('При загрузке произошла ошибка!');
          })
      },

      getAudioList({dispatch, getters}, id){
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
            console.log(response.data)
            commit("setUserPageAudioList", response.data);
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
            console.log(response.data)
            commit("setUserPageAudioList",response.data);
        })
        .catch(error => {
            console.log(error.response)
        })
      },

      audioLike({getters}, audio){
          if(getters.isAuthenticated){
            if(audio.IsLicked)
                audio.CountLikes--;
            else   
                audio.CountLikes++;
            audio.IsLicked = !audio.IsLicked;
            var params = new URLSearchParams();
            params.append("idUser", getters.getUser.Id);
            params.append("idTrack", audio.Id);
            axios.post(serverUrl + '/api/Tracks/Like', null, {
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + localStorage.getItem("tokenKey")
               },
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


      deleteAudio({commit, getters, dispatch},idTrack){
        if(getters.isAuthenticated){
            var params = new URLSearchParams();
            params.append("idTrack", idTrack);
            axios.post(serverUrl + '/api/Tracks/Delete', null, {
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + localStorage.getItem("tokenKey")
               },
                params
            })
              .then(response => {
                commit("removeTrack", idTrack);
                dispatch("getMyData");
                
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
    }
}

export default {
    state, 
    mutations,
    actions,
    getters
}