<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="#084776"
        dark
        v-on="on"
      >
        Novi tip kategorije
      </v-btn>
    </template>
    <v-card
      style="padding:20px;"
      elevation="2"
      max-width="500"

    >
      <v-card-title style="color: #084776; padding-left: 0 !important;">Dodavanje tipa knjige</v-card-title>
      <v-form
        @submit.prevent="submitCategory"
      >
        <v-text-field
          label="Ime"
          v-model="category.name"
          color="#084776"
          outlined
        ></v-text-field>
        <v-spacer></v-spacer>
        <div class="d-flex justify-end align-center" style="width: 100%; gap: 10px">
          <v-btn text  @click.prevent="dialog = false" color="white" style="background:  red"  type="submit">Odustani</v-btn>
          <v-btn text  color="white" style="background: #084776" type="submit">Dodaj</v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>

export default {

  name: "new-category",
  data: () => ({
    category: {
      name: '',
    },
    dialog: false,
  }),

  mounted() {
  },
  methods: {
    async submitCategory() {
      await this.$axios.$post('/categories', this.category).then(response => {
        this.reset();
        this.$notifier.showMessage({ content: 'Tip knjige uspješno dodan', color: 'success' })
        // emit event "reset sciences" to parent component
        this.$emit('reset-categories');
      }).catch((err) => {
        this.reset();
        this.$notifier.showMessage({ content: 'Greška prilikom dodavanja tipa knjige', color: 'error' })
      })
    },

    reset() {
      this.category = {
        name: ''
      }
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>
