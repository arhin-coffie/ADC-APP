<template>
  <div class="min-h-screen bg-gray-50 md:p-6 ">
    <!-- Header -->
    <header class="mb-6">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Election Results Collation System</h1>
      <p class="text-gray-600">National Election Commission - 2024 General Elections</p>
    </header>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <SummaryCard 
        title="Total Votes (Presidential)" 
        :value="summaryStats.totalPresidentialVotes" 
        icon="🗳️"
        color="bg-blue-100 text-blue-800"
      />
      <SummaryCard 
        title="Total Votes (Parliamentary)" 
        :value="summaryStats.totalParliamentaryVotes" 
        icon="📊"
        color="bg-purple-100 text-purple-800"
      />
      <SummaryCard 
        title="Rejected Ballots" 
        :value="summaryStats.totalRejectedBallots" 
        icon="❌"
        color="bg-red-100 text-red-800"
      />
      <SummaryCard 
        title="Collated Stations" 
        :value="`${summaryStats.collatedStations}/${summaryStats.totalStations}`" 
        icon="✅"
        color="bg-green-100 text-green-800"
      />
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <select 
            v-model="filters.region" 
            @change="filters.constituency = ''; filters.pollingStation = ''"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Regions</option>
            <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Constituency</label>
          <select 
            v-model="filters.constituency" 
            @change="filters.pollingStation = ''"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            :disabled="!filters.region"
          >
            <option value="">All Constituencies</option>
            <option v-for="constituency in filteredConstituencies" :key="constituency.id" :value="constituency.id">
              {{ constituency.name }}
            </option>
          </select>
        </div>
        
       
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Election Type</label>
          <select 
            v-model="filters.electionType" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="presidential">Presidential</option>
            <option value="parliamentary">Parliamentary</option>
          </select>
        </div>
        
        <div class="flex items-end">
          <button 
            @click="resetFilters"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Bar Chart -->
      <div class="bg-white rounded-lg shadow mb-10 p-4 parent-container">
        <h2 class="text-lg font-semibold">Votes by Party ({{ filters.electionType === 'presidential' ? 'Presidential' : 'Parliamentary' }})</h2>
        <BarChart 
          :data="chartData.barChart" 
          :electionType="filters.electionType"
          class="h-64"
        />
      </div>
      
      <!-- Pie Chart -->
      <div class="bg-white rounded-lg shadow p-4 parent-container">
        <h2 class="text-lg font-semibold mb-4">Vote Share ({{ filters.electionType === 'presidential' ? 'Presidential' : 'Parliamentary' }})</h2>
        <PieChart 
          :data="chartData.pieChart" 
          :electionType="filters.electionType"
          class="h-64"
        />
      </div>
    </div>

    <!-- Progress Chart -->
    <div class="bg-white rounded-lg shadow p-4 mb-6 ">
      <h2 class="text-lg font-semibold mb-4">Collation Progress</h2>
      <ProgressChart 
        :collated="summaryStats.collatedStations" 
        :total="summaryStats.totalStations"
        class="h-20"
      />
    </div>

    <!-- Data Entry Section -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-lg font-semibold mb-4">Enter New Results</h2>
      <ResultEntryForm 
    @submit="handleNewResult"
    :regions="regions"
    :constituencies="constituencies"
    :wards="wards"
    :pollingStations="pollingStations"
  />
    </div>

    <!-- Results Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-semibold">Election Results</h2>
        <div class="flex space-x-2">
          <button 
            @click="exportToExcel"
            class="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200 transition"
          >
            Export Excel
          </button>
          <button 
            @click="exportToPDF"
            class="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition"
          >
            Export PDF
          </button>
          <button 
            @click="printReport"
            class="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition"
          >
            Print
          </button>
        </div>
      </div>
      <ResultsTable
        :results="filteredResults"
        :election-type="filters.electionType"
        :regions="regions"
        :constituencies="constituencies"
        :wards="wards"
        :polling-stations="pollingStations"
        :items-per-page="6"
        @edit="handleEditResult"
        @delete="handleDeleteResult"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import SummaryCard from '../components/SummeryCardComponent.vue'
import BarChart from '../components/BarChart.vue'
import PieChart from '../components/PieChart.vue'
import ProgressChart from './ProgressChart.vue'
import ResultEntryForm from '../views/ResultEntryForm.vue'
import ResultsTable from '../views/ResultTable.vue'

// Constants
const POLLING_STATIONS_KEY = 'pollingStationsApp'
const ELECTION_RESULTS_KEY = 'election-results'

// Data initialization
const regions = ref([
  { id: 1, name: 'Western Region' },
  { id: 2, name: 'Greater Accra' }
])

const constituencies = ref([
  { id: 1, name: 'Takoradi Constituency', regionId: 1 },
  { id: 2, name: 'Sekondi Constituency', regionId: 1 },
  { id: 3, name: 'Accra Central', regionId: 2 }
])

const wards = ref([
  { id: 1, name: 'NEW TAKORADI UPPER', constituencyId: 1 },
  { id: 2, name: 'NEW TAKORADI LOWER', constituencyId: 1 },
  { id: 3, name: 'CASSAVA FARM WARD', constituencyId: 1 },
  { id: 4, name: 'BEACH ROAD', constituencyId: 2 }
])

const pollingStations = ref([])
const electionResults = ref([])

// Filters
const filters = ref({
  region: '',
  constituency: '',
  ward: '',
  pollingStation: '',
  electionType: 'presidential'
})

// Helper functions
const normalizeText = (text) => {
  if (!text) return ''
  return text.toString().trim().toUpperCase()
}

const loadFromStorage = (key, defaultValue = []) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : defaultValue
}

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

// Data loading
const loadPollingStations = () => {
  const savedStations = localStorage.getItem(POLLING_STATIONS_KEY)
  
  if (savedStations) {
    pollingStations.value = JSON.parse(savedStations).map(station => ({
      ...station,
      ward: normalizeText(station.ward),
      polling_station: normalizeText(station.polling_station || station.name)
    }))
  } else {
    
    return [];
  }
}

const loadElectionResults = () => {
  electionResults.value = loadFromStorage(ELECTION_RESULTS_KEY, )
}

// Computed properties
const filteredConstituencies = computed(() => {
  if (!filters.value.region) return []
  return constituencies.value.filter(c => c.regionId === filters.value.region)
})

const filteredWards = computed(() => {
  if (!filters.value.constituency) return []
  return wards.value.filter(w => w.constituencyId === filters.value.constituency)
})

const filteredPollingStations = computed(() => {
  if (!filters.value.ward) return []
  const selectedWard = wards.value.find(w => w.id === filters.value.ward)
  if (!selectedWard) return []
  
  return pollingStations.value.filter(p => 
    normalizeText(p.ward) === normalizeText(selectedWard.name) &&
    p.constituencyId === filters.value.constituency
  )
})

const filteredResults = computed(() => {
  let results = [...electionResults.value]
  
  if (filters.value.region) {
    results = results.filter(r => r.regionId === filters.value.region)
  }
  
  if (filters.value.constituency) {
    results = results.filter(r => r.constituencyId === filters.value.constituency)
  }
  
  if (filters.value.ward) {
    results = results.filter(r => r.wardId === filters.value.ward)
  }
  
  if (filters.value.pollingStation) {
    results = results.filter(r => r.pollingStationId === filters.value.pollingStation)
  }
  
  return results
})

const summaryStats = computed(() => {
  const totalStations = pollingStations.value.length
  const collatedStations = new Set(electionResults.value.map(r => r.pollingStationId)).size
  
  const totalPresidentialVotes = electionResults.value.reduce((sum, result) => {
    return sum + result.presidential.ndc + result.presidential.npp + result.presidential.others
  }, 0)
  
  const totalParliamentaryVotes = electionResults.value.reduce((sum, result) => {
    return sum + result.parliamentary.ndc + result.parliamentary.npp + result.parliamentary.others
  }, 0)
  
  const totalRejectedBallots = electionResults.value.reduce((sum, result) => sum + result.rejectedBallots, 0)
  
  return {
    totalPresidentialVotes,
    totalParliamentaryVotes,
    totalRejectedBallots,
    totalStations,
    collatedStations,
    collationPercentage: (collatedStations / totalStations) * 100
  }
})

const chartData = computed(() => {
  const regionsData = regions.value.map(region => {
    const regionResults = electionResults.value.filter(r => r.regionId === region.id)
    
    const presidential = {
      ndc: regionResults.reduce((sum, r) => sum + r.presidential.ndc, 0),
      npp: regionResults.reduce((sum, r) => sum + r.presidential.npp, 0),
      others: regionResults.reduce((sum, r) => sum + r.presidential.others, 0)
    }
    
    const parliamentary = {
      ndc: regionResults.reduce((sum, r) => sum + r.parliamentary.ndc, 0),
      npp: regionResults.reduce((sum, r) => sum + r.parliamentary.npp, 0),
      others: regionResults.reduce((sum, r) => sum + r.parliamentary.others, 0)
    }
    
    return {
      region: region.name,
      presidential,
      parliamentary
    }
  })
  
  const totalPresidential = {
    ndc: electionResults.value.reduce((sum, r) => sum + r.presidential.ndc, 0),
    npp: electionResults.value.reduce((sum, r) => sum + r.presidential.npp, 0),
    others: electionResults.value.reduce((sum, r) => sum + r.presidential.others, 0)
  }
  
  const totalParliamentary = {
    ndc: electionResults.value.reduce((sum, r) => sum + r.parliamentary.ndc, 0),
    npp: electionResults.value.reduce((sum, r) => sum + r.parliamentary.npp, 0),
    others: electionResults.value.reduce((sum, r) => sum + r.parliamentary.others, 0)
  }
  
  return {
    barChart: regionsData,
    pieChart: {
      presidential: totalPresidential,
      parliamentary: totalParliamentary
    }
  }
})

// Methods
const resetFilters = () => {
  filters.value = {
    region: '',
    constituency: '',
    ward: '',
    pollingStation: '',
    electionType: 'presidential'
  }
}

const handleNewResult = (newResult) => {
  const result = {
    id: `new-${Date.now()}`,
    ...newResult,
    submissionDate: new Date().toISOString(),
    status: newResult.status.charAt(0).toUpperCase() + newResult.status.slice(1) // Capitalize first letter
  }
  electionResults.value.push(result)
  saveToStorage(ELECTION_RESULTS_KEY, electionResults.value)
}

const handleEditResult = (updatedResult) => {
  const index = electionResults.value.findIndex(r => r.id === updatedResult.id)
  if (index !== -1) {
    electionResults.value[index] = updatedResult
    saveToStorage(ELECTION_RESULTS_KEY, electionResults.value)
  }
}

const handleDeleteResult = (resultId) => {
  electionResults.value = electionResults.value.filter(r => r.id !== resultId)
  saveToStorage(ELECTION_RESULTS_KEY, electionResults.value)
}

const exportToExcel = () => {
  alert('Export to Excel functionality would be implemented here')
}

const exportToPDF = () => {
  alert('Export to PDF functionality would be implemented here')
}

const printReport = () => {
  window.print()
}

// Watch for changes
watch(pollingStations, (newVal) => {
  saveToStorage(POLLING_STATIONS_KEY, newVal)
}, { deep: true })

// Initialize data
onMounted(() => {
  loadPollingStations()
  loadElectionResults()
})
</script>

<style>
.parent-container {
  height: 100%;
  min-height: 400px;
  max-height: 300px;
}

@media print {
  .no-print {
    display: none;
  }
  
  body {
    background: white;
    font-size: 12pt;
  }
  
  .break-after {
    page-break-after: always;
  }
}
</style>