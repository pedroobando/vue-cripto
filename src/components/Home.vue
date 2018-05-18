<template>
  <b-container class="bv">
    <b-row>
      <b-col cols="12">
        <b-jumbotron header="Crypto Compare" lead="Bootstrap 4 Components for Vue.js 2" >
          <p>Este sitio web indexa las 100 principales criptomonedas por capitalización de mercado, mostrando un forma de comparar el rendimiento
              y el rango de la criptomoneda durante la última semana.</p>
          <p>Aplicacion original de <a href="https://scotch.io/tutorials/build-a-cryptocurrency-comparison-site-with-vuejs">scotch.io</a></p>
        </b-jumbotron>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <ListaMoneda></ListaMoneda>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import listaDeMoneda from '@/components/ListaMonedas';

export default {

  components: {
    'ListaMoneda':  listaDeMoneda
  }
}
</script>

<style>

</style>
