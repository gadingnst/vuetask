<template>
  <v-app>
    <Snackbar />
    <main>
      <Navbar />
      <Sidebar />
      <v-content>
        <v-slide-y-reverse-transition mode="out-in">
          <router-view />
        </v-slide-y-reverse-transition>
        <Footer />
      </v-content>
    </main>
    <Offline @detected-condition="connection" />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Offline from 'v-offline'
import Snackbar from './components/Snackbar'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

export default {
  components: {
    Snackbar, Navbar, Sidebar, Footer, Offline
  },
  methods: {
    ...mapActions({
      setSnackbar: 'setSnackbar'
    }),
    connection(status){
      if (!status){
        this.setSnackbar({
          visible: true,
          msg: 'Tidak ada internet !'
        })
      }
    }
  },
  beforeMount() {
    new window.db('vuetaskdb')
      .createTable('tasks', {
        id: 'STRING PRIMARY KEY',
        name: 'STRING',
        deadline: 'DATE',
        completed: 'DATE',
        created: 'DATE'
      })
  }
}
</script>