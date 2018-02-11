
const state = {
    showFullScreenLoader: true,
}

const mutations = {
    showFullScreenLoader(state, isDuring){
        state.showFullScreenLoader = isDuring;
    },
}

const actions = {

    
}

const getters = {
    isShowFullScreenLoader(state){
        return state.showFullScreenLoader;
    },
}

export default {
    state, 
    mutations,
    actions,
    getters
}