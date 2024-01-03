<template>
  <DoughnutChart :chartData="this.chartValues" :options="this.chartOptions"/>
</template>

<script>
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default{
  components:{
    DoughnutChart
  },
  props:{
    chartId: null,
    chartValues: null,
    chartOptions: null
  }
}
</script>
