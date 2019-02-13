import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datenow: Vue.moment().format('YYYY-MM-DD'),
    sidebar: null,
    modal: false,
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
    setModal(state, value){
      state.modal = value || !state.modal
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
    },
    notify({ commit }, opt){
      Vue.push.create(opt.title, {
        body: opt.body,
        icon: '/vuetask/static/img/icons/favicon-32x32.png',
        link: '/vuetask/#/list',
        timeout: 4000,
        vibrate: [200, 100, 200, 100, 200, 100, 200]
      })
    }
  },
  getters: {
    datenow: state => state.datenow
  }
})