<template>

  <v-card
    tile
    style="padding:20px;"
    elevation="0"
  >
    <v-card-title>Dodajte znanost</v-card-title>
    <v-form
      @submit.prevent="submitScience"
    >
      <v-text-field
        label="Ime"
        v-model="science.name"
      ></v-text-field>
      <v-btn text tile type="submit">Pošalji</v-btn>
    </v-form>
  </v-card>
</template>

<script>

export default {

  name: "science-form",
  data: () => ({
    science: {
      name: '',
    },
  }),

  mounted() {

  },
  methods: {
    async submitScience() {
      await this.$axios.$post('/sciences', this.science).then(response => {
        console.log(response);
        this.reset();
      }).catch((err) => {
        console.log(err);
        this.reset();
      })
    },

    reset() {
      this.science.name = '';
    }
  }
}
</script>

<style scoped>

</style>
