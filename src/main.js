// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store/index'
import vuescroll from 'vue-scroll'

import multiLanguage from 'vue-multilanguage/src/vue-multilanguage.js' 
import VueHowler from 'vue-howler'


import language from './lang/language'
 

Vue.use(VueHowler);
Vue.use(multiLanguage, language);

Vue.config.productionTip = false

sync(store, router);


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
