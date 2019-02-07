<template>
  <v-container fill-height fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-icon size="18px">fa fa-edit</v-icon>
            <v-toolbar-title>Tambah Tugas Baru</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-list subheader>
              <v-subheader v-if="!tasks.length">
                Silahkan Tambah Tugas Pertamamu !
              </v-subheader>
              <v-list-tile
                v-for="(task, i) in tasks"
                :key="i"
                @click=""
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ task.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ task.deadline }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-btn icon @click="remove(i)">
                  <v-icon color="red lighten-1">fa fa-close</v-icon>
                </v-btn>
              </v-list-tile>
            </v-list>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="name.value"
                :counter="name.length"
                :rules="name.rules"
                label="Nama Tugas"
                @keypress.prevent.enter="add"
                required
              ></v-text-field>
              <v-container>
                <v-btn block :disabled="!valid" class="cyan white--text" @click="add">
                  Tambah
                </v-btn>
                <v-btn block :disabled="!tasks.length" color="success" @click="clear(true)">
                  Simpan ke List
                </v-btn>
                <v-btn block :disabled="!tasks.length" color="error" @click="clear(false)">
                  Clear
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
  export default {
    data: () => ({
      valid: true,
      tasks: []
    }),
    computed: {
      name() {
        return {
          value: '',
          length: 30,
          rules: [
            val => !!val || 'Nama Tugas harus di isi !',
            val => (val && val.length <= this.name.length) || `Nama Tugas tidak boleh lebih dari ${this.name.length} karakter`
          ]
        }
      }
    },
    methods: {
      add(){
        if (this.$refs.form.validate()) {
          this.tasks.push({
            name: this.name.value
          })
          this.name.value = ''
        }
      },
      remove(index){
        this.tasks.splice(index, 1)
      },
      clear(save = false){
        if(save) db.insert(this.tasks)
        this.tasks = []
      }
    }
  }
</script>