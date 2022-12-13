<template>
  <v-container fluid>
    <v-tabs class="d-none d-md-flex" vertical icons-and-text>
      <v-tab v-for="item in items">
        {{ item.title }}
        <v-icon>{{ item.icon }}</v-icon>
      </v-tab>
      <v-tab-item :transition="false" class="pl-sm-15" v-for="(item, index) in items" >
        <v-card-title style="background: #084776; color: white"> {{ item.title }}</v-card-title>
        <v-tabs color="red">
          <v-tab v-for="i in item.items">
            {{ i.title }}
          </v-tab>
          <v-tab-item :transition="false" class="components" v-for="(i, index) in item.items">
            <div style="display:flex; flex-grow: revert; flex-wrap: wrap; justify-content: space-evenly">
              <component style="flex-grow: 1; width: 500px; min-width: 250px;" v-for="x in i.components" :is="x" />
            </div>
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
    </v-tabs>
  </v-container>

</template>

<script>
export default {
  name: "knjige",
  middleware: 'author',
  data: () => ({
    tab: 'tab-1',
    items: [
      {
        title: "Knjige",
        icon: "mdi-book-open-page-variant",
        items: [
          {
            title: "Pregled",
            components: ["author-dashboardBooksOverviewMy-books",]
          },
          {
            title: "Dodavanje",
            components: ["author-dashboardBooksAdditionBook-form"]
          },
          {
            title: "Izmjena",
            components: ["dashboardBooksChangeBook-update"],
          },
          {
            title: "Brisanje"
          }
        ]
      },
      {
        title: "Znanosti",
        icon: "mdi-flask",
      },
      {
        title: "Dopuštenja",
        icon: "mdi-account-check",

      },
    ],
  })
}
</script>

<style scoped>

</style>
