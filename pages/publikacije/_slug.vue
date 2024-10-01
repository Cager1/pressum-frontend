<template>
  <v-container class="mt-4">
    <v-row>
      <v-col cols="6" md="4">
        <v-img style="margin: 0" v-if="book.files[0]" :src="image"></v-img>
        <v-btn
          v-if="book.author_email"
          class="mt-1 rad-preuzmi-btn"
          dark
          color="#084776"
          outlined
          :href="`mailto:${book.author_email}`"
          target="_blank"
        >
          <v-icon color="#EA4335" left>mdi-email-box</v-icon>
          Email
        </v-btn>
        <v-btn
          v-if="book.author_google_scholar"
          class="mt-1 rad-preuzmi-btn"
          dark
          color="#084776"
          outlined
          :href="`${book.author_google_scholar}`"
          target="_blank"
        >
          <v-icon color="#4285F4" left>mdi-google</v-icon>
          Google Scholar </v-btn
        ><v-btn
          v-if="book.author_orcid"
          class="mt-1 rad-preuzmi-btn"
          dark
          color="#084776"
          outlined
          :href="`${book.author_orcid}`"
          target="_blank"
        >
          <v-icon color="#A6CE39" left>mdi-identifier</v-icon>
          ORCID
        </v-btn>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col
        cols="6"
        md="8"
        class="mt-0 d-flex flex-column justify-space-between"
      >
        <div>
          <h1 class="pa-3 pt-0">{{ book.name }}</h1>
          <v-card-subtitle v-text="'ISBN: ' + book.isbn"></v-card-subtitle>
          <v-card-subtitle
            class="book-impressum"
            v-html="book.impressum"
          ></v-card-subtitle>
        </div>
        <a :href="bookPDF" target="_blank">
          <v-btn color="primary" depressed text>Pregledaj knjigu</v-btn>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "knjiga",
  async asyncData({ params, $axios }) {
    let book;
    let bookPDF;
    let image;
    await $axios.get(`/booksBySlug/${params.slug}`).then((response) => {
      book = response.data;
      // check if file url is image
      for (const file of book.files) {
        if (file.mimetype) {
          if (file.mimetype.startsWith("image")) {
            image = file.file_url;
          } else if (file.mimetype.endsWith("pdf")) {
            if (file.cut_version === 1) {
              bookPDF = file.file_url;
            }
          }
        }
      }
    });
    return { book, image, bookPDF };
  },
  data() {
    return {};
  },

  methods: {
    // check if file is image
  },
};
</script>

<style>
.book-impressum .p {
  margin-bottom: 0 !important;
}
</style>
