<template>
  <DefaultLayout>
    <v-container fluid>
      <v-tabs class="d-none d-md-flex" vertical icons-and-text>
        <v-tab v-for="item in items" :to="item.to">
          {{ item.title }}
          <v-icon>{{ item.icon }}</v-icon>
        </v-tab>
        <v-tabs-items :transition="false" class="pl-sm-15">
          <v-main style="min-height: 500px !important;" class="pt-0">
            <nuxt />
          </v-main>
        </v-tabs-items>
      </v-tabs>

      <v-tabs class="d-md-none"
              centered
              show-arrows
              icons-and-text>
        <v-tab v-for="item in items" :to="item.to">
          {{ item.title }}
          <v-icon>{{ item.icon }}</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items :transition="false" class="pl-sm-15 d-md-none">
        <v-main style="min-height: 500px !important;" class="pt-0">
          <nuxt />
        </v-main>
      </v-tabs-items>
    </v-container>
  </DefaultLayout>
</template>
<script>
import DefaultLayout from "@/layouts/default.vue";

export default {
  name: "AdminLayout",
  components: {DefaultLayout},
  layout: 'default',
  middleware: 'admin',
  data: () => ({
    tab: 'tab-1',
    items: [
      {
        title: "Knjige",
        icon: "mdi-book-open-page-variant",
        to: "/admin/knjige",
      },
      {
        title: "Autori",
        icon: "mdi-account-tie",
        to: "/admin/autori",
      },
      {
        title: "Znanosti",
        icon: "mdi-earth",
        to: "/admin/znanosti",
      },
      {
        title: "Kategorije",
        icon: "mdi-apps",
        to: "/admin/kategorije",
      }
    ],
  }),
}
</script>

<style scoped>
</style>
