import Push from 'push.js'

export default {
  install(Vue, options) {
    Vue.push = Push
    window.push = Push
  }
}
