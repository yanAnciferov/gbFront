
const state = {
    showPlayer: false,
    isPlay: false,
    currentTrack: null,
    playList: []
    
},


getters = {

    showPlayer: state => { return state.showPlayer },

    getCurrentSound: state => { return state.currentTrack },

    getCurrentPlayList: state => { return state.playList }

}

const actions = {

}

const mutations = {
    setPlayList(state, playList){
        state.playList = playList;
    },

    setSoundToPlayer(state, audio){
        if(state.playList !== state.userPageAudioList)
        {
            state.playList = state.userPageAudioList
        }
        if(state.currentTrack !== audio){
            if(state.currentTrack !== null)
                state.currentTrack.IsPlaying = false;
            state.currentTrack = audio;  
        }else{
            audio.IsPlaying = !audio.IsPlaying;
        }

        if(state.showPlayer == false)
            state.showPlayer = true;

        
    },

    pause(state){
        state.currentTrack.IsPlaying = false;
    },

    play(state){
        state.currentTrack.IsPlaying = true;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
  }