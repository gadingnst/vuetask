import './plugins'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  components: { App },
  render: create => create(App)
})

vm.$mount('#app')
