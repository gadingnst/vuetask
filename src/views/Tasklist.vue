<template>
  <v-container fill-height fluid>
    <v-layout row wrap center>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-icon size="18px">fa fa-list-alt</v-icon>
            <v-toolbar-title>List Tugas</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list two-line>
            <v-subheader v-if="!tasks.length">
              List kosong. Silahkan Tambah Tugas Pertamamu !
            </v-subheader>
            <template v-for="(task, i) in tasks">
              <v-divider inset></v-divider>

              <v-list-tile :key="task.id" avatar @click="">
                <v-list-tile-avatar>
                  <v-icon class="blue white--text">fa fa-info</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="task.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="task.deadline"></v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple @click="remove(i, task.id)">
                    <v-icon color="red lighten-1">fa fa-trash</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
          <v-divider style="margin-bottom: 150px"></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    tasks: []
  }),
  methods: {
    ...mapActions({
      'setSnackbar': 'setSnackbar'
    }),
    remove(i, id){
      this.tasks.splice(i, 1)
      db.delete(id)
      this.setSnackbar({
        visible: true,
        msg: 'Tugas dihapus dari List'
      })
    }
  },
  mounted(){
    this.tasks = db.fetch()
  }
}
</script>