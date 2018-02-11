import axios from "axios"
import router from '@/router/index'

var serverUrl = "http://localhost:65266";


const state = {
    allUsersList: null,
    currentUserPage: null
}

const mutations = {
 
   setAllUserList(state, allUsers){
   
        state.allUsersList = allUsers
        .map(element => {
            if(element.AvatarImage != null){
                element.AvatarImage = serverUrl + element.AvatarImage;
            } else element.AvatarImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfvwpWlQPbOy0hMDI5-jJ8iyIXhBT_hZEKD7SkK3JdggKQDk3okQ";
  
            return element;
        });
   
   },

   setCurrentUserPage(state, currentUser){ 
    if(currentUser == null){
        state.currentUserPage = null
        return;
    }
    if(currentUser.AvatarImage != null)
        currentUser.AvatarImage = serverUrl + currentUser.AvatarImage;
    else currentUser.AvatarImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfvwpWlQPbOy0hMDI5-jJ8iyIXhBT_hZEKD7SkK3JdggKQDk3okQ";
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
            commit("setCurrentUserPage", res.data)
        }).catch((err)=>{
            console.log(err);
            router.replace("/404");
        })
    },

    getAllUsers({commit}){
        axios.get(serverUrl + '/api/Account/getAll')
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

}


export default {
    state, 
    mutations,
    actions,
    getters
}