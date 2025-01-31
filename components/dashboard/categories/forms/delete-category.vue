<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <template v-slot:activator="{ on }">
      <v-icon
        small
        @click="dialog=true"
      >
        mdi-delete
      </v-icon>
    </template>
    <v-card
      style="padding:20px;"
      elevation="2"
      max-width="600"

    >
      <v-card-title class="text-h5">Jeste li sigurni da želite izbrisati kategoriju: <br> <strong>{{ category.name}}</strong>?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="dialog = false">Odustani</v-btn>
        <v-btn color="blue darken-1" text @click="submitCategory">Potvrdi</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {

  name: "delete-category",
  // props science
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    dialog: false,
  }),

  mounted() {
  },
  methods: {
    async submitCategory() {
      await this.$axios.$delete(`/categories/${this.category.id}`).then(response => {
        this.$notifier.showMessage({ content: 'Tip knjige uspješno izbrisan', color: 'success' })
        this.dialog = false
        this.$emit('reset-categories');
      }).catch((err) => {
        this.reset();
        this.$notifier.showMessage({ content: 'Greška prilikom brisanja tipa knjige', color: 'error' })
      })
    },
    reset() {
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>
