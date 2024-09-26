<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        disable-sort
        :server-items-length="totalBooks"
        :options.sync="options"
        :loading="loading"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Knjige</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pretraga"
              single-line
              hide-details
            ></v-text-field>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="1200px">
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
              <book-form @submit="bookSubmited" />
            </v-dialog>
            <v-dialog v-model="editDialog" max-width="1200px">
              <book-form
                v-bind:book="editedItem"
                :updating="true"
                submit_text="Izmjeni"
                title="Izmjena knjige"
                @submit="itemEdited"
              />
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Jeste li sigurni da želite izbrisati knjigu: <br />
                  <strong>{{ editedItem.name }}</strong
                  >?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="closeDelete"
                    >Odustani</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Potvrdi</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item, index }">
          <v-icon small class="mr-2" @click="editItem(item, index)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import BookForm from "@/components/dashboard/books/addition/book-form.vue";

export default {
  name: "book-table",
  components: { BookForm },
  data() {
    return {
      options: {
        page: 1,
      },
      totalBooks: 0,
      loading: true,

      dialog: false,
      editDialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        { text: "ID", value: "id", divider: true, align: "center" },
        {
          text: "Naslov",
          value: "name",
        },
        { text: "Autori", value: "authors" },
        { text: "Znanosti", value: "sciences" },
        { text: "ISBN", value: "isbn", sortable: false },
        { text: "Kr", value: "created_at" },
        { text: "Azuriran", value: "updated_at" },
        { text: "Akcije", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      selected: [],
      singleSelect: "",
      items: [],
      books: [],
      querys: ["authors", "sciences"],

      book: {
        name: "",
        isbn: "",
        image: "",
        documents: "",
        impressum: "",
        relations: {
          authors: {
            method: "sync",
            data: [],
          },
          sciences: {
            method: "sync",
            data: [],
          },
        },
      },
      sciences: [],
      authors: [],
      selected_authors: [],
      selected_sciences: [],

      timer: null,
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    search(val) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getBooks(val);
      }, 700);
    },
    options: {
      handler() {
        this.getBooks();
      },
      deep: true,
    },

    // watch editedItem changes and console log them
    editedItem: {
      handler() {
        console.log("changed edited item", this.editedItem);
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
    async bookSubmited() {
      this.dialog = false;
      await this.getBooks();
    },
    async itemEdited() {
      this.editDialog = false;
      await this.getBooks();
    },
    async getBooks() {
      this.loading = true;
      let searchObject = {};
      // if search.length > 3 add column: 'name', and value: search to searchObject
      if (this.search.length > 3) {
        searchObject["column"] = "name";
        searchObject["value"] = "~=" + this.search;
      }
      await this.$axios
        .get("/books", {
          params: {
            perPage: this.options.itemsPerPage,
            page: this.options.page,
            sortBy: "created_at",
            sortDesc: true,
            with: [this.querys[0], this.querys[1]],
            ...searchObject,
          },
        })
        .then((response) => {
          const books = response.data.data;
          this.books = books;
          let pushItems = [];
          for (let i = 0; i < books.length; i++) {
            let cd = new Date(books[i].created_at);
            let cu = new Date(books[i].updated_at);
            let column = {
              id: books[i].id,
              name: books[i].name,
              isbn: books[i].isbn,
              authors: "",
              sciences: "",
              created_at: cd.toLocaleDateString("hr-HR"),
              updated_at: cu.toLocaleDateString("hr-HR"),
            };

            for (const author of books[i].authors) {
              column.authors += author.name + " " + author.last_name + ", ";
            }
            column.authors = column.authors.slice(0, -2);
            for (const science of books[i].sciences) {
              column.sciences += science.name + ", ";
            }
            column.sciences = column.sciences.slice(0, -2);
            pushItems.push(column);
          }
          this.items = pushItems;
          this.loading = false;
          this.totalBooks = response.data.total;
          this.close();
        })
        .catch((error) => {});
    },

    // Get all authors and sciences
    async getAuthors() {
      await this.$axios
        .get("/authors")
        .then((response) => {
          const authors = response.data.data;
          for (let i = 0; i < authors.length; i++) {
            let column = {
              id: authors[i].id,
              name: authors[i].name + " " + authors[i].last_name,
            };
            this.authors.push(column);
          }
        })
        .catch((error) => {});
    },
    async getSciences() {
      await this.$axios
        .get("/sciences")
        .then((response) => {
          const sciences = response.data.data;
          for (let i = 0; i < sciences.length; i++) {
            let column = {
              id: sciences[i].id,
              name: sciences[i].name,
            };
            this.sciences.push(column);
          }
        })
        .catch((error) => {});
    },

    // get sciences of book
    async getSciencesOfBook(id) {
      await this.$axios
        .get("/books/" + id + "/sciences")
        .then((response) => {
          const sciences = response.data.data;
          "sciences: ", sciences;
          this.selected_sciences = [];
          for (let i = 0; i < sciences.length; i++) {
            this.selected_sciences.push(sciences[i].id);
          }
        })
        .catch((error) => {});
    },

    // get authors of book
    async getAuthorsOfBook(id) {
      await this.$axios
        .get("/books/" + id + "/authors")
        .then((response) => {
          const authors = response.data.data;
          this.selected_authors = [];
          for (let i = 0; i < authors.length; i++) {
            this.selected_authors.push(authors[i].id);
          }
        })
        .catch((error) => {});
    },

    editItem(item, index) {
      let sciences = this.books[index]?.sciences.map((science) => science.id);
      let authors = this.books[index]?.authors.map((author) => author.id);
      let image = this.books[index]?.image;
      let documents = this.books[index]?.documents;
      let impressum = this.books[index]?.impressum;
      let author_email = this.books[index]?.author_email;
      let author_google_scholar = this.books[index]?.author_google_scholar;
      let author_orcid = this.books[index]?.author_orcid;
      let book = {
        id: item.id,
        name: item.name,
        isbn: item.isbn,
        author_email: author_email,
        author_google_scholar: author_google_scholar,
        author_orcid: author_orcid,

        image: image,
        documents: documents,
        impressum: impressum,
        relations: {
          authors: {
            method: "sync",
            data: authors,
          },
          sciences: {
            method: "sync",
            data: sciences,
          },
        },
      };
      this.editedItem = Object.assign({}, book);
      this.getSciencesOfBook(this.editedItem.id);
      this.getAuthorsOfBook(this.editedItem.id);
      this.editDialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteBook();
      this.closeDelete();
    },

    // delete book
    async deleteBook() {
      await this.$axios
        .delete("/books/" + this.editedItem.id)
        .then((response) => {
          this.getBooks();
        })
        .catch((error) => {});
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = this.book;
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = this.book;
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style scoped></style>
