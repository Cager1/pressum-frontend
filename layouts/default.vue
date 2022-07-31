<template>
  <v-app>
    <v-navigation-drawer disable-resize-watcher app v-model="navDrawer" class="d-sm-none">
      <v-row style="background-color: #084776">
        <v-col class="text-center mt-3">
          <img :src="require('../assets/images/pressum-logo-white.svg')"
               alt="logo"
               height="50"
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <nuxt-link class="d-block mt-4" v-for="(link, index) in links" :to="link.to" style="text-decoration: none !important;">
            <v-btn
              tile
              text
              color="grey darken-2"
              width="100%"
              x-large

            ><v-icon class="mr-10">{{ link.icon }}</v-icon>{{ link.title }}<v-spacer></v-spacer></v-btn>
          </nuxt-link>
        </v-col>
      </v-row>


    </v-navigation-drawer>
    <v-app-bar style="background-color: #084776" app>
      <nuxt-link to="/">
        <img :src="require('../assets/images/pressum-logo-white.svg')"
             alt="logo"
             height="50"
        >
      </nuxt-link>
      <v-spacer></v-spacer>
      <nuxt-link class="d-none d-sm-flex" v-for="(link, index) in links" :to="link.to" style="text-decoration: none !important; height: 100%">
        <v-btn
          text
          color="white"
          height="100%"
          tile
        >{{ link.title }}</v-btn>
      </nuxt-link>
      <v-btn
        plain
        class="d-sm-none mr-5"
        color="white"
        @click="navDrawer = !navDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>

  </v-app>

</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      navDrawer: false,

      links: [
        {
          title: 'Početna',
          icon: 'mdi-home',
          to: '/'
        },
        {
          title: 'Knjige',
          icon: 'mdi-book',
          to: '/knjige'
        },
        {
          title: 'Publikacije',
          icon: 'mdi-newspaper',
          to: '/publikacije'
        }
      ],
    }
  },
}
</script>

<style scoped>
 nuxt-link {
   text-decoration: none !important;
   color: white !important;
 }
</style>
