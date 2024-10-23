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
        <div>
          <a v-if="!book.locked" :href="bookPDF" target="_blank">
            <v-btn color="primary" depressed text>Pregledaj knjigu</v-btn>
          </a>
          <div v-if="book.locked">
            <v-btn color="primary" depressed text @click="dialog = true">
              Pregledaj knjigu
            </v-btn>

            <div class="text-center">
              <v-dialog v-model="dialog" width="500">
                <v-card>
                  <v-card-title
                    style="background-color: #084776; color: #fcfcfc"
                    class="text-h5"
                  >
                    Knjiga zaključana
                  </v-card-title>

                  <v-card-text class="mt-3">
                    <v-html
                      >Knjiga je zaključana. Kontaktirajte autora kako biste
                      dobili pristup knjizi.</v-html
                    >
                    <a
                      :href="`mailto:${book.locked_contact}`"
                      style="text-decoration: none"
                      >Kontak autora</a
                    >
                    <!--<v-btn @click="openEmail" class="text-h12"
                      >Kontakt autora</v-btn
                    >-->
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                      OK
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>
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
    return {
      dialog: false,
    };
  },

  methods: {
    // check if file is image
    openEmail() {
      // Generira mailto link s email adresom iz varijable contact_email
      window.location.href = `mailto:${this.contact_email}`;
    },
  },
};
</script>

<style>
.book-impressum .p {
  margin-bottom: 0 !important;
}
</style>
