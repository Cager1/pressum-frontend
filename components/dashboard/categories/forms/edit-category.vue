<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <template v-slot:activator="{ on }">
      <v-icon
        small
        class="mr-2"
        @click="dialog=true"
      >
        mdi-pencil
      </v-icon>
    </template>
    <v-card
      style="padding:20px;"
      elevation="2"
      max-width="500"

    >
      <v-card-title style="color: #084776; padding-left: 0 !important;">Ažuriranje tipa knjige</v-card-title>
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
          <v-btn text  color="white" style="background: #084776" type="submit">Ažuriraj</v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>

export default {

  name: "new-category",
  props: {
    category: Object,
  },
  data: () => ({
    dialog: false,
  }),

  mounted() {
  },
  methods: {
    async submitCategory() {
      await this.$axios.$put(`/category/${this.category.id}`, this.category).then(response => {
        this.$notifier.showMessage({ content: 'Tip knjige uspješno ažuriran', color: 'success' })
        this.$emit('reset-categories');
        this.dialog = false
      }).catch((err) => {
        this.reset();
        this.$notifier.showMessage({ content: 'Greška prilikom ažuriranja tipa knjige', color: 'error' })
      })
    },
  }
}
</script>

<style scoped>

</style>
