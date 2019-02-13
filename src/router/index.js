import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({ 
  routes: routes
})

router.beforeEach((to, from, next) => {
  Vue.progress.start()
  const routeTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title).meta.title
  if(routeTitle) document.title = routeTitle+' — Vuetask'
  next()
})

router.afterEach(() => {
  Vue.progress.set(0.6)
  Vue.progress.inc()
})

export default router
