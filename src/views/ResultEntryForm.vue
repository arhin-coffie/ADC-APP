<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Location Selection -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Region -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Region*</label>
        <select 
          v-model="formData.regionId" 
          @change="formData.constituencyId = ''; formData.wardId = ''; formData.pollingStationId = ''"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        >
          <option value="" disabled>Select Region</option>
          <option v-for="region in regions" :key="region.id" :value="region.id">
            {{ region.name }}
          </option>
        </select>
      </div>
      
      <!-- Constituency -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Constituency*</label>
        <select 
          v-model="formData.constituencyId" 
          @change="formData.wardId = ''; formData.pollingStationId = ''"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          :disabled="!formData.regionId"
          required
        >
          <option value="" disabled>Select Constituency</option>
          <option 
            v-for="constituency in filteredConstituencies" 
            :key="constituency.id" 
            :value="constituency.id"
          >
            {{ constituency.name }}
          </option>
        </select>
      </div>
      
      <!-- Ward -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Ward*</label>
        <select 
          v-model="formData.wardId" 
          @change="formData.pollingStationId = ''"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          :disabled="!formData.constituencyId"
          required
        >
          <option value="" disabled>Select Ward</option>
          <option 
            v-for="ward in filteredWards" 
            :key="ward.id" 
            :value="ward.id"
          >
            {{ ward.name }}
          </option>
        </select>
      </div>
      
      <!-- Polling Station -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Polling Station*</label>
        <select 
          v-model="formData.pollingStationId"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          :disabled="!formData.wardId"
          required
        >
          <option value="" disabled>Select Polling Station</option>
          <option 
            v-for="station in filteredPollingStations" 
            :key="station.id" 
            :value="station.id"
          >
            {{ station.name }} ({{ station.code }})
          </option>
        </select>
      </div>
    </div>
    
    <!-- Votes Input Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Presidential Votes -->
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="font-medium text-blue-800 mb-3">Presidential Votes</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">NDC</label>
            <input 
              v-model.number="formData.presidential.ndc" 
              type="number" 
              min="0"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">NPP</label>
            <input 
              v-model.number="formData.presidential.npp" 
              type="number" 
              min="0"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Others</label>
            <input 
              v-model.number="formData.presidential.others" 
              type="number" 
              min="0"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              required
            >
          </div>
        </div>
      </div>
      
      <!-- Parliamentary Votes -->
      <div class="bg-purple-50 p-4 rounded-lg">
        <h3 class="font-medium text-purple-800 mb-3">Parliamentary Votes</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">NDC</label>
            <input 
              v-model.number="formData.parliamentary.ndc" 
              type="number" 
              min="0"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">NPP</label>
            <input 
              v-model.number="formData.parliamentary.npp" 
              type="number" 
              min="0"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Others</label>
            <input 
              v-model.number="formData.parliamentary.others" 
              type="number" 
              min="0"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              required
            >
          </div>
        </div>
      </div>
    </div>
    
    <!-- Totals Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Total Valid Votes</label>
        <input 
          v-model.number="formData.validVotes" 
          type="number" 
          min="0"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        >
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Total Rejected Ballots</label>
        <input 
          v-model.number="formData.rejectedBallots" 
          type="number" 
          min="0"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        >
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Total Registered Voters</label>
        <input 
          v-model.number="formData.registeredVoters" 
          type="number" 
          min="0"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-gray-50"
          required
          readonly
        >
      </div>
    </div>
    
    <!-- Submission Details -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Submitted By</label>
        <input 
          v-model="formData.submittedBy" 
          type="text" 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        >
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select 
          v-model="formData.status" 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        >
          <option value="draft">Draft</option>
          <option value="verified">Verified</option>
        </select>
      </div>
    </div>
    
    <!-- Form Actions -->
    <div class="flex justify-end space-x-3 pt-4">
      <button 
        type="button" 
        @click="resetForm"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
      >
        Reset
      </button>
      <button 
        type="submit" 
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Submit Results
      </button>
    </div>
  </form>

  <!-- Validation Warning Modal -->
  <div v-if="showWarning" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-red-600">Validation Warning</h3>
        <button @click="showWarning = false" class="text-gray-400 hover:text-gray-500">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p class="text-gray-600 mb-4">
        {{ warningMessage }}
      </p>
      <div class="flex justify-end space-x-3">
        <button
          @click="submitAnyway"
          class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          v-if="formData.status === 'verified'"
        >
          Submit as Draft
        </button>
        <button
          @click="showWarning = false"
          class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          Edit Data
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  regions: Array,
  constituencies: Array,
  wards: Array,
  pollingStations: Array
})

const emit = defineEmits(['submit'])

const showWarning = ref(false)
const warningMessage = ref('')

const formData = ref({
  regionId: '',
  constituencyId: '',
  wardId: '',
  pollingStationId: '',
  presidential: {
    ndc: 0,
    npp: 0,
    others: 0
  },
  parliamentary: {
    ndc: 0,
    npp: 0,
    others: 0
  },
  validVotes: 0,
  rejectedBallots: 0,
  registeredVoters: 0,
  submittedBy: '',
  status: 'verified'
})

// Watchers
watch(() => formData.value.pollingStationId, (newVal) => {
  if (newVal) {
    const selectedStation = props.pollingStations.find(
      station => station.id == newVal
    )
    if (selectedStation && selectedStation.total_registered_voters) {
      formData.value.registeredVoters = selectedStation.total_registered_voters
    } else {
      formData.value.registeredVoters = 0
    }
  } else {
    formData.value.registeredVoters = 0
  }
})

// Computed properties
const filteredConstituencies = computed(() => {
  if (!formData.value.regionId) return []
  return props.constituencies.filter(c => c.regionId == formData.value.regionId)
})

const filteredWards = computed(() => {
  if (!formData.value.constituencyId) return []
  return props.wards.filter(w => w.constituencyId == formData.value.constituencyId)
})

const filteredPollingStations = computed(() => {
  if (!formData.value.wardId) return []
  const selectedWard = props.wards.find(w => w.id == formData.value.wardId)
  if (!selectedWard) return []
  
  return props.pollingStations.filter(p => 
    p.ward.toLowerCase() === selectedWard.name.toLowerCase() &&
    p.constituencyId == formData.value.constituencyId
  )
})

// Methods
function handleSubmit() {
  // Calculate totals
  const totalPresidential = formData.value.presidential.ndc + 
                           formData.value.presidential.npp + 
                           formData.value.presidential.others
  const totalParliamentary = formData.value.parliamentary.ndc + 
                             formData.value.parliamentary.npp + 
                             formData.value.parliamentary.others
  const totalVotesCast = formData.value.validVotes + formData.value.rejectedBallots

  // Validate party votes match totals
  if (totalPresidential !== formData.value.validVotes || 
      totalParliamentary !== formData.value.validVotes) {
    warningMessage.value = `Party votes don't match total valid votes. Please check your numbers.`
    showWarning.value = true
    return
  }

  // Validate votes don't exceed registered voters
  if (totalVotesCast > formData.value.registeredVoters) {
    warningMessage.value = `Total votes cast is exceeding total registered voters. You have ${totalVotesCast} votes (${formData.value.validVotes} valid + ${formData.value.rejectedBallots} rejected) but only ${formData.value.registeredVoters} registered voters.`
    showWarning.value = true
    return
  }

  // If validation passes, emit the result
  emit('submit', formData.value)
  resetForm()
}

function submitAnyway() {
  // Change status to draft and submit
  formData.value.status = 'draft'
  emit('submit', formData.value)
  resetForm()
  showWarning.value = false
}

function resetForm() {
  formData.value = {
    regionId: '',
    constituencyId: '',
    wardId: '',
    pollingStationId: '',
    presidential: {
      ndc: 0,
      npp: 0,
      others: 0
    },
    parliamentary: {
      ndc: 0,
      npp: 0,
      others: 0
    },
    validVotes: 0,
    rejectedBallots: 0,
    registeredVoters: 0,
    submittedBy: '',
    status: 'draft'
  }
  showWarning.value = false
}
</script>

<style scoped>
/* Add any custom styles here */
input[readonly] {
  background-color: #f9fafb;
  cursor: not-allowed;
}
</style>