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
    <v-main class="mb-16">
      <nuxt />
    </v-main>
    <v-footer style="background: rgb(76, 76, 76); color: lightgrey">
      <v-container>
        <v-row>
          <v-col>
            <v-img
            :src="require('../assets/images/sum-siva.svg')"
            alt="logo"
            contain
            height="100"
            class="mr-5"
          ></v-img>
          </v-col>
          <v-col>
            <div>
              <v-icon class="mr-5" color="grey">mdi-map-marker</v-icon>
              Trg hrvatskih velikana 1 88000 Mostar, BiH
            </div>
            <div class="mt-5">
              <v-icon class="mr-5" color="grey">mdi-phone</v-icon>
              +387 63 389-500
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-16 mb-5" justify="center">
          <v-icon  color="grey" class="mr-5">mdi-facebook</v-icon>
          <a href="https://www.instagram.com/sumit.sum.ba/?hl=en" style="text-decoration: none" target="_blank"><v-icon  color="grey" class="mr-5">mdi-instagram</v-icon></a>
          <a href="https://twitter.com/sve_mostar?lang=en" style="text-decoration: none" target="_blank"><v-icon  color="grey" class="mr-5">mdi-twitter</v-icon></a>
        </v-row>
      </v-container>
      <v-container fluid>
        <v-divider color="grey"></v-divider>
        <p class="mr-4 mt-5 text-center">Copyright ©2022 Sveučilište u Mostaru. Sva prava pridržana. Razvio i dizajnirao Centar za informacijske tehnologije Sveučilišta u Mostaru – SUMIT</p>
      </v-container>



    </v-footer>

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
          title: 'Admin',
          icon: 'mdi-shield-crown',
          to: '/admin'
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
