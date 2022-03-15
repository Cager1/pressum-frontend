<template>
  <v-container>
    <v-card
      elevation="24"
      style="padding:20px; margin-top: 20px;"
    >
      <v-card-title>Dodajte knjigu</v-card-title>
      <v-form
        @submit.prevent="submitBook"
      >
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Naslov"
              v-model="book.name"
            ></v-text-field>
            <v-text-field
              label="ISBN"
              v-model="book.isbn"
            ></v-text-field>
            <v-autocomplete
              chips
              multiple
              deletable-chips
              clearable

              label="Autori"

              :items="authors"
              :item-text="setName"
              item-value="id"

              v-model="book.relations.authors.data"

            ></v-autocomplete>

            <v-autocomplete
              chips
              multiple
              deletable-chips
              clearable

              label="Znanosti"

              :items="sciences"
              item-text="name"
              item-value="id"

              v-model="book.relations.sciences.data"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <dropzone
              v-on:vdropzone-sending="sendingEventImages"
              @vdropzone-success="onSuccess"
              @vdropzone-complete="onComplete"
              ref="myDropzone" id="dropzone" :options="dropzoneOptionsImages">
              <div class="dropzone-custom-content">
                <h3>Slika</h3>
              </div>
            </dropzone>

            <dropzone
              v-on:vdropzone-sending="sendingEventBooks"
              @vdropzone-success="onSuccess"
              @vdropzone-complete="onComplete"
              ref="myDropzone" id="foo" :options="dropzoneOptionsBooks">
              <div class="dropzone-custom-content">
                <h3>Knjige</h3>
              </div>
            </dropzone>
          </v-col>
        </v-row>




        <v-btn type="submit">Pošalji</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
export default {
  components: {
    Dropzone
  },
  name: "book-form",
  data: () => ({
    dropzoneOptionsImages: {
      addRemoveLinks: true,
      maxFiles: 1,
      autoProcessQueue: false,
      url: "http://127.0.0.1:8000/api/files",
      acceptedFiles: 'image/*',
    },
    dropzoneOptionsBooks: {
      addRemoveLinks: true,
      maxFiles: 1,
      autoProcessQueue: false,
      url: "http://127.0.0.1:8000/api/files",
      acceptedFiles: '.pdf',
    },

    dropZoneRefs: [],

    authors: [],
    sciences: [],

    book_id: 0,
    book: {
      'name': '',
      'isbn': '',
      'relations': {
        'authors': {
          'method': 'attach',
          'data': [],
        },
        'sciences': {
          'method': 'attach',
          'data': [],
        },
      }
    },
  }),

  mounted() {
    this.dropZoneRefs = this.$refs.myDropzone;
    this.getAuthors();
    this.getSciences();
    this.getBooks();
    this.getRoutes();

  },
  methods: {

    async getBooks() {
      await this.$axios.$get('/books').then(response => {
        console.log('Books: ' , response);
      })
    },

    async getRoutes() {
      await this.$axios.$get('/routes').then(response => {
        console.log('Routes: ' , response);
      })
    },

    async getAuthors() {
      await this.$axios.$get('/authors').then(response => {
        console.log("Authors: ", response);
        this.authors = response.data;
      })
    },

    setName(item) {
      return item.name + ' ' + item.last_name;
    },

    async getSciences() {
      await this.$axios.$get('/sciences').then(response => {
        console.log("Sciences: ", response);
        this.sciences = response.data;
      })
    },

    async submitBook() {
      await this.$axios.$post('/books', this.book).then(response => {
        console.log(response);
        this.book_id = response.id;
        this.uploadFiles();
      }).catch((err) => {
        console.log(err)
      })

    },
    getRefs() {
      console.log(this.dropZoneRefs)
    },

    uploadFiles() {
      this.dropZoneRefs.processQueue()
    },

    // Prilikom uspijeha spanja slike
    onSuccess(file, response) {
      console.log('success:');
      console.log(file)
      console.log(response);
    },

    // Po završetku uploada
    onComplete(response) {
      console.log('Complete:');
      console.log(response)
    },

    // Prije slanja slike
    sendingEventImages(file, xhr, formData) {
      formData.append('book_id', this.book_id);
      formData.append('folder', 'images');
    },
    // Prije slanja slike
    sendingEventBooks(file, xhr, formData) {
      formData.append('folder', 'books');
      formData.append('book_id', this.book_id);
    }
  }
}
</script>

<style scoped>

</style>
