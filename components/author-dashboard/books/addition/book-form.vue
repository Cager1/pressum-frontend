<template>
  <v-card
    tile
    style="padding:0 20px;"
    elevation="0"
    max-width="700"
  >
    <v-card-title style="color: #084776; padding-left: 0 !important;">Dodavanje knjige</v-card-title>
    <v-form
      @submit.prevent="submitBook"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Naslov"
            v-model="book.name"
            color="#084776"
            outlined
          ></v-text-field>
          <v-text-field
            label="ISBN"
            v-model="book.isbn"
            color="#084776"
            outlined
          ></v-text-field>
          <v-autocomplete
            chips
            multiple
            deletable-chips
            clearable

            color="#084776"
            outlined

            auto-select-first

            label="Autori"

            :items="authors"
            :item-text="setName"
            item-value="id"

            v-model="book.authors"

          ></v-autocomplete>

          <v-autocomplete
            chips
            multiple
            deletable-chips
            clearable

            color="#084776"
            outlined

            auto-select-first

            label="Znanosti"

            :items="sciences"
            item-text="name"
            item-value="id"

            v-model="book.sciences"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <dropzone
            v-on:vdropzone-sending="sendingEventImages"
            @vdropzone-success="onSuccess"
            @vdropzone-complete="onCompleteImage"
            ref="myDropzone" id="dropzone" :options="dropzoneOptionsImages">
            <div class="dropzone-custom-content">
              <h3>Slika</h3>
            </div>
          </dropzone>

          <dropzone
            v-on:vdropzone-sending="sendingEventBooks"
            @vdropzone-success="onSuccess"
            @vdropzone-complete="onCompletePdf"
            ref="dropzone" id="foo" :options="dropzoneOptionsBooks">
            <div class="dropzone-custom-content">
              <h3>Knjige</h3>
            </div>
          </dropzone>
        </v-col>
      </v-row>
      <v-btn text color="white" style="background: red; margin-top:15px;" type="submit">Pošalji</v-btn>
    </v-form>
  </v-card>
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
      autoProcessQueue: false,
      url: "https://book-api.pressum.sum.ba/api/files",
      acceptedFiles: 'image/*',
      thumbnailWidth: 150,
      thumbnailHeight: 150,
      maxFilesize: 2,
      withCredentials: true,
    },
    dropzoneOptionsBooks: {
      addRemoveLinks: true,
      maxFiles: 1,
      autoProcessQueue: false,
      url: "https://book-api.pressum.sum.ba/api/files",
      acceptedFiles: '.pdf',
      thumbnailWidth: 100,
      thumbnailHeight: 300,
      maxFilesize: 50,
      withCredentials: true,
    },


    dropZoneRefs: [],
    bookFileRefs: [],

    authors: [],
    sciences: [],

    book_id: 0,
    book: {
      'name': '',
      'isbn': '',
      'sciences': [],
      'authors': [],
    },
  }),

  mounted() {
    this.dropZoneRefs = this.$refs.myDropzone;
    this.bookFileRefs = this.$refs.dropzone;
    this.getAuthors();
    this.getSciences();
    this.getBooks();

  },
  methods: {

    async getBooks() {
      await this.$axios.$get('/books').then(response => {
      })
    },

    async getAuthors() {
      await this.$axios.$get('/authors').then(response => {
        this.authors = response.data;
      })
    },

    setName(item) {
      return item.name + ' ' + item.last_name;
    },

    async getSciences() {
      await this.$axios.$get('/sciences').then(response => {
        this.sciences = response.data;
      })
    },

    async submitBook() {
      await this.$axios.$post('/books', this.book).then(response => {
        this.book_id = response.id;
        this.uploadFiles();
        this.reset();
      }).catch((err) => {
        this.reset();
      })

    },

    uploadFiles() {
      this.dropZoneRefs.processQueue();
      this.bookFileRefs.processQueue();

    },

    // Reset forme povodom uploada
    reset() {
      this.book.name = '';
      this.book.isbn = '';
      this.book.authors.data = [];
      this.book.sciences.data = [];
    },

    // Prilikom uspijeha spanja slike
    onSuccess(file, response) {
    },

    // Po završetku uploada
    onCompleteImage(response) {
    },

    onCompletePdf(response) {
    },

    // Prije slanja slike
    sendingEventImages(file, xhr, formData) {
      formData.append('book_id', this.book_id);
      formData.append('folder', 'images');
    },
    // Prije slanja knjige
    sendingEventBooks(file, xhr, formData) {
      formData.append('book_id', this.book_id);
      formData.append('folder', 'books');
    }
  }
}
</script>

<style scoped>

</style>
