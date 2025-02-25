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


    <v-tabs class="d-md-none"
            centered
            show-arrows
            icons-and-text>
      <v-tab style="font-size: 10pt" v-for="item in items">
        {{ item.title }}
        <v-icon>{{ item.icon }}</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items class="d-md-none mt-16" v-model="tab">
      <v-tab-item :transition="false" class="pl-sm-15" v-for="item in items">
        <v-card-title style="background: #084776; color: white"> {{ item.title }}</v-card-title>
        <v-tabs  show-arrows centered color="red">
          <v-tab v-for="i in item.items">
            {{ i.title }}
          </v-tab>
          <v-tab-item :transition="false" class="components" v-for="(i, index) in item.items">
            <div style="display:flex; flex-grow: revert;
          flex-wrap: wrap; justify-content: space-evenly;">
              <component  style="flex-grow: 1; width: 500px; min-width: 250px;" v-for="x in i.components" :is="x" />
            </div>
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script>
export default {
  name: "admin",
  middleware: 'admin',
  data: () => ({
    tab: 'tab-1',
    items: [
      {
        title: "Korisnici",
        icon: "mdi-account",
        items: [
          {
            title: "Pregled",
            components: ["dashboardUsersOverviewLatestUsers","dashboardUsersOverviewNewUsersGraph",]
          },
          {
            title: "Upravljanje",
            components: ["dashboardUsersManagementUser-control"]
          }
        ]
      },
      {
        title: "Autori",
        icon: "mdi-account-tie",
        items: [
          {
            title: "Dodavanje",
            components: ["dashboardAuthorsAdditionAuthor-form"]
          },
          {
            title: "Upravljanje",
            components: ["dashboardAuthorsManagementAuthor-update"]
          }
        ]
      },
      {
        title: "Uloge",
        icon: "mdi-card-bulleted-off-outline",
        items: [
          {
            title: "Pregled",
            components: ["dashboardRolesOverviewList-roles"]
          },
        ]
      },
      {
        title: "Knjige",
        icon: "mdi-book-open-page-variant",
        component: "book-table",
        items: [
          {
            title: "Pregled",
            components: ["dashboardBooksOverviewLatest-books", "dashboardBooksOverviewNew-books-graph",]
          },
          {
            title: "Upravljanje",
            components: ["bookTable",]
          },
        ]
      },
      {
        title: "Znanosti",
        icon: "mdi-earth",
        items: [
          {
            title: "Pregled",
            components: ["dashboardSciencesOverviewBooks-in-sciences"]
          },
          {
            title: "Upravljanje",
            components: ["sciences-table"]
          },
          {
            title: "Dodavanje",
            components:  ["dashboardSciencesAdditionScience-form"]
          },
        ]
      },
      {
        title: "Kategorije",
        icon: "mdi-apps",
        items: [
          {
            title: "Pregled",
            components: ["dashboardSciencesOverviewBooks-in-sciences"]
          },
          {
            title: "Upravljanje",
            components: ["sciences-table"]
          },
          {
            title: "Dodavanje",
            components:  ["dashboardSciencesAdditionScience-form"]
          },
        ]
      },
      // {
      //   title: "Pristupi",
      //   icon: "mdi-card-bulleted-off-outline",
      //   items: [
      //     {
      //       title: "Pregled"
      //     }
      //   ]
      // },
      // {
      //   title: "Postavke",
      //   icon: "mdi-cogs",
      //   items: [
      //     {
      //       title: "Pregled"
      //     }
      //   ]
      // },
    ],
  }),


}
</script>

<style scoped>
.components {
  padding: 40px;
}
</style>
