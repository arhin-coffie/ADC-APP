<template>
  <div 
    :class="[
      'cursor-pointer px-3 py-1',
      active ? 'text-orange-600 border-b-4 border-orange-600' : 'text-black'
    ]"
  >
    {{ label }}
  </div>
</template>

<script setup>
defineProps({
  label: String,
  active: Boolean
})
</script>
