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
          
          <v-list three-line>
            <v-subheader v-if="ongoingTasks.length || !completedTasks.length">
              {{ (!ongoingTasks.length) ? 'List kosong. Silahkan Tambah Tugas Pertamamu !' : 'On Going' }}
            </v-subheader>

            <template v-for="(task, i) in ongoingTasks">
              <v-divider></v-divider>

              <v-list-tile :key="task.id" avatar @click="">
                <v-list-tile-avatar>
                  <v-icon :class="deadlineTag(task.deadline).class">{{ deadlineTag(task.deadline).emot }}</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>
                    <v-icon color="error">fa fa-calendar-times-o</v-icon>
                    {{ 'Deadline: '+formatDate(task.deadline) }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ task.name+' | '+dayleft(task.deadline) }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                
                <v-list-tile-action>
                  <v-btn :icon="mobile" :ripple="mobile" :small="!mobile" @click="setCompleted(i, task)">
                    <v-icon color="green lighten-1">fa fa-check</v-icon>
                    {{ mobile ? '' : '&nbsp;Tandai sudah dikerjakan' }}
                  </v-btn>
                  <v-btn :icon="mobile" :ripple="mobile" :small="!mobile" @click="remove(i, task.id, 'ongoingTasks')">
                    <v-icon color="red lighten-1">fa fa-trash</v-icon>
                    {{ mobile ? '' : '&nbsp;Hapus' }}
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
          <v-list three-line>
            <v-subheader v-if="(ongoingTasks.length+completedTasks.length)">
              {{ (!completedTasks.length) ? 'Belum ada tugas yang sudah dikerjakan' : 'Sudah dikerjakan' }}
            </v-subheader>

            <template v-for="(task, i) in completedTasks">
              <v-divider></v-divider>

              <v-list-tile :key="task.id" avatar @click="">
                <v-list-tile-avatar>
                  <v-icon class="success white--text">fa fa-check</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>
                    <v-icon color="success">fa fa-calendar-check-o</v-icon>
                    {{ 'Selesai: '+formatDate(task.completed) }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ task.name+' | dibuat: '+task.created }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                
                <v-list-tile-action>
                  <v-btn :icon="mobile" :ripple="mobile" :small="!mobile" @click="setCompleted(i, task)">
                    <v-icon color="orange lighten-1">fa fa-undo</v-icon>
                    {{ mobile ? '' : '&nbsp;Tandai belum dikerjakan' }}
                  </v-btn>
                  <v-btn :icon="mobile" :ripple="mobile" :small="!mobile" @click="remove(i, task.id, 'completedTasks')">
                    <v-icon color="red lighten-1">fa fa-trash</v-icon>
                    {{ mobile ? '' : '&nbsp;Hapus' }}
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
          <v-divider style="margin-bottom: 80px"></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  data: () => ({
    ongoingTasks: [],
    completedTasks: [],
  }),
  computed: {
    mobile(){
      return this.$vuetify.breakpoint.smAndDown
    },
    date(){
      return this.$store.getters.datenow
    }
  },
  methods: {
    ...mapActions({
      'setSnackbar': 'setSnackbar'
    }),
    diffDate(deadline){
      return moment(deadline).diff(this.date, 'days')
    },
    dayleft(deadline){
      const diff = this.diffDate(deadline)
      return (diff > 0) ? `Tersisa ${diff} hari lagi.` : (diff === 0) ? 'Deadline hari ini' : 'Deadline telah lewat'
    },
    formatDate(date){
      return moment(date).format('DD/MM/YYYY')
    },
    deadlineTag(deadline){
      const diff = this.diffDate(deadline)
      if(diff > 6) return { class: 'primary white--text', emot: 'fa fa-smile-o'}
      else if (diff <= 5 && diff > 2) return { class: 'warning white--text', emot: 'fa fa-meh-o'}
      else return { class: 'error white--text', emot: 'fa fa-frown-o'}
    },
    async setCompleted(i, task){
      if(!task.completed){
        await db.update('tasks', { completed: this.date }, { id: task.id })
        this.ongoingTasks.splice(i, 1)
        this.completedTasks.push({
          id: task.id,
          name: task.name,
          completed: this.date,
          deadline: task.deadline,
          created: task.created
        })
      } else {
        await db.update('tasks', { completed: null }, { id: task.id })
        this.completedTasks.splice(i, 1)
        this.ongoingTasks.push({
          id: task.id,
          name: task.name,
          completed: null,
          deadline: task.deadline,
          created: task.created
        })
      }
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
    db.fetch('tasks')
    .then(datas => {
      for(let data of datas){
        if(data.completed === null) this.ongoingTasks.push(data)
        else this.completedTasks.push(data)
      }
    })
  }
}
</script>