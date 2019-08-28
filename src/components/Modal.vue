<template>
  <v-dialog v-model="modal" :max-width="width">
    <v-card>
      <v-card-title>
        <slot name="title"></slot>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text :height="height">
        <slot name="body"></slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    width: String,
    height: String
  },
  computed: {
    ...mapState({
      dialog: state => state.modal
    }),
    modal: {
      get(){ return this.dialog },
      set(val){ this.setModal(val) }
    }
  },
  methods: {
    ...mapMutations({
      setModal: 'setModal'
    })
  }
}
</script>