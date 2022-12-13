<template>
  <v-card
    tile
    style="padding: 0 20px;"
    elevation="0"
    max-width="700"
  >
    <v-card-title style="color: #084776; padding-left: 0 !important;">Dodavanje autora</v-card-title>
    <v-form
      @submit.prevent="submitAuthor"
    >
      <v-text-field
        label="Ime"
        v-model="author.name"
        color="#084776"
        outlined
      ></v-text-field>
      <v-text-field
        label="Prezime"
        v-model="author.last_name"
        color="#084776"
        outlined
      ></v-text-field>
      <v-autocomplete
        label="Korisnik"
        v-model="author.user_uid"
        :items="users"
        item-text="name"
        item-value="uid"
        color="#084776"
        outlined></v-autocomplete>
      <v-text-field
        label="ORCHID"
        v-model="author.orcid"
        color="#084776"
        outlined
      ></v-text-field>
      <v-text-field
        label="E-mail"
        v-model="author.email"
        type="email"
        color="#084776"
        outlined
      ></v-text-field>
      <v-btn text color="white" style="background: red" :disabled="disabled" type="submit">Pošalji</v-btn>
    </v-form>
  </v-card>
</template>

<script>

import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {

  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },

  name: "author-form",
  data: () => ({
    author: {
      name: '',
      last_name: '',
      orcid: '',
      email: '',
      created_by: 'fcrnogorac',
      user_uid: null,
    },
    timer: null,
    disabled: false,
    users: [],
  }),

  mounted() {
    this.getUsers();

  },
  methods: {
    async submitAuthor() {
      this.disabled = true;
      await this.$axios.$post('/authors', this.author).then(response => {
        console.log("autor sumbited:", response);
        this.$notifier.showMessage({ content: 'Autor uspješno napravljen', color: 'success' })
        this.reset();
      }).catch((err) => {
        this.$notifier.showMessage({ content: 'Greška prilikom kreiranja autora', color: 'error' })
        this.reset()
      })

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.disabled = false;
      }, 2000);
    },

    // get all users
    async getUsers() {
      this.users = await this.$axios.$get('/users');
      console.log("users", this.users);
    },

    reset() {
      this.author.name = '';
      this.author.last_name = '';
      this.author.orcid = '';
      this.author.email = '';

    },
  }
}
</script>

<style scoped>

</style>
