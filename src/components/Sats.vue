<script>
import { Line } from "vue3-chart-v2";

export default {
  name: "SportChart",
  extends: Line,
  data() {
    return {
      chartData: {
        required: true,
        labels: [],
        datasets: [
          {
            label: "Sats",
            data: []
          }
        ]
      },
      chartOptions: {
        required: true,
        responsive: false
      }
    };
  },
  mounted() {
    fetch("http://localhost:3000/trades")
      .then(data => data.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          let date = new Date(data[i].timestamp);
          console.log(date);
          this.chartData.labels.push(date.getDate() + "-" + date.getMonth());
          if (i == 0) {
            this.chartData.datasets[0].data.push(data[i].amount * 100000000);
          } else {
            this.chartData.datasets[0].data.push(
              data[i].amount * 100000000 +
                this.chartData.datasets[0].data[i - 1]
            );
          }
          console.log(data[i].amount);
        }
        this.renderChart(this.chartData, this.chartOptions);
      });
  }
};
</script>

<style scoped>
canvas {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
