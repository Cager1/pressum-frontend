<template>
  <v-app>
    <v-navigation-drawer
      disable-resize-watcher
      app
      v-model="navDrawer"
      class="d-sm-none"
    >
      <v-row style="background-color: #084776">
        <v-col class="text-center mt-3">
          <img
            :src="require('../assets/images/pressum-logo-white.svg')"
            alt="logo"
            height="50"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <nuxt-link
            class="d-block mt-4"
            to="/"
            style="text-decoration: none !important"
          >
            <v-btn tile text color="grey darken-2" width="100%" x-large
              ><v-icon class="mr-10">mdi-home</v-icon>Početna<v-spacer
              ></v-spacer
            ></v-btn>
          </nuxt-link>

          <nuxt-link
            v-if="user.role !== undefined"
            class="d-block mt-4"
            to="/admin/knjige"
            style="text-decoration: none !important"
          >
            <v-btn
              v-if="
                user.role.name === 'Super Admin' || user.role.name === 'Admin'
              "
              tile
              text
              color="grey darken-2"
              width="100%"
              x-large
              ><v-icon class="mr-10">mdi-shield-account</v-icon>Admin<v-spacer
              ></v-spacer
            ></v-btn>
          </nuxt-link>
          <a
            v-if="logged"
            class="d-block mt-4"
            :href="`${oauthUrl}/logout?redirect_to=${appUrl}`"
            style="text-decoration: none !important"
          >
            <v-btn
              tile
              text
              color="grey darken-2"
              width="100%"
              x-large
              @click="logout"
              ><v-icon class="mr-10">mdi-logout</v-icon>Odjava<v-spacer
              ></v-spacer
            ></v-btn>
          </a>
          <a
            v-else
            class="d-block mt-4"
            :href="`${oauthUrl}/login?redirect_to=${appUrl}`"
            style="text-decoration: none !important"
          >
            <v-btn tile text color="grey darken-2" width="100%" x-large
              ><v-icon class="mr-10">mdi-login</v-icon>Prijava<v-spacer
              ></v-spacer
            ></v-btn>
          </a>
          <nuxt-link
            class="d-block mt-4"
            to="/sustav"
            style="text-decoration: none !important"
          >
            <v-btn tile text color="grey darken-2" width="100%" x-large
              ><v-icon class="mr-10">mdi-information</v-icon>O sustavu<v-spacer
              ></v-spacer
            ></v-btn>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <v-app-bar style="background-color: #084776" app>
      <nuxt-link to="/">
        <img
          :src="require('../assets/images/pressum-logo-white.svg')"
          alt="logo"
          height="50"
        />
      </nuxt-link>
      <nuxt-link to="/" style="height: 50%">
        <p>Knjige/e-Knjige</p>
      </nuxt-link>
      <v-spacer></v-spacer>
      <nuxt-link
        class="d-none d-sm-flex"
        to="/"
        style="text-decoration: none !important; height: 100%"
      >
        <v-btn text color="white" height="100%" tile>Početna</v-btn>
      </nuxt-link>
      <nuxt-link
        v-if="user.role !== undefined"
        class="d-none d-sm-flex"
        to="/admin/knjige"
        style="text-decoration: none !important; height: 100%"
      >
        <v-btn
          v-if="user.role.name === 'Super Admin' || user.role.name === 'Admin'"
          text
          color="white"
          height="100%"
          tile
          >Admin</v-btn
        >
      </nuxt-link>
      <a
        v-if="logged"
        class="d-none d-sm-flex"
        :href="`${oauthUrl}/logout?redirect_to=${appUrl}`"
        style="text-decoration: none !important; height: 100%"
      >
        <v-btn tile text color="white" height="100%" @click="logout"
          >Odjava</v-btn
        >
      </a>
      <a
        v-else
        class="d-none d-sm-flex"
        :href="`${oauthUrl}/login?redirect_to=${appUrl}`"
        style="text-decoration: none !important; height: 100%"
      >
        <v-btn tile text color="white" height="100%">Prijava</v-btn>
      </a>
      <nuxt-link
        class="d-none d-sm-flex"
        to="/sustav"
        style="text-decoration: none !important; height: 100%"
      >
        <v-btn text color="white" height="100%" tile>O sustavu</v-btn>
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
    <v-main
      v-if="!$slots.default"
      style="min-height: 500px !important"
      class="mb-16 mt-0"
    >
      <nuxt v-if="!loading" />
      <v-overlay :value="loading">
        <v-progress-circular
          indeterminate
          size="128"
          width="10"
        ></v-progress-circular>
      </v-overlay>
    </v-main>
    <v-main v-else style="min-height: 500px !important" class="mb-16">
      <slot v-if="!loading" />
      <v-overlay :value="loading">
        <v-progress-circular
          indeterminate
          size="128"
          width="10"
        ></v-progress-circular>
      </v-overlay>
    </v-main>
    <Footer />
    <application-snackbar />
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",

  data() {
    return {
      navDrawer: false,
      logged: false,
    };
  },

  mounted() {
    this.$store.dispatch("userStore/getUser");
    this.loggedIn();
    console.log(this.$store.getters["userStore/userGetter"]);
  },
  computed: {
    user() {
      return this.$store.getters["userStore/userGetter"];
    },

    loading() {
      return this.$store.getters["userStore/loadingGetter"];
    },
    oauthUrl() {
      return process.env.NUXT_OAUTH_URL;
    },
    appUrl() {
      return process.env.NUXT_APP_URL;
    },
  },

  methods: {
    logout() {
      this.$store.commit("userStore/logoutUser");
    },

    async loggedIn() {
      this.logged =
        Object.keys(this.$store.getters["userStore/userGetter"]).length > 0;
    },
  },
};
</script>

<style scoped>
nuxt-link {
  text-decoration: none !important;
  color: white !important;
}

a {
  text-decoration: none;
  color: white;
}
</style>
