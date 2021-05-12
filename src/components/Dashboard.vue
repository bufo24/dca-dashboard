<template>
  <div>
    <v-row
      ><v-col>
        <v-card class="col" color="secondary">
          <span> Total invested: <br />€{{ costs }}</span></v-card
        >
      </v-col>
      <v-col>
        <v-card class="col" color="secondary">
          <span> Sats stacked: <br />{{ sats }} </span
          ><span style="font-size:12px">(€{{ satsValue }})</span>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="col" color="secondary">
          <span>
            Percent change: <br /><span
              :style="[
                percentChange < 0 ? { color: 'red' } : { color: 'green' }
              ]"
              >{{ percentChange }}%</span
            ></span
          ></v-card
        >
      </v-col>
      <v-col>
        <v-card class="col" color="secondary">
          <span>
            Average price: <br />
            €{{ avgPrice }}</span
          ></v-card
        >
      </v-col>

      <v-col>
        <v-card class="col" color="secondary">
          <span>
            # Investments: <br />
            {{ investments }}</span
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
      activeColor: "green",
      currentPrice: 0,
      btc: 0,
      costs: 0,
      investments: 0
    };
  },
  mounted: function() {
    fetch("https://bitvavo.jjdev.nl:3443/currentPrice")
      .then(data => data.json())
      .then(data => {
        this.currentPrice = data;
      });
    fetch("https://bitvavo.jjdev.nl:3443/tradeStats")
      .then(data => data.json())
      .then(data => {
        this.btc = data.btc;
        this.costs = data.costs;
        this.investments = data.investments;
      });
  },
  computed: {
    avgPrice: function() {
      return (this.costs / this.btc).toFixed(2);
    },
    percentChange: function() {
      return (((this.btc * this.currentPrice) / this.costs - 1) * 100).toFixed(
        2
      );
    },
    sats: function() {
      return (this.btc * 100000000).toFixed();
    },
    satsValue: function() {
      return (this.btc * this.currentPrice).toFixed(2);
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
.col {
  min-height: 100%;
}
</style>
