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
          <nuxt-link class="d-block mt-4" to="/" style="text-decoration: none !important;">
            <v-btn
              tile
              text
              color="grey darken-2"
              width="100%"
              x-large

            ><v-icon class="mr-10">mdi-home</v-icon>Početna<v-spacer></v-spacer></v-btn>
          </nuxt-link>
          <nuxt-link class="d-block mt-4" to="/knjige" style="text-decoration: none !important;">
            <v-btn
              tile
              text
              color="grey darken-2"
              width="100%"
              x-large

            ><v-icon class="mr-10">mdi-book</v-icon>Moje Knjige<v-spacer></v-spacer></v-btn>
          </nuxt-link>
          <nuxt-link class="d-block mt-4" to="/publikacije" style="text-decoration: none !important;">
            <v-btn
              tile
              text
              color="grey darken-2"
              width="100%"
              x-large

            ><v-icon class="mr-10">mdi-newspaper</v-icon>Publikacije<v-spacer></v-spacer></v-btn>
          </nuxt-link>
          <nuxt-link v-if="user.role !== undefined" class="d-block mt-4" to="/admin" style="text-decoration: none !important;">
            <v-btn
              v-if="user.role.name === 'Super Admin' || user.role.name === 'Admin'"
              tile
              text
              color="grey darken-2"
              width="100%"
              x-large

            ><v-icon class="mr-10">mdi-shield-account</v-icon>Admin<v-spacer></v-spacer></v-btn>
          </nuxt-link>
          <a v-if="logged" class="d-block mt-4" :href="'http://localhost:8000/oauth/logout?redirect_to=http://localhost:3000'" style="text-decoration: none !important;">
            <v-btn
              tile
              text
              color="grey darken-2"
              width="100%"
              x-large
              @click="logout"

            ><v-icon class="mr-10">mdi-logout</v-icon>Odjava<v-spacer></v-spacer></v-btn>
          </a>
          <a v-else class="d-block mt-4" :href="`http://localhost:8000/oauth/login?redirect_to=http://localhost:3000`" style="text-decoration: none !important;">
            <v-btn
              tile
              text
              color="grey darken-2"
              width="100%"
              x-large

            ><v-icon class="mr-10">mdi-login</v-icon>Prijava<v-spacer></v-spacer></v-btn>
          </a>

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
      <nuxt-link class="d-none d-sm-flex"  to="/" style="text-decoration: none !important; height: 100%">
        <v-btn
          text
          color="white"
          height="100%"
          tile
        >Početna</v-btn>
      </nuxt-link>
      <nuxt-link v-if="user.role !== undefined" class="d-none d-sm-flex"  to="/knjige" style="text-decoration: none !important; height: 100%">
        <v-btn
          v-if="user.role.name !== 'Korisnik'"
          text
          color="white"
          height="100%"
          tile
        >Moje Knjige</v-btn>
      </nuxt-link>
      <nuxt-link class="d-none d-sm-flex"  to="/publikacije" style="text-decoration: none !important; height: 100%">
        <v-btn
          text
          color="white"
          height="100%"
          tile
        >Publikacije</v-btn>
      </nuxt-link>
      <nuxt-link v-if="user.role !== undefined" class="d-none d-sm-flex"  to="/admin" style="text-decoration: none !important; height: 100%">
        <v-btn
          v-if="user.role.name === 'Super Admin' || user.role.name === 'Admin'"
          text
          color="white"
          height="100%"
          tile
        >Admin</v-btn>
      </nuxt-link>
      <a v-if="logged"  class="d-none d-sm-flex" :href="'http://localhost:8000/oauth/logout?redirect_to=http://localhost:3000'"  style="text-decoration: none !important; height: 100%">
      <v-btn
        tile
        text
        color="white"
        height="100%"
        @click="logout"
      >Odjava</v-btn>
      </a>
      <a v-else  class="d-none d-sm-flex" :href="`http://localhost:8000/oauth/login?redirect_to=http://localhost:3000`"  style="text-decoration: none !important; height: 100%">
        <v-btn
          tile
          text
          color="white"
          height="100%"

        >Prijava</v-btn>
      </a>
      <v-btn
        plain
        class="d-sm-none mr-5"
        color="white"
        @click="navDrawer = !navDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main style="min-height: 500px !important;" class="mb-16">
      <nuxt v-if="!loading" />
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="128" width="10"></v-progress-circular>
      </v-overlay>
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
    <application-snackbar />
  </v-app>

</template>

<script>
export default {
  name: 'DefaultLayout',

  data () {
    return {
      navDrawer: false,
      logged: false,
    }
  },

  mounted() {
    console.log(this.user)
    this.loggedIn();
  },
  computed: {
    user() {
      return this.$store.getters["userStore/userGetter"];
    },

    loading() {
      return this.$store.getters["userStore/loadingGetter"];
    },
  },

  methods: {
    logout() {
      this.$store.commit("userStore/logoutUser");
    },

    async loggedIn() {
      console.log(Object.keys(this.user).length)
      this.logged = Object.keys(this.$store.getters['userStore/userGetter']).length > 0;
    },
  }
}
</script>

<style scoped>
 nuxt-link {
   text-decoration: none !important;
   color: white !important;
 }
</style>
