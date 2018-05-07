import Vue from "vue"
import Vuex from "vuex"

import loadScreen from './modules/loadScreen'
import player from './modules/player'
import account from './modules/account'
import common from './modules/public'
import audio from './modules/audio'
import categories from './modules/categories'
import search from './modules/search'
import social from './modules/social'

Vue.use(Vuex);

var serverUrl = "http://localhost:65266";


const store = new Vuex.Store({
    modules: {
        common,
        loadScreen,
        player,
        account,
        audio,
        categories,
        search,
        social
      }
})

export default store