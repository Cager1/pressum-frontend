<template>
  <v-card tile class="pa-10" elevation="0">
    <v-card-title style="color: #084776; padding-left: 0 !important">{{
      title
    }}</v-card-title>
    <v-form @submit.prevent="submitBook">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Naslov*"
            v-model="book.name"
            color="#084776"
            outlined
          ></v-text-field>
          <v-text-field
            label="ISBN*"
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
            v-model="book.relations.authors.data"
          ></v-autocomplete>
          <v-autocomplete
            chips
            multiple
            deletable-chips
            clearable
            color="#084776"
            outlined
            auto-select-first
            label="Kategorije"
            :items="categories"
            item-text="name"
            item-value="id"
            v-model="book.relations.categories.data"
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
            v-model="book.relations.sciences.data"
          ></v-autocomplete>
          <v-text-field
            label="Email"
            v-model="book.author_email"
            color="#084776"
            outlined
          ></v-text-field>
          <v-text-field
            label="Google Scholar"
            v-model="book.author_google_scholar"
            color="#084776"
            outlined
          ></v-text-field>
          <v-text-field
            label="ORCID"
            v-model="book.author_orcid"
            color="#084776"
            outlined
          ></v-text-field>
          <client-only>
            <VueEditor
              v-model="book.impressum"
              placeholder="Unesite impresum"
            />
          </client-only>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex mb-2 flex-grow-1">
            <dropzone
              style="width: 100%"
              v-on:vdropzone-sending="sendingEventImages"
              @vdropzone-success="onImageSuccess"
              @vdropzone-file-added="onImageFileAdded"
              @vdropzone-removed-file="onImageFileRemoved"
              @vdropzone-complete="onImageComplete"
              ref="myDropzone"
              id="dropzone"
              :options="dropzoneOptionsImages"
            >
              <div class="dropzone-custom-content">
                <h3>Slika</h3>
              </div>
            </dropzone>
            <v-img
              v-if="book.image"
              style="margin-left: 10px; max-width: 200px"
              :src="book.image.file_url"
              height="250px"
            ></v-img>
          </div>
          <div class="d-flex flex-column">
            <dropzone
              v-on:vdropzone-sending="sendingEventBooks"
              @vdropzone-success="onPDFSuccess"
              @vdropzone-file-added="onPDFFileAdded"
              @vdropzone-removed-file="onPDFFileRemoved"
              @vdropzone-complete="onPDFComplete"
              ref="dropzone"
              id="foo"
              :options="dropzoneOptionsBooks"
            >
              <div class="dropzone-custom-content">
                <h3>Knjige</h3>
              </div>
            </dropzone>
            <v-checkbox
              v-model="book.locked"
              color="indigo"
              label="Zaključano"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="book.cut_version"
              color="indigo"
              label="Samo korice"
              hide-details
            ></v-checkbox>
            <v-text-field
              v-if="book.locked"
              class="mt-4"
              label="Email za kontakt autora"
              v-model="book.locked_contact"
              color="#084776"
              outlined
            ></v-text-field>
            <div v-if="book.documents">
              <template v-for="document in book.documents">
                <template v-if="!document.cut_version">
                  <v-icon>mdi mdi-file-pdf-box</v-icon> {{ document.name }}
                </template>
              </template>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          text
          color="white"
          style="background: red; margin-top: 15px"
          @click="reset"
          >Odustani</v-btn
        >
        <v-btn
          text
          color="white"
          style="background: #084776; margin-top: 15px"
          type="submit"
          >{{ submit_text }}</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";
export default {
  // prop book
  props: {
    updating: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Dodavanje knjige",
    },
    submit_text: {
      type: String,
      default: "Dodaj",
    },
    book: {
      type: Object,
      default: () => {
        return {
          name: "",
          isbn: "",
          author_email: "",
          author_google_scholar: "",
          locked_contact: "",
          author_orcid: "",
          locked: false,
          cut_version: false,
          image: null,
          documents: null,
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
            categories: {
              method: "sync",
              data: [],
            },
          },
        };
      },
    },
  },

  components: {
    Dropzone,
  },
  name: "book-form",
  data: () => ({
    files_uploaded: 0,
    files_added: 0,
    dropzoneOptionsImages: {
      addRemoveLinks: true,
      autoProcessQueue: false,
      maxFiles: 1,
      url: `${process.env.NUXT_API_URL}/files`,
      acceptedFiles: "image/*",
      thumbnailWidth: 150,
      thumbnailHeight: 150,
      maxFilesize: 50,
      withCredentials: true,
    },
    dropzoneOptionsBooks: {
      addRemoveLinks: true,
      maxFiles: 1,
      autoProcessQueue: false,
      url: `${process.env.NUXT_API_URL}/files`,
      acceptedFiles: ".pdf",
      thumbnailWidth: 100,
      thumbnailHeight: 300,
      maxFilesize: 50,
      withCredentials: true,
    },

    dropZoneRefs: [],
    bookFileRefs: [],
    authors: [],
    sciences: [],
    categories: [],

    book_id: 0,
  }),

  mounted() {
    this.dropZoneRefs = this.$refs.myDropzone;
    this.bookFileRefs = this.$refs.dropzone;
    this.getAuthors();
    this.getSciences();
    this.getBooks();
    this.getCategories();
  },

  methods: {
    async getBooks() {
      await this.$axios.$get("/books").then((response) => {});
    },

    async getCategories() {
      await this.$axios.$get("/categories").then((response) => {
        this.categories = response;
      });
    },

    async getAuthors() {
      await this.$axios.$get("/authors").then((response) => {
        this.authors = response;
      });
    },

    setName(item) {
      return item.name + " " + item.last_name;
    },

    async getSciences() {
      await this.$axios.$get("/sciences").then((response) => {
        this.sciences = response;
      });
    },

    async updateBook() {
      if (this.book.name === "") {
        this.$notifier.showMessage({
          content: "Naslov je obavezan",
          color: "error",
        });
        return;
      }
      if (this.book.isbn === "") {
        this.$notifier.showMessage({
          content: "ISBN je obavezan",
          color: "error",
        });
        return;
      }
      const options = {
        method: "PUT",
        url: "/books/" + this.book.id,
        headers: {
          "Content-Type": "application/json",
        },
        data: this.book,
      };
      await this.$axios(options)
        .then((response) => {
          this.book_id = response.data.id;
          this.uploadFiles();
          if (this.files_added === 0) {
            this.reset();
          }
          this.$notifier.showMessage({
            content: "Knjiga uspješno uređena",
            color: "success",
          });
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: "Greška pri uređivanju knjige",
            color: "error",
          });
        });
    },

    async addBook() {
      if (this.book.name === "") {
        this.$notifier.showMessage({
          content: "Naslov je obavezan",
          color: "error",
        });
        return;
      }
      if (this.book.isbn === "") {
        this.$notifier.showMessage({
          content: "ISBN je obavezan",
          color: "error",
        });
        return;
      }
      await this.$axios
        .$post("/books", this.book)
        .then((response) => {
          this.book_id = response.id;
          this.uploadFiles();
          if (this.files_added === 0) {
            this.reset();
          }
          this.$notifier.showMessage({
            content: "Knjiga uspješno dodana",
            color: "success",
          });
        })
        .catch((err) => {
          this.$notifier.showMessage({
            content: "Greška prilikom dodavanja knjige",
            color: "error",
          });
        });
    },

    async submitBook() {
      if (this.updating) {
        await this.updateBook();
      } else {
        await this.addBook();
      }
    },

    uploadFiles() {
      this.dropZoneRefs.processQueue();
      this.bookFileRefs.processQueue();
    },

    removeFiles() {
      this.dropZoneRefs.removeAllFiles();
      this.bookFileRefs.removeAllFiles();
    },

    // Reset forme povodom uploada
    reset() {
      this.$emit("submit");
      this.removeFiles();
      this.files_uploaded = 0;
      this.files_added = 0;
    },

    onPDFSuccess(file, response) {
      this.files_uploaded++;
      if (this.files_uploaded === this.files_added && this.files_added !== 0) {
        this.reset();
      }
    },

    onPDFComplete(response) {},

    onPDFFileAdded(file) {
      this.files_added++;
    },

    onPDFFileRemoved(file, error, xhr) {
      this.files_added--;
    },

    onImageFileAdded(file) {
      this.files_added++;
    },

    onImageFileRemoved(file, error, xhr) {
      this.files_added--;
    },

    onImageSuccess(file, response) {
      this.files_uploaded++;
      if (this.files_uploaded === this.files_added && this.files_added !== 0) {
        this.reset();
      }
    },

    onImageComplete(response) {},

    // Prije slanja slike
    sendingEventImages(file, xhr, formData) {
      formData.append("book_id", this.book_id);
      formData.append("folder", "images");
    },
    // Prije slanja knjige
    sendingEventBooks(file, xhr, formData) {
      formData.append("name", file.name);
      formData.append("book_id", this.book_id);
      formData.append("folder", "books");
    },
  },
};
</script>

<style scoped></style>
<style>
.ql-toolbar .ql-formats .ql-image {
  display: none !important;
}
.ql-toolbar .ql-formats .ql-video {
  display: none !important;
}
</style>
