<template>
  <div class="dashboard-container bg-gray-50 min-h-screen p-6">
    <!-- Dashboard Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">NDC Party Analytics</h1>
        <p class="text-gray-500">Last updated: {{ formatDate(new Date()) }}</p>
      </div>
      <div class="flex space-x-3">
        <button @click="exportReport" class="export-button">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Download Report
        </button>
        <button @click="printSummary" class="print-button">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
          </svg>
          Print Summary
        </button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <SummaryCard 
        title="Total Members" 
        :value="totalMembers" 
        icon="users"
        color="bg-blue-100 text-blue-600"
      />
      <SummaryCard 
        title="Total Regions" 
        :value="regions.length" 
        icon="map"
        color="bg-green-100 text-green-600"
      />
      <SummaryCard 
        title="Total Constituencies" 
        :value="totalConstituencies" 
        icon="location-marker"
        color="bg-purple-100 text-purple-600"
      />
      <SummaryCard 
        title="Total Polling Stations" 
        :value="totalPollingStations" 
        icon="flag"
        color="bg-yellow-100 text-yellow-600"
      />
      <SummaryCard 
        title="Registered Leaders" 
        :value="totalLeaders" 
        icon="user-group"
        color="bg-red-100 text-red-600"
      />
      <GenderCard 
        :maleCount="maleMembers"
        :femaleCount="femaleMembers"
      />
    </div>

    <!-- Filter Controls -->
    <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <select 
            v-model="selectedRegion" 
            @change="updateConstituencies"
            class="filter-select"
          >
            <option value="">All Regions</option>
            <option v-for="region in regions" :key="region.id" :value="region.id">
              {{ region.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Constituency</label>
          <select 
            v-model="selectedConstituency" 
            @change="updatePollingStations"
            :disabled="!selectedRegion"
            class="filter-select"
          >
            <option value="">All Constituencies</option>
            <option v-for="constituency in filteredConstituencies" :key="constituency.id" :value="constituency.id">
              {{ constituency.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Polling Station</label>
          <select 
            v-model="selectedPollingStation" 
            :disabled="!selectedConstituency"
            class="filter-select"
          >
            <option value="">All Polling Stations</option>
            <option v-for="station in filteredPollingStations" :key="station.id" :value="station.id">
              {{ station.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Members by Constituency Chart -->
      <div class="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Members by Constituency</h2>
          <div class="flex items-center text-sm text-gray-500">
            <span class="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
            Members
          </div>
        </div>
        <BarChart 
          :chartData="membersByConstituencyChartData"
          :options="barChartOptions"
        />
      </div>

      <!-- Gender Distribution Chart -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Gender Distribution</h2>
        <div class="h-64">
          <PieChart 
            :chartData="genderDistributionChartData"
            :options="pieChartOptions"
          />
        </div>
        <div class="flex justify-center space-x-4 mt-4 text-sm">
          <div class="flex items-center">
            <span class="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
            Male ({{ malePercentage }}%)
          </div>
          <div class="flex items-center">
            <span class="w-3 h-3 bg-pink-500 rounded-full mr-1"></span>
            Female ({{ femalePercentage }}%)
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-800">Recent Member Registrations</h2>
        <div class="text-sm text-gray-500">
          Showing last {{ recentMembers.length }} registrations
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="table-header">Name</th>
              <th scope="col" class="table-header">Role</th>
              <th scope="col" class="table-header">Region</th>
              <th scope="col" class="table-header">Constituency</th>
              <th scope="col" class="table-header">Polling Station</th>
              <th scope="col" class="table-header">Joined Date</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="member in recentMembers" :key="member.id" class="hover:bg-gray-50">
              <td class="table-cell">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span class="text-indigo-600 font-medium">
                      {{ getInitials(member.name) }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ member.name }}</div>
                    <div class="text-sm text-gray-500">{{ member.phone }}</div>
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <span class="px-2 py-1 text-xs font-medium rounded-full" 
                  :class="getRoleClass(member.role)">
                  {{ member.role }}
                </span>
              </td>
              <td class="table-cell">
                {{ getRegionName(member.regionId) }}
              </td>
              <td class="table-cell">
                {{ getConstituencyName(member.constituencyId) }}
              </td>
              <td class="table-cell">
                {{ getPollingStationName(member.pollingStationId) || 'N/A' }}
              </td>
              <td class="table-cell">
                {{ formatDate(member.joinedDate) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Coverage Map (Placeholder) -->
    <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Regional Coverage</h2>
      <div class="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
          </svg>
          <p class="mt-2 text-gray-500">Map visualization would appear here</p>
        </div>
      </div>
      <div class="flex justify-center mt-4 space-x-4 text-sm">
        <div class="flex items-center">
          <span class="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
          Strong Presence
        </div>
        <div class="flex items-center">
          <span class="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
          Moderate Presence
        </div>
        <div class="flex items-center">
          <span class="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
          Weak Presence
        </div>
      </div>
    </div>

     
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { BarChart, PieChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import GenderCard from '../components/GenderCardComponent.vue'
import SummaryCard from '../components/SummeryCardComponent.vue'
Chart.register(...registerables)


// Demo Data
const regions = ref([
  { id: 'region_01', name: 'Greater Accra', color: '#3B82F6' },
  { id: 'region_02', name: 'Ashanti', color: '#10B981' },
  { id: 'region_03', name: 'Central', color: '#F59E0B' },
  { id: 'region_04', name: 'Eastern', color: '#8B5CF6' },
  { id: 'region_05', name: 'Northern', color: '#EC4899' }
])

const constituencies = ref([
  { id: 'const_01', name: 'Accra Central', regionId: 'region_01', memberCount: 1250 },
  { id: 'const_02', name: 'Kumasi Metro', regionId: 'region_02', memberCount: 1840 },
  { id: 'const_03', name: 'Cape Coast North', regionId: 'region_03', memberCount: 760 },
  { id: 'const_04', name: 'Koforidua South', regionId: 'region_04', memberCount: 920 },
  { id: 'const_05', name: 'Tamale Central', regionId: 'region_05', memberCount: 680 },
  { id: 'const_06', name: 'Tema West', regionId: 'region_01', memberCount: 1100 }
])

const pollingStations = ref([
  { id: 'ps_01', name: 'A.M.E. Zion School', constituencyId: 'const_01', memberCount: 85 },
  { id: 'ps_02', name: 'Accra High School', constituencyId: 'const_01', memberCount: 120 },
  { id: 'ps_03', name: 'Kumasi City Hall', constituencyId: 'const_02', memberCount: 210 },
  { id: 'ps_04', name: 'KNUST Campus', constituencyId: 'const_02', memberCount: 180 },
  { id: 'ps_05', name: 'Cape Coast Market', constituencyId: 'const_03', memberCount: 95 }
])

const members = ref([
  { id: 'm_01', name: 'Kwame Nkrumah', role: 'Chairman', gender: 'male', regionId: 'region_01', constituencyId: 'const_01', pollingStationId: 'ps_01', phone: '0244123456', joinedDate: '2023-01-15' },
  { id: 'm_02', name: 'Ama Ata Aidoo', role: 'Secretary', gender: 'female', regionId: 'region_02', constituencyId: 'const_02', pollingStationId: 'ps_03', phone: '0244765432', joinedDate: '2023-02-20' },
  { id: 'm_03', name: 'Kofi Annan', role: 'Treasurer', gender: 'male', regionId: 'region_03', constituencyId: 'const_03', pollingStationId: 'ps_05', phone: '0244987654', joinedDate: '2023-03-05' },
  { id: 'm_04', name: 'Nana Konadu', role: 'Organizer', gender: 'female', regionId: 'region_04', constituencyId: 'const_04', phone: '0244321567', joinedDate: '2023-04-12' },
  { id: 'm_05', name: 'Jerry Rawlings', role: 'Patron', gender: 'male', regionId: 'region_05', constituencyId: 'const_05', phone: '0244654321', joinedDate: '2023-05-08' },
  { id: 'm_06', name: 'John Mahama', role: 'Leader', gender: 'male', regionId: 'region_01', constituencyId: 'const_06', phone: '0244123457', joinedDate: '2023-06-18' },
  { id: 'm_07', name: 'Joyce Bawa', role: 'Deputy Secretary', gender: 'female', regionId: 'region_02', constituencyId: 'const_02', pollingStationId: 'ps_04', phone: '0244765433', joinedDate: '2023-07-22' },
  { id: 'm_08', name: 'Samia Nkrumah', role: 'Communications', gender: 'female', regionId: 'region_03', constituencyId: 'const_03', phone: '0244987655', joinedDate: '2023-08-30' }
])

// Filter Selections
const selectedRegion = ref('')
const selectedConstituency = ref('')
const selectedPollingStation = ref('')

// Computed Properties
const totalMembers = computed(() => members.value.length)
const totalConstituencies = computed(() => constituencies.value.length)
const totalPollingStations = computed(() => pollingStations.value.length)
const totalLeaders = computed(() => members.value.filter(m => ['Chairman', 'Secretary', 'Treasurer', 'Organizer', 'Patron', 'Leader'].includes(m.role)).length)
const maleMembers = computed(() => members.value.filter(m => m.gender === 'male').length)
const femaleMembers = computed(() => members.value.filter(m => m.gender === 'female').length)
const malePercentage = computed(() => Math.round((maleMembers.value / totalMembers.value) * 100))
const femalePercentage = computed(() => Math.round((femaleMembers.value / totalMembers.value) * 100))

const filteredConstituencies = computed(() => {
  if (!selectedRegion.value) return []
  return constituencies.value.filter(c => c.regionId === selectedRegion.value)
})

const filteredPollingStations = computed(() => {
  if (!selectedConstituency.value) return []
  return pollingStations.value.filter(p => p.constituencyId === selectedConstituency.value)
})

const recentMembers = computed(() => {
  return [...members.value]
    .sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate))
    .slice(0, 5)
})

const membersByConstituencyChartData = computed(() => {
  const regionConstituencies = selectedRegion.value 
    ? constituencies.value.filter(c => c.regionId === selectedRegion.value)
    : constituencies.value

  return {
    labels: regionConstituencies.map(c => c.name),
    datasets: [{
      label: 'Members',
      data: regionConstituencies.map(c => c.memberCount),
      backgroundColor: '#3B82F6',
      borderRadius: 6
    }]
  }
})

const genderDistributionChartData = computed(() => {
  return {
    labels: ['Male', 'Female'],
    datasets: [{
      data: [maleMembers.value, femaleMembers.value],
      backgroundColor: ['#3B82F6', '#EC4899'],
      borderWidth: 0
    }]
  }
})

// Chart Options
const barChartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.raw.toLocaleString()}`
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => {
          return value.toLocaleString()
        }
      }
    }
  }
})

const pieChartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  cutout: '70%'
})

// Methods
const updateConstituencies = () => {
  selectedConstituency.value = ''
  selectedPollingStation.value = ''
}

const updatePollingStations = () => {
  selectedPollingStation.value = ''
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getRoleClass = (role) => {
  const roleClasses = {
    'Chairman': 'bg-blue-100 text-blue-800',
    'Secretary': 'bg-green-100 text-green-800',
    'Treasurer': 'bg-purple-100 text-purple-800',
    'Organizer': 'bg-yellow-100 text-yellow-800',
    'Patron': 'bg-red-100 text-red-800',
    'Leader': 'bg-indigo-100 text-indigo-800',
    'Deputy Secretary': 'bg-teal-100 text-teal-800',
    'Communications': 'bg-pink-100 text-pink-800'
  }
  return roleClasses[role] || 'bg-gray-100 text-gray-800'
}

const getRegionName = (regionId) => {
  const region = regions.value.find(r => r.id === regionId)
  return region ? region.name : 'Unknown'
}

const getConstituencyName = (constituencyId) => {
  const constituency = constituencies.value.find(c => c.id === constituencyId)
  return constituency ? constituency.name : 'Unknown'
}

const getPollingStationName = (pollingStationId) => {
  if (!pollingStationId) return null
  const station = pollingStations.value.find(p => p.id === pollingStationId)
  return station ? station.name : 'Unknown'
}

const exportReport = () => {
  alert('Export functionality would be implemented here')
}

const printSummary = () => {
  alert('Print functionality would be implemented here')
}

// Initialize with first region selected
onMounted(() => {
  if (regions.value.length > 0) {
    selectedRegion.value = regions.value[0].id
  }
})
</script>

<style scoped>
.dashboard-container {
  max-width: 1800px;
  margin: 0 auto;
}

.filter-select {
  @apply block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500;
}

.export-button {
  @apply px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center;
}

.print-button {
  @apply px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 flex items-center;
}

.table-header {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.table-cell {
  @apply px-6 py-4 whitespace-nowrap text-sm;
}
</style>