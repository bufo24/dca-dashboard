const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const port = 3000;

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
  let output = { btc: 0, costs: 0 };
  try {
    let response = await bitvavo.trades("BTC-EUR", {
      start: 1617573600000
    });
    for (let entry of response) {
      output.btc += Number(entry.amount);
      output.costs +=
        Number(entry.amount) * Number(entry.price) + Number(entry.fee);
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// const price = async () => {
//     return new Promise(resolve => {
//         try {
//             let response = await bitvavo.tickerPrice({
//             market: "BTC-EUR"
//             });
//             resolve(response.price);
//         } catch (error) {
//             console.log(error);
//         }
//     })
// };

//   try {
//     let response = await bitvavo.trades("BTC-EUR", { start: 1617573600000 });
//     for (let entry of response) {
//       console.log(entry);
//       this.sats += Number(entry.amount);
//       this.costs +=
//         Number(entry.amount) * Number(entry.price) + Number(entry.fee);
//     }
//   } catch (error) {
//     console.log(error);
//   }
