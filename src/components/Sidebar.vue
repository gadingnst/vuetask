<template>
  <v-navigation-drawer
    v-model="sidebar"
    fixed
    right
    app
  >
    <v-list dense>
      <template v-for="(route, index) in routes">
        <v-list-tile :to="route.link" :key="index">
          <v-list-tile-action>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ route.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data:() => ({
    routes: [
      { link: '/', title: 'Beranda', icon: 'fa fa-home' },
      { link: '/list', title: 'List Tugas', icon: 'fa fa-book' }
    ]
  }),
  methods: {
    ...mapMutations({
      setSidebar: 'setSidebar'
    })
  },
  computed: {
    ...mapState({
      drawer: state => state.sidebar
    }),
    sidebar: {
      get(){
        return this.drawer
      },
      set(val){
        this.setSidebar(val)
      }
    }
  }
}
</script>