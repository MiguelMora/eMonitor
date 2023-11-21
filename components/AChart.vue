<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <!--      <ve-line :data="chartData"></ve-line>-->
      <line-chart
        v-if="chartRows.length > 0"
        :options="chartOptions"
        :data="chartData"
      />
      <div v-else>Sin datos</div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(Tooltip, LineElement, LinearScale, PointElement, CategoryScale)

const props = defineProps({
  xField: {
    type: String,
    default: 'date',
  },
  yField: {
    type: String,
    default: 'Total',
  },
  title: {
    type: String,
    default: '',
  },
  chartRows: {
    type: Array,
    default: () => [],
  },
  timeScale: {
    type: String,
    default: 'day',
  },
  firstDOW: {
    type: Number,
    default: 1,
  },
})
const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
})
const chartData = computed(() => {
  return {
    labels: rows.value.map((r) => r[props.xField]),
    datasets: [{ data: rows.value.map((r) => r[props.yField]) }],
  }
})
const rows = computed(() => {
  if (props.timeScale === 'week') return groupBy(cmpWeek, labelWeek)
  else if (props.timeScale === 'month') return groupBy(cmpMonth, labelMonth)
  else return groupBy(cmpDay, labelDay)
})
const sortedData = computed(() => {
  const x = props.xField
  return [...props.chartRows].sort((a, b) => a[x].getTime() - b[x].getTime())
})

function getDow(date) {
  // modify date.getDat() so 0 === firstDOW
  return (date.getDay() - props.firstDOW + 7) % 7
}
function groupBy(cmpF, labelF) {
  const y = props.yField
  const x = props.xField
  const sorted = sortedData.value
  const result = []
  for (let i = 0; i < sorted.length; ++i) {
    const d = sorted[i]
    const c = i > 0 ? cmpF(sorted[i - 1][x], d[x]) : -1
    if (c === 0) {
      result[result.length - 1][y] += d[y] || 0
    } else {
      result.push({ [x]: labelF(d[x]), [y]: d[y] || 0 })
    }
  }
  return result
}
function cmpDay(a, b) {
  let result = b.getFullYear() - a.getFullYear()
  if (result !== 0) return result
  result = b.getMonth() - a.getMonth()
  if (result !== 0) return result
  result = b.getDate() - a.getDate()
  return result
}
function labelDay(date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
function getFirstDateOfWeek(date) {
  const dow = getDow(date)
  if (dow === 0) return date
  else {
    const result = new Date(date)
    result.setDate(date.getDate() - dow)
    return result
  }
}
function cmpWeek(a, b) {
  return cmpDay(getFirstDateOfWeek(a), getFirstDateOfWeek(b))
}
function labelWeek(date) {
  const first = getFirstDateOfWeek(date)
  return labelDay(first)
}
function cmpMonth(a, b) {
  const result = b.getFullYear() - a.getFullYear()
  if (result !== 0) return result
  return b.getMonth() - a.getMonth()
}
function labelMonth(date) {
  const dom = date.getDate() - 1
  if (dom === 0) return labelDay(date)
  else {
    const result = new Date(date)
    result.setDate(date.getDate() - dom)
    return labelDay(result)
  }
}
</script>

<style scoped></style>
