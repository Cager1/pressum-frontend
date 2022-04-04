<template>
  <span>
  </span>

</template>

<script>
export default {
  name: "book-card",
  props: ['image', 'title', 'author', 'file', 'isbn', 'loading'],
  data: () => ({
    link: '',
    authors: '',
    width: '250px',

  }),
  mounted() {
    if (this.image) {
      this.link = this.image.file_url;
    }
    for (let i = 0; i < this.author.length; i++) {
      this.authors += this.author[i].name + ' ' + this.author[i].last_name + ' ';
    }
  },

  methods: {

  }
}
</script>

<style scoped>

</style>
