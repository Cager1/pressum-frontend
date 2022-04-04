<template>
  <v-container>
    <v-app>
      <v-app-bar
        color=""
        flat
        prominent
      ></v-app-bar>
      <v-app-bar
        flat
        dense
      >
        <nuxt-link style="text-decoration: none;" to="/"><v-btn tile text>Početna</v-btn></nuxt-link>
        <nuxt-link style="text-decoration: none;" to="knjige"><v-btn tile text>Za Autore</v-btn></nuxt-link>
        <nuxt-link style="text-decoration: none;" to="publikacije"><v-btn tile text>Publikacije</v-btn></nuxt-link>
      </v-app-bar>
      <v-main>

          <Nuxt />
      </v-main>
    </v-app>
  </v-container>

</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
