<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Polling Stations Management</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage the structure and members of polling stations
        </p>
      </div>
      
      <div class="flex gap-3">
        <select 
          v-model="selectedConstituency"
          class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">All Constituencies</option>
          <option 
            v-for="constituency in constituencies" 
            :key="constituency.id" 
            :value="constituency.id"
          >
            {{ constituency.name }}
          </option>
        </select>
        
        <button
          @click="openStationModal"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
          Add Station
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <LocationMarkerIcon class="h-6 w-6 text-white" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Total Stations
              </dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ stats.totalStations }}
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <UsersIcon class="h-6 w-6 text-white" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Total Members
              </dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ stats.totalMembers }}
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <OfficeBuildingIcon class="h-6 w-6 text-white" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Active Constituencies
              </dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ stats.activeConstituencies }}
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <UserAddIcon class="h-6 w-6 text-white" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Avg. Members/Station
              </dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ stats.avgMembersPerStation }}
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stations Table -->
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Station Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Constituency
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Members
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="station in filteredStations" :key="station.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <LocationMarkerIcon class="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ station.name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      ID: {{ station.code }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ getConstituencyName(station.constituencyId) }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ getRegionName(station.constituencyId) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 mr-3">
                    <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-green-500" 
                        :style="{ width: `${(station.memberCount / stats.maxMembersPerStation) * 100}%` }"
                      ></div>
                    </div>
                  </div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ station.memberCount }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ station.location }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  @click="viewMembers(station.id)" 
                  class="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-4"
                >
                  View Members
                </button>
                <button 
                  @click="editStation(station)" 
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4"
                >
                  Edit
                </button>
                <button 
                  @click="confirmDelete(station.id)" 
                  class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Station Modal -->
    <GDialog v-model="stationModalOpen" max-width="2xl">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ editingStation ? 'Edit Polling Station' : 'Add New Polling Station' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <XIcon class="h-6 w-6" />
          </button>
        </div>
        
        <form @submit.prevent="saveStation" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="station-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Station Name *
              </label>
              <input
                v-model="stationForm.name"
                type="text"
                id="station-name"
                required
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700"
              >
            </div>
            
            <div>
              <label for="station-code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Station Code *
              </label>
              <input
                v-model="stationForm.code"
                type="text"
                id="station-code"
                required
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700"
              >
            </div>
            
            <div>
              <label for="station-constituency" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Constituency *
              </label>
              <select
                v-model="stationForm.constituencyId"
                id="station-constituency"
                required
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700"
              >
                <option value="">Select Constituency</option>
                <option 
                  v-for="constituency in constituencies" 
                  :key="constituency.id" 
                  :value="constituency.id"
                >
                  {{ constituency.name }} ({{ constituency.region }})
                </option>
              </select>
            </div>
            
            <div>
              <label for="station-location" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                v-model="stationForm.location"
                type="text"
                id="station-location"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700"
              >
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {{ editingStation ? 'Update Station' : 'Add Station' }}
            </button>
          </div>
        </form>
      </div>
    </GDialog>

    <!-- Delete Confirmation Dialog -->
    <GDialog v-model="deleteDialogOpen" max-width="sm">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div class="p-6 text-center">
          <ExclamationIcon class="mx-auto h-12 w-12 text-red-600 dark:text-red-400" />
          <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            Delete Polling Station
          </h3>
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this polling station? This action cannot be undone.
          </div>
          
          <div class="mt-5 flex justify-center space-x-4">
            <button
              type="button"
              @click="deleteDialogOpen = false"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="deleteStation"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </GDialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  MapPinIcon as LocationMarkerIcon,
  UsersIcon,
  BuildingOfficeIcon as OfficeBuildingIcon,
  UserPlusIcon as UserAddIcon,
  PlusIcon,
  XMarkIcon as XIcon,
  ExclamationTriangleIcon as ExclamationIcon
} from '@heroicons/vue/24/outline'
// Sample data - replace with your actual data source
const constituencies = ref([
  { id: 1, name: 'Central Constituency', region: 'Greater Accra' },
  { id: 2, name: 'Northside Constituency', region: 'Northern' },
  { id: 3, name: 'Southside Constituency', region: 'Ashanti' },
  { id: 4, name: 'East End Constituency', region: 'Eastern' },
  { id: 5, name: 'West End Constituency', region: 'Western' }
])

const stations = ref([
  { id: 1, name: 'Station A', code: 'STA-001', constituencyId: 1, location: 'Central School', memberCount: 45 },
  { id: 2, name: 'Station B', code: 'STA-002', constituencyId: 1, location: 'Community Center', memberCount: 32 },
  { id: 3, name: 'Station C', code: 'STA-003', constituencyId: 2, location: 'Town Hall', memberCount: 28 },
  { id: 4, name: 'Station D', code: 'STA-004', constituencyId: 3, location: 'Primary School', memberCount: 51 },
  { id: 5, name: 'Station E', code: 'STA-005', constituencyId: 4, location: 'Market Square', memberCount: 37 }
])

// State
const selectedConstituency = ref('')
const stationModalOpen = ref(false)
const deleteDialogOpen = ref(false)
const editingStation = ref(false)
const stationToDelete = ref(null)

const stationForm = ref({
  id: null,
  name: '',
  code: '',
  constituencyId: '',
  location: ''
})

// Computed properties
const filteredStations = computed(() => {
  if (!selectedConstituency.value) return stations.value
  return stations.value.filter(station => station.constituencyId === parseInt(selectedConstituency.value))
})

const stats = computed(() => {
  const filtered = filteredStations.value
  const memberCounts = filtered.map(s => s.memberCount)
  const maxMembers = Math.max(...memberCounts, 0)
  
  return {
    totalStations: filtered.length,
    totalMembers: memberCounts.reduce((a, b) => a + b, 0),
    activeConstituencies: new Set(filtered.map(s => s.constituencyId)).size,
    avgMembersPerStation: filtered.length ? Math.round(memberCounts.reduce((a, b) => a + b, 0) / filtered.length) : 0,
    maxMembersPerStation: maxMembers > 0 ? maxMembers : 1
  }
})

// Methods
function getConstituencyName(id) {
  const constituency = constituencies.value.find(c => c.id === id)
  return constituency ? constituency.name : 'N/A'
}

function getRegionName(id) {
  const constituency = constituencies.value.find(c => c.id === id)
  return constituency ? constituency.region : 'N/A'
}

function openStationModal(station = null) {
  if (station) {
    editingStation.value = true
    stationForm.value = { ...station }
  } else {
    editingStation.value = false
    stationForm.value = {
      id: null,
      name: '',
      code: '',
      constituencyId: selectedConstituency.value || '',
      location: ''
    }
  }
  stationModalOpen.value = true
}

function closeModal() {
  stationModalOpen.value = false
}

function saveStation() {
  if (editingStation.value) {
    // Update existing station
    const index = stations.value.findIndex(s => s.id === stationForm.value.id)
    if (index !== -1) {
      stations.value[index] = { ...stationForm.value }
    }
  } else {
    // Add new station
    const newId = Math.max(...stations.value.map(s => s.id), 0) + 1
    stations.value.push({
      ...stationForm.value,
      id: newId,
      memberCount: 0
    })
  }
  closeModal()
}

function editStation(station) {
  openStationModal(station)
}

function confirmDelete(id) {
  stationToDelete.value = id
  deleteDialogOpen.value = true
}

function deleteStation() {
  stations.value = stations.value.filter(s => s.id !== stationToDelete.value)
  deleteDialogOpen.value = false
  stationToDelete.value = null
}

function viewMembers(stationId) {
  // Implement navigation to members view
  console.log(`View members for station ${stationId}`)
}

// Initialize
onMounted(() => {
  // You might fetch data here in a real application
})
</script>

<style scoped>
/* Custom styles if needed */
</style>