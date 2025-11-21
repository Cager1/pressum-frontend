<template>
  <div style="display: flex; justify-content: center; margin-top: 30px; padding: 20px;">
    <div v-html="about.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      about: "",

    };
  },
  created() {
    this.getEKnjigeAbout();
  },
  methods: {
    getEKnjigeAbout() {
      this.$axios({
        method: 'POST',
        url: 'https://web-admin.sum.ba/api/web/objava',
        headers: {
          contentType: 'application/json',
          language: 'hr',
        },
        params: {
          alias: 'o-sustavu-eknjige'
        }
      }).then((response) => {
        this.about = response.data
      })
    },
  }
};
</script>

<style></style>
