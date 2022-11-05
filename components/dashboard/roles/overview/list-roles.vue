<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Ime
            </th>
            <th class="text-left">
              Broj korisnika
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(role, index) in roles"
          >
            <td>{{ role.name }}</td>
            <td>{{ role.users_count}}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card
        style="padding:20px;" elevation="0">
        <v-card-title style="color: #084776; padding-left: 0 !important;">Dodavanje uloge</v-card-title>
        <v-form
          @submit.prevent="submitRole"
        >
          <v-text-field
            label="Ime"
            color="#084776"
            v-model="role.name"
            outlined
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn text  color="white" style="background: red" type="submit">Pošalji</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
export default {
  name: "list-roles",

  data: () => ({
    roles: [],
    role: {
      name: '',
    },
  }),

  mounted() {
    this.getRoles();
  },

  methods: {
    async getRoles() {
      this.roles = await this.$axios.$get('/rolesWithUserCount');
      console.log(this.roles);
    },

    async submitRole() {
      await this.$axios.$post('/createRole', this.role).then(response => {
        console.log(response);
        this.$notifier.showMessage({ content: 'Uloga uspješno dodana', color: 'success' })
        this.getRoles();
        this.reset();
      }).catch((err) => {
        console.log(err);
        this.$notifier.showMessage({ content: 'Uloga nije dodana', color: 'success' })
        this.reset();
      })
    },

    reset() {
      this.role.name = '';
    }
  }
}
</script>

<style scoped>

</style>
