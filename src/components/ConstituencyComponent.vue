<template>
  <div class="constituency-manager">
    <!-- Header Section -->
    <div class="header-section">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">All Constituencies</h1>
          <p class="text-gray-500 mt-1">{{ filteredConstituencies.length }} constituencies found</p>
        </div>
        <button 
          @click="openCreateDialog"
          class="add-button "
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Constituency
        </button>
      </div>

      <!-- Filter Controls -->
      <div class="filter-section">
        <div class="search-box">
          <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search constituencies..."
            class="search-input"
          >
        </div>
        
        <select v-model="regionFilter" class="region-filter">
          <option value="">All Regions</option>
          <option v-for="region in regions" :key="region.id" :value="region.id">
            {{ region.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Constituencies Table -->
    <div class="table-container">
      <table class="constituency-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Constituency Name</th>
            <th>Region</th>
            <th>Polling Stations</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="constituency in filteredConstituencies" :key="constituency.id">
            <td class="font-mono text-sm">{{ constituency.id }}</td>
            <td>{{ constituency.name }}</td>
            <td>
              <span class="region-badge" :style="{ backgroundColor: getRegionColor(constituency.regionId) }">
                {{ getRegionName(constituency.regionId) }}
              </span>
            </td>
            <td>
              <span v-if="constituency.pollingStationsCount" class="polling-count">
                {{ constituency.pollingStationsCount }}
              </span>
              <span v-else class="text-gray-400">N/A</span>
            </td>
            <td>{{ formatDate(constituency.createdAt) }}</td>
            <td class="action-buttons">
              <button @click="openEditDialog(constituency)" class="edit-button">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button @click="confirmDelete(constituency)" class="delete-button">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="filteredConstituencies.length === 0">
            <td colspan="6" class="no-results">
              No constituencies found matching your criteria
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create/Edit Dialog -->
    <GDialog v-model="showDialog" max-width="500">
      <div class="dialog-content">
        <h2 class="dialog-title">
          {{ isEditing ? 'Edit Constituency' : 'Add New Constituency' }}
        </h2>
        
        <form @submit.prevent="saveConstituency">
          <div class="form-group">
            <label>Constituency Name <span class="required">*</span></label>
            <input 
              v-model="currentConstituency.name"
              type="text" 
              required
              placeholder="Enter constituency name"
            >
          </div>
          
          <div class="form-group">
            <label>Region <span class="required">*</span></label>
            <select v-model="currentConstituency.regionId" required>
              <option value="" disabled>Select a region</option>
              <option v-for="region in regions" :key="region.id" :value="region.id">
                {{ region.name }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Polling Stations Count (Optional)</label>
            <input 
              v-model.number="currentConstituency.pollingStationsCount"
              type="number" 
              min="0"
              placeholder="Enter number of polling stations"
            >
          </div>
          
          <div class="dialog-footer">
            <button type="button" @click="showDialog = false" class="cancel-button">
              Cancel
            </button>
            <button type="submit" class="save-button">
              {{ isEditing ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </GDialog>

    <!-- Delete Confirmation Dialog -->
    <GDialog v-model="showDeleteDialog" max-width="400">
      <div class="delete-dialog">
        <div class="delete-icon">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="delete-title">Delete Constituency</h3>
        <p class="delete-message">
          Are you sure you want to delete "{{ constituencyToDelete?.name }}"?
          This action cannot be undone.
        </p>
        <div class="delete-footer">
          <button @click="showDeleteDialog = false" class="delete-cancel">
            Cancel
          </button>
          <button @click="deleteConstituency" class="delete-confirm">
            Delete
          </button>
        </div>
      </div>
    </GDialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { GDialog } from 'gitart-vue-dialog'

// Demo data for regions
const regions = ref([
  { id: 'region_01', name: 'Greater Accra', color: '#3B82F6' },
  { id: 'region_02', name: 'Western', color: '#10B981' },
  { id: 'region_04', name: 'Eastern', color: '#8B5CF6' },
  { id: 'region_05', name: 'Northern', color: '#EC4899' }
])

// Demo data for constituencies
const constituencies = ref([
  {
    id: 'const_01',
    name: 'Accra Central',
    regionId: 'region_01',
    pollingStationsCount: 42,
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-01-15T08:30:00Z'
  },
  {
    id: 'const_02',
    name: 'Takoradi',
    regionId: 'region_02',
    pollingStationsCount: 56,
    createdAt: '2023-02-20T10:15:00Z',
    updatedAt: '2023-05-10T14:20:00Z'
  },
  {
    id: 'const_03',
    name: 'Effia',
    regionId: 'region_02',
    pollingStationsCount: 28,
    createdAt: '2023-03-05T09:45:00Z',
    updatedAt: '2023-03-05T09:45:00Z'
  },
  {
    id: 'const_04',
    name: 'Koforidua South',
    regionId: 'region_04',
    pollingStationsCount: 35,
    createdAt: '2023-04-12T11:20:00Z',
    updatedAt: '2023-06-18T16:40:00Z'
  },
  {
    id: 'const_05',
    name: 'Tamale Central',
    regionId: 'region_05',
    createdAt: '2023-05-08T07:10:00Z',
    updatedAt: '2023-05-08T07:10:00Z'
  }
])

// UI State
const showDialog = ref(false)
const showDeleteDialog = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const regionFilter = ref('')

// Current constituency being edited/created
const currentConstituency = ref({
  id: '',
  name: '',
  regionId: '',
  pollingStationsCount: null
})

// Constituency to be deleted
const constituencyToDelete = ref(null)

// Filtered constituencies based on search and region filter
const filteredConstituencies = computed(() => {
  return constituencies.value.filter(constituency => {
    const matchesSearch = constituency.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRegion = regionFilter.value ? constituency.regionId === regionFilter.value : true
    return matchesSearch && matchesRegion
  })
})

// Helper functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getRegionName = (regionId) => {
  const region = regions.value.find(r => r.id === regionId)
  return region ? region.name : 'Unknown'
}

const getRegionColor = (regionId) => {
  const region = regions.value.find(r => r.id === regionId)
  return region ? region.color : '#9CA3AF'
}

// CRUD Operations
const openCreateDialog = () => {
  isEditing.value = false
  currentConstituency.value = {
    id: '',
    name: '',
    regionId: '',
    pollingStationsCount: null
  }
  showDialog.value = true
}

const openEditDialog = (constituency) => {
  isEditing.value = true
  currentConstituency.value = { ...constituency }
  showDialog.value = true
}

const saveConstituency = () => {
  if (isEditing.value) {
    // Update existing constituency
    const index = constituencies.value.findIndex(c => c.id === currentConstituency.value.id)
    if (index !== -1) {
      constituencies.value[index] = {
        ...currentConstituency.value,
        updatedAt: new Date().toISOString()
      }
    }
  } else {
    // Create new constituency
    const newConstituency = {
      ...currentConstituency.value,
      id: `const_${(constituencies.value.length + 1).toString().padStart(2, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    constituencies.value.unshift(newConstituency)
  }
  
  showDialog.value = false
}

const confirmDelete = (constituency) => {
  constituencyToDelete.value = constituency
  showDeleteDialog.value = true
}

const deleteConstituency = () => {
  constituencies.value = constituencies.value.filter(c => c.id !== constituencyToDelete.value.id)
  showDeleteDialog.value = false
  constituencyToDelete.value = null
}
</script>

<style scoped>
.constituency-manager {
  @apply p-6 max-w-6xl mx-auto;
}

.header-section {
  @apply mb-8;
}

.add-button {
  @apply px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center;
}

.filter-section {
  @apply flex gap-4 mb-6;
}

.search-box {
  @apply relative flex-1;
}

.search-icon {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400;
}

.search-input {
  @apply pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500;
}

.region-filter {
  @apply px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500;
}

.table-container {
  @apply bg-white rounded-lg shadow overflow-hidden;
}

.constituency-table {
  @apply min-w-full divide-y divide-gray-200;
}

.constituency-table th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.constituency-table td {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-500;
}

.constituency-table tr:hover {
  @apply bg-gray-50;
}

.region-badge {
  @apply px-3 py-1 rounded-full text-xs font-medium text-white;
}

.polling-count {
  @apply px-2 py-1 bg-gray-100 rounded-md font-medium;
}

.action-buttons {
  @apply flex gap-2;
}

.edit-button {
  @apply p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md;
}

.delete-button {
  @apply p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md;
}

.no-results {
  @apply py-8 text-center text-gray-500;
}

.dialog-content {
  @apply bg-white rounded-xl p-6;
}

.dialog-title {
  @apply text-xl font-semibold text-gray-800 mb-6;
}

.form-group {
  @apply mb-4;
}

.form-group label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.form-group input, .form-group select {
  @apply block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500;
}

.required {
  @apply text-red-500;
}

.dialog-footer {
  @apply flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200;
}

.cancel-button {
  @apply px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50;
}

.save-button {
  @apply px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-indigo-700;
}

.delete-dialog {
  @apply bg-white rounded-xl p-6 text-center;
}

.delete-icon {
  @apply mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-600 mb-4;
}

.delete-title {
  @apply text-lg font-medium text-gray-900 mb-2;
}

.delete-message {
  @apply text-sm text-gray-500 mb-6;
}

.delete-footer {
  @apply flex justify-center gap-3;
}

.delete-cancel {
  @apply px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50;
}

.delete-confirm {
  @apply px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700;
}
</style>