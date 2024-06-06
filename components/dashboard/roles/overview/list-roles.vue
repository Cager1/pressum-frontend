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
            <th class="text-left">
              Akcije
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(role, index) in roles"
          >
            <td>{{ role.name }}</td>
            <td>{{ role.users_count}}</td>
            <td>
              <v-btn
                v-if="role.users_count === 0"
                color="red"
                text
                @click="deleteRole(role.id)"
              >
                Obriši
              </v-btn>
            </td>
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
          <v-btn text  color="white" style="background: red" type="submit">Dodaj</v-btn>
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
    },

    async submitRole() {
      await this.$axios.$post('/createRole', this.role).then(response => {
        this.$notifier.showMessage({ content: 'Uloga uspješno dodana', color: 'success' })
        this.getRoles();
        this.reset();
      }).catch((err) => {
        this.$notifier.showMessage({ content: 'Neuspješno dodavanje uloge', color: 'error' })
        this.reset();
      })
    },

    async deleteRole(id) {
      await this.$axios.$delete(`/deleteRole/${id}`).then(response => {
        this.$notifier.showMessage({ content: 'Uloga uspješno obrisana', color: 'success' })
        this.getRoles();
      }).catch((err) => {
        this.$notifier.showMessage({ content: 'Neuspješno brisanje uloge', color: 'error' })
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
