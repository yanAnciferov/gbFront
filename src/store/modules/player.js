
const state = {
    showPlayer: false,
    isPlay: false,
    currentTrack: null
},


getters = {

    showPlayer: state => { return state.showPlayer },

    getCurrentSound: state => { return state.currentTrack }

}

const actions = {

}

const mutations = {
    addSoundToQueue(state, soud){
        state.soundQueue.push(soud);
    },

    setSoundToPlayer(state, soud){
    state.currentTrack = soud;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
  }