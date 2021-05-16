<script>
import { Line } from "vue-chartjs";

export default {
  name: "Value",
  extends: Line,
  data() {
    return {
      host: localStorage.getItem("host"),
      apiKey: localStorage.getItem("key"),
      apiSecret: localStorage.getItem("secret"),
      chartData: {
        required: true,
        labels: [],
        datasets: [
          {
            label: "Value",
            data: [],
            backgroundColor: ["rgb(247, 148, 26)"]
          },
          {
            label: "Costs",
            data: [],
            backgroundColor: ["rgb(0, 0, 0, 0.5)"]
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
    fetch(this.host + "/currentPrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ apiKey: this.apiKey, apiSecret: this.apiSecret })
    })
      .then(data => data.json())
      .then(data => {
        this.currentPrice = +data;
        this.fillChart();
      });
  },
  methods: {
    fillChart: function() {
      fetch(this.host + "/trades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ apiKey: this.apiKey, apiSecret: this.apiSecret })
      })
        .then(data => data.json())
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            let date = new Date(data[i].timestamp);
            this.chartData.labels.push(date.getDate() + "-" + date.getMonth());
            if (i == 0) {
              this.chartData.datasets[0].data.push(
                Math.round(data[i].amount * this.currentPrice)
              );
              this.chartData.datasets[1].data.push(
                Math.round(data[i].amount * data[i].price)
              );
            } else {
              this.chartData.datasets[0].data.push(
                Math.round(
                  data[i].amount * this.currentPrice +
                    this.chartData.datasets[0].data[i - 1]
                )
              );
              this.chartData.datasets[1].data.push(
                Math.round(
                  data[i].amount * data[i].price +
                    this.chartData.datasets[1].data[i - 1]
                )
              );
            }
          }
          this.renderChart(this.chartData, this.chartOptions);
        });
    }
  }
};
</script>

<style>
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
