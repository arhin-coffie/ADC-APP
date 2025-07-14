<template>
<div class="bg-white rounded-xl shadow-sm p-6">
      <h3 class="text-sm font-medium text-gray-500 mb-4">Gender Breakdown</h3>
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center">
          <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span class="text-sm font-medium">Male</span>
        </div>
        <span class="text-sm font-medium">{{ malePercentage }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div class="bg-blue-500 h-2 rounded-full" :style="{ width: malePercentage + '%' }"></div>
      </div>
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center">
          <div class="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
          <span class="text-sm font-medium">Female</span>
        </div>
        <span class="text-sm font-medium">{{ femalePercentage }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-pink-500 h-2 rounded-full" :style="{ width: femalePercentage + '%' }"></div>
      </div>
    </div>
  
</template>

<script setup>
const GenderCard = {
  props: {
    maleCount: Number,
    femaleCount: Number
  },
  setup(props) {
    const total = computed(() => props.maleCount + props.femaleCount)
    const malePercentage = computed(() => Math.round((props.maleCount / total.value) * 100))
    const femalePercentage = computed(() => Math.round((props.femaleCount / total.value) * 100))

    return { malePercentage, femalePercentage }
  },
}
</script>