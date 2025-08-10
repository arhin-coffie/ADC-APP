<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow">
    <!-- Table Controls -->
    <div class="p-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="w-full md:w-auto">
        <label for="search" class="sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            id="search"
            v-model="searchQuery"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search results..."
            type="search"
          >
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <span v-if="invalidResultsCount > 0" class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
          {{ invalidResultsCount }} validation issues
        </span>
        <button 
          @click="validateResults"
          class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm hover:bg-yellow-200 transition"
        >
          Validate Results
        </button>
        <label for="status-filter" class="text-sm text-gray-700">Status:</label>
        <select
          id="status-filter"
          v-model="statusFilter"
          class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="verified">Verified</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            :class="{
              'w-1/6': header.key === 'region',
              'w-1/6': header.key === 'constituency',
              'w-1/6': header.key === 'ward',
              'w-1/6': header.key === 'pollingStation',
              'w-1/12': ['ndc', 'npp', 'others'].includes(header.key),
              'w-1/6': header.key === 'winner',
              'w-1/12': header.key === 'status'
            }"
            @click="sortBy(header.key)"
          >
            <div class="flex items-center">
              {{ header.label }}
              <span v-if="sortKey === header.key" class="ml-1">
                <svg
                  class="h-4 w-4"
                  :class="{ 'transform rotate-180': sortOrder === 'desc' }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-if="filteredResults.length === 0">
          <td :colspan="headers.length + 1" class="px-6 py-4 text-center text-sm text-gray-500">
            No results found
          </td>
        </tr>
        <tr
          v-for="result in paginatedResults"
          v-else
          :key="result.id"
          class="hover:bg-gray-50"
          :class="{'bg-red-50': isResultInvalid(result)}"
        >
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ getRegionName(result.regionId) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ getConstituencyName(result.constituencyId) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ getWardName(result.wardId) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ getPollingStationName(result.pollingStationId) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ electionType === 'presidential' ? result.presidential.ndc : result.parliamentary.ndc }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ electionType === 'presidential' ? result.presidential.npp : result.parliamentary.npp }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ electionType === 'presidential' ? result.presidential.others : result.parliamentary.others }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span :class="getWinnerClass(result)" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
              {{ getWinner(result) }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span :class="getStatusClass(result.status)" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
              {{ result.status }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              @click="emit('edit', result)"
              class="text-blue-600 hover:text-blue-900 mr-3"
              title="Edit"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click="confirmDelete(result)"
              class="text-red-600 hover:text-red-900"
              title="Delete"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ pagination.startIndex + 1 }}</span>
            to
            <span class="font-medium">{{ Math.min(pagination.endIndex, filteredResults.length) }}</span>
            of
            <span class="font-medium">{{ filteredResults.length }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              @click="prevPage"
              :disabled="pagination.currentPage === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <button
              v-for="page in pagination.pages"
              :key="page"
              @click="goToPage(page)"
              :class="{
                'z-10 bg-blue-50 border-blue-500 text-blue-600': pagination.currentPage === page,
                'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': pagination.currentPage !== page
              }"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.currentPage === pagination.totalPages"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Validation Warning Modal -->
    <div v-if="showValidationWarning" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-red-600">Validation Alert</h3>
          <button @click="showValidationWarning = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="text-gray-600 mb-4">
          {{ validationMessage }}
        </p>
        <div class="flex justify-end">
          <button
            @click="showValidationWarning = false"
            class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Confirm Deletion</h3>
          <button @click="showDeleteModal = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="text-gray-600 mb-4">
          Are you sure you want to delete the results for
          <span class="font-semibold">{{ getPollingStationName(resultToDelete?.pollingStationId) }}</span>?
          This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="deleteResult"
            class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  itemsPerPage: {
    type: Number,
    default: 6
  },
  results: {
    type: Array,
    required: true,
    default: () => []
  },
  electionType: {
    type: String,
    required: true,
    validator: value => ['presidential', 'parliamentary'].includes(value)
  },
  regions: {
    type: Array,
    required: true,
    default: () => []
  },
  constituencies: {
    type: Array,
    required: true,
    default: () => []
  },
  wards: {
    type: Array,
    required: true,
    default: () => []
  },
  pollingStations: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['edit', 'delete'])

// Table headers configuration
const headers = computed(() => [
  { key: 'region', label: 'Region' },
  { key: 'constituency', label: 'Constituency' },
  { key: 'ward', label: 'Ward' },
  { key: 'pollingStation', label: 'Polling Station' },
  { key: 'ndc', label: 'NDC' },
  { key: 'npp', label: 'NPP' },
  { key: 'others', label: 'Others' },
  { key: 'winner', label: 'Winner' },
  { key: 'status', label: 'Status' }
])

// Search and filter
const searchQuery = ref('')
const statusFilter = ref('all')

// Sorting
const sortKey = ref('region')
const sortOrder = ref('asc')

// Pagination
const paginationCurrentPage = ref(1)

const pagination = computed(() => {
  const totalPages = Math.ceil(filteredResults.value.length / props.itemsPerPage)
  const currentPage = Math.min(paginationCurrentPage.value, totalPages || 1)
  const startIndex = (currentPage - 1) * props.itemsPerPage
  const endIndex = Math.min(startIndex + props.itemsPerPage, filteredResults.value.length)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    pages
  }
})

// Delete confirmation
const showDeleteModal = ref(false)
const resultToDelete = ref(null)

// Validation
const showValidationWarning = ref(false)
const validationMessage = ref('')

// Helper functions
const getRegionName = (regionId) => {
  const region = props.regions.find(r => r.id === regionId)
  return region ? region.name : 'Unknown Region'
}

const getConstituencyName = (constituencyId) => {
  const constituency = props.constituencies.find(c => c.id === constituencyId)
  return constituency ? constituency.name : 'Unknown Constituency'
}

const getWardName = (wardId) => {
  const ward = props.wards.find(w => w.id === wardId)
  return ward ? ward.name : 'Unknown Ward'
}

const getPollingStationName = (pollingStationId) => {
  const station = props.pollingStations.find(p => p.id === pollingStationId)
  return station ? station.name : 'Unknown Station'
}

const getWinner = (result) => {
  const votes = props.electionType === 'presidential' ? result.presidential : result.parliamentary
  if (votes.ndc > votes.npp && votes.ndc > votes.others) return 'NDC'
  if (votes.npp > votes.ndc && votes.npp > votes.others) return 'NPP'
  return 'Others'
}

const getWinnerClass = (result) => {
  const winner = getWinner(result)
  return {
    'bg-green-100 text-green-800': winner === 'NDC',
    'bg-red-100 text-red-800': winner === 'NPP',
    'bg-gray-100 text-gray-800': winner === 'Others'
  }
}

const getStatusClass = (status) => {
  return {
    'bg-yellow-100 text-yellow-800': status.toLowerCase() === 'draft',
    'bg-blue-100 text-blue-800': status.toLowerCase() === 'verified',
    'bg-green-100 text-green-800': status.toLowerCase() === 'finalized'
  }
}

const isResultInvalid = (result) => {
  const totalVotes = result.validVotes + result.rejectedBallots
  return totalVotes > result.registeredVoters
}

// Filter and sort results
const filteredResults = computed(() => {
  let filtered = [...props.results]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(result => {
      const region = getRegionName(result.regionId).toLowerCase()
      const constituency = getConstituencyName(result.constituencyId).toLowerCase()
      const ward = getWardName(result.wardId).toLowerCase()
      const station = getPollingStationName(result.pollingStationId).toLowerCase()
      const submittedBy = result.submittedBy.toLowerCase()
      
      return region.includes(query) ||
             constituency.includes(query) ||
             ward.includes(query) ||
             station.includes(query) ||
             submittedBy.includes(query) ||
             result.status.toLowerCase().includes(query)
    })
  }

  // Apply status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(result => result.status.toLowerCase() === statusFilter.value.toLowerCase())
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let compareA, compareB

    switch (sortKey.value) {
      case 'region':
        compareA = getRegionName(a.regionId)
        compareB = getRegionName(b.regionId)
        break
      case 'constituency':
        compareA = getConstituencyName(a.constituencyId)
        compareB = getConstituencyName(b.constituencyId)
        break
      case 'ward':
        compareA = getWardName(a.wardId)
        compareB = getWardName(b.wardId)
        break
      case 'pollingStation':
        compareA = getPollingStationName(a.pollingStationId)
        compareB = getPollingStationName(b.pollingStationId)
        break
      case 'ndc':
        compareA = props.electionType === 'presidential' ? a.presidential.ndc : a.parliamentary.ndc
        compareB = props.electionType === 'presidential' ? b.presidential.ndc : b.parliamentary.ndc
        break
      case 'npp':
        compareA = props.electionType === 'presidential' ? a.presidential.npp : a.parliamentary.npp
        compareB = props.electionType === 'presidential' ? b.presidential.npp : b.parliamentary.npp
        break
      case 'others':
        compareA = props.electionType === 'presidential' ? a.presidential.others : a.parliamentary.others
        compareB = props.electionType === 'presidential' ? b.presidential.others : b.parliamentary.others
        break
      case 'winner':
        compareA = getWinner(a)
        compareB = getWinner(b)
        break
      case 'status':
        compareA = a.status
        compareB = b.status
        break
      default:
        return 0
    }

    if (compareA < compareB) return sortOrder.value === 'asc' ? -1 : 1
    if (compareA > compareB) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })

  return filtered
})

// Count invalid results
const invalidResultsCount = computed(() => {
  return props.results.filter(result => 
    (result.validVotes + result.rejectedBallots) > result.registeredVoters
  ).length
})

// Pagination logic
const paginatedResults = computed(() => {
  const start = (pagination.value.currentPage - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return filteredResults.value.slice(start, end)
})

// Page navigation
const prevPage = () => {
  if (paginationCurrentPage.value > 1) {
    paginationCurrentPage.value--
  }
}

const nextPage = () => {
  if (paginationCurrentPage.value < pagination.value.totalPages) {
    paginationCurrentPage.value++
  }
}

const goToPage = (page) => {
  paginationCurrentPage.value = page
}

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

// Delete confirmation
const confirmDelete = (result) => {
  resultToDelete.value = result
  showDeleteModal.value = true
}

const deleteResult = () => {
  if (resultToDelete.value) {
    emit('delete', resultToDelete.value.id)
    showDeleteModal.value = false
    resultToDelete.value = null
  }
}

// Validation
const validateResults = () => {
  const invalidResults = props.results.filter(result => {
    const totalVotes = result.validVotes + result.rejectedBallots
    return totalVotes > result.registeredVoters
  })

  if (invalidResults.length > 0) {
    showValidationWarning.value = true
    validationMessage.value = `Found ${invalidResults.length} results where total votes exceed registered voters.`
  } else {
    showValidationWarning.value = true
    validationMessage.value = 'All results are valid!'
  }
}

// Only validate when results change
watch(() => props.results, (newResults) => {
  if (newResults.length > 0) {
    validateResults()
  }
}, { immediate: true })
</script>