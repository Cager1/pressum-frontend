<template>
  <bar-chart
    :chart-options='chartOptions'
    :chart-data='chartData'
    id="doughnutChart"></bar-chart>
</template>

<script>
export default {
  name: "books-in-sciences",
  data: () => ({
    chartData: {
      labels: [],
      datasets: [{
        label: "Knjige po znanostima",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      }]
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },

    clickedScience: "",
  }),

  mounted() {
    this.getNumberOfBooksInSciences();
  },

  methods: {

    chartClick() {
      ("Kliknuto");
    },

    // get getNumberOfBooksInSciences
    async getNumberOfBooksInSciences() {
      const sciences = await this.$axios.$get('/getNumberOfBooksInSciences');
      (sciences);
      for (const science of sciences) {
        this.chartData.labels.push(science.name);
        this.chartData.datasets[0].data.push(science.books_count);
      }
      const letters = '0123456789ABCDEF'.split('');
      for (let i = 0; i < sciences.length; i++) {
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        this.chartData.datasets[0].borderColor.push(color);
        color+="50";
        this.chartData.datasets[0].backgroundColor.push(color);
      }
      (this.chartData.datasets[0].borderColor);
    }
  }
}
</script>

<style scoped>

</style>
