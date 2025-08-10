<template>
  <div class="w-full h-full">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Chart, registerables } from 'chart.js'

// Register all Chart.js components
Chart.register(...registerables)

const props = defineProps({
  data: Object,
  electionType: String
})

const chartCanvas = ref(null)
let chartInstance = null

const chartData = computed(() => {
  if (!props.data) return null
  
  const voteData = props.electionType === 'presidential' 
    ? props.data.presidential 
    : props.data.parliamentary
  
  const total = voteData.ndc + voteData.npp + voteData.others
  if (total === 0) return null
  
  return {
    labels: ['NDC', 'NPP', 'Others'],
    datasets: [{
      data: [voteData.ndc, voteData.npp, voteData.others],
      backgroundColor: [
        '#008000', // Green for NDC
        'blue', // Red for NPP
        '#808080'  // Gray for Others
      ],
      borderColor: [
        '#FFFFFF',
        'blue',
        '#FFFFFF'
      ],
      borderWidth: 1
    }]
  }
})

const initChart = () => {
  if (!chartData.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  
  if (chartInstance) {
    chartInstance.destroy()
  }
  
  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: chartData.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `${props.electionType === 'presidential' ? 'Presidential' : 'Parliamentary'} Vote Share`,
          font: {
            size: 16
          }
        },
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0)
              const value = context.raw
              const percentage = Math.round((value / total) * 100)
              return `${context.label}: ${value.toLocaleString()} votes (${percentage}%)`
            }
          }
        }
      }
    }
  })
}

onMounted(() => {
  initChart()
})

watch(() => [props.data, props.electionType], () => {
  initChart()
}, { deep: true })
</script>