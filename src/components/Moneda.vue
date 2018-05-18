<template>
  <div>
    <b-row>
      <b-col sm="4">
        <p>Name: {{ coin.name }}</p>
        <p>Symbol: {{ coin.symbol }}</p>
        <p>Price (USD): {{ coin.price_usd }}</p>
      </b-col>
      <b-col sm="8">
        <b-table striped hover :items="items"></b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-button to="/">Retorno</b-button>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
const items = [
  { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
]

export default {
  name: 'Moneda',
  data () {
    return {
      coin: {},
      items: items
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      axios.get('https://api.coinmarketcap.com/v1/ticker/'+this.$route.params.id+'/')
        .then((resp) => {
          this.coin = resp.data[0]
          console.log(resp)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

}
</script>

<style>

</style>
