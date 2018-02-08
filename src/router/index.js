import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import RegistrationPage from '@/components/RegistrationPage'
import LoginPage from '@/components/LoginPage'
import Im from '@/components/Im'
import AllUser from '@/components/Search'
import UserPage from '@/components/UserPage'
import NotFound from '@/components/404.vue'
import Settings from '@/components/Settings.vue'
import axios from "axios"
import store from "../store/index.js"


Vue.use(Router)
export default new Router({
  hashbang: false,
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/registration',
      name: 'RegistrationPage',
      component: RegistrationPage,
      beforeEnter: (to, from, next)=>{

        if(!store.getters.isAuthenticated) {
          next();
        }
        else next(store.getters.getMyLogin);
    
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      beforeEnter: (to, from, next)=>{

        if(!store.getters.isAuthenticated) {
          next();
        }
        else next(store.getters.getMyLogin);
    
      }
    },
    // {
    //   path: '/im',
    //   name: 'Im',
    //   component: Im,
    //   beforeEnter: (to, from, next)=>{

    //     if(localStorage.getItem("tokenKey") ) {
    //       next();
    //     }
    //     else next('/login');
    
    //   }
    // },
    {
      path: '/allUser',
      name: 'AllUser',
      component: AllUser
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: (to, from, next)=>{
        if(localStorage.getItem("tokenKey") ) {
          next();
        }
        else next('/login');
      }
    },
    {
      path: '/:login',
      name: 'UserPage',
      component: UserPage
      
    }, 
    { path: '/404', component: NotFound },  
    { path: '*', component: NotFound },  
  ]
})