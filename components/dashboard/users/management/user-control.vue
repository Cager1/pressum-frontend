<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col sm="6">
        <v-autocomplete
          solo
          label="Pretraga korisnika"
          v-model="model"
          prepend-inner-icon="mdi-account-search"
          color="red"
          id="search"
          hide-no-data
          hide-selected
          loading-text="Pretraga..."
          :loading="isLoading"

          :search-input.sync="search"
          :items="users"
          item-text="name"
          item-value="uid"
          return-object
        ></v-autocomplete>
        <v-divider></v-divider>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <v-expand-transition>
          <v-card outlined elevation="5" class="align-content-center pa-8 text-center" v-if="model">

              <v-img  src="https://scontent-vie1-1.xx.fbcdn.net/v/t31.18172-8/18278875_1594980503865136_2999348772622226796_o.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFgFVbpMGC9dXMnu5kLL7qGEPDVgvyBgegQ8NWC_IGB6AvTPlVwojYMBum8ptmHZGy1_zLI3Pe_PmRC_GLbpdEl&_nc_ohc=BvDFklNw7HEAX8ys1TM&_nc_ht=scontent-vie1-1.xx&oh=00_AT8BfAe4Ry3LIoS6i5WPWOcxL8wkI_Lr2l0oISoqifDs2Q&oe=63722E1E"
                      width="150" height="150" class="mx-auto" style="border-radius: 50%"></v-img>

            <v-card-title style="justify-content: center" class="text-center">
              {{ model.name}}
            </v-card-title>
            <v-card-subtitle> {{ model.uid}}</v-card-subtitle>
            <v-card-text>
              {{ model.role.name }}
            </v-card-text>
            <v-card-text>
             {{ model.email}}
            </v-card-text>
            <v-card-text style="color: red; font-weight: bolder" v-if="banned">
              Korisnik je banovan
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-dialog width="500" class="pa-3" v-model="dialog">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="red"
                    text
                    v-bind="attrs"
                    v-on="on"
                  >
                    Promjeni ulogu
                  </v-btn>
                </template>
                <v-card class="pa-6">
                  <v-card-title class="text-h5">
                    Promjena uloge
                  </v-card-title>

                  <v-autocomplete
                    label="Nova uloga"
                    v-model="role"
                    :items="roles"
                    color="#084776"
                    outlined

                    item-text="name"
                    item-value="id"
                  ></v-autocomplete>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red"
                      text
                      @click="updateUserRole()"
                    >
                      Promijeni
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
<!--              <v-btn color="red" text @click="banUser">{{ ban_text }}</v-btn>-->
            </v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script>
export default {
  name: "user-control",
  data: () => ({
    search: "",
    users: [],
    isLoading: false,
    timer: null,
    model: null,
    dialog: false,

    role: null,
    roles: [],

    text: "",
    snackbar: false,
    timeout: 1500,

    ban_text: "",
    ban_index: 0,
    banned: false,
  }),

  watch: {
    search (val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.searchUsers(val)
      }, 700)
    },
  },

  computed: {
    fields() {
      if (!this.model) return []
      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    }
  },

  mounted() {
    this.getAllRoles();
  },

  methods: {
    async searchUsers(name) {
      if (name) {
        this.isLoading = true;
        const response = await this.$axios.get("/searchUsers/" + name);
        this.users = response.data;
        if (this.users[0].banned) {
          this.ban_text = "Odbanuj";
          this.banned = true;
        } else {
          this.ban_text = "Banuj";
        }
        this.isLoading = false;
      }
    },

    // get all roles
    async getAllRoles() {
      const response = await this.$axios.get("/userRoles");
      this.roles = response.data;
    },


    // update user role with than and catch
    async updateUserRole() {
      const response = await this.$axios
        .put("/updateUserRole/", {
          uid: this.model.uid,
          role_id: this.role,
        })
        .then((response) => {
          this.text = response.data.message;
          this.snackbar = true;
          this.dialog = false;
          this.role = null;
          this.model.role.name = response.data.user.role.name;
        })
        .catch((error) => {
          this.text = "Neuspješna promjena uloge";
          this.snackbar = true;
        });
    },

    // ban user
    async banUser() {
      const response = await this.$axios.put("/banUser", {
        uid: this.model.uid,
      });
      let ban_user = response.data.user.banned;
      if (ban_user) {
        this.ban_text = "Odbanuj";
        this.banned = true;
      } else {
        this.ban_text = "Banuj";
        this.banned = false;
      }
      this.text = response.data.message;
      this.snackbar = true;
    },
  },
}
</script>

<style scoped>
#search .v-label {
  color: white !important;
  opacity: 1 !important;
}
</style>
