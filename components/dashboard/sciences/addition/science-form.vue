<template>

  <v-card
    style="padding:20px;"
    elevation="2"
    max-width="500"

  >
    <v-card-title style="color: #084776; padding-left: 0 !important;">Dodavanje znanosti</v-card-title>
    <v-form
      @submit.prevent="submitScience"
    >
      <v-text-field
        label="Ime"
        v-model="science.name"
        color="#084776"
        outlined
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn text  color="white" style="background: red" type="submit">Pošalji</v-btn>
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
