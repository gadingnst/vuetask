import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './plugins/vuetify'
import './plugins/database'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: { App },
  render: create => create(App)
}).$mount('#app')
