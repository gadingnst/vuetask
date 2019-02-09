<template>
  <v-container fill-height fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-dialog
          ref="dialog"
          v-model="dialog"
          :return-value.sync="date"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-date-picker color="cyan" v-model="selectedTask.deadline" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="cyan" @click="dialog = false">OK</v-btn>
          </v-date-picker>
        </v-dialog>
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-icon size="18px">fa fa-edit</v-icon>
            <v-toolbar-title>Tambah Tugas Baru</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-list subheader>
              <v-subheader v-if="!tasks.length">
                Silahkan Tambah Tugasmu !
              </v-subheader>
              <v-list-tile
                v-for="(task, i) in tasks"
                :key="i"
                @click=""
              >
                <v-list-tile-content @click="selectTask(task, i)">
                  <v-list-tile-title>{{ task.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    <v-icon>fa fa-calendar</v-icon>
                    Deadline: {{ task.deadline }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-btn icon @click="remove(i)">
                  <v-icon color="red lighten-1">fa fa-close</v-icon>
                </v-btn>
              </v-list-tile>
            </v-list>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                outline
                append-icon="fa fa-pencil"
                v-model="name.value"
                :counter="name.length"
                :rules="name.rules"
                label="Nama Tugas"
                @keypress.prevent.enter="add"
                required
              ></v-text-field>
              <v-container>
                <v-btn block :disabled="!valid" class="cyan white--text" @click="add">
                  <v-icon>fa fa-pencil-square</v-icon>
                  &nbsp;Tambah
                </v-btn>
                <v-btn block :loading="loading" :disabled="!tasks.length" color="success" @click="clear(true)">
                  <v-icon>fa fa-list-alt</v-icon>
                  &nbsp;Simpan ke List
                </v-btn>
                <v-btn block :disabled="!tasks.length" color="error" @click="clear()">
                  <v-icon>fa fa-refresh</v-icon>
                  &nbsp;Clear
                </v-btn>
              </v-container>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import uuid from 'uuid/v4'

export default {
  data: () => ({
    dialog: false,
    valid: true,
    loading: false,
    selectedTask: {},
    tasks: [],
    date: new Date().toISOString().substr(0, 10)
  }),
  computed: {
    name() {
      return {
        value: '',
        length: 60,
        rules: [
          val => !(!val) || 'Nama Tugas harus di isi !',
          val => (val && val.length <= this.name.length) || `Nama Tugas tidak boleh lebih dari ${this.name.length} karakter`
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      'setSnackbar': 'setSnackbar'
    }),
    add(){
      if (this.$refs.form.validate()) {
        this.tasks.push({
          id: uuid(),
          name: this.name.value,
          completed: null,
          deadline: this.date,
          created: this.date
        })
        this.name.value = ''
      }
    },
    remove(index){
      this.tasks.splice(index, 1)
    },
    selectTask(task){
      this.dialog = true
      this.selectedTask = task
    },
    async clear(save = false){
      if(save) {
        this.loading = true
        const result = await db.insert('tasks', this.tasks)
        this.setSnackbar({
          visible: true,
          msg: `${result} Tugas disimpan ke List`,
          color: 'success'
        })
        this.loading = false
      }
      this.tasks = []
    }
  }
}
</script>