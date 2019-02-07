<template>
  <v-toolbar color="cyan" dark fixed app>
    <v-toolbar-title>Vuetask App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon @click.stop="set(!sidebar)"></v-toolbar-side-icon>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      sidebar: state => state.sidebar
    })
  },
  methods: {
    ...mapMutations({
      'set': 'setSidebar'
    })
  }
}
</script>