<template>
  <div class="w-full">
    <div class="flex justify-between mb-2">
      <span class="text-sm font-medium">Collation Progress</span>
      <span class="text-sm font-medium">{{ Math.round((collated / total) * 100) }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-4">
      <div 
        class="bg-blue-600 h-4 rounded-full" 
        :style="{ width: `${(collated / total) * 100}%` }"
      ></div>
    </div>
    <div class="mt-2 text-sm text-gray-600">
      {{ collated }} of {{ total }} polling stations collated
    </div>
  </div>
</template>

<script setup>
defineProps({
  collated: Number,
  total: Number
})
</script>
