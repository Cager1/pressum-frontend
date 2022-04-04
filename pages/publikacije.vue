<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="text-center">
      <v-card
        style="display: inline-block; margin: 20px; padding: 0;"
        v-for="book in books.data" :key="book.isbn"
        :loading="loading"
        width="250px"
        height="100%"
        class="text-left"
      >
        <template v-slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img
          style="margin: 0;"
          v-if="book.files[0]"
          :src="book.files[0]['file_url']"
          height="330px"
        ></v-img>
        <v-divider></v-divider>

        <v-card-text style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" >
          {{book.name}}
        </v-card-text>
        <v-card-text style="display: inline; text-align: left !important;" v-for="author in book.authors" :key="author.email">
          {{ author.name + ' ' + author.last_name}}
        </v-card-text>



      </v-card>


      <v-row justify="center">
        <v-pagination
          v-model="page"
          :length="books.last_page"
          @next="getBooks(page)"
          @previous="getBooks(page)"
          @input="getBooks(page)"
        ></v-pagination>
      </v-row>

    </v-col>
  </v-row>


</template>

<script>
export default {
  name: "publikacije",
  data: () => ({
    loading: true,
    books: [],

    page: 1,
    search: '',
    filter: {},
    sortDesc: true,
    querys: ['files', 'authors', 'sciences'],

  }),
  mounted() {
    this.getBooks();
  },

  methods: {
    async getBooks(page) {
      await this.$axios.$get('/books?with[]=' + this.querys[0] + '&with[]=' +
        this.querys[1] + '&with[]=' + this.querys[2] + '&page=' + page).then(response => {
        console.log(response);
        this.books = response;
        this.page = response.current_page;
        this.loading = false;
        console.log(this.books.data[0].files[0].file_url)
      }).catch((err) => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>

</style>
