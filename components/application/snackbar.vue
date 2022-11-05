<template>
  <v-snackbar outlined timeout="2000" v-model="show" :color="color">
    {{ message }}
    <v-btn class="align-self-end" text :color="color" @click="show = false">Zatvori</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "snackbar",
  data () {
    return {
      show: false,
      message: '',
      color: ''
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.show = true
      }
    })
  }
}
</script>

<style scoped>

</style>
