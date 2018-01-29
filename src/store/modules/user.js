// import axios from "axios"

// const state = {
//     user: null,
//     authenticated: "sdfsdfsdf"
// }

// const mutations = {

// }

// const actions = {
//     registration({commit }, {userName, email, password, confirmPassword}){
//         if(password == confirmPassword){
//             axios.post('http://localhost:49470/Account/Register',{
//                 userName,
//                 email,
//                 password,
//                 confirmPassword
//             }).then((res)=>{
//                 console.log(res);
//             }).catch((err)=>{
//                 console.log(err);
//             })
//         }else{
//             console.log("error");
//         }
//     },

//     logIn({commit }, {email, password}){
        
//         console.log(email, password);
        
//         axios.post('http://localhost:49470/Account/Login',{
//             email,
//             password
//         }).then((res)=>{
//             console.log(res);
//         }).catch((err)=>{
//             console.log(err);
//         })
       
//     }

    
// }

// const getters = {
//     isAuthenticated: state => store.state.authenticated
// }

// export default {
//     state, 
//     mutations,
//     actions,
//     getters
// }