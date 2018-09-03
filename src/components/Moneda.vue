<template>
  <b-row>
    <b-card
            img-src="https://www.bing.com/th?id=OIP.T3SfJNPtJClkoLVcKLMMfQHaEK&pid=Api"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
      <h3>
        {{ coin.name }}
        &nbsp;
        <img style="width:36px" v-bind:src="(coin.url)"/>
      </h3>
      <hr>
      <p>Symbol: <b>{{ coin.symbol }}</b></p>
      <p>Price (USD): <b>{{ coin.price_usd | currency }}</b></p>
      <p>Volumen 24h: <b>{{ coin.volumen24h | currency }}</b></p>
      <p>Cambio 1h:&nbsp;<b>
        <span v-bind:style="getColor(coin.percent_change_1h)">
          <span v-if="coin.percent_change_1h > 0">+</span>{{ coin.percent_change_1h }}%
        </span></b>
      </p>
      <p>Cambio 24h:&nbsp;<b>
        <span v-bind:style="getColor(coin.percent_change_24h)">
          <span v-if="coin.percent_change_24h > 0">+</span>{{ coin.percent_change_24h }}%
        </span></b>
      </p>
      <p>Cambio 7d:&nbsp;<b>
        <span v-bind:style="getColor(coin.percent_change_7d)">
          <span v-if="coin.percent_change_7d > 0">+</span>{{ coin.percent_change_7d }}%
        </span></b>
      </p>
      <hr/>
      <b-button href="/" variant="primary">Retornar</b-button>
    </b-card>
  </b-row>
</template>

<script>
import axios from 'axios';

const RUTA_IMAGEN = "https://s2.coinmarketcap.com/static/img/coins/32x32/";
const COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";

export default {
  name: 'Moneda',
  data () {
    return {
      coin: {},
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    pressByDescripcion: function () {
      this.fetchData()
    },
    fetchData: async function() {
      const _routeMoney = `${COINMARKETCAP_API_URI}/v2/ticker/${this.$route.params.id}/?convert=BCH`
      // axios.get('https://api.coinmarketcap.com/v2/ticker/'+this.$route.params.id+'/')
      await axios.get(_routeMoney)
        .then((resp) => {
          const _money = resp.data.data
          this.coin = { name: _money.name, symbol: _money.symbol,
            price_usd: _money.quotes.USD.price, price_btc: 1,
            volumen24h: _money.quotes.USD.volume_24h,
            percent_change_1h: _money.quotes.USD.percent_change_1h, percent_change_24h: _money.quotes.USD.percent_change_24h,
            percent_change_7d: _money.quotes.USD.percent_change_7d,
            url: this.getCoinImage(_money.id), id: _money.id
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getColor: function(num) {
      return num > 0 ? "color:green;" : "color:red";
    },
    getCoinImage: function(symbol) {
      return RUTA_IMAGEN+`${symbol}.png`;
    },

  }
}
</script>

<style>

</style>
