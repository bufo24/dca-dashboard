<script>
import { Line } from "vue-chartjs";

export default {
  name: "Price",
  extends: Line,
  props: {
    coin: String,
    start: String
  },
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
      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];
      fetch(this.host + "/priceHistory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          apiKey: this.apiKey,
          apiSecret: this.apiSecret,
          start: new Date(this.start).getTime(),
          coin: this.coin
        })
      })
        .then(data => data.json())
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            let date = new Date(data[i].timestamp);
            this.chartData.labels.push(
              date.getDate() + "-" + (date.getMonth() + 1)
            );
            this.chartData.datasets[0].data.push(data[i].price);
          }
          this.renderChart(this.chartData, this.chartOptions);
        });
    }
  },
  watch: {
    coin: function() {
      this.fillChart();
    },
    start: function() {
      this.fillChart();
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
