<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="10"
        :loading="loading"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Autori</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pretraga"
              single-line
              hide-details
            ></v-text-field>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <dashboard-authors-forms-new-author @reset-authors="getAuthors" />
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item, index }">
          <dashboard-authors-forms-edit-author :author="item" @reset-authors="getAuthors" />
          <dashboard-authors-forms-delete-author :author="item" @reset-authors="getAuthors" />
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

  </v-container>
</template>

<script>

import ScienceForm from "@/components/dashboard/sciences/addition/science-form.vue";
import EditScience from "@/components/dashboard/sciences/forms/edit-science.vue";

export default {
  name: "authors-table",
  data() {
    return {

      options: {
        page: 1,
      },
      totalAuthors: 0,
      loading: true,

      dialog: false,
      editDialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {
          text: "Ime",
          value: "name",
        },
        {
          text: "Prezime",
          value: "last_name",
        },
        {
          'text': 'ORCID',
          'value': 'orcid',
        },
        {text: 'Akcije', value: 'actions', sortable: false },

      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      selected: [],
      singleSelect: "",
      items: [],
      authors: [],
      querys: ['books'],
      timer: null,
    }
  },

  mounted() {
    this.getAuthors();
  },

  methods: {
    async getAuthors() {
      this.loading = true;
      await this.$axios
        .get('/authors',)
        .then(response => {
          this.items = response.data;
          this.loading = false;
          this.totalAuthors = this.items.length
        })
        .catch(error => {
        });
    },

  },
}
</script>

<style scoped>

</style>
