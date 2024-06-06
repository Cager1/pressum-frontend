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
            <v-toolbar-title>Znanosti</v-toolbar-title>
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
            <science-form @reset-sciences="getSciences" />
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item, index }">
          <dashboard-sciences-forms-edit-science :science="item"  @reset-sciences="getSciences" />
          <dashboard-sciences-forms-delete-science :science="item" @reset-sciences="getSciences" />
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
  name: "sciences-table",
  components: {ScienceForm},
  data() {
    return {

      options: {
        page: 1,
      },
      totalSciences: 0,
      loading: true,

      dialog: false,
      editDialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {
          text: "Naslov",
          value: "name",
        },
        {text: 'Broj knjiga', value: 'books_count', sortable: false},
        {text: 'Akcije', value: 'actions', sortable: false },

      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      selected: [],
      singleSelect: "",
      items: [],
      sciences: [],
      querys: ['books'],
      science: {
        'name': "",
      },
      timer: null,
    }
  },

  mounted() {
    this.getSciences();
  },

  methods: {
    async getSciences() {
      this.loading = true;
      let searchObject = {}
      // if search.length > 3 add column: 'name', and value: search to searchObject
      if (this.search.length > 3) {
        searchObject['column'] = 'name'
        searchObject['value'] = '~=' + this.search
      }
      await this.$axios
        .get('/getNumberOfBooksInSciences',)
        .then(response => {
          this.items = response.data;
          this.loading = false;
          this.totalSciences = this.items.length
        })
        .catch(error => {
        });
    },


  },
}
</script>

<style scoped>

</style>
