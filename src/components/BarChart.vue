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
  data: Array,
  electionType: String
})

const chartCanvas = ref(null)
let chartInstance = null

const chartData = computed(() => {
  if (!props.data || props.data.length === 0) return null
  
  return {
    labels: props.data.map(item => item.region),
    datasets: [
      {
        label: 'NDC',
        data: props.data.map(item => props.electionType === 'presidential' 
          ? item.presidential.ndc 
          : item.parliamentary.ndc),
        backgroundColor: '#008000', // Green for NDC
        borderColor: '#008000',
        borderWidth: 1
      },
      {
        label: 'NPP',
        data: props.data.map(item => props.electionType === 'presidential' 
          ? item.presidential.npp 
          : item.parliamentary.npp),
        backgroundColor: '#FF0000', // Red for NPP
        borderColor: '#FF0000',
        borderWidth: 1
      },
      {
        label: 'Others',
        data: props.data.map(item => props.electionType === 'presidential' 
          ? item.presidential.others 
          : item.parliamentary.others),
        backgroundColor: '#808080', // Gray for Others
        borderColor: '#808080',
        borderWidth: 1
      }
    ]
  }
})

const initChart = () => {
  if (!chartData.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  
  if (chartInstance) {
    chartInstance.destroy()
  }
  
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: chartData.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Votes'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Regions'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: `${props.electionType === 'presidential' ? 'Presidential' : 'Parliamentary'} Votes by Region`,
          font: {
            size: 16
          }
        },
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw.toLocaleString()} votes`
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