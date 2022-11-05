<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6">
        <v-autocomplete
          solo
          label="Pretraga autora"
          v-model="model"
          prepend-inner-icon="mdi-account-search"
          color="red"
          id="search"
          hide-no-data
          hide-selected
          loading-text="Pretraga..."
          :loading="isLoading"

          :items="authors"
          :item-text="setName"
          item-value="id"
          return-object
        ></v-autocomplete>
        <v-divider style="background: #084776"></v-divider>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>

      <v-col col="10" offset="1">
        <v-expand-transition>
          <v-card outlined elevation="18" class="pa-8" v-if="model">

            <v-row>
              <v-col cols="10" offset="1" sm="6" offset-sm="0">
                <v-card-title class="text-center">
                  {{ model.name +" "+ model.last_name}}
                </v-card-title>
                <v-card-subtitle v-if="model.user_uid"  style="justify-content: center"> {{ model.user_uid}}</v-card-subtitle>
                <v-card-subtitle v-else>
                  <v-dialog width="400px" v-model="userDialog">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        text
                        x-small
                        style="background: #084776; color: white">
                        Dodaj Korisnika
                      </v-btn>
                    </template>
                    <v-card class="px-3">
                      <v-card-title class="headline">Dodaj korisnika</v-card-title>
                      <v-autocomplete
                        solo
                        label="Pretraga korisnika"
                        v-model="user"
                        prepend-inner-icon="mdi-account-search"
                        color="red"
                        id="search"
                        hide-no-data
                        hide-selected
                        loading-text="Pretraga..."

                        :items="users"
                        item-text="name"
                        item-value="uid"
                        return-object
                      ></v-autocomplete>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="userDialog = false">
                          Odustani
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="addUser(model.id, user.uid)">
                          Dodaj
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-title> Informacije </v-card-title>
                <v-card-text>
                  E-mail: {{ model.email}}
                </v-card-text>
                <v-card-text>
                  ORCID: {{ model.orcid }}
                </v-card-text>
                <v-card-actions>
                  <v-dialog v-model="deleteAuthorDialog" width="250px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        text
                        x-small
                        style="background: #f04f4f; color: white">
                        Obriši autora
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title style="word-break: break-word">Jeste li sigurni da želite obrisati {{ model.name + " " + model.last_name}}?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="deleteAuthor(model.id)">
                          Da
                        </v-btn>
                        <v-btn color="red darken-1" text @click="deleteAuthorDialog = false">
                          Ne
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card-actions>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col  cols="10" offset="1" sm="6" offset-sm="0">
                <div style="display:flex; flex-grow: revert; flex-wrap: wrap; ">
                  <span v-if="model.books" style="height: 200px; width: 150px !important;" v-for="(book, index) in model.books">
                    <v-img
                      v-for="image in book.files"
                      :src="image.file_url"
                      height="200px"
                      width="150px"
                    >
                      <v-dialog width="300px" v-model="dialogs[index]">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            @click="selectedBookToDelete(book.id, book.name, index)"
                            fab tile icon  small
                            style="background: #084776">
                            <v-icon style="position: absolute; color: white;">mdi-trash-can</v-icon>
                          </v-btn>
                        </template>
                        <v-card class="pt-4">
                          <v-card-text>
                            Jeste li sigurni da želite ukloniti <strong style="color: #f04f4f">{{ model.name +" "+ model.last_name}}</strong> kao
                            autora sa knjige <strong style="color: #f04f4f">{{ bookToDeleteName }}</strong>?
                          </v-card-text>
                          <v-card-actions>
                            <v-btn
                              color="primary"
                              text
                              @click="deleteBookFromAuthor(bookToDelete, dialogIndex)">
                              Prihvaćam
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <span style="color: white; text-shadow: -1px 1px 0 #000, 1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000;"
                            v-text="book.name"></span>
                    </v-img>
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "author-update",
  data: () => ({
    search: "",
    authors: [],
    isLoading: false,
    timer: null,
    model: null,
    dialogs: [],

    user: null,
    users: [],
    userDialog: false,

    bookToDelete: null,
    dialogIndex: null,
    bookToDeleteName: null,

    deleteAuthorDialog: false,

    text: "",
    snackbar: false,
    timeout: 1500,

    author: {
      name: "",
      last_name: "",
      email: "",
      created_by: "",
      'relations': {
        'books': {
          'method': 'sync',
          'data': [],
        }
      },
    },

  }),

  watch: {
    search (val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.searchAuthors(val)
        console.log(this.model);
        console.log(this.fields);
      }, 700)
    },

    user (val) {
      console.log(val)
    },

    model (val) {
      if (this.model) {
        if (this.model.hasOwnProperty('books') ) {
          for (let i = 0; i < this.model.books.length; i++) {
            this.dialogs.push(false)
          }
        }
      }


    }
  },

  computed: {
    fields() {
      if (!this.model) return []
      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    }
  },

  mounted() {
    this.getAuthor()
    this.getUsers()
  },

  methods: {
    setName(item) {
      return item.name + ' ' + item.last_name;
    },

    async addUser(author, user) {
      const options = {
        method: 'PUT',
        url: 'updateAuthor/' + author,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          user_uid: user
        }
      }

      console.log(this.model);
      console.log("url", options.url);
      await this.$axios(options).then(response => {
        this.userDialog = false
        this.model.user_uid = response.data.user_uid
        console.log("a",   response)
        this.$notifier.showMessage({ content: 'Autor uspješno izmjenjen', color: 'success' })
      }).catch(error => {
        this.userDialog = false
        console.log(" b ",error)
        this.$notifier.showMessage({ content: 'Greška prilikom izmjene autora', color: 'error' })
      })
    },

    // get all users that have no assigned authors
    async getUsers() {
      await this.$axios.get('/users')
        .then(response => {
          this.users = response.data
        })
    },

    async getAuthor(dialog) {
      // get all authors
      await this.$axios.get('/authorUsers')
        .then(response => {
          this.authors = response.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    getImage () {
      const min = 550
      const max = 560

      return Math.floor(Math.random() * (max - min + 1)) + min
    },

    selectedBookToDelete(book, name, index) {
      this.bookToDelete = book
      this.bookToDeleteName = name
      this.dialogIndex = index
    },

    async deleteBookFromAuthor(value, index) {
      this.dialogs[index] = false
      const options = {
        method: 'PUT',
        url: '/detachBook/' + this.model.id + '/' + value,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      console.log(options.url)
      await this.$axios(options)
        .then(response => {
          console.log("updated author: ",response.data);
          this.model = response.data;
          this.$notifier.showMessage({ content: 'Knjiga uspješno uklonjena', color: 'success' })
        })
        .catch(error => {
          this.$notifier.showMessage({ content: 'Nešto je pošlo po krivu', color: 'error' })
        });
    },

    async deleteAuthor(author) {
      const options = {
        method: 'DELETE',
        url: '/authors/' + author,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await this.$axios(options)
        .then(response => {
          this.model = null
          this.getAuthor();
          console.log("deleted author: ",response.data);
          this.$notifier.showMessage({ content: 'Autor uspješno uklonjen', color: 'success' })
        })
        .catch(error => {
          this.$notifier.showMessage({ content: 'Nešto je pošlo po krivu', color: 'error' })
        });
    },
  },
}
</script>

<style scoped>
#search .v-label {
  color: white !important;
  opacity: 1 !important;
}
</style>
