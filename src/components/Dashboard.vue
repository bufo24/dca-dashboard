<template>
  <div>
    <v-row
      ><v-col>
        <v-card>
          <span> Total invested: <br />€{{ costs }}</span></v-card
        >
      </v-col>
      <v-col>
        <v-card>
          <span> Sats stacked: <br />{{ (btc * 100000000).toFixed() }} </span
          ><span style="font-size:12px"
            >(€{{ (btc * currentPrice).toFixed(2) }})</span
          >
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <span>
            Percent change: <br />{{
              (((btc * currentPrice) / costs - 1) * 100).toFixed(2)
            }}%</span
          ></v-card
        >
      </v-col>

      <v-col>
        <v-card>
          <span>
            PnL: <br /><span v-if="btc * currentPrice - costs < 0">-</span>€{{
              Math.abs(btc * currentPrice - costs).toFixed(2)
            }}</span
          ></v-card
        >
      </v-col>
      <v-col>
        <v-card>
          <span>
            Current price: <br />
            €{{ currentPrice }}</span
          ></v-card
        >
      </v-col>
      <v-col>
        <v-card>
          <span>
            Average price: <br />
            €{{ (costs / btc).toFixed(2) }}</span
          ></v-card
        >
      </v-col>
    </v-row>
  </div>
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
    fetch("/currentPrice")
      .then(data => data.json())
      .then(data => {
        this.currentPrice = data;
      });
    fetch("/tradeStats")
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
