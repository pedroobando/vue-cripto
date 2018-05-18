<template>
  <div>
    <b-pagination  align="center" total-rows="100" per-page="10" @change="changePage"/>
    <b-table striped hover :items="coins" :fields="fileds">
      <template slot="rank" slot-scope="data">
        <div v-bind:id="data.item.rank" style="text-align: center;">
          {{data.item.rank}}
        </div>
      </template>
      <template slot="name" slot-scope="data">
        <div style="width:180px">
        <img v-bind:src="(data.item.url)"/>
        &nbsp;
        <b-link v-bind:to="getCoinCurrency(data.item.name)">{{data.item.name}}</b-link>
        </div>
      </template>
      <template slot="price_usd" slot-scope="data">
        <div style="text-align: right;">
          {{data.item.price_usd | currency }}
        </div>
      </template>
      <template slot="price_btc" slot-scope="data">
        <div style="text-align: right;">
          {{data.item.price_btc | currency('',8) }}
        </div>
      </template>
      <template slot="volume_24h" slot-scope="data">
        <div style="text-align: right;">
          {{data.item.volume_24h | currency }}
        </div>
      </template>
      <template slot="percent_change_1h" slot-scope="data">
        <div style="text-align: right;">
          <span v-bind:style="getColor(data.item.percent_change_1h)">
            <span v-if="data.item.percent_change_1h > 0">+</span>{{ data.item.percent_change_1h }}%
          </span>
        </div>
      </template>
      <template slot="percent_change_24h" slot-scope="data">
        <div style="text-align: right;">
          <span v-bind:style="getColor(data.item.percent_change_24h)">
            <span v-if="data.item.percent_change_24h > 0">+</span>{{ data.item.percent_change_24h }}%
          </span>
        </div>
      </template>
      <template slot="percent_change_7d" slot-scope="data">
        <div style="text-align: right;">
          <span v-bind:style="getColor(data.item.percent_change_7d)">
            <span v-if="data.item.percent_change_7d > 0">+</span>{{ data.item.percent_change_7d }}%
          </span>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
const tabFields = [
  {key: 'rank', label: 'Rango'},
  {key: 'name', label: 'Nombre'},
  {key: 'symbol', label: 'Simbolo'},
  {key: 'price_usd', label: 'Precio (USD)'},
  {key: 'price_btc', label: 'Precio (BTC)'},
  {key: 'volume_24h', label: 'Volumen 24h'},
  {key: 'percent_change_1h', label: 'Cambio 1h'},
  {key: 'percent_change_24h', label: 'Cambio 24h'},
  {key: 'percent_change_7d', label: 'Cambio 7d'},
]

const CRYPTOCOMPARE_API_URI = "https://www.cryptocompare.com";
const COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";
const RUTA_IMAGEN = "https://s2.coinmarketcap.com/static/img/coins/16x16/";
const UPDATE_INTERVAL = 120 * 1000;
const GET_TOTALCOINS = 10;

import axios from 'axios'

export default {
  name: 'ListaMonedas',
  data() {
    return {
      fileds: tabFields,
      coins: [],
      resultado: '',
      precioBTC: 0,
      currentPage: 1
    }
  },
  methods: {
    getCoins: async function() {
      this.coins = [];
      await axios.get(COINMARKETCAP_API_URI + `/v2/ticker/?start=${((this.currentPage-1)*10)+1}&limit=${GET_TOTALCOINS}`)
        .then((resp) => {
          const coinsAll = resp.data.data;
          // this.resultado =  coinsAll[1].name;
          // Create de collection
          for (let key in coinsAll) {
            if (coinsAll[key].symbol == 'BTC') {
              this.precioBTC = coinsAll[key].quotes.USD.price;
            }
            // this.resultado =  coinsAll[key].id;
            this.coins.push({
              id: coinsAll[key].id, name: coinsAll[key].name, symbol: coinsAll[key].symbol, rank: coinsAll[key].rank,
              url: this.getCoinImage(coinsAll[key].id),
              price_usd: coinsAll[key].quotes.USD.price, price_btc: coinsAll[key].quotes.USD.price / this.precioBTC,  volume_24h:coinsAll[key].quotes.USD.volume_24h,
              percent_change_1h: coinsAll[key].quotes.USD.percent_change_1h, percent_change_24h: coinsAll[key].quotes.USD.percent_change_24h,
              percent_change_7d: coinsAll[key].quotes.USD.percent_change_7d
             })
          }
          // Ordenar la colleccion
          this.coins.sort((a, b) => {
            if (a.rank > b.rank) {
              return 1;
            } else {
              return 0;
            }
          })

        })
        .catch((err) => {
          console.error(err);
        });
    },
    setTimer: function() {
      var self = this
      setInterval(() => {
        self.getCoins();
      } , UPDATE_INTERVAL);
    },
    getCoinImage: function(symbol) {
      return RUTA_IMAGEN+`${symbol}.png`;
    },
    getCoinCurrency: function(coin) {
      return `moneda/${coin}`;
    },
    getColor: function(num) {
      return num > 0 ? "color:green;" : "color:red";
    },
    changePage: function (page) {
      this.currentPage = page
      // this.filter.offset = ((this.currentPage - 1) * this.filter.limit)
      this.getCoins() // api call
    }
  },
  created: function() {
    this.getCoins();
    this.setTimer();    
  }
}
</script>

<style>

</style>
