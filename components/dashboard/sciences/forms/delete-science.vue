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
      <v-card-title class="text-h5">Jeste li sigurni da želite izbrisati znanost: <br> <strong>{{ science.name }}</strong>?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="dialog = false">Odustani</v-btn>
        <v-btn color="blue darken-1" text @click="submitScience">Potvrdi</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {

  name: "delete-science",
  // props science
  props: {
    science: {
      type: Object,
      default: () => {
        return {
          'id': '',
          'name': '',
        }
      }
    }
  },
  data: () => ({
    dialog: false,
  }),

  mounted() {
  },
  methods: {
    async submitScience() {
      await this.$axios.$delete(`/sciences/${this.science.id}`).then(response => {
        this.$notifier.showMessage({ content: 'Znanost uspješno izbrisana', color: 'success' })
        this.dialog = false
        this.$emit('reset-sciences');
      }).catch((err) => {
        this.reset();
        this.$notifier.showMessage({ content: 'Greška prilikom brisanja znanosti', color: 'error' })
      })
    },

    reset() {
      this.science.name = '';
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>
