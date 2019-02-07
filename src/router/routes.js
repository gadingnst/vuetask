import Home from '@/views/Home'
import Tasklist from '@/views/Tasklist'

export default [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Beranda'
    }
  },
  {
    path: '/list',
    name: 'List',
    component: Tasklist,
    meta: {
      title: 'List Tugas'
    }
  }
]