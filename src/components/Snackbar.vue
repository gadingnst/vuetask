<template lang="html">
  <v-snackbar
    :value.sync="visibility"
    :timeout="timeout"
    :color="color"
    :bottom="'bottom'"
    :left="'left'"
  >
    {{ message }}
    <v-btn
      :color="color ? 'white' : 'pink'"
      @click="set"
      flat
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      visibility: state => state.snackbar.visibility,
      message: state => state.snackbar.message,
      timeout: state => state.snackbar.timeout,
      color: state => state.snackbar.color
    })
  },
  methods: {
    ...mapMutations({
      set: 'setSnackbar'
    })
  }
}
</script>
