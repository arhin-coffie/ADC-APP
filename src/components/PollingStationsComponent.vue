<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-4">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Polling Stations Management</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage the structure and members of polling stations
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <div class="relative flex-grow">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by station name..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
          />
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <select
          v-model="selectedConstituency"
          class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:text-white"
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

        <select
          v-model="selectedWard"
          class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:text-white"
        >
          <option value="">All Wards</option>
          <option v-for="ward in uniqueWards" :key="ward" :value="ward">
            {{ ward }}
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
                Ward
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="station in paginatedStations" :key="station.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
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
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ station.ward }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <router-link :to="{ name: 'station-members', params: { name: station.name} }"
                  class="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-4"
                >
                  View Members
                </router-link>
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
            <tr v-if="paginatedStations.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No polling stations found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredStations.length) }}</span> of
              <span class="font-medium">{{ filteredStations.length }}</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
              </button>
              <template v-for="page in visiblePages" :key="page">
                <button
                  v-if="page === '...'"
                  disabled
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  ...
                </button>
                <button
                  v-else
                  @click="currentPage = page"
                  :class="{
                    'z-10 bg-green-50 dark:bg-green-900 border-green-500 dark:border-green-600 text-green-600 dark:text-green-300': currentPage === page,
                    'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600': currentPage !== page
                  }"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  {{ page }}
                </button>
              </template>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <GDialog v-model="stationModalOpen" max-width="600">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ editingStation ? 'Edit Polling Station' : 'Add New Polling Station' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <XIcon class="h-6 w-6" />
          </button>
        </div>

        <form class="p-6 space-y-6">
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
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
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
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
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
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Constituency</option>
                <option value="1">Takoradi Constituency</option>
                <option value="2">Sekondi Constituency</option>
              </select>
            </div>

            <div>
              <label for="station-ward" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ward
              </label>
              <input
                v-model="stationForm.ward"
                type="text"
                id="station-ward"
                placeholder="Enter Ward Name"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
          </div>
          <div v-if="editingStation">
            <label for="total-registered-voters" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enter Total Registered Voters *
            </label>
            <input
              v-model.number="stationForm.total_registered_voters"
              type="number"
              id="total-registered-voters"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button @click.prevent="handleSubmit"
              type="button"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {{ editingStation ? 'Update Station' :'Add Station' }}
            </button>
          </div>
        </form>
      </div>
    </GDialog>

    <GDialog v-model="deleteDialogOpen" max-width="600">
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
import { ref, computed, onMounted, watch } from 'vue'
import {
  MapPinIcon as LocationMarkerIcon,
  UsersIcon,
  BuildingOfficeIcon as OfficeBuildingIcon,
  UserPlusIcon as UserAddIcon,
  PlusIcon,
  XMarkIcon as XIcon,
  ExclamationTriangleIcon as ExclamationIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon // New import for the search icon
} from '@heroicons/vue/24/outline'

// Constants
const STORAGE_KEY = 'pollingStationsApp'
const constituencies = [
  { id: 1, name: 'Takoradi Constituency' },
  { id: 2, name: 'Sekondi Constituency' }
]

// State
const stations = ref([])
const selectedConstituency = ref('')
const selectedWard = ref('') // New state for ward filter
const searchQuery = ref('') // New state for search query
const stationModalOpen = ref(false)
const deleteDialogOpen = ref(false)
const editingStation = ref(false)
const stationToDelete = ref(null)
const members = ref([]); // This seems to be unused for member count display in the table.
                          // It's defined but not filtered per station here.
                          // The `memberCount` in `stationForm` is used for display.

const stationForm = ref({
  id: null,
  name: '',
  code: '',
  constituencyId: '',
  ward: '',
  memberCount: 0, // Initialize with 0 or a reasonable default
  total_registered_voters: null // Initialize as null or 0, will be number type
})

// Pagination
const itemsPerPage = 6
const currentPage = ref(1)

// Initialize data
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  }
}

// Load data
const loadData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY)
  if (savedData) {
    stations.value = JSON.parse(savedData)
  }
}
// Save data
const saveData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stations.value))
}

// Computed properties
const filteredStations = computed(() => {
  let filtered = stations.value;

  // Filter by Constituency
  if (selectedConstituency.value) {
    filtered = filtered.filter(station => station.constituencyId == selectedConstituency.value);
  }

  // Filter by Ward
  if (selectedWard.value) {
    filtered = filtered.filter(station => station.ward && station.ward.toLowerCase() === selectedWard.value.toLowerCase());
  }

  // Search by Station Name
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(station => station.name.toLowerCase().includes(query));
  }

  // Reset currentPage to 1 when filters or search change
  // This is handled by the watch effect below
  return filtered;
});

const totalPages = computed(() => Math.ceil(filteredStations.value.length / itemsPerPage))
const paginatedStations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredStations.value.slice(start, end)
})

// Generate visible page numbers with ellipsis
const visiblePages = computed(() => {
  const pages = []
  const maxVisiblePages = 5 // Show max 5 page numbers at a time

  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    // Show ellipsis if current page is not near the start
    if (currentPage.value > 3) {
      pages.push('...')
    }

    // Show current page and neighbors
    const start = Math.max(2, currentPage.value - 1)
    const end = Math.min(totalPages.value - 1, currentPage.value + 1)

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages.value) {
        pages.push(i)
      }
    }

    // Show ellipsis if current page is not near the end
    if (currentPage.value < totalPages.value - 2) {
      pages.push('...')
    }

    // Always show last page
    pages.push(totalPages.value)
  }

  return pages
})

// Get unique wards for the filter dropdown
const uniqueWards = computed(() => {
  const wards = new Set();
  stations.value.forEach(station => {
    if (station.ward) {
      wards.add(station.ward);
    }
  });
  return Array.from(wards).sort(); // Return sorted unique wards
});


const stats = computed(() => {
  const filtered = filteredStations.value
  const memberCounts = filtered.map(s => s.memberCount || 0)
  const maxMembers = Math.max(...memberCounts, 0)

  return {
    totalStations: filtered.length,
    totalMembers: memberCounts.reduce((a, b) => a + b, 0),
    activeConstituencies: new Set(filtered.map(s => s.constituencyId)).size,
    avgMembersPerStation: filtered.length ? (memberCounts.reduce((a, b) => a + b, 0) / filtered.length).toFixed(1) : 0,
    maxMembersPerStation: maxMembers > 0 ? maxMembers : 1
  }
})

// CRUD Operations
const openStationModal = (station = null) => {
  if (station && station.id) {
    // Editing existing station
    editingStation.value = true
    stationForm.value = JSON.parse(JSON.stringify(station))
  } else {
    // Creating new station
    editingStation.value = false
    stationForm.value = {
      id: null,
      name: '',
      code: '',
      constituencyId: selectedConstituency.value || '',
      ward: '',
      memberCount: 0,
      total_registered_voters: null // Ensure this is reset for new stations
    }
  }
  stationModalOpen.value = true
}

const closeModal = () => {
  stationModalOpen.value = false
}

const handleSubmit = () => {
  if (!stationForm.value.name || !stationForm.value.code || !stationForm.value.constituencyId) {
    alert('Please fill in all required fields: Name, Code, and Constituency')
    return
  }

  // If editing, and the total_registered_voters field is visible, it's also required
  if (editingStation.value && stationForm.value.total_registered_voters === null) {
      alert('Please enter the Total Registered Voters for this station.');
      return;
  }
  
  stationForm.value.constituencyId = parseInt(stationForm.value.constituencyId)

  if (editingStation.value) {
    updateStation()
  } else {
    createStation()
  }

  closeModal()
}

const createStation = () => {
  const newId = stations.value.length > 0
    ? Math.max(...stations.value.map(s => s.id)) + 1
    : 1

  stations.value.push({
    ...stationForm.value,
    id: newId,
    memberCount: stationForm.value.memberCount || 0
  })

  saveData()
}

const updateStation = () => {
  if (!stationForm.value.id) {
    console.warn('No station ID provided. Skipping update.')
    return
  }

  const index = stations.value.findIndex(s => s.id === stationForm.value.id)
  if (index !== -1) {
    stations.value.splice(index, 1, { ...stationForm.value })
    saveData()
  }
}

const editStation = (station) => {
  openStationModal(station)
}

const confirmDelete = (id) => {
  stationToDelete.value = id
  deleteDialogOpen.value = true
}

const deleteStation = () => {
  stations.value = stations.value.filter(s => s.id !== stationToDelete.value)
  saveData()
  deleteDialogOpen.value = false
  stationToDelete.value = null
}

const getConstituencyName = (id) => {
  const constituency = constituencies.find(c => c.id === id)
  return constituency ? constituency.name : 'N/A'
}

// Watchers to reset pagination when filters or search change
watch([selectedConstituency, selectedWard, searchQuery], () => {
  currentPage.value = 1;
});

// Initialize component
onMounted(() => {
  initializeData()
  loadData()
  // The 'members' ref is currently not used to dynamically count members per station in the table.
  // The 'memberCount' property on each station object is used instead.
  // If you intend to use a global 'partyMembers' list for dynamic counts,
  // you'll need to modify the 'memberCount' calculation in the table rows
  // and potentially update station objects when members are added/removed.
  // const allMembers = JSON.parse(localStorage.getItem('partyMembers') || '[]');
  // members.value = allMembers; // If you need a global list of members
});
</script>

<style scoped>
/* Custom styles for pagination */
.relative.z-0.inline-flex.rounded-md.shadow-sm.-space-x-px button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.relative.z-0.inline-flex.rounded-md.shadow-sm.-space-x-px button:not(:disabled):hover {
  background-color: #f9fafb;
}

.dark .relative.z-0.inline-flex.rounded-md.shadow-sm.-space-x-px button:not(:disabled):hover {
  background-color: #374151;
}
</style>