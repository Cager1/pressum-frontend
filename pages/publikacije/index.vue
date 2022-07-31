<template>
    <v-row>
      <v-col cols="12" id="publikacije">
        <v-row align-content="center" justify="center">
          <v-col class="mt-10" md="3" cols="7">
            <v-text-field
              solo
              label="Pretraga"
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              color="red"
              id="search"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2">
        <v-expansion-panels
          flat
        >
          <v-expansion-panel>
            <v-expansion-panel-header style="color: #f04f4f"><h2>Znanosti</h2></v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <v-list-item-group v-model="filterSciences"  multiple>
                  <v-list-item v-for="(science, index) in sciences"
                               dense
                               :value="science.id"
                               class="d-inline-block d-md-flex science-item"
                               active-class="activeListItem"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="science.name">
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header style="color: #f04f4f;"><h2>Autori</h2></v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <v-list-item-group v-model="filterAuthors"  multiple>
                  <v-list-item v-for="(author, index) in authors"
                               dense
                               :value="author.id"
                               class="d-inline-block d-md-flex science-item"
                               active-class="activeListItem"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="author.name + ' ' + author.last_name">
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

      </v-col>
      <v-col cols="12" md="10" class="text-center">
        <v-row align="center">
          <v-col cols="12" style="background-color: rgb(240, 240, 240);">
            <v-row>
              <v-col cols="7" md="6">
                <v-breadcrumbs class="ml-3" :items="breadcrumbs" divider="-" large></v-breadcrumbs>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="3" md="1" class="mr-10">
                <v-select flat v-model="showNumberOfBooksModel" :items="numberOfItems"></v-select>
              </v-col>
            </v-row>


          </v-col>
          <v-col cols="12" style="background-color: rgb(240, 240, 240);">
            <v-card
              style="display: inline-block; margin: 20px; padding: 0; vertical-align: top !important;"
              v-for="book in books.data" :key="book.isbn"
              :loading="loading"
              width="200px"
              height="100%"
              class="text-left book-cards"
              elevation="0"
              tile
              :to="'/publikacije/' + book.slug"
            >
              <template v-slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img
                style="margin: 0;"
                v-if="book.files[0]"
                :src="book.files[0]['file_url']"
                height="250px"
              ></v-img>
              <v-divider></v-divider>

              <v-card-text >
                <h3 style="color: rgb(8, 71, 118); font-family: 'Montserrat', sans-serif;">{{book.name}}</h3>
              </v-card-text>
              <v-card-text v-text="" style="text-align: left !important; padding-top: 0; padding-bottom: 0; font-family: 'Montserrat', sans-serif; font-weight: 600" v-for="author in book.authors" :key="author.email">
                {{ author.name}} {{ author.last_name }}
              </v-card-text>
            </v-card>

            <v-row justify="center">
              <v-pagination
                v-model="page"
                :length="books.last_page"
                @next="getBooks(page)"
                @previous="getBooks(page)"
                @input="getBooks(page)"
              ></v-pagination>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>




</template>

<script>
export default {
  name: "publikacije",
  data: () => ({

    lastUsedQuery: 0,

    loading: true,
    books: [],

    page: 1,
    numberOfItems: [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
      { text: '15', value: 15 },
      { text: '20', value: 20 },
      { text: '50', value: 50 },
      { text: '100', value: 100 },
    ],

    showNumberOfBooksModel: 15,

    filterSciences: [],
    filterAuthors: [],
    sortDesc: true,
    querys: ['files', 'authors', 'sciences'],

    sciences: [],

    isLoading: false,
    model: null,
    search: null,
    items: [],

    timer: null,

    authors: [],

    breadcrumbs: [],

    searchRelation: 'name',

  }),
  mounted() {
    this.getBooks();
    this.getSciences();
    this.getAuthors();
  },

  watch: {
    filterSciences: function(val) {
      if (val === null) return
      this.filterAuthors = null;
      this.lastUsedQuery = 1;
      this.filterBooksWithRelation('sciences', 'id', val)
    },

    filterAuthors: function(val) {
      if (val === null) return
      this.filterSciences = null;
      this.lastUsedQuery = 2;
      this.filterBooksWithRelation('authors', 'id', val)
    },

    showNumberOfBooksModel: function(val) {
      switch (this.lastUsedQuery) {
        case 0:
          this.getBooks();
          break;
        case 1:
          this.filterBooksWithRelation('sciences', 'id', this.filterSciences);
          break;
        case 2:
          this.filterBooksWithRelation('authors', 'id', this.filterAuthors);
          break;
        case 3:
          this.searchBooks(this.search);
          break;
        default:
          this.getBooks();
          break;
      }
    },

    search (val) {
      if (val.length === 0) {
        clearTimeout(this.timer)
        this.getBooks();
      } else {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.searchBooks(val)
        }, 700)
      }
    },
  },

  methods: {
    async getBooks(page) {
      this.lastUsedQuery = 0;
      this.breadcrumbs = []
      await this.$axios.$get('/books?perPage=' + this.showNumberOfBooksModel + '&with[]=' + this.querys[0] + '&with[]=' +
        this.querys[1] + '&with[]=' + this.querys[2] + '&page=' + page).then(response => {
        this.books = response;
        this.page = response.current_page;
        this.breadcrumbs.push({
          text: 'Sve Knjige',
          disabled: true
        })
        this.loading = false;
        console.log(this.books.data[0].files[0].file_url)
      }).catch((err) => {
        console.log(err)
      })
    },

    async filterBooksWithRelation(relation, column, filter) {
      if (filter.length === 0) {
        console.log('filter', filter)
        await this.getBooks();
      } else {
        let query = 'books?perPage=' + this.showNumberOfBooksModel + '&filterRelation[' + relation + '][' + column + ']=a='
        this.breadcrumbs = []
        for (const filterElement of filter) {
          query += filterElement + ','
          let name
          if (relation === 'authors') {
            name = this.authors.find(author => author.id === filterElement).name + ' ' +
              this.authors.find(author => author.id === filterElement).last_name
          }  else if (relation === 'sciences') {
            name = this.sciences.find(science => science.id === filterElement).name
          }
          this.breadcrumbs.push({
            text: name,
            disabled: true
          })

        }

        for (const q of this.querys) {
          query += '&with[]=' + q
        }
        await this.$axios.$get(query).then(response => {
          // console.log(response);
          this.books = response;
          this.page = response.current_page;
          this.loading = false;
        }).catch((err) => {
          console.log(err)
        })
      }
    },

    async searchBooks(value) {
      this.lastUsedQuery = 3;
      this.breadcrumbs = []
      let query = '/books?perPage=' + this.showNumberOfBooksModel + '&column=name&value=~=' + value
      for (const q of this.querys) {
        query += '&with[]=' + q
      }
      await this.$axios.$get(query).then(response => {
        this.books = response;
        this.breadcrumbs.push({
          text: 'Pretraga: ' + value,
          disabled: true
        })
        console.log(this.books)
      }).catch((err) => {
        console.log(err)
      }).finally(() => (this.isLoading = false))
    },

    async getSciences() {
      await this.$axios.$get('/sciences?perPage=-1').then(response => {
        this.sciences = response.data;
        console.log("sciences: ", response)
      }).catch((err) => {
        console.log(err)
      })
    },

    async getAuthors() {
      await this.$axios.$get('/authors?perPage=-1').then(response => {
        this.authors = response.data;
        console.log("authors: ", response)
      }).catch((err) => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>

#publikacije {
  background-image: url("~assets/images/background.jpg");
  background-size: cover;

}

#search .v-label {
  color: white !important;
  opacity: 1 !important;
}

.book-cards {
  box-shadow: none;
  cursor: pointer;
}

.book-cards:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}

.science-item {

}

.triangle_red {
  display: inline-block;
  position: absolute;
  border-style: solid;
  z-index: 0;
  border-color: red transparent transparent red;
  border-width: 56px;
}

.triangle_red_bottom {
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  border-style: solid;
  z-index: 0;
  border-color: transparent red red transparent;
  border-width: 56px;
}

.activeListItem {
  color: red;
}
</style>
