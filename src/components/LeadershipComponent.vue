<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Constituency Executives</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage and view leaders at all levels
        </p>
      </div>
      
      <div class="flex gap-3">
        <select 
          v-model="selectedLevel"
          class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="all">All Levels</option>
          <option value="regional">Regional</option>
          <option value="constituency">Constituency</option>
          <option value="station">Polling Station</option>
        </select>
        
        <select 
          v-model="selectedPosition"
          class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="all">All Positions</option>
          <option v-for="position in positions" :key="position" :value="position">
            {{ position }}
          </option>
        </select>
        
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name..."
            class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 pl-10"
          />
          <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <button
          @click="openLeaderModal"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
          Assign Leader
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="leader in paginatedLeaders" 
        :key="leader.id" 
        class="relative bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
      >
        <router-link
          :to="{ name: 'MemberDetails', params: { id: leader.id } }"
          class="absolute top-3 right-3 items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          View
        </router-link>

        <div class="px-6 py-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-12 w-12 rounded-full" :src="leader.avatar" :alt="leader.name" />
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <UserCircleIcon class="h-5 w-5 mr-1.5 text-gray-500" />
                {{ leader.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentPosition(leader) }}</p>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1" 
                    :class="levelBadgeClasses(leader.level)">
                {{ formatLevel(leader.level) }}
              </span>
            </div>
          </div>

          <div class="flex gap-4">
            <div>
              <div class="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <MapPinIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                {{ leader.location }}
              </div>

              <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                {{ formatDate(leader.startDate) }} - {{ leader.endDate ? formatDate(leader.endDate) : 'Present' }}
              </div>
            </div>

            <div>
              <div class="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <PhoneIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                {{ leader.phone }}
              </div>

              <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <IdentificationIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                {{ leader.party_id }}
              </div>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
            <button 
              @click="editLeader(leader)"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Edit
            </button>
            <button 
              @click="confirmRevoke(leader.id)"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md shadow-sm text-red-700  focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Showing <span class="font-medium">{{ pagination.startIndex + 1 }}</span> to 
        <span class="font-medium">{{ pagination.endIndex }}</span> of 
        <span class="font-medium">{{ filteredLeaders.length }}</span> results
      </div>
      
      <div class="flex items-center gap-2">
        <select
          v-model="pagination.itemsPerPage"
          @change="resetPagination"
          class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="6">6 per page</option>
          <option value="12">12 per page</option>
          <option value="24">24 per page</option>
          <option value="48">48 per page</option>
        </select>
        
        <button
          @click="prevPage"
          :disabled="pagination.currentPage === 1"
          class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div class="flex gap-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium"
            :class="{
              'bg-green-600 text-white': page === pagination.currentPage,
              'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600': page !== pagination.currentPage,
              'opacity-50 cursor-not-allowed': page === '...'
            }"
            :disabled="page === '...'"
          >
            {{ page }}
          </button>
        </div>
        
        <button
          @click="nextPage"
          :disabled="pagination.currentPage === pagination.totalPages"
          class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

    <GDialog v-model="leaderModalOpen" max-width="800">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div class="bg-green-600 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-medium text-white">
            {{ isEditing ? 'Edit Leader' : 'Assign New Leader' }}
          </h3>
          <button @click="closeModal" class="text-white hover:text-gray-200">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="leader-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Leader Name *
              </label>
              <input
                v-model="formData.name"
                type="text"
                id="leader-name"
                required
                placeholder="Enter Name"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700"
              >
            </div>
            
            <div>
              <label for="leader-position" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Position *
              </label>
              <select
                v-model="formData.currentPosition"
                id="leader-position"
                required
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700"
              >
                <option value="">Select Position</option>
                <option v-for="position in positions" :key="position" :value="position">
                  {{ position }}
                </option>
              </select>
            </div>
            
            <div>
              <label for="leader-level" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Level *
              </label>
              <select
                v-model="formData.level"
                id="leader-level"
                required
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700"
                @change="updateLocationOptions"
              >
                <option value="">Select Level</option>
                <option value="regional">Regional</option>
                <option value="constituency">Constituency</option>
                <option value="station">Polling Station</option>
              </select>
            </div>
            
            <div>
              <label for="leader-location" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location *
              </label>
              <select
                v-model="formData.locationId"
                id="leader-location"
                required
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700"
              >
                <option value="">Select Location</option>
                <option 
                  v-for="location in locationOptions" 
                  :key="location.id" 
                  :value="location.id"
                >
                  {{ location.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="party id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Party Id *
              </label>
              <input
                v-model="formData.party_id"
                type="text"
                id="party_id"
                required
                placeholder="Enter id"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700"
              >
            </div>
            <div>
              <label for="leader-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                v-model="formData.phone"
                type="number"
                id="phone"
                required
                placeholder="Enter Phone"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700"
              >
            </div>
            <div>
              <label for="start-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date *
              </label>
              <input
                v-model="formData.startDate"
                type="date"
                id="start-date"
                required
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700"
              >
            </div>
            
            <div>
              <label for="end-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date (optional)
              </label>
              <input
                v-model="formData.endDate"
                type="date"
                id="end-date"
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
              :disabled="isSaving"
            >
              <span v-if="isSaving">Saving...</span>
              <span v-else>{{ isEditing ? 'Update Leader' : 'Create Leader' }}</span>
            </button>
          </div>
        </form>
      </div>
    </GDialog>

    <GDialog v-model="revokeDialogOpen" max-width="500">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div class="p-6 text-center">
          <ExclamationTriangleIcon class="mx-auto h-12 w-12 text-red-600 dark:text-red-400" />
          <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            Revoke Leadership Position
          </h3>
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to revoke this leadership position? This action cannot be undone.
          </div>
          
          <div class="mt-5 flex justify-center space-x-4">
            <button
              type="button"
              @click="revokeDialogOpen = false"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="revokeLeader"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              :disabled="isRevoking"
            >
              <span v-if="isRevoking">Revoking...</span>
              <span v-else>Revoke</span>
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
  MapPinIcon,
  CalendarIcon,
  PlusIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  IdentificationIcon,
  UserCircleIcon // Added this icon
} from '@heroicons/vue/24/outline'

// Constants
const STORAGE_KEY = 'leadersData'
const AVATAR_BASE_URL = 'https://randomuser.me/api/portraits'

// Sample data
const regions = ref([
  { id: 1, name: 'Western Region' },
  { id: 2, name: 'Greater Accra Region' }
])

const constituencies = ref([
  { id: 1, name: 'Takoradi Constituency', regionId: 1 },
  { id: 2, name: 'Sekondi Constituency', regionId: 1 },
  { id: 3, name: 'Southside Constituency', regionId: 2 }
])

const stations = ref([
  { id: 1, name: 'Takoradi Station A', constituencyId: 1 },
  { id: 2, name: 'Takoradi Station B', constituencyId: 1 },
  { id: 3, name: 'Sekondi Station A', constituencyId: 2 }
])

const positions = ref([
  'Chairman',
  'Vice Chairman',
  'Secretary',
  'Deputy Secretary',
  'Organiser',
  'Deputy Organiser',
  'Womens Organiser',
  'Deputy Womens Organiser',
  'Youth Organiser',
  'Deputy Youth Organiser',
  'Treasure',
  'Deputy Treasure',
  'Communication Officer',
  'Deputy Communication Officer',
  'Zongo Caucus Coordinator',
  'Executive Member',
  'Co-opted Member'
])

// Component state
const selectedLevel = ref('all')
const selectedPosition = ref('all')
const searchQuery = ref('')
const leaderModalOpen = ref(false)
const revokeDialogOpen = ref(false)
const leaderToRevoke = ref(null)
const locationOptions = ref([])
const leaders = ref([])
const isSaving = ref(false)
const isRevoking = ref(false)
const isEditing = ref(false)

// Pagination
const pagination = ref({
  currentPage: 1,
  itemsPerPage: 6,
  totalPages: 1,
  startIndex: 0,
  endIndex: 0
})

// Form data
const formData = ref({
  id: null,
  name: '',
  phone: '',
  party_id: '',
  currentPosition: '',
  positionHistory: [],
  level: '',
  locationId: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  avatar: ''
})

// Computed properties
const filteredLeaders = computed(() => {
  let result = leaders.value
  
  // Filter by level
  if (selectedLevel.value !== 'all') {
    result = result.filter(leader => leader.level === selectedLevel.value)
  }
  
  // Filter by position
  if (selectedPosition.value !== 'all') {
    result = result.filter(leader => leader.currentPosition === selectedPosition.value)
  }
  
  // Search by name
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(leader => 
      leader.name.toLowerCase().includes(query)
    )
  }
  
  return result
})

const paginatedLeaders = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.itemsPerPage
  const end = start + Number(pagination.value.itemsPerPage)
  return filteredLeaders.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = pagination.value.totalPages
  const current = pagination.value.currentPage
  const maxVisible = 5 // Maximum number of visible page buttons
  
  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)
    
    // Calculate range around current page
    let start = Math.max(2, current - 1)
    let end = Math.min(total - 1, current + 1)
    
    // Adjust if we're at the start or end
    if (current <= 3) {
      end = 4
    } else if (current >= total - 2) {
      start = total - 3
    }
    
    // Add ellipsis if needed
    if (start > 2) {
      pages.push('...')
    }
    
    // Add middle range
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    // Add ellipsis if needed
    if (end < total - 1) {
      pages.push('...')
    }
    
    // Always show last page
    pages.push(total)
  }
  
  return pages
})

// Helper functions
function generateRandomAvatar() {
  const gender = Math.random() > 0.5 ? 'men' : 'women'
  const randomId = Math.floor(Math.random() * 99)
  return `${AVATAR_BASE_URL}/${gender}/${randomId}.jpg`
}

function generateNewId() {
  const validIds = leaders.value.map(l => l.id).filter(id => typeof id === 'number' && !isNaN(id));
  const maxId = validIds.length ? Math.max(...validIds) : 0;
  return maxId + 1;
}

function getLocationName(leader) {
  if (!leader) return 'Unknown Location'
  
  switch (leader.level) {
    case 'regional':
      return regions.value.find(r => r.id === leader.locationId)?.name || 'Unknown Region'
    case 'constituency':
      return constituencies.value.find(c => c.id === leader.locationId)?.name || 'Unknown Constituency'
    case 'station':
      return stations.value.find(s => s.id === leader.locationId)?.name || 'Unknown Station'
    default:
      return 'Unknown Location'
  }
}

function currentPosition(leader) {
  if (!leader) return 'No position'
  return leader.currentPosition || 
           (leader.positionHistory?.length > 0 
           ? leader.positionHistory[leader.positionHistory.length - 1].position 
           : 'No position')
}

function formatDate(dateString) {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function formatLevel(level) {
  const levelMap = {
    regional: 'Regional',
    constituency: 'Constituency',
    station: 'Polling Station'
  }
  return levelMap[level] || level
}

function levelBadgeClasses(level) {
  const classes = {
    regional: 'bg-blue-100 text-blue-800',
    constituency: 'bg-purple-100 text-purple-800',
    station: 'bg-yellow-100 text-yellow-800'
  }
  return classes[level] || 'bg-gray-100 text-gray-800'
}

// Location handling
function updateLocationOptions() {
  switch (formData.value.level) {
    case 'regional':
      locationOptions.value = regions.value
      break
    case 'constituency':
      locationOptions.value = constituencies.value
      break
    case 'station':
      locationOptions.value = stations.value
      break
    default:
      locationOptions.value = []
  }
  formData.value.locationId = ''
}

// Modal handling
function openLeaderModal(leader = null) {
  resetForm()

  if (leader && typeof leader.id === 'number') {
    isEditing.value = true
    formData.value = {
      id: leader.id,
      name: leader.name,
      phone: leader.phone,
      party_id: leader.party_id,
      currentPosition: currentPosition(leader),
      level: leader.level,
      locationId: leader.locationId,
      startDate: leader.startDate,
      endDate: leader.endDate || '',
      avatar: leader.avatar,
      positionHistory: leader.positionHistory || []
    }
  } else {
    isEditing.value = false
  }

  updateLocationOptions()
  leaderModalOpen.value = true
}

function resetForm() {
  formData.value = {
    id: null,
    name: '',
    phone: '',
    party_id: '',
    currentPosition: '',
    positionHistory: [],
    level: '',
    locationId: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    avatar: ''
  }
}

function closeModal() {
  leaderModalOpen.value = false
  resetForm()
}

// Form validation
function validateForm() {
  const requiredFields = [
    { field: 'name', message: 'Please enter leader name' },
    { field: 'currentPosition', message: 'Please select a position' },
    { field: 'level', message: 'Please select a level' },
    { field: 'locationId', message: 'Please select a location' },
    { field: 'startDate', message: 'Please select a start date' }
  ]

  for (const { field, message } of requiredFields) {
    if (!formData.value[field]) {
      alert(message)
      return false
    }
  }
  return true
}

// CRUD Operations
async function handleSubmit() {
  console.log('Is editing:', isEditing.value);

  if (!validateForm()) return;
  
  isSaving.value = true;
  
  try {
    console.log('Form data before processing:', JSON.parse(JSON.stringify(formData.value)));
    
    // Create clean leader object with PROPER ID GENERATION
    const leaderData = {
      id: isEditing.value ? formData.value.id : generateNewId(), // This was the key fix
      name: formData.value.name,
      phone: formData.value.phone,
      party_id: formData.value.party_id,
      currentPosition: formData.value.currentPosition,
      level: formData.value.level,
      locationId: formData.value.locationId,
      location: getLocationName(formData.value),
      startDate: formData.value.startDate,
      endDate: formData.value.endDate || null,
      avatar: formData.value.avatar || generateRandomAvatar(),
      positionHistory: []
    };

    // Handle position history
    if (isEditing.value) {
      const existingLeader = leaders.value.find(l => l.id === leaderData.id);
      leaderData.positionHistory = existingLeader?.positionHistory || [];
      
      if (leaderData.currentPosition !== currentPosition(existingLeader)) {
        leaderData.positionHistory.push({
          position: leaderData.currentPosition,
          startDate: leaderData.startDate,
          endDate: leaderData.endDate,
          level: leaderData.level,
          location: leaderData.location
        });
      }
    } else {
      leaderData.positionHistory = [{
        position: leaderData.currentPosition,
        startDate: leaderData.startDate,
        endDate: leaderData.endDate,
        level: leaderData.level,
        location: leaderData.location
      }];
    }

    // IMMUTABLY update leaders array
    const updatedLeaders = isEditing.value
      ? leaders.value.map(leader => leader.id === leaderData.id ? leaderData : leader)
      : [...leaders.value, leaderData];

    console.log('Processed leader data:', leaderData);
    console.log('Full leaders array to save:', updatedLeaders);

    // Update BOTH reactive state AND localStorage
    leaders.value = updatedLeaders;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLeaders));
    
    console.log('Verified localStorage:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
    
    closeModal();
    resetPagination();
  } catch (error) {
    console.error('Save error:', {
      error: error,
      formData: formData.value,
      isEditing: isEditing.value
    });
    alert(`Failed to ${isEditing.value ? 'update' : 'create'} leader. Please check console.`);
  } finally {
    isSaving.value = false;
  }
}

function editLeader(leader) {
  if (!leader || typeof leader.id !== 'number') {
    console.warn('Invalid leader passed to editLeader');
    return;
  }
  openLeaderModal(leader)
}

function confirmRevoke(id) {
  leaderToRevoke.value = id
  revokeDialogOpen.value = true
}

async function revokeLeader() {
  isRevoking.value = true
  try {
    const updatedLeaders = leaders.value.filter(l => l.id !== leaderToRevoke.value)
    leaders.value = updatedLeaders
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLeaders))
    revokeDialogOpen.value = false
    leaderToRevoke.value = null
    resetPagination()
    console.log('After revoking:', updatedLeaders)
  } catch (error) {
    console.error('Error revoking leader:', error)
    alert('Failed to revoke leader')
  } finally {
    isRevoking.value = false
  }
}

// Pagination functions
function updatePagination() {
  const totalItems = filteredLeaders.value.length
  const itemsPerPage = Number(pagination.value.itemsPerPage)
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // Ensure current page is within valid range
  const currentPage = Math.min(pagination.value.currentPage, totalPages || 1)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  
  pagination.value = {
    ...pagination.value,
    currentPage,
    totalPages: totalPages || 1,
    startIndex,
    endIndex
  }
}

function resetPagination() {
  pagination.value.currentPage = 1
  updatePagination()
}

function prevPage() {
  if (pagination.value.currentPage > 1) {
    pagination.value.currentPage--
    updatePagination()
  }
}

function nextPage() {
  if (pagination.value.currentPage < pagination.value.totalPages) {
    pagination.value.currentPage++
    updatePagination()
  }
}

function goToPage(page) {
  if (page !== '...' && page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.currentPage = page
    updatePagination()
  }
}

// Watchers
watch([selectedLevel, selectedPosition, searchQuery], () => {
  resetPagination()
})

watch(pagination.value, (newVal) => {
  updatePagination()
}, { deep: true })

// Initialization
onMounted(() => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)
    console.log('Initial localStorage data:', savedData)
    
    if (savedData && savedData !== '[]') {
      const parsedData = JSON.parse(savedData)
      if (Array.isArray(parsedData)) {
        leaders.value = parsedData.map(leader => ({
          ...leader,
          positionHistory: leader.positionHistory || [],
          avatar: leader.avatar || generateRandomAvatar(),
          location: getLocationName(leader)
        }))
        console.log('Loaded leaders:', leaders.value)
      }
    }
    
    updatePagination()
  } catch (error) {
    console.error('Initialization error:', error)
    leaders.value = []
  }
})
</script>