<template>
  <v-container>
    <bar-chart
      :chart-options='chartOptions'
      :chart-data='chartData'
      id="barChart"
    />
  </v-container>
</template>

<script>
export default {
  name: "new-users-graph",
  data: () => ({
    chartData: {
      labels: [],
      datasets: [ {
        label: "Novi korisnici",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      }]
    },
    chartOptions: {
      responsive: true,

      maintainAspectRatio: false
    }
  }),

  mounted() {
    this.setMonths();
    this.getNumberOfUsersFromLastSixMonths()
  },

  methods: {
    setMonths() {
      let monthNames = ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj",
        "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"];

      let today = new Date();
      let d;
      let month;

      for(let i = 6; i > 0; i -= 1) {
        d = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
        month = monthNames[d.getMonth()];
        this.chartData.labels.push(month);
      }
    },

    async getNumberOfUsersFromLastSixMonths() {
      await this.$axios.$get('/usersLastSixMonths').then(response => {
        const users = response;
        let today = new Date();
        let month = today.getMonth() + 1;

        if (users.length < 7) {
          for (let i = 0; i < 6; i++) {
            this.chartData.datasets[0].data.push(0);
          }
        } else if (users.length > 7) {
          for (let i = 0; i < users.length; i++) {
            this.chartData.datasets[0].data.push(0);
          }
        }
        for (const user of users) {
          let userMonth = user.month;
          let index = month - userMonth;
          this.chartData.datasets[0].data[index] = user.count;
        }
        this.chartData.datasets[0].data.reverse();
        const letters = '0123456789ABCDEF'.split('');
        for (let i = 0; i < users.length; i++) {
          let color = '#';
          for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          this.chartData.datasets[0].borderColor.push(color);
          color+="50";
          this.chartData.datasets[0].backgroundColor.push(color);
        }
      });
    }
  }
}
</script>

<style scoped>
#barChart {
  max-width: 700px;
  min-width: 200px;
}
</style>
