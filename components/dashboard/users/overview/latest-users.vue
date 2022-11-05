<template>
  <v-container>
    <v-toolbar-title style="color: #084776;">Najnoviji korisnici</v-toolbar-title>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
        <tr>
          <th className="text-left">
            Ime
          </th>
          <th className="text-left">
            Uloga
          </th>
          <th>
            Kreiran prije
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(user, index) in users"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.role.name}}</td>
          <td>{{ diffs[index] }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>


</template>

<script>
export default {
  name: "latest-users",

  data: () => ({
    users: [],
    diffs: [],
  }),

  mounted() {
    this.getLatestUsers();
  },

  methods: {
    async getLatestUsers() {
      this.users = await this.$axios.$get('/latestUsers', );
      console.log(this.users);
      for (const user of this.users) {
        let from = new Date(user.created_at);
        let diff = new Date() - from;
        this.diffs.push(this.dateDiff(diff));
      }

      console.log(this.diffs);


    },

    dateDiff(miliseconds) {
      let days;
      let afterfix;
      let whichafterfix;
      // Je li datum vise od 1 dana
      if (Math.floor(miliseconds / 1000 / 60 / 60 / 24) > 1) {
        // Je li datum vise od 30 dana
        if (Math.floor(miliseconds / 1000 / 60 / 60 / 24) > 30) {
          // Je li datum vise od 11 mjeseci
          if (Math.floor(miliseconds / 1000 / 60 / 60 / 24 / 30) > 11) {
            days = Math.floor(miliseconds / 1000 / 60 / 60 / 24 / 30 / 12)
            afterfix = ". godina";
            whichafterfix = 1;
          } else {
            days = Math.floor(miliseconds / 1000 / 60 / 60 / 24 / 30)
            afterfix = ". mjesec";
            whichafterfix = 2;
          }
        } else {
          days = Math.floor(miliseconds / 1000 / 60 / 60 / 24)
          afterfix = " dan";
          whichafterfix = 3;
        }
      } else {
        days = Math.floor(miliseconds / 1000 / 60 / 60)
        afterfix = " sat";
        whichafterfix = 4;
      }

      if (Math.floor(miliseconds / 1000 / 60) < 60) {
        days = Math.floor(miliseconds / 1000 / 60)
        afterfix = " minuta";
        whichafterfix = 5;
      }

      if (Math.floor(miliseconds / 1000 / 60) < 1) {
        whichafterfix = 6;
      }

      switch (whichafterfix) {
        case 1:
          if (days > 1 && days < 5) {
            afterfix = " godine";
          } else if (days > 4) {
            afterfix = " godina";
          }
          break;
        case 2:
          if (days > 1 && days < 5) {
            afterfix = " mjeseca";
          } else if (days > 4) {
            afterfix = " mjeseci";
          }
          break;
        case 3:
          if (days > 1 && days < 5) {
            afterfix = " dana";
          } else if (days > 4) {
            afterfix = " dana";
          }
          break;
        case 4:
          if (days > 1 && days < 5) {
            afterfix = " sata";
          } else if (days > 4) {
            afterfix = " sati";
          }
          break;
        case 5:
          if (days > 1 && days < 5) {
            afterfix = " minute";
          } else if (days > 4) {
            afterfix = " minuta";
          }
          break;
        case 6:
          days = "Upravo";
          afterfix = " objavljeno";
          break;
      }
      days = days.toString() + afterfix;
      return days;
    }
  }
}
</script>

<style scoped>

</style>
