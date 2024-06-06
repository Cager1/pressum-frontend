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
  name: "new-books-graph",
  data: () => ({
    chartData: {
      labels: [],
      datasets: [ {
        label: "Nove knjige",
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
    this.getNumberOfBooksFromLastSixMonths()
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

    async getNumberOfBooksFromLastSixMonths() {
      const books = await this.$axios.$get('/booksLastSixMonths');

      if (books.length < 7) {
        for (let i = 0; i < 6; i++) {
          this.chartData.datasets[0].data.push(0);
        }
      } else if (books.length > 7) {
        for (let i = 0; i < books.length; i++) {
          this.chartData.datasets[0].data.push(0);
        }
      }

      // get current month number
      let today = new Date();
      let month = today.getMonth() + 1;

      for (const book of books) {
        let bookMonth = book.month;
        let index = month - bookMonth;
        this.chartData.datasets[0].data[index] = book.count;
      }
      this.chartData.datasets[0].data.reverse();
      const letters = '0123456789ABCDEF'.split('');
      for (let i = 0; i < books.length; i++) {
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        this.chartData.datasets[0].borderColor.push(color);
        color+="50";
        this.chartData.datasets[0].backgroundColor.push(color);
      }
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
