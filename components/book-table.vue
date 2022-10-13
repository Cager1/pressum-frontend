<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        :server-items-length="totalBooks"
        :options.sync="options"
        :loading="loading"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Knjige</v-toolbar-title>
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
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#084776"
                  style="color: white"
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nova Knjiga
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.name"
                          label="Naslov"
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.isbn"
                          label="ISBN"
                        ></v-text-field>
                        <v-autocomplete
                          chips
                          multiple
                          deletable-chips
                          clearable
                          :items="authors"
                          auto-select-first

                          label="Autori"

                          item-value="id"
                          item-text="name"
                          v-model="selected_authors"

                        ></v-autocomplete>

                        <v-autocomplete
                          chips
                          multiple
                          deletable-chips
                          clearable
                          :items="sciences"
                          auto-select-first

                          label="Znanosti"

                          item-text="name"
                          item-value="id"
                          v-model="selected_sciences"

                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="updateBook"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
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
export default {
  name: "book-table",
  data() {
    return {

      options: {
        page: 1,
      },
      totalBooks: 0,
      loading: true,

      dialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {text: "ID", value: 'id', divider: true, align: 'center'},
        {
          text: "Naslov",
          value: "name",
        },
        {text: 'Autori', value: 'authors'},
        {text: 'Znanosti', value: 'sciences'},
        {text: 'ISBN', value: 'isbn', sortable: false },
        {text: "Kr", value: 'created_at'},
        {text: "Azuriran", value: 'updated_at'},
        {text: 'Akcije', value: 'actions', sortable: false },

      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: "",
        isbn: "",
        relations: {
          authors: {
            data: [],
          },
          sciences: {
            data: [],
          },
        },
      },

      defaultItem: {
        name: "",
        authors: [],
        sciences: [],
        isbn: "",
      },
      selected: [],
      singleSelect: "",
      items: [],
      querys: ['files', 'authors', 'sciences'],

      book: {
        'name': "",
        'isbn': "",
        'relations': {
          'authors': {
            'method': 'sync',
            'data': [],
          },
          'sciences': {
            'method': 'sync',
            'data': [],
          },
        }
      },
      sciences: [],
      authors: [],
      selected_authors: [],
      selected_sciences: [],

      timer: null,
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
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

    options: {
      handler() {
        this.getBooks();
      },
      deep: true,
    },
  },

  mounted() {
    this.getBooks();
    this.getAuthors();
    this.getSciences();
    },

  methods: {
    async getBooks() {
      this.loading = true;
      await this.$axios
        .get('/books?perPage=' + this.options.itemsPerPage + '&page=' + this.options.page + '&with[]=' + this.querys[0] + '&with[]=' +
          this.querys[1] + '&with[]=' + this.querys[2])
        .then(response => {
          const books = response.data.data;
          console.log("books: ", response.data);
          let pushItems = []
          for (let i = 0; i < books.length; i++) {
            let cd = new Date(books[i].created_at);
            let cu = new Date(books[i].updated_at);
            let column = {
              id: books[i].id,
              name: books[i].name,
              isbn: books[i].isbn,
              authors: "",
              sciences: "",
              created_at: cd.toLocaleDateString('hr-HR'),
              updated_at: cu.toLocaleDateString('hr-HR'),
            }

            for (const author of books[i].authors) {
              column.authors += author.name + " " + author.last_name + ", "
            }
            column.authors = column.authors.slice(0,-2)
            for (const science of books[i].sciences) {
              column.sciences += science.name + ", "
            }
            column.sciences = column.sciences.slice(0,-2)
            pushItems.push(column)
          }
          this.items = pushItems
          console.log(this.items);
          this.loading = false;
          this.totalBooks = response.data.total
          this.close()
        })
        .catch(error => {
          console.log(error);
        });
    },
    async updateBook() {

      this.book.name = this.editedItem.name
      this.book.isbn = this.editedItem.isbn
      this.book.relations.authors.data = this.selected_authors
      this.book.relations.sciences.data = this.selected_sciences

      const options = {
        method: 'PUT',
        url: '/books/' + this.editedItem.id ,
        query: "XDEBUG_SESSION_START=PHPSTORM",
        headers: {
          'Content-Type': 'application/json',
        },
        data: this.book,
      };
      await this.$axios(options)
        .then(response => {
          console.log("updated book: ",response.data);
          this.getBooks();
        })
        .catch(error => {
          console.log(error);
        });
    },

    async searchBooks(value) {
      let query = '/books?column=name&value=~=' + value
      for (const q of this.querys) {
        query += '&with[]=' + q
      }
      await this.$axios.$get(query).then(response => {
        const books = response.data;
        console.log("books: ", books);
        let pushItems = []
        for (let i = 0; i < books.length; i++) {
          let cd = new Date(books[i].created_at);
          let cu = new Date(books[i].updated_at);
          let column = {
            id: books[i].id,
            name: books[i].name,
            isbn: books[i].isbn,
            authors: "",
            sciences: "",
            created_at: cd.toLocaleDateString('hr-HR'),
            updated_at: cu.toLocaleDateString('hr-HR'),
          }

          for (const author of books[i].authors) {
            column.authors += author.name + " " + author.last_name + ", "
          }
          column.authors = column.authors.slice(0,-2)
          for (const science of books[i].sciences) {
            column.sciences += science.name + ", "
          }
          column.sciences = column.sciences.slice(0,-2)
          pushItems.push(column)
        }
        this.items = pushItems
        console.log(this.items);
      }).catch((err) => {
        console.log(err)
      }).finally(() => (this.isLoading = false))
    },


    // Get all authors and sciences
    async getAuthors() {
      await this.$axios
        .get('/authors')
        .then(response => {
          const authors = response.data.data;
          console.log("authors: ", authors);
          for (let i = 0; i < authors.length; i++) {
            let column = {
              id: authors[i].id,
              name: authors[i].name + " " + authors[i].last_name,
            }
            this.authors.push(column)
          }
          console.log(this.authors);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getSciences() {
      await this.$axios
        .get('/sciences')
        .then(response => {
          const sciences = response.data.data;
          console.log("sciences: ", sciences);
          for (let i = 0; i < sciences.length; i++) {
            let column = {
              id: sciences[i].id,
              name: sciences[i].name,
            }
            this.sciences.push(column)
          }
          console.log(this.sciences);
        })
        .catch(error => {
          console.log(error);
        });
    },

    // get sciences of book
    async getSciencesOfBook(id) {
      await this.$axios
        .get('/books/' + id + '/sciences')
        .then(response => {
          const sciences = response.data.data;
          console.log("sciences: ", sciences);
          this.selected_sciences = [];
          for (let i = 0; i < sciences.length; i++) {
            this.selected_sciences.push(sciences[i].id)
          }
          console.log(this.selected_sciences);
        })
        .catch(error => {
          console.log(error);
        });
    },

    // get authors of book
    async getAuthorsOfBook(id) {
      await this.$axios
        .get('/books/' + id + '/authors')
        .then(response => {
          const authors = response.data.data;
          console.log("authors: ", authors);
          this.selected_authors = []
          for (let i = 0; i < authors.length; i++) {
            this.selected_authors.push(authors[i].id)
          }
          console.log(this.selected_authors);
        })
        .catch(error => {
          console.log(error);
        });
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.getSciencesOfBook(this.editedItem.id)
      this.getAuthorsOfBook(this.editedItem.id)
      console.log("edit item", this.editedItem);
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.deleteBook()
      this.closeDelete()
    },

    // delete book
    async deleteBook() {
      await this.$axios
        .delete('/books/' + this.editedItem.id)
        .then(response => {
          console.log("deleted book: ",response.data);
          this.getBooks();
        })
        .catch(error => {
          console.log(error);
        });
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>

</style>
