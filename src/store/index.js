import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datenow: moment().format('YYYY-MM-DD'),
    sidebar: null,
    snackbar: {
      visibility: false,
      timeout: null,
      message: null,
      color: null
    },
  },
  mutations: {
    setSidebar(state, value){
      state.sidebar = value
    },
    setSnackbar(state, snackbar) {
      state.snackbar.color = snackbar.color || null
      state.snackbar.message = snackbar.msg || null
      state.snackbar.timeout = snackbar.timer
      state.snackbar.visibility = snackbar.visible || false
    },
    closeSnackbar(state){
      state.snackbar.visibility = false
    }
  },
  actions: {
    setSnackbar({ commit }, snackbar){
      snackbar.timeout = snackbar.timeout || 3000
      commit('setSnackbar', snackbar)
      setTimeout(() => {
        commit('closeSnackbar')
      }, snackbar.timeout)
    }
  },
  getters: {
    datenow: state => state.datenow
  }
})