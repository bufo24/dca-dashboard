<template>
  <span> Sats stacked: {{ (btc * 100000000).toFixed() }}</span>
  <br />
  <span> Currently worth: €{{ (btc * currentPrice).toFixed(2) }}</span> <br />
  <span> Costs: €{{ costs }}</span> <br />
  <span> PnL: €{{ (btc * currentPrice - costs).toFixed(2) }}</span> <br />
  <span> Current price: €{{ currentPrice }}</span> <br />
  <span> Average price: €{{ (costs / btc).toFixed(2) }}</span> <br />
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      currentPrice: 0,
      btc: 0,
      costs: 0
    };
  },
  mounted: async function() {
    fetch("http://localhost:3000/currentPrice")
      .then(data => data.json())
      .then(data => {
        this.currentPrice = data;
      });
    fetch("http://localhost:3000/tradeStats")
      .then(data => data.json())
      .then(data => {
        this.btc = data.btc;
        this.costs = data.costs;
      });
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
</style>
