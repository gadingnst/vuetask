<template>
  <v-container fill-height fluid>
    <v-layout row wrap center>
      <v-flex xs12>
        <Modal height="300px" width="500px">
          <template slot="title">
            <v-icon size="18px">fa fa-question-circle</v-icon>
            &nbsp;<b>Petunjuk</b>
            <v-spacer></v-spacer>
            <v-menu offset-x bottom left>
              <v-btn icon slot="activator">
                <v-icon>fa fa-ellipsis-v</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click="modalList = false">
                  <v-list-tile-title>Info Penyimpanan</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="modalList = true">
                  <v-list-tile-title>Info Status</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </template>
          <template slot="body">
            <v-slide-x-reverse-transition mode="out-in">
              <v-container v-if="!modalList">
                <v-avatar size="22px" color="warning">
                  <v-icon>fa fa-info</v-icon>
                </v-avatar>
                <span slot="opposite">
                  Penting! Data tersimpan pada Local Storage Browser. Kamu akan kehilangan datamu jika History Browsermu diclear, kamu bisa mengecualikan Aplikasi ini dalam pembersihan historymu.
                </span>
              </v-container>
              <v-list three-line v-if="modalList">
                <v-list-tile avatar v-for="(hint, i) in hints" :key="i">
                  <v-list-tile-avatar>
                    <v-icon :class="hint.class">{{ hint.icon }}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    {{ hint.desc }}
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-slide-x-reverse-transition>
          </template>
          <template slot="actions">
            <v-spacer></v-spacer>
            <v-btn color="cyan" flat @click="setModal(false)">Close</v-btn>
          </template>
        </Modal>
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-icon size="18px">fa fa-list-alt</v-icon>
            <v-toolbar-title>List Tugas</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="allowPush">
              <v-icon size="18px">fa fa-bell</v-icon>
            </v-btn>
            <v-btn icon @click="setModal">
              <v-icon size="18px">fa fa-question</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list three-line>
            <v-subheader v-if="totalTasks">
              <v-progress-linear 
                v-model="completedPercentage"
                :color="(completedPercentage > 69) ? 'success' : (completedPercentage > 32) ? 'warning' : 'error'"
              >
              </v-progress-linear>
              <v-subheader>{{ completedPercentage+'%' }}</v-subheader>
            </v-subheader>
            <v-subheader v-if="ongoingTasks.length || !completedTasks.length">
              {{ (!ongoingTasks.length) ? 'List kosong. Silahkan Tambah Tugas Pertamamu !' : `On Going. ${completedTasks.length} dari ${totalTasks} dikerjakan.` }}
            </v-subheader>

            <v-slide-x-reverse-transition group tag="v-list">
              <template v-for="(task, i) in ongoingTasks">
                <v-divider :key="task.id+task.name"></v-divider>
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
            </v-slide-x-reverse-transition>
          </v-list>
          <v-list three-line>
            <v-subheader v-if="(ongoingTasks.length+completedTasks.length)">
              {{ (!completedTasks.length) ? 'Belum ada tugas yang sudah dikerjakan' : 'Sudah dikerjakan' }}
            </v-subheader>
            <v-slide-x-transition group tag="v-list">
              <template v-for="(task, i) in completedTasks">
                <v-divider :key="task.id+task.name"></v-divider>

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
            </v-slide-x-transition>
          </v-list>
          <v-divider style="margin-bottom: 80px"></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Modal from '@/components/Modal'
import { mapActions, mapMutations } from 'vuex'

export default {
  components: { Modal },
  data: () => ({
    modalList: false,
    ongoingTasks: [],
    completedTasks: [],
    hints: [
      { class: 'primary white--text', icon: 'fa fa-smile-o', desc: 'Aman : Deadline masih diatas seminggu.' },
      { class: 'warning white--text', icon: 'fa fa-meh-o', desc: 'Kurang Aman : Deadline menghampirimu. Kerjakan sekarang lebih baik daripada menunda.' },
      { class: 'error white--text', icon: 'fa fa-frown-o', desc: 'Bahaya : Deadline sudah dekat. Silahkan kerjakan tugasmu sekarang !' }
    ]
  }),
  computed: {
    mobile(){
      return this.$vuetify.breakpoint.smAndDown
    },
    date(){
      return this.$store.getters.datenow
    },
    totalTasks(){
      return this.ongoingTasks.length+this.completedTasks.length
    },
    completedPercentage(){
      return parseInt((this.completedTasks.length / (this.totalTasks)) * 100)
    }
  },
  methods: {
    ...mapMutations({
      setModal: 'setModal'
    }),
    ...mapActions({
      setSnackbar: 'setSnackbar',
      push: 'notify'
    }),
    allowPush(){
      notify({
        title: 'Notifikasi Diaktifkan',
        body: 'Anda telah mengaktifkan notifikasi aplikasi ini.'
      })
    },
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
      this.sortTasks({
        ongoing: {
          key: 'deadline'
        }, 
        completed: {
          key: 'completed',
          order: 'desc'
        }
      })
    },
    async remove(i, id, key){
      await db.delete('tasks', { id: id })
      this[key].splice(i, 1)
      this.sortTasks({
        ongoing: {
          key: 'deadline'
        }, 
        completed: {
          key: 'completed',
          order: 'desc'
        }
      })
      this.setSnackbar({
        visible: true,
        msg: 'Tugas dihapus dari List'
      })
    },
    sortValues(key, order = 'asc') {
      return (a, b) => {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0
        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
        let comparison = 0
        if (varA > varB) comparison = 1
        else if (varA < varB) comparison = -1
        return (order.toLowerCase() === 'desc') ? (comparison * -1) : comparison
      }
    },
    sortTasks(prop){
      this.ongoingTasks.sort(this.sortValues(prop.ongoing.key, prop.ongoing.order))
      this.completedTasks.sort(this.sortValues(prop.completed.key, prop.completed.order))
    }
  },
  mounted(){
    db.fetch('tasks')
    .then(datas => {
      for(let data of datas){
        if(data.completed === null) this.ongoingTasks.push(data)
        else this.completedTasks.push(data)
      }
      this.sortTasks({
        ongoing: {
          key: 'deadline'
        }, 
        completed: {
          key: 'completed',
          order: 'desc'
        }
      })
    })
  },
  beforeDestroy(){
    this.ongoingTasks = []
    this.completedTasks = []
  }
}
</script>