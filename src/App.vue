<template>
  <v-app>
    <v-app-bar app color="primary">
      <h1>DCA Dashboard</h1>
      <v-spacer></v-spacer>
      <span> €{{ currentPrice }}</span>
      <v-icon color="#f7931a">mdi-bitcoin</v-icon>
    </v-app-bar>
    <v-main color="primary">
      <v-container fluid>
        <v-row>
          <v-col><Dashboard /> </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card color="primary"><Sats /></v-card
          ></v-col>
          <v-col>
            <v-card color="primary"><Value /> </v-card
          ></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card color="primary"><Price /> </v-card> </v-col
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
  mounted: async function() {
    fetch("https://bitvavo.jjdev.nl:3443/currentPrice")
      .then(data => data.json())
      .then(data => {
        this.currentPrice = data;
      });
  }
};
</script>
