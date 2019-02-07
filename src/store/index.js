import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar: null
  },
  mutations: {
    setSidebar(state, value){
      state.sidebar = value
    }
  }
})