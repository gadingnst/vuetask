import Moment from 'moment'

export default {
  install(Vue, options) {
    Vue.moment = Moment
    window.moment = Moment
  }
}
