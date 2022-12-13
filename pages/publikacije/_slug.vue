<template>
  <v-container>
    <v-row class="mt-7">
      <v-col cols="12" class="text-center">
        <h1> {{ book.name }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" md="4">
        <v-img
          style="margin: 0;"
          v-if="book.files[0]"
          :src="image"
        ></v-img>
      </v-col>
      <v-col cols="6" md="8">
        <v-card-subtitle v-text="'ISBN: ' + book.isbn"></v-card-subtitle>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" offset-sm="2" sm="8">
        <v-card-title>
          Pretpregled
        </v-card-title>
        <embed :src="bookPDF" height="1000px" type="application/pdf" width="100%"/>
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
    await $axios.get(`/booksBySlug/${params.slug}`).then(response => {
      book = response.data;
      console.log(book);
      // check if file url is image
      for (const file of book.files) {
        console.log("fajl", file);
        if (file.mimetype) {
          if (file.mimetype.startsWith("image")) {
            image = file.file_url;
          } else if (file.mimetype.endsWith("pdf")) {
            console.log("pdf if", bookPDF)
            if (file.cut_version === 1) {
              bookPDF = file.file_url;
            }
          }
        }

        console.log("pdf", bookPDF)
      }
    });
    return { book, image, bookPDF };
  },
  data() {
    return {

    }
  },


  mounted() {
    console.log(this.book);
  },

  methods: {
    // check if file is image
  }
}
</script>

<style scoped>

</style>
