import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default {
  install(Vue, options) {
    Vue.progress = NProgress
    window.progress = NProgress
    Vue.mixin({
      mounted() {
        NProgress.done()
      }
    })
  }
}