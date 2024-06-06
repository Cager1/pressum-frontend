<template>
  <v-container>
    <div style="display:flex; flex-grow: revert; flex-wrap: wrap; ">
      <span v-if="books" style="height: 200px; width: 150px !important;" v-for="(book, index) in books">
        <v-img
          v-for="image in book.files"
          :src="image.file_url"
          height="200px"
          width="150px"
        >
        </v-img>
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
                Jeste li sigurni da želike ukliniti knjigu {{book.name}}?
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click="deleteBook(bookToDelete, dialogIndex)">
                  Prihvaćam
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        <span
              v-text="book.name">
          </span>
      </span>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "my-books",
  data: () => ({
    dialogs: [],
    bookToDelete: null,
    dialogIndex: null,
    bookToDeleteName: null,
  }),

  computed: {
    books() {
      return this.$store.getters["userStore/userGetter"].author.books;
    },
  },

  watch: {
    books() {
      this.dialogs = [];
      this.books.forEach((book) => {
        this.dialogs.push(false);
      });
    },
  },

  methods: {
    selectedBookToDelete(book, name, index) {
      this.bookToDelete = book
      this.bookToDeleteName = name
      this.dialogIndex = index
    },

    async deleteBook(value, index) {
      this.dialogs[index] = false
      const options = {
        method: 'DELETE',
        url: '/books/' + value,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await this.$axios(options)
        .then(response => {
          this.model = response.data;
          this.$notifier.showMessage({ content: 'Knjiga uspješno uklonjena', color: 'success' })
        })
        .catch(error => {
          this.$notifier.showMessage({ content: 'Nešto je pošlo po krivu', color: 'error' })
        });
    },
  }
}
</script>

<style scoped>

</style>
