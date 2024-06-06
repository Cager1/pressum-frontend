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
      <v-card-title class="text-h5">Jeste li sigurni da želite izbrisati autora: <br> <strong>{{ author.name + author.last_name }}</strong>?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="dialog = false">Odustani</v-btn>
        <v-btn color="blue darken-1" text @click="submitAuthor">Potvrdi</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {

  name: "delete-author",
  // props science
  props: {
    author: {
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
    async submitAuthor() {
      await this.$axios.$delete(`/authors/${this.author.id}`).then(response => {
        this.$notifier.showMessage({ content: 'Autor uspješno izbrisan', color: 'success' })
        this.dialog = false
        this.$emit('reset-authors');
      }).catch((err) => {
        this.reset();
        this.$notifier.showMessage({ content: 'Greška prilikom brisanja autora', color: 'error' })
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
