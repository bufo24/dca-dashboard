const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const port = 3443;

const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/bitvavo.jjdev.nl/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/bitvavo.jjdev.nl/cert.pem",
  "utf8"
);
const ca = fs.readFileSync(
  "/etc/letsencrypt/live/bitvavo.jjdev.nl/chain.pem",
  "utf8"
);
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};
const { API_KEY, API_SECRET } = require("./keys");

const bitvavo = require("bitvavo")().options({
  APIKEY: API_KEY,
  APISECRET: API_SECRET,
  ACCESSWINDOW: 10000,
  RESTURL: "https://api.bitvavo.com/v2",
  WSURL: "wss://ws.bitvavo.com/v2/",
  DEBUGGING: false
});

app.get("/currentPrice", async (req, res) => {
  try {
    let response = await bitvavo.tickerPrice({ market: "BTC-EUR" });
    res.json(response.price);
  } catch (error) {
    res.json(error);
  }
});

app.get("/tradeStats", async (req, res) => {
  let output = { btc: 0, costs: 0, investments: 0 };
  try {
    let response = await bitvavo.trades("BTC-EUR", {
      start: 1617573600000
    });
    for (let entry of response) {
      output.btc += +entry.amount;
      output.costs += +entry.amount * +entry.price + +entry.fee;
      output.investments++;
    }
    res.json(output);
  } catch (error) {
    console.log(error);
  }
});

app.get("/trades", async (req, res) => {
  let output = [];
  try {
    let response = await bitvavo.trades("BTC-EUR", {
      start: 1617573600000
    });
    for (let entry of response) {
      output.push(entry);
    }
    res.json(output.reverse());
  } catch (error) {
    console.log(error);
  }
});

app.get("/priceHistory", async (req, res) => {
  let output = [];
  try {
    let response = await bitvavo.candles("BTC-EUR", "1d", {
      start: 1617573600000
    });
    for (let entry of response) {
      output.push({ price: entry[4], timestamp: entry[0] });
    }
    res.json(output.reverse());
  } catch (error) {
    console.log(error);
  }
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log("HTTPS Server running on port 443");
});
