<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      class="cyan darken-2 flex text-xs-center"
      flat
      tile
    >
      <v-card-text class="" align-center>
        <v-btn
          v-for="(contact, i) in contacts"
          :key="i"
          target="_blank"
          :href='contact.link'
          class="mx-3"
          dark
          icon
        >
          <v-icon size="24px">{{ contact.icon }}</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text>
        "Learner, Coder, Coffee Maniac"
      </v-card-text>
      <v-card-actions class="cyan darken-3 justify-center">
        &copy;2019 — <strong><b>&nbsp;&lt;&nbsp;/&gt;</b>&nbsp;with 💙 by&nbsp;<b>Sutan Nst</b></strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      contacts: [
        { icon: 'fa fa-envelope', link: 'mailto:sutan.gnst@gmail.com' },
        { icon: 'fa fa-github', link: 'https://github.com/sutanlab' },
        { icon: 'fa fa-facebook', link: 'https://facebook.com/sgnzst' },
        { icon: 'fa fa-instagram', link: 'https://www.instagram.com/sutan_gnst' }
      ]
    })
  }
</script>