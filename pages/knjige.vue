<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <book-form/>
        </v-col>
        <v-col cols="12" md="6">
          <author-form/>
        </v-col>
        <v-col cols="12" md="6">
          <science-form/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "knjige"
}
</script>

<style scoped>

</style>
