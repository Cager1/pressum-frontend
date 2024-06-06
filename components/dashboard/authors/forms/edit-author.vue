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
      <v-card-title style="color: #084776; padding-left: 0 !important;">Ažuriranje autora</v-card-title>
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
        <v-text-field
          label="ORCID"
          v-model="author.orcid"
          color="#084776"
          outlined
        ></v-text-field>
        <v-text-field
          label="E-mail"
          v-model="author.email"
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

  name: "new-author",
  props: {
    author: Object,
  },
  data: () => ({
    dialog: false,
  }),

  mounted() {
  },
  methods: {
    async submitAuthor() {
      await this.$axios.$put(`/authors/${this.author.id}`, this.author).then(response => {
        this.$notifier.showMessage({ content: 'Autor uspješno ažuriran', color: 'success' })
        this.$emit('reset-authors');
        this.dialog = false
      }).catch((err) => {
        this.reset();
        this.$notifier.showMessage({ content: 'Greška prilikom ažuriranja autora', color: 'error' })
      })
    },
  }
}
</script>

<style scoped>

</style>
