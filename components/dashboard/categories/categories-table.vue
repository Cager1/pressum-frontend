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
            <v-toolbar-title>Kategorije</v-toolbar-title>
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
            <dashboard-categories-forms-new-category @reset-categories="getCategories" />
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item, index }">
          <dashboard-categories-forms-edit-category :category="item" @reset-categories="getCategories" />
          <dashboard-categories-forms-delete-category :category="item" @reset-categories="getCategories" />
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
  name: "categories-table",
  data() {
    return {
      options: {
        page: 1,
      },
      totalCategories: 0,
      loading: true,

      dialog: false,
      editDialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {
          text: "Kategorija",
          value: "name",
        },
        {text: 'Akcije', value: 'actions', sortable: false },

      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      selected: [],
      singleSelect: "",
      items: [],
      categories: [],
      querys: ['books'],
      timer: null,
    }
  },

  mounted() {
    this.getCategories();
  },

  methods: {
    async getCategories() {
      this.loading = true;
      await this.$axios
        .get('/categories',)
        .then(response => {
          this.items = response.data;
          console.log(response.data);
          this.loading = false;
          this.totalCategories = this.items.length
        })
        .catch(error => {
        });
    },

  },
}
</script>

<style scoped>

</style>
