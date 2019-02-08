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
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  components: {
    Snackbar, Navbar, Sidebar, Footer
  },
  beforeMount(){
    db.init()
  }
}
</script>