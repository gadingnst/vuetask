import Push from 'push.js'

export default {
  install(Vue, options) {
    Vue.push = Push
    window.push = Push
    window.notify = (options) => {
      Push.create(options.title, {
        body: options.body,
        icon: '/vuetask/static/img/icons/android-chrome-192x192.png',
        link: '/vuetask/#/list',
        timeout: 4000,
        vibrate: [200, 100, 200, 100, 200, 100, 200]
      })
    }
  }
}
