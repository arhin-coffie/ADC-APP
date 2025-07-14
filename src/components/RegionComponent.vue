<template>
  <div class="region-management">
    <!-- Header and Add Button -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Regions Management</h2>
      <button
        @click="openDialog(null)"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Region
      </button>
    </div>

    <!-- Regions Table -->
    <div class="bg-white shadow rounded-lg overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Region Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Code
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="region in regions" :key="region.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ region.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ region.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span v-if="region.code" class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {{ region.code }}
              </span>
              <span v-else class="text-gray-400 text-sm">N/A</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(region.createdAt) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="openDialog(region)"
                class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Edit
              </button>
              <button
                @click="initiateDelete(region)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="regions.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
              No regions found. Click "Add Region" to create one.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Region Dialog -->
    <GDialog v-model="dialogState" max-width="500">
      <div class="bg-white rounded-xl shadow-xl overflow-hidden">
        <!-- Dialog Header -->
        <div class="bg-green-600 from-indigo-600 to-purple-600 px-6 py-4">
          <h2 class="text-xl font-semibold text-white">
            {{ isEditMode ? 'Edit Region' : 'Create New Region' }}
          </h2>
        </div>

        <!-- Form Content -->
        <div class="px-6 py-6">
          <form @submit.prevent="submitForm">
            <!-- Region Name -->
            <div class="mb-6">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Region Name <span class="text-rose-500">*</span>
              </label>
              <input
                id="name"
                v-model="region.name"
                type="text"
                required
                class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition-all"
                placeholder="e.g. Greater Accra"
              />
            </div>

            <!-- Region Code -->
            <div class="mb-6">
              <label for="code" class="block text-sm font-medium text-gray-700 mb-2">
                Region Code (Optional)
              </label>
              <input
                id="code"
                v-model="region.code"
                type="text"
                maxlength="5"
                class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition-all uppercase"
                placeholder="e.g. GA"
              />
              <p class="mt-2 text-sm text-gray-500">
                Short identifier for the region (letters only)
              </p>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="closeDialog"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Cancel
              </button>
              <div class="flex space-x-3">
                <button
                  v-if="isEditMode"
                  type="button"
                  @click="deleteRegion"
                  class="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-wait"
                >
                  {{ isEditMode ? 'Update' : 'Create' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </GDialog>

    <!-- Delete Confirmation Dialog -->
    <GDialog v-model="deleteDialogState" max-width="400">
      <div class="bg-white rounded-xl shadow-xl overflow-hidden">
        <div class="p-6 text-center">
          <svg class="mx-auto h-16 w-16 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">
            Delete Region
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete "{{ regionToDelete?.name }}"?
            </p>
          </div>
          <div class="mt-6 flex justify-center space-x-4">
            <button
              type="button"
              @click="deleteDialogState = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="confirmDelete"
              class="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all"
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
import { ref } from 'vue'
import { GDialog } from 'gitart-vue-dialog'

const dialogState = ref(false)
const deleteDialogState = ref(false)
const isEditMode = ref(false)
const isSubmitting = ref(false)
const regionToDelete = ref(null)

const region = ref({
  id: '',
  name: '',
  code: '',
  createdAt: '',
  updatedAt: ''
})

const regions = ref([
  { id: 'region_01', name: 'Greater Accra', code: 'GA', createdAt: '2023-05-15T10:30:00Z', updatedAt: '2023-05-15T10:30:00Z' },
  { id: 'region_02', name: 'Western', code: 'WR', createdAt: '2023-05-10T08:15:00Z', updatedAt: '2023-05-12T14:20:00Z' }
])

const openDialog = (regionData) => {
  if (regionData) {
    isEditMode.value = true
    region.value = { ...regionData }
  } else {
    isEditMode.value = false
    resetForm()
  }
  dialogState.value = true
}

const initiateDelete = (region) => {
  regionToDelete.value = region
  deleteDialogState.value = true
}

const closeDialog = () => {
  dialogState.value = false
}

const resetForm = () => {
  region.value = {
    id: '',
    name: '',
    code: '',
    createdAt: '',
    updatedAt: ''
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const submitForm = () => {
  isSubmitting.value = true
  
  setTimeout(() => {
    if (isEditMode.value) {
      const index = regions.value.findIndex(r => r.id === region.value.id)
      if (index !== -1) {
        regions.value[index] = {
          ...region.value,
          updatedAt: new Date().toISOString()
        }
      }
    } else {
      const newRegion = {
        id: `region_${(regions.value.length + 1).toString().padStart(2, '0')}`,
        name: region.value.name,
        code: region.value.code.toUpperCase(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      regions.value.unshift(newRegion)
    }
    
    isSubmitting.value = false
    closeDialog()
  }, 1500)
}

const deleteRegion = () => {
  deleteDialogState.value = true
}

const confirmDelete = () => {
  if (regionToDelete.value) {
    regions.value = regions.value.filter(r => r.id !== regionToDelete.value.id)
    deleteDialogState.value = false
    closeDialog()
  }
}
</script>

<style scoped>
.region-management {
  @apply p-6;
}

table {
  @apply min-w-full divide-y divide-gray-200;
}

th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

td {
  @apply px-6 py-4 whitespace-nowrap;
}
</style>