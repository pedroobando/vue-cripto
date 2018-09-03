<template>
  <div>
    <b-row>
      <b-col sm="4">
        <p>Name: {{ coin.name }}</p>
        <p>Symbol: {{ coin.symbol }}</p>
        <p>Price (USD): {{ coin.price_usd | currency }}</p>
        <p>Volumen 24h: {{ coin.volumen24h | currency }}</p>
        <p>Cambio 1h:
          <span v-bind:style="getColor(coin.percent_change_1h)">
            <span v-if="coin.percent_change_1h > 0">+</span>{{ coin.percent_change_1h }}%
          </span>
        </p>
        <p>Cambio 24h:
          <span v-bind:style="getColor(coin.percent_change_24h)">
            <span v-if="coin.percent_change_24h > 0">+</span>{{ coin.percent_change_24h }}%
          </span>
        </p>
        <p>Cambio 7d:
          <span v-bind:style="getColor(coin.percent_change_7d)">
            <span v-if="coin.percent_change_7d > 0">+</span>{{ coin.percent_change_7d }}%
          </span>
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-button to="/">Retorno</b-button>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';

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
      const _routeMoney = `https://api.coinmarketcap.com/v2/ticker/${this.$route.params.id}/?convert=BCH`
      // axios.get('https://api.coinmarketcap.com/v2/ticker/'+this.$route.params.id+'/')
      await axios.get(_routeMoney)
        .then((resp) => {
          const _money = resp.data.data
          this.coin = { name: _money.name, symbol: _money.symbol,
            price_usd: _money.quotes.USD.price, price_btc: 1,
            volumen24h: _money.quotes.USD.volume_24h,
            percent_change_1h: _money.quotes.USD.percent_change_1h, percent_change_24h: _money.quotes.USD.percent_change_24h,
            percent_change_7d: _money.quotes.USD.percent_change_7d
          }
          // this.items = []
          // this.items.push({name: resp.data })
          // vitems = [
          //   { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          //   { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' }
          // ]
          // console.log(resp.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getColor: function(num) {
      return num > 0 ? "color:green;" : "color:red";
    },
  }
}
</script>

<style>

</style>
