import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({ 
  routes: routes
})

router.beforeEach((to, from, next) => {
  const routeTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title).meta.title
  if(routeTitle) document.title = routeTitle+' — Vuetask'
  next()
})

export default router
