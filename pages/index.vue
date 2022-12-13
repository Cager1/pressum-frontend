<template>
  <v-container>
    <v-btn link :href="`http://localhost:8000/oauth/login?redirect_to=http://localhost:3000`">Login</v-btn>
    <v-btn @click="logout" link href="http://localhost:8000/oauth/logout?redirect_to=http://localhost:3000">Logout</v-btn>
    <div v-if="logged">Logged in</div>
    <div v-else>Not logged in</div>
  </v-container>

</template>


<script>

export default {
  name: 'IndexPage',
  data() {
    return {
      logged: false,
    }
  },

  methods: {
    logout() {
      this.$store.commit("userStore/logoutUser");
    },

    async loggedIn() {
      console.log(Object.keys(this.user).length)
      this.logged = Object.keys(this.$store.getters['userStore/userGetter']).length > 0;
    },
  },

  mounted() {
    console.log("mounted", this.user);
    this.loggedIn()
  },

  computed: {
    user() {
       return this.$store.getters["userStore/userGetter"];
    },

    loading() {
      return this.$store.getters["userStore/loadingGetter"];
    },
  },

}
</script>
