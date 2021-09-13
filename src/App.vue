<template>
  <v-app>
    <v-dialog persistant v-model="popup" max-width="600px">
      <v-card>
        <v-card-title> Enter API host </v-card-title>
        <span
          >Please enter host address. <br />
          Standard is localhost on port 3443 </span
        ><v-text-field
          style="margin-left: auto; margin-right: auto; width: 50%"
          label="Host"
          persistent-hint
          required
          v-model="host"
        ></v-text-field>
        <v-text-field
          style="margin-left: auto; margin-right: auto; width: 50%"
          label="Api Key"
          persistent-hint
          required
          v-model="apiKey"
        ></v-text-field>
        <v-text-field
          style="margin-left: auto; margin-right: auto; width: 50%"
          label="Api Secret"
          persistent-hint
          required
          v-model="apiSecret"
        ></v-text-field>
        <v-select
          style="margin-left: auto; margin-right: auto; width: 50%"
          :items="coins"
          label="Coin to check"
          persistent-hint
          required
          v-model="coin"
        ></v-select>
        <b> Choose from date: </b><br />
        <v-date-picker
          style="margin-left: auto; margin-right: auto; width: 50%"
          persistent-hint
          required
          color="secondary"
          v-model="start"
        ></v-date-picker>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="popup = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="setHost()">
            Save
          </v-btn>
        </v-card-actions></v-card
      >
    </v-dialog>
    <v-app-bar app color="primary">
      <h1>DCA Dashboard</h1>
      <v-spacer></v-spacer>

      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="start"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="start"
            label="Start date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            max-width="50px"
          ></v-text-field>
        </template>
        <v-date-picker v-model="start" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="$refs.menu.save(start)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-select
        label="Coin"
        dense
        :items="coins"
        v-model="coin"
        style="max-width: 7%; padding: 8px; margin: 0;"
        color="secondary"
      >
      </v-select>
      <span> €{{ currentPrice }}</span>
      <v-icon v-if="this.coin == 'BTC'" color="#f7931a">mdi-bitcoin</v-icon>
      <v-icon v-if="this.coin == 'ETH'" color="#3c3c3d">mdi-ethereum</v-icon>
    </v-app-bar>
    <v-main color="primary">
      <v-container fluid>
        <v-row>
          <v-col
            ><Dashboard v-if="hostIsKnown" :coin="coin" :start="start"
          /></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card color="primary"
              ><Sats v-if="hostIsKnown" :coin="coin" :start="start"/></v-card
          ></v-col>
          <v-col>
            <v-card color="primary"
              ><Value v-if="hostIsKnown" :coin="coin" :start="start"/></v-card
          ></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card color="primary"
              ><Price v-if="hostIsKnown" :coin="coin" :start="start"
            /></v-card> </v-col
        ></v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <span
        >By
        <a href="https://github.com/bufo24" target="_blank" id="github"
          >@bufo24</a
        ></span
      >
      <v-container class="text-right">
        <form method="POST" action="http://217.123.41.222:3003/api/v1/invoices">
          <input
            type="hidden"
            name="storeId"
            value="8fV9LoKyQ2m8d2sXWC37gMUUd8Dv5VQvj7oaLJycKg1a"
          />
          <label>€</label>
          <input type="number" name="price" value="5" class="input-box" />
          <input type="hidden" name="currency" value="EUR" />
          <input
            type="submit"
            value="Donate!"
            name="submit"
            src="http://217.123.41.222:3003/img/paybutton/pay.svg"
            alt="Pay with BtcPay, Self-Hosted Bitcoin Payment Processor"
          />
        </form>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import Sats from "./components/Sats";
import Value from "./components/Value";
import Dashboard from "./components/Dashboard";
import Price from "./components/Price";
export default {
  name: "App",
  components: { Sats, Value, Dashboard, Price },
  data: () => ({
    menu: false,
    coin: localStorage.getItem("coin"),
    coins: ["BTC", "ETH"],
    currentPrice: 0,
    popup: true,
    host: localStorage.getItem("host"),
    hostIsKnown: false,
    apiKey: localStorage.getItem("key"),
    apiSecret: localStorage.getItem("secret"),
    start: localStorage.getItem("start"),
    pages: [
      { icon: "mdi-view-dashboard", title: "Dashboard" },
      {
        icon: "mdi-account",
        title: "Sats"
      },
      {
        icon: "mdi-account",
        title: "Value"
      }
    ]
  }),
  methods: {
    update: function() {
      this.$mount();
    },
    fetchCurrentPrice: function() {
      fetch(localStorage.getItem("host") + "/currentPrice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          apiKey: this.apiKey,
          apiSecret: this.apiSecret,
          coin: this.coin
        })
      })
        .then(data => data.json())
        .then(data => {
          this.currentPrice = data;
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    setHost() {
      localStorage.setItem("host", this.host);
      localStorage.setItem("key", this.apiKey);
      localStorage.setItem("secret", this.apiSecret);
      localStorage.setItem("start", this.start);
      localStorage.setItem("coin", this.coin);
      this.popup = false;
      this.hostIsKnown = true;
    }
  },
  mounted: async function() {
    this.popup =
      localStorage.getItem("host") == null ||
      this.apiKey == "" ||
      this.apiSecret == "" ||
      this.start == null ||
      this.coin == null
        ? true
        : false;
    this.host =
      localStorage.getItem("host") == null
        ? "https://bitvavo.jjdev.nl:3443"
        : "";
    if (this.popup == false) {
      this.host = localStorage.getItem("host");
      this.hostIsKnown = true;
      this.fetchCurrentPrice();
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  },
  watch: {
    coin: function(value, oldValue) {
      if (value != oldValue) {
        this.coin = value;
        localStorage.setItem("coin", value);
        this.fetchCurrentPrice();
        if (this.update()) {
          console.log("reloaded");
        }
      }
    },
    start: function(value, oldValue) {
      if (value != oldValue) {
        localStorage.setItem("start", value);
        if (this.update()) {
          console.log("reloaded");
        }
      }
    }
  }
};
</script>
<style>
#github {
  color: black;
}
@media (prefers-color-scheme: dark) {
  #github {
    color: white;
  }
}

.input-box {
  border: 2px solid black;
  border-radius: 4px;
  margin: 5px;
  width: 3em;
}

.v-text-field__details {
  display: none !important;
}

#app
  > div.v-application--wrap
  > header
  > div
  > div.v-input.v-input--is-label-active.v-input--is-dirty.v-input--is-readonly.theme--light.v-text-field.v-text-field--is-booted {
  max-width: 20%;
}
</style>
