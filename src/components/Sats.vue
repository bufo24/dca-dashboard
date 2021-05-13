<script>
import { Line } from "vue-chartjs";

export default {
  name: "Sats",
  extends: Line,
  data() {
    return {
      host: localStorage.getItem("host"),
      chartData: {
        required: true,
        labels: [],
        datasets: [
          {
            label: "Sats",
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
      fetch(this.host + "/trades")
        .then(data => data.json())
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            let date = new Date(data[i].timestamp);
            this.chartData.labels.push(date.getDate() + "-" + date.getMonth());
            if (i == 0) {
              this.chartData.datasets[0].data.push(data[i].amount * 100000000);
            } else {
              this.chartData.datasets[0].data.push(
                data[i].amount * 100000000 +
                  this.chartData.datasets[0].data[i - 1]
              );
            }
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
canvas {
  margin-left: auto;
  margin-right: auto;
}
</style>
