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
      <span> €{{ currentPrice }}</span>
      <v-icon color="#f7931a">mdi-bitcoin</v-icon>
    </v-app-bar>
    <v-main color="primary">
      <v-container fluid>
        <v-row>
          <v-col><Dashboard v-if="hostIsKnown" /> </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card color="primary"><Sats v-if="hostIsKnown"/></v-card
          ></v-col>
          <v-col>
            <v-card color="primary"><Value v-if="hostIsKnown" /> </v-card
          ></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card color="primary"
              ><Price v-if="hostIsKnown" />
            </v-card> </v-col
        ></v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <span
        >By
        <a href="https://github.com/bufo24" target="_blank" style="color: black"
          >@bufo24</a
        ></span
      >
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
    currentPrice: 0,
    popup: true,
    host: localStorage.getItem("host"),
    hostIsKnown: false,
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
    fetchCurrentPrice: function() {
      fetch(localStorage.getItem("host") + "/currentPrice")
        .then(data => data.json())
        .then(data => {
          this.currentPrice = data;
        });
    },
    setHost() {
      localStorage.setItem("host", this.host);
      this.popup = false;
      this.hostIsKnown = true;
      this.fetchCurrentPrice();
    }
  },
  mounted: async function() {
    this.popup = localStorage.getItem("host") == null ? true : false;
    this.host =
      localStorage.getItem("host") == null ? "http://localhost:3443" : "";
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
      console.log("dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }
};
</script>
