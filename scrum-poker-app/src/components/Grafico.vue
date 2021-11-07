<template>
  <div class="chart">
    <pie-chart
        :data="dadosGrafico"
        pie-style="rose"
    />
  </div>
</template>

<script>

export default {
  name: 'Grafico',
  data() {
    return {}
  },
  props: {
    dadosGrafico: {
      required: true
    }
  },
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
