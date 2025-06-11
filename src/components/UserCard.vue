<template>
  <div class="member-card bg-white rounded-lg shadow-md overflow-hidden w-64 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
    <div class="bg-[#2f855a] p-4 text-white">
      <h3 class="text-lg font-semibold truncate">{{ member.name }}</h3>
      <p class="text-sm opacity-90">{{ member.position }}</p>
    </div>
    
    <div class="p-4">
      <div class="flex items-center mb-2">
        <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span class="text-gray-700">{{ member.phone }}</span>
      </div>
      
      <div class="flex items-center mb-2">
        <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
        <span class="text-gray-700">ID: {{ member.idNumber }}</span>
      </div>
      
      <div class="flex items-center mb-3">
        <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-gray-700 text-sm">Poll Station: {{ member.poll_Station }}</span>
      </div>
      
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ member.description }}</p>
      
      <button @click.stop="$emit('remove')" class="text-red-500 hover:text-red-700 text-sm font-medium flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Remove
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  member: {
    type: Object,
    required: true
  }
});

defineEmits(['remove']);
</script>

<style scoped>
.member-card {
  border: 1px solid #e2e8f0;
}

.member-card:hover {
  border-color: #cbd5e0;
}
</style>