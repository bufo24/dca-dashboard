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
            Sats staked: <br />
            {{ satsStaked }} </span
          ><span style="font-size:12px">(€{{ satsStakedValue }})</span></v-card
        >
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
      host: localStorage.getItem("host"),
      apiKey: localStorage.getItem("key"),
      apiSecret: localStorage.getItem("secret"),
      start: localStorage.getItem("start"),
      activeColor: "green",
      currentPrice: 0,
      btc: 0,
      costs: 0,
      investments: 0,
      staking: 0
    };
  },
  mounted: function() {
    fetch(this.host + "/currentPrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: this.apiKey,
        apiSecret: this.apiSecret,
        start: new Date(this.start).getTime()
      })
    })
      .then(data => data.json())
      .then(data => {
        this.currentPrice = data;
      });
    fetch(this.host + "/tradeStats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: this.apiKey,
        apiSecret: this.apiSecret,
        start: new Date(this.start).getTime()
      })
    })
      .then(data => data.json())
      .then(data => {
        this.btc = data.btc;
        this.costs = data.costs;
        this.investments = data.investments;
        this.staking = data.staking;
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
      return this.numberWithCommas(Math.round(this.btc * 100000000));
    },
    satsValue: function() {
      return (this.btc * this.currentPrice).toFixed(2);
    },
    satsStaked: function() {
      return Math.round(this.staking * 100000000);
    },
    satsStakedValue: function() {
      return (this.staking * this.currentPrice).toFixed(2);
    }
  },
  methods: {
    numberWithCommas: function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
<style scoped>
@media (prefers-color-scheme: dark) {
  span {
    color: black;
  }
}
span {
  font-weight: bold;
}
</style>
