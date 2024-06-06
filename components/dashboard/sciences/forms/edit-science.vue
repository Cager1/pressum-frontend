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
      <v-card-title style="color: #084776; padding-left: 0 !important;">Ažuriranje znanosti</v-card-title>
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

  name: "edit-science",
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
      await this.$axios.$put(`/sciences/${this.science.id}`, this.science).then(response => {
        this.$notifier.showMessage({ content: 'Znanost uspješno ažurirana', color: 'success' })
        this.dialog = false
        this.$emit('reset-sciences');
      }).catch((err) => {
        this.reset();
        this.$notifier.showMessage({ content: 'Greška prilikom ažuriranja znanosti', color: 'error' })
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
