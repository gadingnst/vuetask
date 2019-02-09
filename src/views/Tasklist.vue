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
            <v-subheader v-if="ongoingTasks.length || !completedTasks.length">
              {{ (!ongoingTasks.length) ? 'List kosong. Silahkan Tambah Tugas Pertamamu !' : 'On Going' }}
            </v-subheader>

            <template v-for="(task, i) in ongoingTasks">
              <v-divider inset></v-divider>

              <v-list-tile :key="task.id" avatar @click="">
                <v-list-tile-avatar>
                  <v-icon class="blue white--text">fa fa-info</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="task.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="task.deadline"></v-list-tile-sub-title>
                </v-list-tile-content>
                
                <v-btn :icon="mobile" :ripple="mobile" :small="!mobile" @click="setCompleted(i, task)">
                  <v-icon color="green lighten-1">fa fa-check</v-icon>
                  {{ mobile ? '' : '&nbsp;Tandai sudah dikerjakan' }}
                </v-btn>
                <v-btn :icon="mobile" :ripple="mobile" :small="!mobile" @click="remove(i, task.id, 'ongoingTasks')">
                  <v-icon color="red lighten-1">fa fa-trash</v-icon>
                  {{ mobile ? '' : '&nbsp;Hapus' }}
                </v-btn>
              </v-list-tile>
            </template>
          </v-list>
          <v-list two-line>
            <v-subheader v-if="(ongoingTasks.length+completedTasks.length)">
              {{ (!completedTasks.length) ? 'Belum ada tugas yang sudah dikerjakan' : 'Sudah dikerjakan' }}
            </v-subheader>

            <template v-for="(task, i) in completedTasks">
              <v-divider inset></v-divider>

              <v-list-tile :key="task.id" avatar @click="">
                <v-list-tile-avatar>
                  <v-icon class="blue white--text">fa fa-info</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="task.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="task.deadline"></v-list-tile-sub-title>
                </v-list-tile-content>
                
                <v-btn :icon="mobile" :ripple="mobile" :small="!mobile" @click="setCompleted(i, task)">
                  <v-icon color="red lighten-1">fa fa-undo</v-icon>
                  {{ mobile ? '' : '&nbsp;Tandai belum dikerjakan' }}
                </v-btn>
                <v-btn :icon="mobile" :ripple="mobile" :small="!mobile" @click="remove(i, task, 'completedTasks')">
                  <v-icon color="red lighten-1">fa fa-trash</v-icon>
                  {{ mobile ? '' : '&nbsp;Hapus' }}
                </v-btn>
              </v-list-tile>
            </template>
          </v-list>
          <v-divider style="margin-bottom: 50px"></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    ongoingTasks: [],
    completedTasks: []
  }),
  computed: {
    mobile(){
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    ...mapActions({
      'setSnackbar': 'setSnackbar'
    }),
    async setCompleted(i, task){
      await db.update('tasks', { completed: !task.completed }, { id: task.id })
      if(!task.completed){
        this.ongoingTasks.splice(i, 1)
        this.completedTasks.push({
          id: task.id,
          name: task.name,
          completed: true
        })
        return
      }
      this.completedTasks.splice(i, 1)
      this.ongoingTasks.push({
        id: task.id,
        name: task.name,
        completed: false
      })
    },
    async remove(i, id, key){
      await db.delete('tasks', { id: id })
      this[key].splice(i, 1)
      this.setSnackbar({
        visible: true,
        msg: 'Tugas dihapus dari List'
      })
    }
  },
  mounted(){
    db.filter('tasks', { completed: false })
    .then(data => {
      this.ongoingTasks = data
    })
    db.filter('tasks', { completed: true })
    .then(data => {
      this.completedTasks = data
    })
  }
}
</script>