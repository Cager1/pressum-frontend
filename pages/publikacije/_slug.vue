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
          :src="book.files[0]['file_url']"
        ></v-img>
      </v-col>
      <v-col cols="6" md="8">
        <v-card-subtitle v-text="'ISBN: ' + book.isbn"></v-card-subtitle>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "knjiga",
  async asyncData({ params, $axios }) {
    let book;
    await $axios.get(`/booksBySlug/${params.slug}`).then(response => {
      book = response.data;
    });
    return { book };
  },
  data() {
    return {
    }
  },

  mounted() {
    console.log(this.book);
  },

  methods: {
  }
}
</script>

<style scoped>

</style>
