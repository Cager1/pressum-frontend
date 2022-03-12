<template>
  <v-container>
    <v-card
      elevation="24"
      style="padding:20px; margin-top: 20px;"
    >
      <v-card-title>Dodajte knjigu</v-card-title>
      <v-form>
        <v-text-field
          label="Naslov"
        ></v-text-field>
        <v-text-field
          label="ISBN"
        ></v-text-field>
        <dropzone

          @vdropzone-success="onSuccess"
          ref="myDropzone" id="dropzone" :options="dropzoneOptions">
          <div class="dropzone-custom-content">
            <h3>Knjiga</h3>
          </div>
        </dropzone>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
export default {
  components: {
    Dropzone
  },

  dropZoneRefs: [],
  name: "book-form",
  data: () => ({
    dropzoneOptions: {
      addRemoveLinks: true,
      url: "http://127.0.0.1:8000/api/files"
    },
  }),

  mounted() {
    this.dropZoneRefs = this.$refs.myDropzone;
  },
  methods: {
    getFiles() {
      console.log(this.dropZoneRefs)
    },
    onSuccess(file, response) {
      this.success = true
      this.getFiles();
      console.log(response);
    },
  }
}
</script>

<style scoped>

</style>
