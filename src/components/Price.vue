<script>
import { Line } from "vue-chartjs";

export default {
  name: "Price",
  extends: Line,
  data() {
    return {
      chartData: {
        required: true,
        labels: [],
        datasets: [
          {
            label: "Bitcoin",
            data: [],
            backgroundColor: ["#f7931a"]
          }
        ]
      },
      chartOptions: {
        required: true,
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted: async function() {
    this.fillChart();
  },
  methods: {
    fillChart: function() {
      fetch("https://bitvavo.jjdev.nl:3443/priceHistory")
        .then(data => data.json())
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            let date = new Date(data[i].timestamp);
            this.chartData.labels.push(date.getDate() + "-" + date.getMonth());
            this.chartData.datasets[0].data.push(data[i].price);
          }
          this.renderChart(this.chartData, this.chartOptions);
        });
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
