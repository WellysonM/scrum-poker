<template>
  <v-app>
    <v-app-bar app color="padrao2" dark>
      <v-spacer/>
      <div class="d-flex align-center">
        <v-icon large left>
          mdi-coffee-to-go-outline
        </v-icon>
      </div>
      <v-flex center>
        <h4>Scrum Poker</h4>
      </v-flex>
    </v-app-bar>
    <v-content>
      <inicio/>
    </v-content>
  </v-app>
</template>

<script>
import inicio from './components/Inicio';

export default {
  name: 'App',

  components: {
    inicio,
  },

  data: () => ({
    //
  }),
};
</script>
<style>
html {
  overflow: auto !important;
}

.padrao2 {
  background: #0F2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2C5364, #243B55, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
