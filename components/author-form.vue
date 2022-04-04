<template>
  <v-card
    tile
    style="padding:20px;"
    elevation="0"
  >
    <v-card-title>Dodajte autora</v-card-title>
    <v-form
      @submit.prevent="submitAuthor"
    >
      <v-text-field
        label="Ime"
        v-model="author.name"
      ></v-text-field>
      <v-text-field
        label="Prezime"
        v-model="author.last_name"
      ></v-text-field>
      <v-text-field
        label="ORCHID"
        v-model="author.orcid"
      ></v-text-field>
      <v-text-field
        label="E-mail"
        v-model="author.email"
        type="email"
      ></v-text-field>
      <v-btn text tile type="submit">Pošalji</v-btn>
    </v-form>
  </v-card>
</template>

<script>

export default {

  name: "author-form",
  data: () => ({
    author: {
      name: '',
      last_name: '',
      orcid: '',
      email: '',
    },
  }),

  mounted() {

  },
  methods: {
    async submitAuthor() {
      await this.$axios.$post('/authors', this.author).then(response => {
        console.log(response);
        this.reset();
      }).catch((err) => {
        console.log(err)
        this.reset()
      })
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
